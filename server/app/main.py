from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import auth, user, events, bookings, verify, payment

app = FastAPI()

# ✅ CORS — allow React frontend to talk to this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth")
app.include_router(user.router, prefix="/user")
app.include_router(events.router, prefix="/events")
app.include_router(bookings.router, prefix="/bookings")
app.include_router(verify.router, prefix="/verify")
app.include_router(payment.router, prefix="/payment")

@app.get("/")
async def root():
    return {"message": "API running"}