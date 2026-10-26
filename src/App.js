import React from "react";
import "./App.css";
import chapters from "./data/chapters";
import Chapter from "./components/Chapter";
import businessManagerCover from "./assets/business-manager-showcase.png";

function App() {
  return <main className="portfolio" id="top">
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label="Hisham, back to top">h<span>.</span></a>
      <div className="header-note">PERSONAL LOG / 001</div>
      <a className="header-contact" href="mailto:hmuhammed546@gmail.com">Get in touch <span>↗</span></a>
    </header>

    <section className="hero">
      <div className="hero-topline"><span><i/> INDEPENDENT DEVELOPER IN THE MAKING</span><span>KERALA, INDIA</span></div>
      <div className="hero-layout">
        <div className="hero-main">
          <p className="hero-pretitle">A FEW TURNS THAT BROUGHT ME HERE</p>
          <h1>I started with<br/>a question:<br/><em>how does this<br/>actually work?</em></h1>
          <p className="hero-description">I’m Hisham, a mobile developer from Kerala learning to make games. This is a little of the path between tinkering with Android and building things of my own.</p>
          <a className="scroll-cue" href="#story"><span className="scroll-line"/> SCROLL THROUGH THE STORY <b>↓</b></a>
        </div>
        <div className="hero-art" aria-label="An abstract illustration of curiosity connecting systems, apps and games">
          <div className="hero-art-label label-top">A QUESTION, YEARS AGO</div>
          <div className="hero-sun"/>
          <div className="hero-ring ring-a"/><div className="hero-ring ring-b"/><div className="hero-ring ring-c"/>
          <div className="hero-core" aria-hidden="true"><span>?</span></div>
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
      <div><h2>Not a timeline of titles.<br/><em>Just a few turning points.</em></h2><p>Some things started as late-night experiments; others came from work. They don’t fit into one neat job title, so I’ve put the story here instead.</p></div>
    </section>

    <section className="chapters" aria-label="My journey">
      {chapters.map((chapter, index) => <Chapter key={chapter.kind} chapter={chapter} index={index}/>)}
    </section>

    <section className="work-section" id="work">
      <div className="section-index">CURRENT BUILDS / 02</div>
      <div className="work-heading"><h2>Two things<br/><em>you can try.</em></h2><p>An app template for developers, and small games made while learning Unity.</p></div>
      <div className="work-grid">
        <article className="work-card work-business"><div className="work-card-top"><span>01 / APP TEMPLATE</span><span className="work-symbol">↗</span></div><a className="business-cover-link" href="https://hmuhammed7.gumroad.com/l/snpiki" target="_blank" rel="noreferrer" aria-label="View Business Manager product"><img className="business-cover" src={businessManagerCover} alt="Business Manager app showcase with dashboard, customers and reports screens"/></a><div className="work-card-copy"><div className="work-label">REACT NATIVE · TYPESCRIPT · SQLITE</div><h3>Business Manager</h3><p>A local-first business management template for customers, sales, quotations, invoices, expenses and reports. Built to be customised, with no backend required.</p><div className="work-links"><a href="https://hmuhammed7.gumroad.com/l/snpiki" target="_blank" rel="noreferrer">Explore the product ↗</a><a href="https://github.com/Hisham546/Business-manager" target="_blank" rel="noreferrer">GitHub ↗</a></div></div></article>
        <article className="work-card work-games"><div className="work-card-top"><span>02 / LEARNING IN PUBLIC</span><span className="work-symbol">✳</span></div><div className="work-art-games"><div className="game-tile tile-a">+</div><div className="game-tile tile-b">✦</div><div className="game-tile tile-c">↗</div><div className="game-tile tile-d">●</div><div className="game-word">PLAY<br/><em>TEST</em><br/>REPEAT</div></div><div className="work-card-copy"><div className="work-label">UNITY · C# · SMALL 2D GAMES</div><h3>Learning game development</h3><p>Small experiments, puzzle ideas and arcade projects. I've published a browser-based Brick Breaker and other early work while learning by making.</p><div className="work-links"><a href="https://warpredator.itch.io/" target="_blank" rel="noreferrer">Play my games on itch.io ↗</a></div></div></article>
      </div>
    </section>

    <section className="curiosity-section">
      <div className="curiosity-stamp">STILL<br/>CURIOUS<br/><span>✳</span></div>
      <div><div className="section-index">WHAT I READ ABOUT</div><h2>Beyond the<br/><em>usual stack.</em></h2><p>Linux internals, bootloaders and low-level programming are the topics I tend to read about when I’m away from app work. I’m still learning the fundamentals, but I like seeing how the pieces connect.</p><div className="curiosity-tags"><span>LINUX</span><span>OPERATING SYSTEMS</span><span>BOOTLOADERS</span><span>ASSEMBLY</span></div></div>
    </section>

    <footer className="site-footer" id="contact"><div className="footer-top"><div className="section-index">IF YOU WANT TO SAY HELLO</div><h2>That’s the story<br/><em>so far.</em></h2><p>If you’ve played one of my games, want to talk about an app, or just have something interesting to share, I’d be glad to hear from you.</p><a className="footer-cta" href="mailto:hmuhammed546@gmail.com?subject=Hello%20Hisham">Say hello <span>↗</span></a></div><div className="footer-bottom"><a className="wordmark" href="#top">h<span>.</span></a><span>HISHAM · KERALA</span><div><a href="https://github.com/Hisham546" target="_blank" rel="noreferrer">GITHUB ↗</a><a href="https://www.linkedin.com/in/muhammed-hisham-m-i-56a564225/" target="_blank" rel="noreferrer">LINKEDIN ↗</a><a href="mailto:hmuhammed546@gmail.com">EMAIL ↗</a></div></div></footer>
  </main>;
}

export default App;
