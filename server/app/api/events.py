from fastapi import APIRouter

router = APIRouter()

# 🔥 Dummy Events Data (can replace with DB later)
events = [
    {
        "id": 1,
        "title": "Startup Meetup 2026",
        "location": "IIM Lucknow",
        "price": 199,
        "image": "https://images.unsplash.com/photo-1515169067868-5387ec356754"
    },
    {
        "id": 2,
        "title": "Music Fest Night",
        "location": "Delhi Arena",
        "price": 499,
        "image": "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2"
    }
]

# ✅ Get all events
@router.get("/")
def get_events():
    return events

# ✅ Get single event
@router.get("/{event_id}")
def get_event(event_id: int):
    for event in events:
        if event["id"] == event_id:
            return event
    return {"error": "Event not found"}