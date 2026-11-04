# AI-Powered Invoice Data Extraction System

## 1. Project Overview

The AI-Powered Invoice Data Extraction System uses Google's Gemini AI to extract structured information from invoice images and PDF documents.

It automatically identifies invoice details, supplier information, item descriptions, quantities, prices, VAT, and total amounts. The extracted information is saved in JSON format and validated to identify calculation errors and missing fields.

## 2. Features

- Extracts invoice information using Gemini AI.
- Supports image files and PDF documents.
- Extracts invoice number, date, supplier name, and currency.
- Extracts item descriptions, quantities, unit prices, and line totals.
- Identifies subtotal, VAT, and grand total.
- Validates invoice calculations.
- Detects missing or invalid information.
- Processes multiple invoices from one folder.
- Generates individual and combined JSON output files.

## 3. Technologies Used

- Python 3.11
- Google Gemini API
- Google GenAI SDK
- Pillow
- PyMuPDF
- JSON

## 4. Project Structure

```text
invoice_extraction/
│
├── invoices/                  # Input invoice files
├── output/                    # Generated JSON results
├── main.py                    # Main application
├── ai_extractor.py            # AI-based invoice extraction
├── validator.py               # Invoice validation
├── requirements.txt           # Project dependencies
├── .env                       # API key configuration
├── .gitignore                 # Ignored files
└── README.md                  # Project documentation
```

## 5. Installation and Setup

### Step 1: Clone the repository

```bash
git clone YOUR_REPOSITORY_URL
cd invoice_extraction
```

### Step 2: Create a virtual environment

```bash
python -m venv venv
```

### Step 3: Activate the environment

Windows PowerShell:

```powershell
.\venv\Scripts\Activate.ps1
```

### Step 4: Install dependencies

```bash
pip install -r requirements.txt
```

### Step 5: Configure the Gemini API key

Create a `.env` file in the project root:

```env
GEMINI_API_KEY=your_gemini_api_key
```

Replace the placeholder with your own Gemini API key.

### Step 6: Add invoice files

Place invoice images or PDFs inside the `invoices/` folder.

### Step 7: Run the application

```bash
python main.py
```

## 6. Output

The application generates:

- Individual JSON files for each processed invoice.
- `all_invoices.json`, containing the combined results.

Each invoice result includes extracted information and validation results.

## 7. Validation

The system checks:

- Required invoice information.
- Item quantity and unit-price calculations.
- Subtotal calculation.
- VAT calculation.
- Grand total calculation.

Invalid or missing information is reported in the validation results.

## 8. Security

The Gemini API key is stored in the `.env` file and should never be committed to a public repository.

## 9. Future Improvements

- Support additional invoice formats and layouts.
- Improve extraction accuracy for low-quality scans.
- Add a user interface for uploading and reviewing invoices.
- Support manual correction of extracted information.
- Add confidence scores for extracted fields.
