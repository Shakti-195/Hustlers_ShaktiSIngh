from fastapi import APIRouter, Request
from app.core.payment import client
import razorpay

client = razorpay.Client(auth=("rzp_test_SaxRAk3WfS2MN7", "NHF2iBrdaX3ZVFvyoe6nW3kz"))

router = APIRouter()


#  Create Order
@router.post("/create-order")
async def create_order(amount: int):
    order = client.order.create({
        "amount": amount * 100,
        "currency": "INR",
        "payment_capture": 1
    })
    return order


#  Verify Payment
@router.post("/verify")
async def verify_payment(request: Request):
    body = await request.json()

    try:
        client.utility.verify_payment_signature({
            "razorpay_order_id": body["razorpay_order_id"],
            "razorpay_payment_id": body["razorpay_payment_id"],
            "razorpay_signature": body["razorpay_signature"]
        })

        return {"status": "Payment verified "}

    except Exception as e:
        return {"status": "Payment failed ", "error": str(e)}