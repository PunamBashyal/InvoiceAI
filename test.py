
from validator import validate_invoice

# Sample invoice with intentionally missing information
test_invoice = {
    "invoice_number": None,
    "invoice_date": "14 October 2024",
    "supplier_name": "",
    "currency": "NPR",
    "items": [
        {
            "description": "HDPE Pipe",
            "quantity": None,
            "unit_price": 1250,
            "line_total": 62500
        }
    ],
    "subtotal": 62500,
    "vat_rate_percent": 13,
    "vat_amount": 8125,
    "total_amount": 70625
}

print("\n========== MISSING FIELD TEST ==========")

result = validate_invoice(test_invoice)

for error in result["errors"]:
    print("[ERROR]", error)

print("\nValidation status:", result["is_valid"])

if not result["is_valid"]:
    print("\nSUCCESS: Missing information was detected!")
else:
    print("\nTEST FAILED: Missing information was not detected.")
