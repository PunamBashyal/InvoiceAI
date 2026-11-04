
from ai_extractor import validate_image

try:
    validate_image("invoices/invalid_invoice.png")

except FileNotFoundError as error:
    print("[FILE ERROR]", error)

except ValueError as error:
    print("[IMAGE ERROR]", error)
