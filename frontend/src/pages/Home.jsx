
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page">

      <nav className="home-navbar">
        <div className="home-logo">
          <div className="logo-icon">✧</div>
          <div>
            <h2>InvoiceAI</h2>
            <span>SMART EXTRACTION</span>
          </div>
        </div>

        <div className="home-nav-links">
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#how-it-works">How It Works</a>
        </div>

        <button
          className="nav-button"
          onClick={() => navigate("/dashboard")}
        >
          Open Workspace →
        </button>
      </nav>

      <main>
        <section className="home-hero" id="home">
          <div className="hero-content">

            <div className="hero-tag">
              <span>✦</span> AI-POWERED INVOICE PROCESSING
            </div>

            <h1>
              Make invoice processing
              <span> effortless.</span>
            </h1>

            <p>
              Transform your invoices into structured, accurate data.
              Upload your documents and let artificial intelligence
              handle the extraction and validation.
            </p>

            <div className="hero-actions">
              <button
                className="primary-button"
                onClick={() => navigate("/dashboard")}
              >
                Get Started <span>→</span>
              </button>

              <a href="#how-it-works" className="secondary-link">
                Explore how it works ↓
              </a>
            </div>

            <div className="hero-trust">
              <span>✓</span> AI-powered extraction
              <span>✓</span> Automatic validation
              <span>✓</span> Structured output
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-glow"></div>

            <div className="floating-card card-top">
              <span className="floating-icon purple">✧</span>
              <div>
                <strong>AI Extraction</strong>
                <small>Smart document analysis</small>
              </div>
            </div>

            <div className="invoice-illustration">
              <div className="invoice-paper">
                <div className="paper-top">
                  <span>INVOICE</span>
                  <span className="paper-symbol">✧</span>
                </div>

                <div className="paper-line long"></div>
                <div className="paper-line medium"></div>

                <div className="paper-divider"></div>

                <div className="paper-row">
                  <span>Item description</span>
                  <span>Amount</span>
                </div>
                <div className="paper-line long"></div>
                <div className="paper-line medium"></div>
                <div className="paper-line short"></div>

                <div className="paper-total">
                  <span>Total Amount</span>
                  <strong>NPR 113,565</strong>
                </div>
              </div>
            </div>

            <div className="floating-card card-bottom">
              <span className="floating-icon green">✓</span>
              <div>
                <strong>Validation Complete</strong>
                <small>All calculations checked</small>
              </div>
            </div>
          </div>
        </section>

        <section className="features-section" id="features">
          <div className="section-intro">
            <span className="eyebrow">POWERFUL FEATURES</span>
            <h2>Everything you need to process invoices</h2>
            <p>
              A smarter approach to invoice management, powered by AI.
            </p>
          </div>

          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon purple-bg">✧</div>
              <h3>AI Data Extraction</h3>
              <p>
                Automatically extract invoice numbers, supplier details,
                dates, items, quantities and amounts.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon blue-bg">✓</div>
              <h3>Smart Validation</h3>
              <p>
                Check item calculations, subtotals, VAT and grand totals
                to identify inconsistencies.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon orange-bg">▤</div>
              <h3>Structured Results</h3>
              <p>
                View extracted information in an organized format and
                access the structured JSON output.
              </p>
            </div>
          </div>
        </section>

        <section className="workflow-section" id="how-it-works">
          <div className="section-intro">
            <span className="eyebrow">SIMPLE WORKFLOW</span>
            <h2>Three steps. Less manual work.</h2>
            <p>Process your invoices in a few simple steps.</p>
          </div>

          <div className="workflow-grid">
            <div className="workflow-step">
              <span className="step-number">01</span>
              <h3>Upload Invoice</h3>
              <p>Choose a PDF or image of your invoice.</p>
            </div>

            <div className="workflow-step">
              <span className="step-number">02</span>
              <h3>Extract with AI</h3>
              <p>Let AI identify and extract important information.</p>
            </div>

            <div className="workflow-step">
              <span className="step-number">03</span>
              <h3>Review Results</h3>
              <p>Check extracted information and validation results.</p>
            </div>
          </div>

          <div className="workflow-cta">
            <div>
              <h2>Ready to simplify invoice processing?</h2>
              <p>Start extracting invoice information with InvoiceAI.</p>
            </div>

            <button
              className="primary-button"
              onClick={() => navigate("/dashboard")}
            >
              Launch Workspace →
            </button>
          </div>
        </section>
      </main>

      <footer className="home-footer">
        <strong>InvoiceAI</strong>
        <span>Smart extraction. Accurate results. Less manual work.</span>
        <span>© 2026 InvoiceAI. All rights reserved.</span>
      </footer>
    </div>
  );
}

export default Home;
