from app.core.database import db
from bson import ObjectId
from app.utils.qr import generate_qr


async def create_booking(user, booking):
    try:
        event = await db.events.find_one({"_id": ObjectId(booking.event_id)})
        if not event:
            return {"error": "Event not found"}

        existing_booking = await db.bookings.find_one({
            "user_email": user["email"],
            "event_id": booking.event_id
        })

        if existing_booking:
            return {"error": "Already booked this event"}

        booking_data = {
            "user_email": user["email"],
            "event_id": booking.event_id,
            "is_used": False
        }

        result = await db.bookings.insert_one(booking_data)
        booking_id = str(result.inserted_id)
        qr_path = generate_qr(booking_id, booking_id)

        return {
            "message": "Booking successful 🎟️",
            "booking_id": booking_id,
            "qr_code": qr_path
        }

    except Exception as e:
        return {"error": str(e)}


async def get_all_bookings():
    bookings = []
    async for booking in db.bookings.find():
        booking["_id"] = str(booking["_id"])
        bookings.append(booking)
    return bookings