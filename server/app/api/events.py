from fastapi import APIRouter
from app.services.event_service import get_nearby_events

router = APIRouter()

@router.get("/nearby")
async def nearby(lat: float, lng: float):
    return await get_nearby_events(lat, lng)