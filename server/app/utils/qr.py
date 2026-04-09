import qrcode
import os

def generate_qr(data: str, filename: str):
    if not os.path.exists("qrcodes"):
        os.makedirs("qrcodes")

    file_path = f"qrcodes/{filename}.png"

    img = qrcode.make(data)
    img.save(file_path)

    return file_path