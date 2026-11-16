
import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";

import "./App.css";
import "./styles.css";

const API_URL = `${
  import.meta.env.VITE_API_URL || "https://invoiceai-9hol.onrender.com"
}/api/extract/`;

const response = await fetch(API_URL, {
  method: "POST",
  body: formData,
});
/* =====================================================
   MAIN APP ROUTING
===================================================== */

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/results" element={<Results />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

/* =====================================================
   HOME PAGE
===================================================== */

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page">

      {/* Navigation */}
      <nav className="home-navbar">

        <div className="home-brand">
          <div className="brand-icon">✦</div>

          <div>
            <h2>InvoiceAI</h2>
            <span>SMART EXTRACTION</span>
          </div>
        </div>

        <div className="home-nav-links">
          <a href="#features">Features</a>
          <a href="#how-it-works">How it works</a>

          <button onClick={() => navigate("/dashboard")}>
            Dashboard
          </button>
        </div>

      </nav>

      {/* Hero Section */}
      <main className="home-hero">

        <div className="hero-content">

          <span className="hero-tag">
            ✨ AI-POWERED INVOICE AUTOMATION
          </span>

          <h1>
            Transform your invoices
            <span> into smart data.</span>
          </h1>

          <p>
            Simplify invoice processing with intelligent AI extraction.
            Upload your invoice and automatically extract important
            information, validate calculations, and generate structured
            JSON data.
          </p>

          <div className="hero-buttons">

            <button
              className="primary-button"
              onClick={() => navigate("/dashboard")}
            >
              Get Started →
            </button>

            <a href="#features" className="secondary-button">
              Explore Features
            </a>

          </div>

          <div className="hero-stats">

            <div>
              <h3>AI</h3>
              <span>Smart extraction</span>
            </div>

            <div>
              <h3>100%</h3>
              <span>Automated workflow</span>
            </div>

            <div>
              <h3>JSON</h3>
              <span>Structured output</span>
            </div>

          </div>

        </div>

        {/* Invoice Illustration */}
        <div className="hero-visual">

          <div className="hero-glow"></div>

          <div className="invoice-illustration">

            <div className="illustration-top">
              <span>✦ InvoiceAI</span>
              <span className="illustration-status">Processed</span>
            </div>

            <div className="illustration-icon">▤</div>

            <h3>Invoice Summary</h3>
            <p>Invoice #INV-2026-001</p>

            <div className="illustration-line"></div>

            <div className="illustration-row">
              <span>Supplier</span>
              <strong>ABC Supplies</strong>
            </div>

            <div className="illustration-row">
              <span>Subtotal</span>
              <strong>NPR 25,000</strong>
            </div>

            <div className="illustration-row">
              <span>VAT</span>
              <strong>NPR 3,250</strong>
            </div>

            <div className="illustration-total">
              <span>Grand Total</span>
              <strong>NPR 28,250</strong>
            </div>

            <div className="illustration-success">
              ✓ AI validation completed
            </div>

          </div>

          <div className="floating-card floating-card-one">
            ✨ Gemini AI Extraction
          </div>

          <div className="floating-card floating-card-two">
            ✓ Smart Validation
          </div>

        </div>

      </main>

      {/* Features */}
      <section className="home-features" id="features">

        <div className="section-intro">
          <span>POWERFUL FEATURES</span>

          <h2>
            Everything you need for invoice processing
          </h2>

          <p>
            An intelligent workflow designed to make invoice
            management faster and easier.
          </p>
        </div>

        <div className="feature-grid">

          <div className="home-feature-card">
            <div className="feature-icon">✦</div>

            <h3>AI Data Extraction</h3>

            <p>
              Extract invoice numbers, supplier details, dates,
              item descriptions, and financial information using
              Google Gemini AI.
            </p>
          </div>

          <div className="home-feature-card">
            <div className="feature-icon">✓</div>

            <h3>Smart Validation</h3>

            <p>
              Automatically validate invoice calculations,
              subtotals, VAT amounts, and missing information.
            </p>
          </div>

          <div className="home-feature-card">
            <div className="feature-icon">{ }</div>

            <h3>Structured JSON</h3>

            <p>
              Convert unstructured invoice information into
              organized JSON output for further processing.
            </p>
          </div>

        </div>

      </section>

      {/* How it works */}
      <section className="how-section" id="how-it-works">

        <div className="section-intro">
          <span>SIMPLE WORKFLOW</span>
          <h2>How InvoiceAI works</h2>
        </div>

        <div className="workflow-grid">

          <div className="workflow-card">
            <span>01</span>
            <h3>Upload Invoice</h3>
            <p>
              Upload an invoice in PDF, PNG, JPG, or WEBP format.
            </p>
          </div>

          <div className="workflow-card">
            <span>02</span>
            <h3>AI Extraction</h3>
            <p>
              Gemini AI identifies and extracts important invoice details.
            </p>
          </div>

          <div className="workflow-card">
            <span>03</span>
            <h3>Validate Results</h3>
            <p>
              Review calculations and receive a validation report.
            </p>
          </div>

          <div className="workflow-card">
            <span>04</span>
            <h3>View JSON</h3>
            <p>
              Access structured invoice data in JSON format.
            </p>
          </div>

        </div>

      </section>

      {/* Call to Action */}
      <section className="home-cta">

        <h2>Ready to simplify invoice processing?</h2>

        <p>
          Start extracting invoice information with AI today.
        </p>

        <button onClick={() => navigate("/dashboard")}>
          Start Processing →
        </button>

      </section>

      <footer className="home-footer">
        InvoiceAI · AI-Powered Invoice Data Extraction System
      </footer>

    </div>
  );
}

/* =====================================================
   DASHBOARD PAGE
===================================================== */

function Dashboard() {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Generate file preview
  useEffect(() => {
    if (!file) {
      setPreview("");
      return;
    }

    const url = URL.createObjectURL(file);

    setPreview(url);

    return () => URL.revokeObjectURL(url);
  }, [file]);

  // Select invoice
  const selectFile = (selectedFile) => {
    if (!selectedFile) return;

    const allowedTypes = [
      "image/png",
      "image/jpeg",
      "image/webp",
      "application/pdf",
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      setError("Please upload a PNG, JPG, WEBP, or PDF file.");
      return;
    }

    setFile(selectedFile);
    setError("");
  };

  // Drag and drop
  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);

    selectFile(event.dataTransfer.files[0]);
  };

  // Extract invoice using FastAPI
  const handleExtract = async () => {
    if (!file) {
      setError("Please select an invoice first.");
      return;
    }

    setLoading(true);
    setError("");

    const formData = new FormData();

    formData.append("file", file);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || "Invoice extraction failed. Please try again."
        );
      }

      if (!data.extracted_data) {
        throw new Error("The API response did not contain extracted invoice data.");
      }

      // Navigate to the separate Results page
      navigate("/results", {
        state: {
          result: data,
          filename: file.name,
        },
      });

    } catch (err) {
      setError(
        err.message ||
        "Unable to connect to the backend. Make sure FastAPI is running."
      );
    } finally {
      setLoading(false);
    }
  };

  // Remove selected file
  const removeFile = () => {
    setFile(null);
    setError("");
  };

  return (
    <div className="app">

      {/* Sidebar */}
      <aside className="sidebar">

        <div className="brand">
          <div className="brand-icon">✦</div>

          <div>
            <h2>InvoiceAI</h2>
            <span>SMART EXTRACTION</span>
          </div>
        </div>

        <p className="nav-heading">WORKSPACE</p>

        <nav>
          <button
            className="nav-item active"
            onClick={() => navigate("/dashboard")}
          >
            ▦ Dashboard
          </button>

          <button
            className="nav-item"
            onClick={() => navigate("/")}
          >
            ⌂ Home
          </button>
        </nav>

        <div className="sidebar-bottom">

          <div className="help-card">
            <div className="help-icon">✧</div>

            <h3>AI-powered extraction</h3>

            <p>
              Turn your invoices into structured data with AI.
            </p>
          </div>

          <div className="profile">
            <div className="avatar">P</div>

            <div>
              <strong>Project Workspace</strong>
              <span>Invoice Administrator</span>
            </div>
          </div>

        </div>

      </aside>

      {/* Dashboard Content */}
      <main className="main-content">

        <header className="topbar">

          <div>
            <span className="breadcrumb">
              Workspace / Dashboard
            </span>

            <h1>Invoice Dashboard</h1>

            <p>
              Upload and extract information from your invoices.
            </p>
          </div>

          <div className="status-pill">
            <span className="status-dot"></span>
            AI workspace
          </div>

        </header>

        {/* Welcome Banner */}
        <section className="welcome-banner">

          <div>
            <span className="banner-label">
              WELCOME TO INVOICEAI
            </span>

            <h2>
              Make invoice processing effortless.
            </h2>

            <p>
              Upload an invoice and let AI extract important information
              automatically.
            </p>
          </div>

          <div className="banner-art">✧</div>

        </section>

        {/* Upload Heading */}
        <section className="section-heading">

          <div>
            <h2>Upload your invoice</h2>

            <p>
              Choose an invoice image or PDF document to get started.
            </p>
          </div>

          <span className="file-support">
            PNG · JPG · WEBP · PDF
          </span>

        </section>

        {/* Upload Area */}
        <section
          className={`upload-box ${dragging ? "dragging" : ""}`}
          onDragOver={(event) => {
            event.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
        >

          <input
            id="invoice-upload"
            type="file"
            accept=".png,.jpg,.jpeg,.webp,.pdf"
            hidden
            onChange={(event) => {
              selectFile(event.target.files[0]);
              event.target.value = "";
            }}
          />

          <div className="upload-icon">↑</div>

          <h3>Drag and drop your invoice here</h3>

          <p>or browse files from your computer</p>

          <label
            htmlFor="invoice-upload"
            className="browse-button"
          >
            Browse files
          </label>

          <span className="upload-note">
            Supported formats: PDF, PNG, JPG and WEBP
          </span>

        </section>

        {/* Selected File Preview */}
        {file && (
          <section className="preview-section">

            <div className="preview-header">

              <div>
                <h2>Selected invoice</h2>
                <p>Review your file before extraction.</p>
              </div>

              <button
                className="remove-button"
                onClick={removeFile}
                disabled={loading}
              >
                Remove file
              </button>

            </div>

            <div className="file-card">

              <div className="file-icon">
                {file.type === "application/pdf" ? "PDF" : "IMG"}
              </div>

              <div className="file-details">
                <strong>{file.name}</strong>

                <span>
                  {(file.size / 1024).toFixed(1)} KB
                </span>
              </div>

              <span className="ready-label">
                Ready to upload
              </span>

            </div>

            {/* Image or PDF Preview */}
            <div className="preview-frame">

              {file.type === "application/pdf" ? (
                <iframe
                  title="Invoice PDF preview"
                  src={preview}
                />
              ) : (
                <img
                  src={preview}
                  alt="Selected invoice preview"
                />
              )}

            </div>

            {/* Extract Button */}
            <button
              className="extract-button"
              onClick={handleExtract}
              disabled={loading}
            >
              {loading
                ? "⏳ Extracting invoice..."
                : "✨ Extract invoice with AI"}
            </button>

            <p className="connection-note">
              {loading
                ? "Gemini AI is processing your invoice. Please wait..."
                : "Your invoice will be processed and validated automatically."}
            </p>

          </section>
        )}

        {/* API Error */}
        {error && (
          <div className="api-error" role="alert">

            <strong>Something went wrong</strong>

            <p>{error}</p>

          </div>
        )}

        {/* Feature Cards */}
        <section className="info-grid">

          <div className="info-card">
            <div className="info-card-icon purple">✦</div>

            <h3>AI Extraction</h3>

            <p>
              Extract invoice details using Google Gemini AI.
            </p>
          </div>

          <div className="info-card">
            <div className="info-card-icon blue">✓</div>

            <h3>Smart Validation</h3>

            <p>
              Check totals, VAT, and missing invoice information.
            </p>
          </div>

          <div className="info-card">
            <div className="info-card-icon orange">{ }</div>

            <h3>JSON Output</h3>

            <p>
              Organize extracted information into structured JSON.
            </p>
          </div>

        </section>

        <footer>
          InvoiceAI · AI-Powered Invoice Data Extraction System
        </footer>

      </main>

    </div>
  );
}

/* =====================================================
   RESULTS PAGE
===================================================== */

function Results() {
  const location = useLocation();
  const navigate = useNavigate();

  const result = location.state?.result;
  const filename = location.state?.filename || "Invoice";

  // Return to dashboard if there are no results
  if (!result || !result.extracted_data) {
    return (
      <div className="no-results">

        <h2>No invoice results found</h2>

        <p>
          Please upload and process an invoice first.
        </p>

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
  const items = invoice.items || [];

  // Currency formatting
  const formatCurrency = (amount) => {
    if (amount === undefined || amount === null) {
      return "—";
    }

    return Number(amount).toLocaleString("en-IN", {
      maximumFractionDigits: 2,
    });
  };

  // Copy extracted JSON
  const copyJSON = async () => {
    try {
      await navigator.clipboard.writeText(
        JSON.stringify(result, null, 2)
      );

      alert("JSON copied successfully!");
    } catch {
      alert("Unable to copy JSON.");
    }
  };

  return (
    <div className="results-page">

      {/* Results Header */}
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

      {/* Results Content */}
      <main className="results-main">

        <div className="results-heading">

          <div>

            <span className="banner-label">
              AI EXTRACTION RESULTS
            </span>

            <h1>Invoice processed successfully</h1>

            <p>
              Extracted information and validation report.
            </p>

            <p className="result-filename">
              File: {filename}
            </p>

          </div>

          <span
            className={`validation-badge ${
              validation?.is_valid ? "valid" : "invalid"
            }`}
          >
            {validation?.is_valid
              ? "✓ Valid invoice"
              : "⚠ Needs review"}
          </span>

        </div>

        {/* Invoice Summary */}
        <div className="summary-grid">

          <div className="summary-card">
            <span>Invoice Number</span>

            <strong>
              {invoice.invoice_number || "—"}
            </strong>
          </div>

          <div className="summary-card">
            <span>Supplier</span>

            <strong>
              {invoice.supplier_name || "—"}
            </strong>
          </div>

          <div className="summary-card">
            <span>Invoice Date</span>

            <strong>
              {invoice.invoice_date || "—"}
            </strong>
          </div>

          <div className="summary-card total-card">
            <span>Grand Total</span>

            <strong>
              {invoice.currency || "NPR"}{" "}
              {formatCurrency(invoice.total_amount)}
            </strong>
          </div>

        </div>

        {/* Invoice Items */}
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

                      <td>
                        {item.description || "—"}
                      </td>

                      <td>
                        {item.quantity ?? "—"}
                      </td>

                      <td>
                        {item.unit || "—"}
                      </td>

                      <td>
                        {formatCurrency(item.unit_price)}
                      </td>

                      <td>
                        {formatCurrency(item.line_total)}
                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">
                      No invoice items found.
                    </td>
                  </tr>
                )}

              </tbody>

            </table>

          </div>

          {/* Invoice Totals */}
          <div className="invoice-totals">

            <p>
              Subtotal

              <strong>
                {formatCurrency(invoice.subtotal)}
              </strong>
            </p>

            <p>
              VAT ({invoice.vat_rate_percent ?? 0}%)

              <strong>
                {formatCurrency(invoice.vat_amount)}
              </strong>
            </p>

            <p className="grand-total">
              Grand Total

              <strong>
                {invoice.currency || "NPR"}{" "}
                {formatCurrency(invoice.total_amount)}
              </strong>
            </p>

          </div>

        </div>

        {/* Validation Report */}
        <div className="result-card validation-card">

          <h3>Validation report</h3>

          <p
            className={
              validation?.is_valid ? "valid-text" : "invalid-text"
            }
          >
            {validation?.is_valid
              ? "✓ All validation checks passed."
              : "⚠ Some validation checks need attention."}
          </p>

          {validation?.checks_passed?.length > 0 && (
            <div>

              <h4>Checks passed</h4>

              <ul className="validation-list">

                {validation.checks_passed.map((check, index) => (
                  <li key={index}>
                    ✓ {check}
                  </li>
                ))}

              </ul>

            </div>
          )}

          {validation?.errors?.length > 0 && (
            <div>

              <h4>Errors</h4>

              <ul className="validation-list error-list">

                {validation.errors.map((item, index) => (
                  <li key={index}>
                    ⚠ {item}
                  </li>
                ))}

              </ul>

            </div>
          )}

          {validation?.warnings?.length > 0 && (
            <div>

              <h4>Warnings</h4>

              <ul className="validation-list warning-list">

                {validation.warnings.map((item, index) => (
                  <li key={index}>
                    ! {item}
                  </li>
                ))}

              </ul>

            </div>
          )}

          {!validation && (
            <p>
              Validation information was not returned by the API.
            </p>
          )}

        </div>

        {/* JSON Output */}
        <div className="result-card">

          <h3>Extracted JSON output</h3>

          <pre className="json-output">
            {JSON.stringify(result, null, 2)}
          </pre>

          <button
            className="copy-button"
            onClick={copyJSON}
          >
            Copy JSON
          </button>

        </div>

        {/* Process Another Invoice */}
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

/* =====================================================
   EXPORT APP
===================================================== */

export default App;
