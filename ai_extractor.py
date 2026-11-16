
import os
import json
from pathlib import Path

import fitz
from dotenv import load_dotenv
from google import genai
from google.genai import types
from PIL import Image, UnidentifiedImageError


# --------------------------------------------------
# CONFIGURATION
# --------------------------------------------------

BASE_DIR = Path(__file__).resolve().parent

load_dotenv(BASE_DIR / ".env")

MODEL_NAME = "gemini-3.5-flash-lite"

SUPPORTED_IMAGE_FORMATS = {
    ".png",
    ".jpg",
    ".jpeg",
    ".webp",
    ".bmp",
    ".tiff"
}

MAX_PDF_PAGES = 20


# --------------------------------------------------
# GEMINI CLIENT
# --------------------------------------------------

def get_gemini_client():
    """Initialize Gemini using the API key from .env."""

    api_key = os.getenv("GEMINI_API_KEY")

    if not api_key or api_key == "your_actual_api_key":
        raise ValueError(
            "Gemini API key is missing. Check your .env file."
        )

    return genai.Client(
        api_key=api_key,
        http_options=types.HttpOptions(
            api_version="v1beta"
        )
    )

# --------------------------------------------------
# IMAGE AND PDF LOADING
# --------------------------------------------------

def load_invoice_pages(file_path):
    """
    Load invoice images or PDF pages as PIL images.

    Returns a list of RGB images.
    """

    file_path = Path(file_path)

    if not file_path.exists():
        raise FileNotFoundError(
            f"Invoice file not found: {file_path}"
        )

    if not file_path.is_file():
        raise ValueError("The provided path is not a file.")

    extension = file_path.suffix.lower()

    # Handle PDF invoices
    if extension == ".pdf":

        try:
            images = []

            with fitz.open(file_path) as document:

                if document.is_encrypted:
                    raise ValueError(
                        "Password-protected PDFs are not supported."
                    )

                if document.page_count == 0:
                    raise ValueError(
                        "The PDF contains no pages."
                    )

                if document.page_count > MAX_PDF_PAGES:
                    raise ValueError(
                        f"PDF exceeds the maximum of "
                        f"{MAX_PDF_PAGES} pages."
                    )

                for page in document:

                    pixmap = page.get_pixmap(
                        matrix=fitz.Matrix(2, 2),
                        alpha=False
                    )

                    image = Image.frombytes(
                        "RGB",
                        [pixmap.width, pixmap.height],
                        pixmap.samples
                    )

                    images.append(image)

            return images

        except ValueError:
            raise

        except Exception as error:
            raise ValueError(
                f"Unable to read PDF invoice: {error}"
            ) from error

    # Handle image invoices
    if extension not in SUPPORTED_IMAGE_FORMATS:
        raise ValueError(
            f"Unsupported invoice format: {extension}"
        )

    try:

        with Image.open(file_path) as img:
            img.verify()

        with Image.open(file_path) as img:
            return [img.convert("RGB")]

    except (UnidentifiedImageError, OSError) as error:
        raise ValueError(
            f"Invalid or unreadable invoice image: {error}"
        ) from error


# --------------------------------------------------
# JSON NORMALIZATION
# --------------------------------------------------

def normalize_invoice_data(data):
    """Ensure the AI response follows the required structure."""

    if not isinstance(data, dict):
        raise ValueError(
            "AI response must be a JSON object."
        )

    required_fields = [
        "invoice_number",
        "invoice_date",
        "supplier_name",
        "items",
        "subtotal",
        "vat_rate_percent",
        "vat_amount",
        "total_amount",
        "currency"
    ]

    for field in required_fields:
        data.setdefault(field, None)

    if data["items"] is None:
        data["items"] = []

    if not isinstance(data["items"], list):
        raise ValueError(
            "Invalid invoice items format."
        )

    item_fields = [
        "description",
        "quantity",
        "unit",
        "unit_price",
        "line_total"
    ]

    for item in data["items"]:

        if not isinstance(item, dict):
            raise ValueError(
                "An invoice item has an invalid structure."
            )

        for field in item_fields:
            item.setdefault(field, None)

    return data


# --------------------------------------------------
# AI INVOICE EXTRACTION
# --------------------------------------------------

def extract_invoice_data(file_path):
    """
    Extract structured invoice information using Gemini AI.

    Supports image files and multi-page PDF files.
    """

    # Load invoice pages
    invoice_images = load_invoice_pages(file_path)

    # Initialize Gemini
    client = get_gemini_client()

    prompt = """
    You are an expert invoice data extraction assistant.

    Carefully examine all provided pages of the invoice.

    Extract the following information:

    1. invoice_number
    2. invoice_date
    3. supplier_name
    4. items:
       - description
       - quantity
       - unit
       - unit_price
       - line_total
    5. subtotal
    6. vat_rate_percent
    7. vat_amount
    8. total_amount
    9. currency

    Important instructions:

    - Extract information exactly as printed.
    - Do not invent missing information.
    - Use null for missing or unreadable values.
    - Use numbers for quantities and monetary amounts.
    - Keep units separately.
    - Include every invoice item.
    - Do not calculate missing values.
    - Do not guess unclear characters or numbers.
    - Examine all pages if the invoice has multiple pages.
    - Do not treat each page as a separate invoice.
    - Avoid duplicating items appearing across pages.
    - Return valid JSON only.
    - Do not include Markdown code fences.

    Required JSON structure:

    {
        "invoice_number": null,
        "invoice_date": null,
        "supplier_name": null,
        "items": [
            {
                "description": null,
                "quantity": null,
                "unit": null,
                "unit_price": null,
                "line_total": null
            }
        ],
        "subtotal": null,
        "vat_rate_percent": null,
        "vat_amount": null,
        "total_amount": null,
        "currency": null
    }
    """

    try:

        response = client.models.generate_content(
            model=MODEL_NAME,
            contents=[prompt, *invoice_images],
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                temperature=0
            )
        )

        if not response.text:
            raise ValueError(
                "Gemini returned an empty response."
            )

        extracted_data = json.loads(response.text)

        return normalize_invoice_data(extracted_data)

    except json.JSONDecodeError as error:
        raise ValueError(
            "Gemini returned invalid JSON."
        ) from error

    except Exception as error:
        raise RuntimeError(
            f"Invoice extraction failed: {error}"
        ) from error
