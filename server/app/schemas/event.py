from fastapi import APIRouter, Depends
from app.services.event_service import get_nearby_events, create_event, get_all_events, delete_event
from app.schemas.event import EventCreate
from app.dependencies import get_current_user

router = APIRouter()

@router.get("/nearby")
async def nearby(lat: float, lng: float):
    return await get_nearby_events(lat, lng)

@router.get("/all")
async def all_events(user = Depends(get_current_user)):
    return await get_all_events()

@router.post("/")
async def create(event: EventCreate, user = Depends(get_current_user)):
    return await create_event(event)

@router.delete("/{event_id}")
async def delete(event_id: str, user = Depends(get_current_user)):
    return await delete_event(event_id)