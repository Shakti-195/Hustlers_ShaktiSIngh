from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class PaymentRequest(BaseModel):
    amount: int

@router.post("/")
def process_payment(data: PaymentRequest):
    return {
        "status": "success",
        "message": "Payment processed",
        "amount": data.amount
    }