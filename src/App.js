import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import chapters from "./data/chapters";
import Chapter from "./components/Chapter";
import businessManagerCover from "./assets/business-manager-showcase.png";

function CursorPlayfulness() {
  const [cursor, setCursor] = useState(null);
  const [bursts, setBursts] = useState([]);
  const nextId = useRef(0);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reducedMotion.matches) return undefined;

    let frame = null;
    let latestPoint = null;
    const handleMove = (event) => {
      latestPoint = { x: event.clientX, y: event.clientY };
      if (frame === null) {
        frame = window.requestAnimationFrame(() => {
          setCursor(latestPoint);
          frame = null;
        });
      }
    };

    const handleClick = (event) => {
      const id = nextId.current;
      nextId.current += 6;
      const burst = Array.from({ length: 6 }, (_, index) => ({
        id: id + index,
        x: event.clientX,
        y: event.clientY,
        angle: (Math.PI * 2 * index) / 6,
        distance: 28 + (index % 3) * 13,
        emoji: index % 3 === 0 ? "✨" : index % 3 === 1 ? "✳" : "🎮",
      }));
      setBursts((current) => [...current, ...burst]);
      window.setTimeout(() => {
        const ids = new Set(burst.map((item) => item.id));
        setBursts((current) => current.filter((item) => !ids.has(item.id)));
      }, 720);
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("click", handleClick);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, []);

  if (!cursor) return null;
  return <>
    <span className="cursor-spark" aria-hidden="true" style={{ left: cursor.x, top: cursor.y }}>✦</span>
    {bursts.map((burst) => <span
      className="click-spark"
      aria-hidden="true"
      key={burst.id}
      style={{
        left: burst.x,
        top: burst.y,
        "--spark-x": `${Math.cos(burst.angle) * burst.distance}px`,
        "--spark-y": `${Math.sin(burst.angle) * burst.distance}px`,
      }}
    >{burst.emoji}</span>)}
  </>;
}

function BusinessManagerDetails({ onClose }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return <div className="project-overlay" role="presentation" onMouseDown={(event) => {
    if (event.target === event.currentTarget) onClose();
  }}>
    <section className="project-detail" role="dialog" aria-modal="true" aria-labelledby="business-detail-title">
      <div className="project-detail-top">
        <span>PROJECT NOTES / 01</span>
        <button type="button" className="project-close" onClick={onClose} aria-label="Close project details">CLOSE <span>×</span></button>
      </div>
      <div className="project-detail-hero">
        <div className="project-detail-copy">
          <p className="work-label">A PRODUCT I BUILT FROM SCRATCH</p>
          <h2 id="business-detail-title">Business<br/><em>Manager.</em></h2>
          <p>A practical starting point for developers who want to build a business management app of their own, without starting every screen and database table from zero.</p>
          <div className="project-detail-actions">
            <a href="https://hmuhammed7.gumroad.com/l/snpiki" target="_blank" rel="noreferrer">View the product <span>↗</span></a>
            <a href="https://github.com/Hisham546/Business-manager" target="_blank" rel="noreferrer">Source / project repo <span>↗</span></a>
          </div>
        </div>
        <img className="project-detail-cover" src={businessManagerCover} alt="Business Manager interface showcase"/>
      </div>
      <div className="project-detail-grid">
        <article className="project-detail-block">
          <span className="project-detail-number">01 / THE IDEA</span>
          <h3>A useful foundation, not a finished business for everyone.</h3>
          <p>The goal is to give another developer a working base they can adapt to a particular business, brand and workflow. The template is meant to be customised, not treated as a one-size-fits-all SaaS product.</p>
        </article>
        <article className="project-detail-block">
          <span className="project-detail-number">02 / THE APPROACH</span>
          <h3>Local-first by design.</h3>
          <p>Business data is stored on the device with SQLite. There is no hosted backend or mandatory account service to configure before getting started, keeping the project self-contained and easier to adapt.</p>
        </article>
        <article className="project-detail-block">
          <span className="project-detail-number">03 / UNDER THE HOOD</span>
          <h3>Built with the React Native CLI.</h3>
          <p>React Native, TypeScript and SQLite form the core stack, with a native project setup for Android and iOS. The aim is to keep the codebase approachable for developers who want to change the UI, data model and product direction.</p>
        </article>
        <article className="project-detail-block">
          <span className="project-detail-number">04 / WHAT I LEARNED</span>
          <h3>Shipping means more than screens.</h3>
          <p>Building a sellable template pushed me to think about setup documentation, platform builds, data safety, sensible defaults and the experience of a developer opening a project they did not write.</p>
        </article>
      </div>
      <div className="project-detail-bottom">
        <p>Want to see what you can build from it?</p>
        <a href="https://hmuhammed7.gumroad.com/l/snpiki" target="_blank" rel="noreferrer">Explore Business Manager <span>↗</span></a>
      </div>
    </section>
  </div>;
}

function App() {
  const [questionRevealed, setQuestionRevealed] = useState(false);
  const [businessDetailsOpen, setBusinessDetailsOpen] = useState(false);

  return <>
    <CursorPlayfulness />
    {businessDetailsOpen && <BusinessManagerDetails onClose={() => setBusinessDetailsOpen(false)} />}
    <main className="portfolio" id="top">
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label="Hisham, back to top">h<span>.</span></a>
      <div className="header-note">PERSONAL LOG / 001</div>
    </header>

    <section className="hero">
      <div className="hero-topline"><span><i/> INDEPENDENT DEVELOPER IN THE MAKING</span><span>SOMEWHERE ON EARTH</span></div>
      <div className="hero-layout">
        <div className="hero-main">
          <p className="hero-pretitle">A FEW TURNS THAT BROUGHT ME HERE</p>
          <h1>I started with<br/>a question:<br/><em>how does this<br/>actually work?</em></h1>
          <p className="hero-description">I’m Hisham. I build mobile apps, make small games, and still get distracted by questions about how things work. This is how those interests have taken me from tinkering with Android to making things of my own.</p>
          <a className="scroll-cue" href="#story"><span className="scroll-line"/> SCROLL THROUGH THE STORY <b>↓</b></a>
        </div>
        <div className="hero-art" aria-label="An abstract illustration of curiosity connecting systems, apps and games">
          <div className="hero-art-label label-top">A QUESTION, YEARS AGO</div>
          <div className="hero-sun"/>
          <div className="hero-ring ring-a"/><div className="hero-ring ring-b"/><div className="hero-ring ring-c"/>
          <button className={`hero-core${questionRevealed ? " is-revealed" : ""}`} type="button" aria-expanded={questionRevealed} aria-controls="hero-question-note" aria-label={questionRevealed ? "Hide the thought" : "Reveal a thought"} onClick={() => setQuestionRevealed((shown) => !shown)}><span>?</span></button>
          <div className={`hero-question-note${questionRevealed ? " is-visible" : ""}`} id="hero-question-note" aria-live="polite" aria-hidden={!questionRevealed}>One question can lead a long way.</div>
          <div className="orbit-object object-phone"><i/><i/><i/><b/></div>
          <div className="orbit-object object-code"><span>{"{ }"}</span></div>
          <div className="orbit-object object-game"><span>✳</span></div>
          <div className="hero-art-label label-bottom">ANDROID → APPS → GAMES</div>
        </div>
      </div>
      <div className="hero-foot"><span>MADE BETWEEN APPS & GAMES.</span><span>PERSONAL NOTES, NOT A CV.</span><span className="foot-star">✳</span></div>
    </section>

    <section className="story-intro" id="story">
      <div className="section-index">THE SHORT VERSION</div>
      <div><h2>Not a timeline of titles.<br/><em>Just a few turning points.</em></h2><p>Some started as experiments; others came from work. These are a few of the things that changed what I wanted to make next.</p></div>
    </section>

    <section className="chapters" aria-label="My journey">
      {chapters.map((chapter, index) => <Chapter key={chapter.kind} chapter={chapter} index={index}/>)}
    </section>

    <section className="work-section" id="work">
      <div className="section-index">CURRENT BUILDS / 02</div>
      <div className="work-heading"><h2>Two things<br/><em>you can try.</em></h2><p>One is an app template other developers can build on. The other is where I get to experiment with games.</p></div>
      <div className="work-grid">
        <article className="work-card work-business"><div className="work-card-top"><span>01 / APP TEMPLATE</span><span className="work-symbol">↗</span></div><button className="business-cover-link" type="button" onClick={() => setBusinessDetailsOpen(true)} aria-label="Open Business Manager project details"><img className="business-cover" src={businessManagerCover} alt="Business Manager app showcase"/><span className="business-cover-hint">TAKE A CLOSER LOOK <b>↗</b></span></button><div className="work-card-copy"><div className="work-label">REACT NATIVE · TYPESCRIPT · SQLITE</div><h3>Business Manager</h3><p>A local-first business management template for customers, sales, quotations, invoices, expenses and reports. Built to be customised, with no backend required.</p><div className="work-links"><a href="https://hmuhammed7.gumroad.com/l/snpiki" target="_blank" rel="noreferrer">Explore the product ↗</a><a href="https://github.com/Hisham546/Business-manager" target="_blank" rel="noreferrer">GitHub ↗</a></div></div></article>
        <article className="work-card work-games"><div className="work-card-top"><span>02 / LEARNING IN PUBLIC</span><span className="work-symbol">✳</span></div><div className="work-art-games"><div className="game-tile tile-a">+</div><div className="game-tile tile-b">✦</div><div className="game-tile tile-c">↗</div><div className="game-tile tile-d">●</div><div className="game-word">PLAY<br/><em>TEST</em><br/>REPEAT</div></div><div className="work-card-copy"><div className="work-label">UNITY · C# · SMALL 2D GAMES</div><h3>Making games</h3><p>Small experiments, puzzle ideas and arcade projects. I've published a browser-based Brick Breaker and other early work while learning by making.</p><div className="work-links"><a href="https://warpredator.itch.io/" target="_blank" rel="noreferrer">Play my games on itch.io ↗</a></div></div></article>
      </div>
    </section>

    <section className="curiosity-section">
      <div className="curiosity-stamp">ONE DAY<br/>AT A TIME<br/><span>✳</span></div>
      <div><div className="section-index">WHAT I’M WORKING TOWARDS</div><h2>A game of<br/><em>my own.</em></h2><p>The bigger goal is to make a PC game and release it on Steam one day: something I can take from the first rough idea to a finished game people can install, play and make their own memories with. I don’t know what that game will be yet, or everything it will take to get there. For now, I’m building the skills through smaller projects, one piece at a time.</p><div className="curiosity-tags"><span>SMALL GAMES</span><span>UNITY</span><span>THE LONG GAME</span></div></div>
    </section>

    <footer className="site-footer" id="contact"><div className="footer-top"><div className="section-index">IF YOU WANT TO SAY HELLO</div><h2>That’s the story<br/><em>so far.</em></h2><p>If you’ve played one of my games, want to talk about an app, or just have something interesting to share, I’d be glad to hear from you.</p><a className="footer-cta" href="https://mail.google.com/mail/?view=cm&amp;fs=1&amp;to=hmuhammed546%40gmail.com&amp;su=Hello%20Hisham" target="_blank" rel="noreferrer">Say hello <span>↗</span></a></div><div className="footer-bottom"><a className="wordmark" href="#top">h<span>.</span></a><span>HISHAM · PLANET EARTH</span><div><a href="https://github.com/Hisham546" target="_blank" rel="noreferrer">GITHUB ↗</a><a href="https://www.linkedin.com/in/muhammed-hisham-m-i-56a564225/" target="_blank" rel="noreferrer">LINKEDIN ↗</a><a href="https://mail.google.com/mail/?view=cm&amp;fs=1&amp;to=hmuhammed546%40gmail.com&amp;su=Hello%20Hisham" target="_blank" rel="noreferrer">EMAIL ↗</a></div></div></footer>
  </main>
  </>;
}

export default App;
