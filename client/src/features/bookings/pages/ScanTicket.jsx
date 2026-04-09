import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

export default function ScanTicket() {
  const [data, setData] = useState(null);
  const [parsed, setParsed] = useState(null);
  const [status, setStatus] = useState(null);

  const scannerRef = useRef(null);

  useEffect(() => {
    const scanner = new Html5Qrcode("reader");

    scanner.start(
      { facingMode: "environment" },
      { fps: 10, qrbox: 250 },
      (decodedText) => {
        setData(decodedText);

        try {
          const json = JSON.parse(decodedText);
          setParsed(json);

          // 🔥 FAKE VALIDATION
          if (json.ticketId && json.title) {
            setStatus("valid");
          } else {
            setStatus("invalid");
          }
        } catch {
          setStatus("invalid");
        }

        scanner.stop();
      }
    );

    scannerRef.current = scanner;

    return () => {
      scanner.stop().catch(() => {});
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">

      <h1 className="text-2xl font-bold mb-6">
        Scan Ticket 🎫
      </h1>

      {/* CAMERA */}
      <div className="w-full max-w-md bg-white p-4 rounded-xl shadow">
        <div id="reader" className="w-full" />
      </div>

      {/* RESULT */}
      {data && (
        <div className="mt-6 bg-white p-6 rounded-xl shadow w-full max-w-md">

          {/* STATUS */}
          <h2
            className={`text-lg font-bold mb-4 ${
              status === "valid"
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {status === "valid"
              ? "✅ Valid Ticket"
              : "❌ Invalid Ticket"}
          </h2>

          {/* DETAILS */}
          {parsed && (
            <div className="text-gray-700 space-y-1">
              <p><strong>ID:</strong> {parsed.ticketId}</p>
              <p><strong>Event:</strong> {parsed.title}</p>
              <p><strong>Location:</strong> {parsed.location}</p>
              <p><strong>Tickets:</strong> {parsed.tickets}</p>
              <p><strong>Total:</strong> ₹{parsed.total}</p>
            </div>
          )}

        </div>
      )}

    </div>
  );
}