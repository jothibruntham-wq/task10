import React, { useState } from "react";
import confetti from "canvas-confetti";
import "../assets/style/style.css";

const Home = () => {
  // status: "idle" | "driving" | "delivered"
  const [status, setStatus] = useState("idle");

  const handleOrder = () => {
    if (status !== "idle") return;

    setStatus("driving");

    // After the truck drives across the road (~1.7s), complete the order
    setTimeout(() => {
      setStatus("delivered");
      triggerConfetti();
    }, 1700);

    // Reset back to idle after 4.2 seconds
    setTimeout(() => {
      setStatus("idle");
    }, 4200);
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 85,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#ff4757", "#2ed573", "#1e90ff", "#ffa502", "#a55eea", "#ffffff"],
    });

    setTimeout(() => {
      confetti({
        particleCount: 35,
        angle: 60,
        spread: 55,
        origin: { x: 0.2, y: 0.65 },
      });
      confetti({
        particleCount: 35,
        angle: 120,
        spread: 55,
        origin: { x: 0.8, y: 0.65 },
      });
    }, 180);
  };

  return (
    <div className="home">
      <button
        className={`order-pull-button ${status}`}
        type="button"
        onClick={handleOrder}
        disabled={status !== "idle"}
        aria-label="Order button"
      >
        {/* Background pill */}
        <div className="button-background" />

        {/* Attached Road with lane markings */}
        <div className="road-track">
          <div className="road-surface" />
          <div className="road-markings" />
        </div>

        {/* Truck (Facing Straight Forward / Right) */}
        <div className={`truck-wrapper ${status === "driving" ? "driving-truck" : ""}`}>
          <svg
            className="truck-svg"
            viewBox="0 0 64 36"
            width="52"
            height="30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Headlight beam shining forward onto the road */}
            <polygon
              points="54,21 66,16 66,26 54,23"
              fill="url(#lightBeam)"
              className="headlight-beam"
            />
            <defs>
              <linearGradient id="lightBeam" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#fef08a" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#fef08a" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Cargo Box */}
            <rect x="2" y="6" width="34" height="20" rx="3" fill="#ffffff" />
            <rect x="2" y="14" width="34" height="4" fill="#3b82f6" />
            <rect x="14" y="8" width="8" height="4" rx="1" fill="#cbd5e1" />

            {/* Front Cab (Facing Straight / Right) */}
            <path d="M36 10 H48 L55 17 V26 H36 V10 Z" fill="#2563eb" />
            {/* Cab Window */}
            <path d="M39 12 H47 L52 17 H39 V12 Z" fill="#93c5fd" />
            {/* Headlight */}
            <rect x="53" y="21" width="3" height="3" rx="1" fill="#fbbf24" />
            {/* Front Bumper */}
            <rect x="54" y="24" width="2" height="2" rx="0.5" fill="#475569" />

            {/* Chassis */}
            <rect x="3" y="25" width="53" height="2" fill="#1e293b" />

            {/* Back Wheel with rotating spokes */}
            <g className="wheel wheel-back">
              <circle cx="13" cy="27" r="5" fill="#0f172a" />
              <circle cx="13" cy="27" r="2.5" fill="#94a3b8" />
              <line x1="13" y1="24.5" x2="13" y2="29.5" stroke="#475569" strokeWidth="1" />
              <line x1="10.5" y1="27" x2="15.5" y2="27" stroke="#475569" strokeWidth="1" />
            </g>

            {/* Front Wheel with rotating spokes */}
            <g className="wheel wheel-front">
              <circle cx="45" cy="27" r="5" fill="#0f172a" />
              <circle cx="45" cy="27" r="2.5" fill="#94a3b8" />
              <line x1="45" y1="24.5" x2="45" y2="29.5" stroke="#475569" strokeWidth="1" />
              <line x1="42.5" y1="27" x2="47.5" y2="27" stroke="#475569" strokeWidth="1" />
            </g>
          </svg>
        </div>

        {/* Button Content */}
        <div className="button-content">
          {status === "idle" && (
            <span className="order-text">Order Now</span>
          )}

          {status === "driving" && (
            <span className="dispatching-text">Dispatching...</span>
          )}

          {status === "delivered" && (
            <span className="delivered-content">
              <svg className="check-svg" viewBox="0 0 24 24" width="20" height="20" fill="none">
                <path
                  d="M5 13L9.5 17.5L19 7"
                  stroke="#ffffff"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Order Placed</span>
            </span>
          )}
        </div>
      </button>
    </div>
  );
};

export default Home;