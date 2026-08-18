import { useEffect, useState } from "react";
import { CountdownUnit } from "../../atoms/countdown-unit";
import "./styles.css";

export interface CountdownTimerProps {
  /** Countdown target (Date, ISO string, or epoch ms). */
  target: Date | string | number;
  /** Labels for [days, hours, minutes, seconds]. */
  labels?: [string, string, string, string];
}

const DEFAULT_LABELS: [string, string, string, string] = [
  "Tage",
  "Stunden",
  "Minuten",
  "Sekunden",
];

function getRemaining(targetMs: number) {
  const totalSec = Math.max(0, Math.floor((targetMs - Date.now()) / 1000));
  return {
    days: Math.floor(totalSec / 86400),
    hours: Math.floor((totalSec % 86400) / 3600),
    minutes: Math.floor((totalSec % 3600) / 60),
    seconds: totalSec % 60,
  };
}

const pad2 = (n: number) => String(n).padStart(2, "0");

export function CountdownTimer({
  target,
  labels = DEFAULT_LABELS,
}: CountdownTimerProps) {
  const targetMs = new Date(target).getTime();
  const [remaining, setRemaining] = useState(() => getRemaining(targetMs));

  useEffect(() => {
    const id = setInterval(() => setRemaining(getRemaining(targetMs)), 1000);
    return () => clearInterval(id);
  }, [targetMs]);

  return (
    <div className="countdown-timer" role="timer">
      <CountdownUnit value={remaining.days} label={labels[0]} />
      <CountdownUnit value={pad2(remaining.hours)} label={labels[1]} />
      <CountdownUnit value={pad2(remaining.minutes)} label={labels[2]} />
      <CountdownUnit value={pad2(remaining.seconds)} label={labels[3]} />
    </div>
  );
}

export default CountdownTimer;
