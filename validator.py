
from decimal import Decimal, InvalidOperation, ROUND_HALF_UP


TWO_DECIMAL_PLACES = Decimal("0.01")


def to_decimal(value):
    """Safely convert values into Decimal."""

    if value is None or isinstance(value, bool):
        return None

    try:
        result = Decimal(str(value))

        if not result.is_finite():
            return None

        return result

    except (InvalidOperation, ValueError, TypeError):
        return None


def money(value):
    """Round monetary values to two decimal places."""

    return value.quantize(
        TWO_DECIMAL_PLACES,
        rounding=ROUND_HALF_UP
    )


def validate_invoice(data):
    """Validate invoice information and financial calculations."""

    errors = []
    checks = []
    warnings = []

    if not isinstance(data, dict):
        return {
            "is_valid": False,
            "checks_passed": [],
            "errors": ["Invalid invoice data structure."],
            "warnings": []
        }

    # Check required fields
    required_fields = [
        "invoice_number",
        "invoice_date",
        "supplier_name"
    ]

    for field in required_fields:

        value = data.get(field)

        if not isinstance(value, str) or not value.strip():
            errors.append(
                f"Missing or invalid field: {field}."
            )

    # Check currency
    currency = data.get("currency")

    if not isinstance(currency, str) or not currency.strip():
        warnings.append("Currency information is missing.")

    # Check invoice items
    items = data.get("items")

    if not isinstance(items, list) or not items:
        errors.append("Invoice items are missing or invalid.")
        items = []

    calculated_subtotal = Decimal("0")
    all_items_valid = bool(items)

    for index, item in enumerate(items, start=1):

        if not isinstance(item, dict):
            errors.append(
                f"Item {index} has an invalid structure."
            )
            all_items_valid = False
            continue

        description = item.get("description")

        if not isinstance(description, str) or not description.strip():
            errors.append(
                f"Item {index}: description is missing."
            )

        quantity = to_decimal(item.get("quantity"))
        unit_price = to_decimal(item.get("unit_price"))
        line_total = to_decimal(item.get("line_total"))

        if quantity is None or quantity <= 0:
            errors.append(
                f"Item {index}: quantity is missing or invalid."
            )
            all_items_valid = False
            continue

        if unit_price is None or unit_price < 0:
            errors.append(
                f"Item {index}: unit price is missing or invalid."
            )
            all_items_valid = False
            continue

        if line_total is None or line_total < 0:
            errors.append(
                f"Item {index}: line total is missing or invalid."
            )
            all_items_valid = False
            continue

        expected_total = money(quantity * unit_price)

        if expected_total == money(line_total):
            checks.append(
                f"Item {index} calculation is correct."
            )
        else:
            errors.append(
                f"Item {index}: expected {expected_total}, "
                f"but extracted {money(line_total)}."
            )
            all_items_valid = False

        calculated_subtotal += expected_total

    # Check subtotal
    subtotal = to_decimal(data.get("subtotal"))

    if subtotal is None or subtotal < 0:
        errors.append("Subtotal is missing or invalid.")

    elif all_items_valid:

        calculated_subtotal = money(calculated_subtotal)

        if calculated_subtotal == money(subtotal):
            checks.append("Subtotal calculation is correct.")
        else:
            errors.append(
                f"Subtotal mismatch: expected {calculated_subtotal}, "
                f"but extracted {money(subtotal)}."
            )

    # Check VAT
    vat_rate = to_decimal(data.get("vat_rate_percent"))
    vat_amount = to_decimal(data.get("vat_amount"))

    if vat_rate is None or vat_rate < 0:
        errors.append("VAT rate is missing or invalid.")

    if vat_amount is None or vat_amount < 0:
        errors.append("VAT amount is missing or invalid.")

    if (
        subtotal is not None
        and subtotal >= 0
        and vat_rate is not None
        and vat_rate >= 0
        and vat_amount is not None
        and vat_amount >= 0
    ):

        expected_vat = money(
            subtotal * vat_rate / Decimal("100")
        )

        if expected_vat == money(vat_amount):
            checks.append("VAT calculation is correct.")
        else:
            errors.append(
                f"VAT mismatch: expected {expected_vat}, "
                f"but extracted {money(vat_amount)}."
            )

    # Check grand total
    total_amount = to_decimal(data.get("total_amount"))

    if total_amount is None or total_amount < 0:
        errors.append("Total amount is missing or invalid.")

    elif (
        subtotal is not None
        and subtotal >= 0
        and vat_amount is not None
        and vat_amount >= 0
    ):

        expected_total = money(subtotal + vat_amount)

        if expected_total == money(total_amount):
            checks.append("Grand total calculation is correct.")
        else:
            errors.append(
                f"Grand total mismatch: expected {expected_total}, "
                f"but extracted {money(total_amount)}."
            )

    return {
        "is_valid": len(errors) == 0,
        "checks_passed": checks,
        "errors": errors,
        "warnings": warnings
    }
