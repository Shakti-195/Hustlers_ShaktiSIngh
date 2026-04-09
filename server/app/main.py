from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import auth, user, events, bookings, verify, payment
import os

app = FastAPI()

# ✅ Dynamic CORS Configuration
# Production mein aapka frontend URL yahan aayega
origins = [
    "http://localhost:5173",  # Local development
    "https://your-frontend-url.vercel.app",  # Aapka deployed frontend URL
    "*" # Temporary: Agar jaldi check karna hai toh sab allow kar dein
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Production ke liye "*" ki jagah specific list (origins) use karein
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(auth.router, prefix="/auth")
app.include_router(user.router, prefix="/user")
app.include_router(events.router, prefix="/events")
app.include_router(bookings.router, prefix="/bookings")
app.include_router(verify.router, prefix="/verify")
app.include_router(payment.router, prefix="/payment")

@app.get("/")
async def root():
    return {
        "status": "Online",
        "message": "EventHub API is running smoothly",
        "documentation": "/docs"
    }