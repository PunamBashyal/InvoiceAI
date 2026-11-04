
import json
from pathlib import Path

from ai_extractor import extract_invoice_data
from validator import validate_invoice


# --------------------------------------------------
# PROJECT CONFIGURATION
# --------------------------------------------------

BASE_DIR = Path(__file__).resolve().parent

INVOICE_DIR = BASE_DIR / "invoices"
OUTPUT_DIR = BASE_DIR / "output"

OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

SUPPORTED_EXTENSIONS = {
    ".png",
    ".jpg",
    ".jpeg",
    ".webp",
    ".bmp",
    ".tiff",
    ".pdf"
}


# --------------------------------------------------
# JSON SAVING
# --------------------------------------------------

def save_json(data, output_path):
    """Save data as a formatted JSON file."""

    with open(output_path, "w", encoding="utf-8") as file:
        json.dump(
            data,
            file,
            indent=4,
            ensure_ascii=False
        )


# --------------------------------------------------
# PROCESS ONE INVOICE
# --------------------------------------------------

def process_invoice(invoice_path):

    print(f"\nProcessing: {invoice_path.name}")

    try:

        # Extract invoice information
        invoice_data = extract_invoice_data(invoice_path)

        # Validate extracted information
        validation_result = validate_invoice(invoice_data)

        result = {
            "file_name": invoice_path.name,
            "invoice_data": invoice_data,
            "validation": validation_result
        }

        print("Extraction completed.")

        print(
            "Validation:",
            "PASSED" if validation_result["is_valid"] else "FAILED"
        )

        return result

    except Exception as error:

        print(f"Processing failed: {error}")

        return {
            "file_name": invoice_path.name,
            "invoice_data": None,
            "validation": {
                "is_valid": False,
                "checks_passed": [],
                "errors": [str(error)],
                "warnings": []
            }
        }


# --------------------------------------------------
# PROCESS ALL INVOICES
# --------------------------------------------------

def main():

    print("\n======================================")
    print("   AI-POWERED INVOICE EXTRACTION")
    print("======================================")

    # Check invoice folder
    if not INVOICE_DIR.exists():
        print("\nInvoice folder does not exist.")
        return

    # Find supported invoice files
    invoice_files = sorted(
        file for file in INVOICE_DIR.iterdir()
        if file.is_file()
        and file.suffix.lower() in SUPPORTED_EXTENSIONS
    )

    if not invoice_files:
        print("\nNo supported invoice files found.")
        print("Please add invoice images or PDFs.")
        return

    print(f"\nFound {len(invoice_files)} invoice(s).")

    all_results = []

    # Process each invoice
    for index, invoice_path in enumerate(invoice_files, start=1):

        print(f"\n========== INVOICE {index} ==========")

        result = process_invoice(invoice_path)

        all_results.append(result)

        # Save individual invoice result
        individual_output = (
            OUTPUT_DIR / f"{invoice_path.stem}_result.json"
        )

        save_json(result, individual_output)

        print(f"Saved: {individual_output.name}")

    # Save combined invoice results
    combined_output = OUTPUT_DIR / "all_invoices.json"

    save_json(all_results, combined_output)

    # Calculate processing summary
    total = len(all_results)

    extracted = sum(
        1 for result in all_results
        if result["invoice_data"] is not None
    )

    passed = sum(
        1 for result in all_results
        if result["validation"]["is_valid"]
    )

    failed = total - passed

    # Display final summary
    print("\n======================================")
    print("          PROCESSING SUMMARY")
    print("======================================")

    print("Total invoices:", total)
    print("Successfully extracted:", extracted)
    print("Validation passed:", passed)
    print("Validation failed:", failed)

    print("\nCombined results saved at:")
    print(combined_output)


if __name__ == "__main__":
    main()
