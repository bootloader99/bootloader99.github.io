import React, { useEffect, useRef } from "react";

function ChapterSketch({ kind }) {
  const sketchRef = useRef(null);

  useEffect(() => {
    const sketch = sketchRef.current;
    if (!sketch) return undefined;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      sketch.classList.add("is-visible");
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        sketch.classList.add("is-visible");
        observer.unobserve(sketch);
      }
    }, { threshold: 0.15 });

    observer.observe(sketch);
    return () => observer.disconnect();
  }, []);
  if (kind === "origin") return <div ref={sketchRef} className="sketch sketch-origin" aria-hidden="true"><div className="phone"><span>ANDROID</span><b>↻</b><i>recovery mode</i></div><div className="sketch-note note-one">bootloader unlocked</div><div className="sketch-note note-two">curiosity: ON</div><div className="orbit orbit-one" /><div className="orbit orbit-two" /></div>;
  if (kind === "career") return <div ref={sketchRef} className="sketch sketch-career" aria-hidden="true"><div className="code-window"><div className="code-top"><i/><i/><i/><span>mobile-app.tsx</span></div><div className="code-lines"><b/><b/><b/><b/><b/><b/><b/></div><div className="code-side">{"{ }"}</div></div><span className="sketch-note note-one">4 YEARS</span><span className="sketch-note note-two">ship · learn · repeat</span></div>;
  if (kind === "games") return <div ref={sketchRef} className="sketch sketch-games" aria-hidden="true"><div className="game-grid"><span>✦</span><b>+</b><i>●</i><em>▲</em><strong>↗</strong><span>✧</span></div><div className="game-floor"/><span className="sketch-note note-one">UNITY / 2D</span><span className="sketch-note note-two">first builds</span></div>;
  if (kind === "product") return <div ref={sketchRef} className="sketch sketch-product" aria-hidden="true"><div className="product-card"><div className="product-card-top"><b>BM.</b><span>OVERVIEW</span></div><strong>Your work,<br/>in one place.</strong><div className="product-metrics"><i/><i/><i/></div><div className="product-bars"><b/><b/><b/><b/><b/></div></div><span className="sketch-note note-one">BUILT FROM EXPERIENCE</span><span className="sketch-note note-two">offline by design</span></div>;
  return <div ref={sketchRef} className="sketch sketch-future" aria-hidden="true"><div className="night-moon"/><div className="future-hill hill-one"/><div className="future-hill hill-two"/><div className="future-star star-one">✳</div><div className="future-star star-two">✦</div><span className="sketch-note note-one">NEXT: UNKNOWN</span><span className="sketch-note note-two">THAT'S THE POINT</span></div>;
}

export default ChapterSketch;
