
import { useLocation, useNavigate } from "react-router-dom";

function Results() {
  const location = useLocation();
  const navigate = useNavigate();

  const result = location.state?.result;
  const filename = location.state?.filename || "Invoice";

  if (!result) {
    return (
      <div className="no-results">
        <h2>No invoice results found</h2>
        <p>Please upload and process an invoice first.</p>

        <button
          className="primary-button"
          onClick={() => navigate("/dashboard")}
        >
          Go to Dashboard
        </button>
      </div>
    );
  }

  const invoice = result.extracted_data;
  const validation = result.validation;
  const items = invoice?.items || [];

  const formatCurrency = (amount) => {
    if (amount === undefined || amount === null) return "—";

    return Number(amount).toLocaleString("en-IN", {
      maximumFractionDigits: 2,
    });
  };

  const copyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(result, null, 2));
  };

  return (
    <div className="results-page">

      <header className="results-topbar">
        <div className="brand">
          <div className="brand-icon">✦</div>
          <div>
            <h2>InvoiceAI</h2>
            <span>SMART EXTRACTION</span>
          </div>
        </div>

        <button
          className="secondary-button"
          onClick={() => navigate("/dashboard")}
        >
          ← Dashboard
        </button>
      </header>

      <main className="results-main">

        <div className="results-heading">
          <div>
            <span className="banner-label">AI EXTRACTION RESULTS</span>
            <h1>Invoice processed successfully</h1>
            <p>Extracted information and validation report.</p>
            <p className="result-filename">File: {filename}</p>
          </div>

          <span
            className={`validation-badge ${
              validation?.is_valid ? "valid" : "invalid"
            }`}
          >
            {validation?.is_valid ? "✓ Valid invoice" : "⚠ Needs review"}
          </span>
        </div>

        <div className="summary-grid">

          <div className="summary-card">
            <span>Invoice Number</span>
            <strong>{invoice?.invoice_number || "—"}</strong>
          </div>

          <div className="summary-card">
            <span>Supplier</span>
            <strong>{invoice?.supplier_name || "—"}</strong>
          </div>

          <div className="summary-card">
            <span>Invoice Date</span>
            <strong>{invoice?.invoice_date || "—"}</strong>
          </div>

          <div className="summary-card total-card">
            <span>Grand Total</span>
            <strong>
              {invoice?.currency || "NPR"}{" "}
              {formatCurrency(invoice?.total_amount)}
            </strong>
          </div>

        </div>

        <div className="result-card">
          <h3>Extracted invoice items</h3>

          <div className="table-wrapper">
            <table className="invoice-table">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Quantity</th>
                  <th>Unit</th>
                  <th>Unit Price</th>
                  <th>Line Total</th>
                </tr>
              </thead>

              <tbody>
                {items.length > 0 ? (
                  items.map((item, index) => (
                    <tr key={index}>
                      <td>{item.description || "—"}</td>
                      <td>{item.quantity ?? "—"}</td>
                      <td>{item.unit || "—"}</td>
                      <td>{formatCurrency(item.unit_price)}</td>
                      <td>{formatCurrency(item.line_total)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No invoice items found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="invoice-totals">
            <p>
              Subtotal
              <strong>{formatCurrency(invoice?.subtotal)}</strong>
            </p>

            <p>
              VAT ({invoice?.vat_rate_percent ?? 0}%)
              <strong>{formatCurrency(invoice?.vat_amount)}</strong>
            </p>

            <p className="grand-total">
              Grand Total
              <strong>
                {invoice?.currency || "NPR"}{" "}
                {formatCurrency(invoice?.total_amount)}
              </strong>
            </p>
          </div>
        </div>

        <div className="result-card validation-card">
          <h3>Validation report</h3>

          <p className={validation?.is_valid ? "valid-text" : "invalid-text"}>
            {validation?.is_valid
              ? "✓ All validation checks passed."
              : "⚠ Some validation checks need attention."}
          </p>

          {validation?.checks_passed?.length > 0 && (
            <div>
              <h4>Checks passed</h4>
              <ul className="validation-list">
                {validation.checks_passed.map((check, index) => (
                  <li key={index}>✓ {check}</li>
                ))}
              </ul>
            </div>
          )}

          {validation?.errors?.length > 0 && (
            <div>
              <h4>Errors</h4>
              <ul className="validation-list error-list">
                {validation.errors.map((item, index) => (
                  <li key={index}>⚠ {item}</li>
                ))}
              </ul>
            </div>
          )}

          {validation?.warnings?.length > 0 && (
            <div>
              <h4>Warnings</h4>
              <ul className="validation-list warning-list">
                {validation.warnings.map((item, index) => (
                  <li key={index}>! {item}</li>
                ))}
              </ul>
            </div>
          )}

          {!validation && (
            <p>Validation information was not returned by the API.</p>
          )}
        </div>

        <div className="result-card">
          <h3>Extracted JSON output</h3>

          <pre className="json-output">
            {JSON.stringify(result, null, 2)}
          </pre>

          <button className="copy-button" onClick={copyJSON}>
            Copy JSON
          </button>
        </div>

        <button
          className="extract-button"
          onClick={() => navigate("/dashboard")}
        >
          + Process another invoice
        </button>

      </main>
    </div>
  );
}

export default Results;
