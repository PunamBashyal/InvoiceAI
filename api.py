
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
import shutil
import uuid

from ai_extractor import extract_invoice_data
from validator import validate_invoice

app = FastAPI(title="Invoice Extraction API")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://invoice-ai-six.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Upload directory
UPLOAD_DIR = Path("api_uploads")
UPLOAD_DIR.mkdir(exist_ok=True)


@app.get("/")
def home():
    return {"message": "Invoice Extraction API is running"}


@app.post("/api/extract/")
async def extract_invoice(file: UploadFile = File(...)):

    allowed_extensions = {".pdf", ".png", ".jpg", ".jpeg", ".webp"}
    extension = Path(file.filename or "").suffix.lower()

    if extension not in allowed_extensions:
        raise HTTPException(
            status_code=400,
            detail="Unsupported file type. Upload a PDF or image."
        )

    temp_path = UPLOAD_DIR / f"{uuid.uuid4().hex}{extension}"

    try:
        with temp_path.open("wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        extracted_data = extract_invoice_data(str(temp_path))
        validation_result = validate_invoice(extracted_data)

        return {
            "success": True,
            "filename": file.filename,
            "extracted_data": extracted_data,
            "validation": validation_result
        }

    except HTTPException:
        raise

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=f"Invoice processing failed: {str(error)}"
        )

    finally:
        await file.close()

        if temp_path.exists():
            temp_path.unlink()
