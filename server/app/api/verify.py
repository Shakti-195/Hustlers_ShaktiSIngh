from fastapi import APIRouter, Request, HTTPException
from app.core.payment import client
from app.services.booking_service import create_booking

router = APIRouter()


@router.post("/verify")
async def verify_payment(request: Request):
    try:
        body = await request.json()

        razorpay_order_id = body.get("razorpay_order_id")
        razorpay_payment_id = body.get("razorpay_payment_id")
        razorpay_signature = body.get("razorpay_signature")

        # 👇 extra data (IMPORTANT)
        user = body.get("user")
        event_id = body.get("event_id")

        if not razorpay_order_id or not razorpay_payment_id or not razorpay_signature:
            raise HTTPException(status_code=400, detail="Missing payment details")

        # ✅ verify payment
        client.utility.verify_payment_signature({
            "razorpay_order_id": razorpay_order_id,
            "razorpay_payment_id": razorpay_payment_id,
            "razorpay_signature": razorpay_signature
        })

        # 🔥 create booking AFTER payment success
        booking = await create_booking(user, type("obj", (object,), {"event_id": event_id}))

        return {
            "status": "success ✅",
            "message": "Payment verified & booking confirmed 🎟️",
            "booking": booking
        }

    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Payment failed ❌: {str(e)}")