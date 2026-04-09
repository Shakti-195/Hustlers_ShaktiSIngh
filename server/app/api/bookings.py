from fastapi import APIRouter
from pydantic import BaseModel
import uuid

router = APIRouter()

# 🔥 Temporary DB
bookings_db = []

# 📦 Request Schema
class BookingRequest(BaseModel):
    event_id: int
    tickets: int
    total: int

# ✅ Create Booking
@router.post("/")
def create_booking(data: BookingRequest):
    booking_id = str(uuid.uuid4())[:8]

    booking = {
        "booking_id": booking_id,
        "event_id": data.event_id,
        "tickets": data.tickets,
        "total": data.total
    }

    bookings_db.append(booking)

    return {
        "booking_id": booking_id,
        "qr_code": f"BOOKING-{booking_id}"
    }

# ✅ Get all bookings (optional)
@router.get("/")
def get_bookings():
    return bookings_db