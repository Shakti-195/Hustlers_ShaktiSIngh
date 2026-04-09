from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import auth, user, events, bookings, verify, payment

app = FastAPI()

# ✅ CORS Configuration
origins = [
    "http://localhost:5173",  # frontend dev
    "https://your-frontend-url.vercel.app",  # production
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 🔥 use origins in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Routers
app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(user.router, prefix="/user", tags=["User"])
app.include_router(events.router, prefix="/events", tags=["Events"])
app.include_router(bookings.router, prefix="/bookings", tags=["Bookings"])
app.include_router(verify.router, prefix="/verify", tags=["Verify"])
app.include_router(payment.router, prefix="/payment", tags=["Payment"])

# ✅ Root
@app.get("/")
async def root():
    return {
        "status": "Online",
        "message": "EventHub API is running 🚀",
        "docs": "/docs"
    }