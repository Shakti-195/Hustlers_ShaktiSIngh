from fastapi import APIRouter, Depends
from app.schemas.booking import BookingCreate
from app.services.booking_service import create_booking
from app.dependencies import get_current_user

router = APIRouter()

@router.post("/")
async def book_event(booking: BookingCreate, user = Depends(get_current_user)):
    return await create_booking(user, booking)
