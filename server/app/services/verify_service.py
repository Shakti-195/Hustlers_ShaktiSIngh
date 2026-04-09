from app.core.database import db
from bson import ObjectId

async def verify_ticket(booking_id: str):
    booking = await db.bookings.find_one({"_id": ObjectId(booking_id)})

    if not booking:
        return {"status": "invalid ❌", "message": "Booking not found"}

    if booking.get("is_used"):
        return {"status": "rejected 🚫", "message": "Ticket already used"}

    # mark as used
    await db.bookings.update_one(
        {"_id": ObjectId(booking_id)},
        {"$set": {"is_used": True}}
    )

    return {
        "status": "success ✅",
        "message": "Entry allowed 🎉"
    }