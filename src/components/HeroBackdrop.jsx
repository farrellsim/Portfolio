export default function HeroBackdrop() {
  // Six floating <x/> marks at different positions, sizes, and speeds.
  // Pure decoration — aria-hidden.
  const marks = [
    { top: "8%",  left: "6%",   size: 90,  dur: 38, delay: 0,    rot: -8 },
    { top: "22%", left: "82%",  size: 64,  dur: 46, delay: 4,    rot: 12 },
    { top: "55%", left: "12%",  size: 52,  dur: 52, delay: 8,    rot: 4 },
    { top: "68%", left: "70%",  size: 110, dur: 60, delay: 2,    rot: -14 },
    { top: "38%", left: "48%",  size: 40,  dur: 44, delay: 6,    rot: 22 },
    { top: "88%", left: "30%",  size: 72,  dur: 50, delay: 10,   rot: -4 },
  ];
  return (
    <div className="hero-bg" aria-hidden="true">
      {marks.map((m, i) => (
        <span
          key={i}
          className="hero-bg__mark"
          style={{
            top: m.top,
            left: m.left,
            fontSize: `${m.size}px`,
            animationDuration: `${m.dur}s`,
            animationDelay: `${-m.delay}s`,
            transform: `rotate(${m.rot}deg)`,
          }}
        >
          &lt;x/&gt;
        </span>
      ))}
    </div>
  );
}
