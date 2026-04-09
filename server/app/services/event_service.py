from app.core.database import db
from bson import ObjectId
import math


def calculate_distance(lat1, lng1, lat2, lng2):
    R = 6371
    dlat = math.radians(lat2 - lat1)
    dlng = math.radians(lng2 - lng1)
    a = (
        math.sin(dlat / 2) ** 2
        + math.cos(math.radians(lat1))
        * math.cos(math.radians(lat2))
        * math.sin(dlng / 2) ** 2
    )
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    return R * c


async def create_event(event):
    event_dict = event.dict()
    result = await db.events.insert_one(event_dict)
    return {"message": "Event created", "id": str(result.inserted_id)}


async def get_nearby_events(user_lat, user_lng, radius_km=10):
    events = []
    async for event in db.events.find():
        distance = calculate_distance(user_lat, user_lng, event["lat"], event["lng"])
        if distance <= radius_km:
            event["_id"] = str(event["_id"])
            event["distance_km"] = round(distance, 2)
            events.append(event)
    return events


async def get_all_events():
    events = []
    async for event in db.events.find():
        event["_id"] = str(event["_id"])
        events.append(event)
    return events


async def delete_event(event_id: str):
    try:
        result = await db.events.delete_one({"_id": ObjectId(event_id)})
        if result.deleted_count == 0:
            return {"error": "Event not found"}
        # also delete related bookings
        await db.bookings.delete_many({"event_id": event_id})
        return {"message": "Event deleted"}
    except Exception as e:
        return {"error": str(e)}