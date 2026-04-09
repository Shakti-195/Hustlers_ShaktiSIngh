import { useEffect, useRef } from "react";

export default function CrowdParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    let particles = [];
    
    // Screenshot mein dots center mein dense hain, wahi logic yahan hai
    function initParticles() {
      particles = [];
      const density = 2500; // Total dots
      const centerY = canvas.height / 2;

      for (let i = 0; i < density; i++) {
        // Horizontal poore screen par
        const x = Math.random() * canvas.width;
        
        // Vertical position center ke paas (Normal Distribution)
        // Isse "Crowd Cloud" jaisa look aayega
        const y = centerY + (Math.random() - 0.5) * (Math.random() - 0.5) * (canvas.height * 0.8);
        
        particles.push({
          x: x,
          y: y,
          baseY: y,
          size: Math.random() * 1.5 + 0.5,
          speed: Math.random() * 0.5 + 0.2,
          offset: Math.random() * Math.PI * 2,
          frequency: 0.002 + Math.random() * 0.003
        });
      }
    }

    window.addEventListener("resize", setCanvasSize);
    setCanvasSize();

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const time = Date.now() * 0.001;

      particles.forEach((p) => {
        // Horizontal Drift (piche se aage jaana)
        p.x += p.speed;
        if (p.x > canvas.width) p.x = 0;

        // Wave Animation (screenshot jaisa flow)
        const wave = Math.sin(time + p.offset) * 8;

        ctx.beginPath();
        ctx.arc(p.x, p.baseY + wave, p.size, 0, Math.PI * 2);
        
        // White glowy dots
        ctx.fillStyle = "rgba(255, 255, 255, 0.65)";
        ctx.fill();
      });

      requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-70"
    />
  );
}