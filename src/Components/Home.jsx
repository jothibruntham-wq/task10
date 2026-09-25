import React, { useState } from "react";
import confetti from "canvas-confetti";
import "../assets/style/style.css";

const Home = () => {
  const [isOrdering, setIsOrdering] = useState(false);

  const handleOrder = () => {
    if (isOrdering) return;

    setIsOrdering(true);

    // Create confetti
    createConfetti();

    setTimeout(() => {
      setIsOrdering(false);
    }, 4000);
  };

  const createConfetti = () => {
    const canvas = document.createElement("canvas");
    canvas.className = "confetti-canvas";
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pieces = [];

    for (let i = 0; i < 100; i++) {
      pieces.push({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        size: Math.random() * 8 + 4,
        color: [
          "#ff4757",
          "#2ed573",
          "#1e90ff",
          "#ffa502",
          "#a55eea",
          "#ffffff",
        ][Math.floor(Math.random() * 6)],
        speedX: (Math.random() - 0.5) * 14,
        speedY: Math.random() * -12 - 4,
        gravity: 0.35,
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 10 - 5,
        life: 100,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      pieces.forEach((piece) => {
        piece.x += piece.speedX;
        piece.y += piece.speedY;
        piece.speedY += piece.gravity;
        piece.rotation += piece.rotationSpeed;
        piece.life -= 1;

        ctx.save();

        ctx.translate(piece.x, piece.y);
        ctx.rotate((piece.rotation * Math.PI) / 180);

        ctx.globalAlpha = Math.max(piece.life / 100, 0);

        ctx.fillStyle = piece.color;
        ctx.fillRect(
          -piece.size / 2,
          -piece.size / 2,
          piece.size,
          piece.size * 0.6
        );

        ctx.restore();
      });

      if (pieces.some((piece) => piece.life > 0)) {
        requestAnimationFrame(animate);
      } else {
        canvas.remove();
      }
    };

    animate();
  };

  return (
    <div className="home">
      <button
        className={`order-pull-button ${isOrdering ? "animate" : ""}`}
        type="button"
        onClick={handleOrder}
        disabled={isOrdering}
      >
        <span className="button-content">
          {!isOrdering && (
            <>
              <span className="truck">🚚</span>
              <span>Order Now</span>
            </>
          )}

          {isOrdering && (
            <>
              <span className="truck moving-truck">🚚</span>
              <span>Order Placed</span>
            </>
          )}
        </span>
      </button>
    </div>
  );
};

export default Home;