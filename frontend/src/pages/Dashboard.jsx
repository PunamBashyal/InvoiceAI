
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://127.0.0.1:8000/api/extract/";

function Dashboard() {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!file) {
      setPreview("");
      return;
    }

    const url = URL.createObjectURL(file);
    setPreview(url);

    return () => URL.revokeObjectURL(url);
  }, [file]);

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

  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);
    selectFile(event.dataTransfer.files[0]);
  };

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

  const removeFile = () => {
    setFile(null);
    setError("");
  };

  return (
    <div className="app">

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
            <p>Turn your invoices into structured data with AI.</p>
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

      <main className="main-content">

        <header className="topbar">
          <div>
            <span className="breadcrumb">
              Workspace / Dashboard
            </span>

            <h1>Invoice Dashboard</h1>

            <p>Upload and extract information from your invoices.</p>
          </div>

          <div className="status-pill">
            <span className="status-dot"></span>
            AI workspace
          </div>
        </header>

        <section className="welcome-banner">
          <div>
            <span className="banner-label">WELCOME TO INVOICEAI</span>
            <h2>Make invoice processing effortless.</h2>

            <p>
              Upload an invoice and let AI extract important information
              automatically.
            </p>
          </div>

          <div className="banner-art">✧</div>
        </section>

        <section className="section-heading">
          <div>
            <h2>Upload your invoice</h2>
            <p>Choose an invoice image or PDF document to get started.</p>
          </div>

          <span className="file-support">PNG · JPG · WEBP · PDF</span>
        </section>

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

          <label htmlFor="invoice-upload" className="browse-button">
            Browse files
          </label>

          <span className="upload-note">
            Supported formats: PDF, PNG, JPG and WEBP
          </span>
        </section>

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
                <span>{(file.size / 1024).toFixed(1)} KB</span>
              </div>

              <span className="ready-label">Ready to upload</span>
            </div>

            <div className="preview-frame">
              {file.type === "application/pdf" ? (
                <iframe title="Invoice PDF preview" src={preview} />
              ) : (
                <img src={preview} alt="Selected invoice preview" />
              )}
            </div>

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

        {error && (
          <div className="api-error" role="alert">
            <strong>Something went wrong</strong>
            <p>{error}</p>
          </div>
        )}

        <section className="info-grid">
          <div className="info-card">
            <div className="info-card-icon purple">✦</div>
            <h3>AI Extraction</h3>
            <p>Extract invoice details using Google Gemini AI.</p>
          </div>

          <div className="info-card">
            <div className="info-card-icon blue">✓</div>
            <h3>Smart Validation</h3>
            <p>Check totals, VAT, and missing invoice information.</p>
          </div>

          <div className="info-card">
            <div className="info-card-icon orange">{ }</div>
            <h3>JSON Output</h3>
            <p>Organize extracted information into structured JSON.</p>
          </div>
        </section>

        <footer>
          InvoiceAI · AI-Powered Invoice Data Extraction System
        </footer>

      </main>
    </div>
  );
}

export default Dashboard;
