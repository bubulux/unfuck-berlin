import { useEffect, useState } from "react";

const TARGET = new Date("2026-09-20T00:00:00");

function getTimeLeft() {
  const total = Math.max(0, Math.floor((TARGET - Date.now()) / 1000));
  return {
    tage: Math.floor(total / 86400),
    std: Math.floor((total % 86400) / 3600),
    min: Math.floor((total % 3600) / 60),
    sek: total % 60,
  };
}

const pad = (n) => String(n).padStart(2, "0");

export default function Countdown() {
  const [t, setT] = useState(getTimeLeft);

  useEffect(() => {
    const id = setInterval(() => setT(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const boxes = [
    { value: String(t.tage), label: "Tage" },
    { value: pad(t.std), label: "STD" },
    { value: pad(t.min), label: "MIN" },
    { value: pad(t.sek), label: "SEK" },
  ];

  return (
    <div className="flex justify-center gap-3 md:gap-5 mb-8">
      {boxes.map((b) => (
        <div
          key={b.label}
          className="w-[72px] md:w-24 py-2.5 md:py-4 border-2 border-volt-lime rounded-lg text-center text-volt-lime"
        >
          <div className="text-3xl md:text-4xl font-bold leading-none tabular-nums">{b.value}</div>
          <div className="text-xs md:text-sm font-bold mt-1">{b.label}</div>
        </div>
      ))}
    </div>
  );
}
