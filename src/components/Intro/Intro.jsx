import { useEffect, useState } from "react";
import "./Intro.css";

export default function Intro() {
  const [phase, setPhase] = useState({
    start: false,
    expanded: false,
    extra: false,
    title: false,
    hide: false,
  });

  useEffect(() => {
    setTimeout(() => setPhase((p) => ({ ...p, start: true })), 50);
    setTimeout(() => setPhase((p) => ({ ...p, expanded: true })), 1200);
    setTimeout(() => setPhase((p) => ({ ...p, extra: true })), 2200);
    setTimeout(() => setPhase((p) => ({ ...p, title: true })), 3000);
    setTimeout(() => setPhase((p) => ({ ...p, hide: true })), 5500);
  }, []);

  return (
    <div className={`intro ${phase.hide ? "intro--hidden" : ""}`}>
      <div className="wind-line"></div>
      <div className="wind-line"></div>
      <div className="wind-line"></div>
      <div className="intro__content">
        <div
          className={
            "intro__word" +
            (phase.start ? " start" : "") +
            (phase.expanded ? " expanded" : "") +
            (phase.extra ? " show-extra" : "") +
            (phase.title ? " show-title" : "")
          }
        >
          <span className="letter base">W</span>
          <span className="letter base">T</span>
          <span className="letter base">W</span>
          <span className="letter base">R</span>

          <span className="letter extra extra1">h</span>
          <span className="letter extra extra2">a</span>
          <span className="letter extra extra3">t</span>
          <span className="letter extra extra4">o</span>
          <span className="letter extra extra5">e</span>
          <span className="letter extra extra6">a</span>
        </div>
        <div className={`intro__subtitle ${phase.title ? "visible" : ""}`}>
          Today?
        </div>
      </div>
    </div>
  );
}
