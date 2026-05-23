import { useEffect, useRef } from 'react';

const MeshBackground = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const animFrameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width, height;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMouseMove);

    // Grid of points that form the mesh
    const COLS = 24;
    const ROWS = 14;
    let points = [];

    const buildGrid = () => {
      points = [];
      for (let r = 0; r <= ROWS; r++) {
        for (let c = 0; c <= COLS; c++) {
          points.push({
            baseX: (c / COLS) * width,
            baseY: (r / ROWS) * height,
            x: 0,
            y: 0,
            vx: 0,
            vy: 0,
          });
        }
      }
    };

    buildGrid();
    window.addEventListener('resize', buildGrid);

    const SPRING = 0.04;
    const DAMPING = 0.85;
    const MOUSE_RADIUS = 220;
    const MOUSE_STRENGTH = 18;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Update point positions
      for (const p of points) {
        const dx = p.baseX - mx;
        const dy = p.baseY - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let fx = 0, fy = 0;
        if (dist < MOUSE_RADIUS) {
          const force = (1 - dist / MOUSE_RADIUS) * MOUSE_STRENGTH;
          fx = (dx / dist) * force;
          fy = (dy / dist) * force;
        }

        const tx = p.baseX + fx;
        const ty = p.baseY + fy;

        p.vx += (tx - p.x) * SPRING;
        p.vy += (ty - p.y) * SPRING;
        p.vx *= DAMPING;
        p.vy *= DAMPING;
        p.x += p.vx;
        p.y += p.vy;
      }

      const idx = (r, c) => r * (COLS + 1) + c;

      // Draw mesh lines
      ctx.lineWidth = 0.5;

      for (let r = 0; r <= ROWS; r++) {
        for (let c = 0; c <= COLS; c++) {
          const p = points[idx(r, c)];
          const dx = p.x - mx;
          const dy = p.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const glow = Math.max(0, 1 - dist / MOUSE_RADIUS);

          // Horizontal lines
          if (c < COLS) {
            const p2 = points[idx(r, c + 1)];
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${130 + glow * 80}, ${50 + glow * 30}, ${255}, ${0.06 + glow * 0.25})`;
            ctx.stroke();
          }

          // Vertical lines
          if (r < ROWS) {
            const p2 = points[idx(r + 1, c)];
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${130 + glow * 80}, ${50 + glow * 30}, ${255}, ${0.06 + glow * 0.25})`;
            ctx.stroke();
          }

          // Glowing dots near cursor
          if (glow > 0.4) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, 1.5 * glow, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(180, 100, 255, ${glow * 0.8})`;
            ctx.fill();
          }
        }
      }

      // Cursor glow radial gradient
      const grad = ctx.createRadialGradient(mx, my, 0, mx, my, 300);
      grad.addColorStop(0, 'rgba(130, 50, 255, 0.08)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      animFrameRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('resize', buildGrid);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
};

export default MeshBackground;
