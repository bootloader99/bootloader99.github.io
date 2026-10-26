import React from "react";
import "./App.css";

const chapters = [
  { number: "01", year: "THE BEGINNING", title: "A phone, a bootloader, and a question.", text: "I got interested in Android rooting and custom ROMs before I had a computer or much coding knowledge. I even looked into renting a cheap cloud server so I could try building a ROM from my phone. I didn’t get far then, but the question stayed with me: what happens underneath the screen?", mark: "ANDROID / ROOT / CUSTOM ROMS", kind: "origin" },
  { number: "02", year: "WORK", title: "Mobile apps became the day job.", text: "After college, I moved into software development and worked across three companies over about four years. The work included Android, Kotlin, Jetpack Compose, Flutter and React Native, with React Native becoming the main part of my recent work on Android and iOS.", mark: "MOBILE DEVELOPMENT / 4 YEARS", kind: "career" },
  { number: "03", year: "A CHANGE OF PACE", title: "So I started making small games.", text: "When I stepped away from corporate work, I finally gave Unity a proper try. I followed tutorials, built small 2D projects and put some of them online. They’re modest experiments, but publishing them made game development feel less like a distant idea and more like something I could practise.", mark: "UNITY / SMALL 2D PROJECTS", kind: "games" },
  { number: "04", year: "AN APP OF MY OWN", title: "One more app, but this time mine.", text: "Alongside the games, I built Business Manager, a local-first React Native template for customers, sales, quotations, invoices, expenses and reports. It runs without a backend and is designed for other developers to customise. I wanted to turn years of app work into a product I could release independently.", mark: "REACT NATIVE / SQLITE / OFFLINE-FIRST", kind: "product" },
  { number: "05", year: "OUTSIDE THE APP LAYER", title: "I still read about what makes it all run.", text: "My reading often wanders into Linux, operating systems, bootloaders and low-level programming. I’m very much a beginner there, but I enjoy learning how the layers fit together. Much further down the road, I’d love to make a game with a team of my own.", mark: "LINUX / OS / LOW-LEVEL CODE", kind: "future" },
];

function ChapterSketch({ kind }) {
  if (kind === "origin") return <div className="sketch sketch-origin" aria-hidden="true"><div className="phone"><span>ANDROID</span><b>↻</b><i>recovery mode</i></div><div className="sketch-note note-one">bootloader unlocked</div><div className="sketch-note note-two">curiosity: ON</div><div className="orbit orbit-one" /><div className="orbit orbit-two" /></div>;
  if (kind === "career") return <div className="sketch sketch-career" aria-hidden="true"><div className="code-window"><div className="code-top"><i/><i/><i/><span>mobile-app.tsx</span></div><div className="code-lines"><b/><b/><b/><b/><b/><b/><b/></div><div className="code-side">{"{ }"}</div></div><span className="sketch-note note-one">4 YEARS</span><span className="sketch-note note-two">ship · learn · repeat</span></div>;
  if (kind === "games") return <div className="sketch sketch-games" aria-hidden="true"><div className="game-grid"><span>✦</span><b>+</b><i>●</i><em>▲</em><strong>↗</strong><span>✧</span></div><div className="game-floor"/><span className="sketch-note note-one">UNITY / 2D</span><span className="sketch-note note-two">first builds</span></div>;
  if (kind === "product") return <div className="sketch sketch-product" aria-hidden="true"><div className="product-card"><div className="product-card-top"><b>BM.</b><span>OVERVIEW</span></div><strong>Your work,<br/>in one place.</strong><div className="product-metrics"><i/><i/><i/></div><div className="product-bars"><b/><b/><b/><b/><b/></div></div><span className="sketch-note note-one">BUILT FROM EXPERIENCE</span><span className="sketch-note note-two">offline by design</span></div>;
  return <div className="sketch sketch-future" aria-hidden="true"><div className="night-moon"/><div className="future-hill hill-one"/><div className="future-hill hill-two"/><div className="future-star star-one">✳</div><div className="future-star star-two">✦</div><span className="sketch-note note-one">NEXT: UNKNOWN</span><span className="sketch-note note-two">THAT'S THE POINT</span></div>;
}

function Chapter({ chapter, index }) {
  return <article className={`chapter chapter-${chapter.kind} ${index % 2 ? "chapter-reverse" : ""}`} id={chapter.kind}>
    <div className="chapter-copy">
      <div className="chapter-meta"><span className="chapter-number">{chapter.number}</span><span>{chapter.year}</span></div>
      <h3>{chapter.title}</h3>
      <p>{chapter.text}</p>
      <div className="chapter-mark"><span/> {chapter.mark}</div>
    </div>
    <ChapterSketch kind={chapter.kind}/>
  </article>;
}

function App() {
  return <main className="portfolio" id="top">
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label="Hisham, back to top">h<span>.</span></a>
      <div className="header-note">PERSONAL LOG / 001</div>
      <a className="header-contact" href="mailto:hmuhammed546@gmail.com">Get in touch <span>↗</span></a>
    </header>

    <section className="hero">
      <div className="hero-topline"><span><i/> INDEPENDENT DEVELOPER IN THE MAKING</span><span>ERNAKULAM, KERALA · INDIA</span></div>
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
          <div className="hero-core"><span>?</span></div>
          <div className="orbit-object object-phone"><i/><i/><i/><b/></div>
          <div className="orbit-object object-code"><span>{"{ }"}</span></div>
          <div className="orbit-object object-game"><span>✳</span></div>
          <div className="hero-art-label label-bottom">ANDROID → APPS → GAMES</div>
        </div>
      </div>
      <div className="hero-foot"><span>ERNAKULAM, KERALA.</span><span>PERSONAL NOTES, NOT A CV.</span><span className="foot-star">✳</span></div>
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
        <article className="work-card work-business"><div className="work-card-top"><span>01 / APP TEMPLATE</span><span className="work-symbol">↗</span></div><a className="business-cover-link" href="https://hmuhammed7.gumroad.com/l/snpiki" target="_blank" rel="noreferrer" aria-label="View Business Manager product"><img className="business-cover" src="/business-manager-cover.png" alt="Business Manager app showcase with dashboard, customers and reports screens"/></a><div className="work-card-copy"><div className="work-label">REACT NATIVE · TYPESCRIPT · SQLITE</div><h3>Business Manager</h3><p>A local-first business management template for customers, sales, quotations, invoices, expenses and reports. Built to be customised, with no backend required.</p><div className="work-links"><a href="https://hmuhammed7.gumroad.com/l/snpiki" target="_blank" rel="noreferrer">Explore the product ↗</a><a href="https://github.com/Hisham546/Business-manager" target="_blank" rel="noreferrer">GitHub ↗</a></div></div></article>
        <article className="work-card work-games"><div className="work-card-top"><span>02 / LEARNING IN PUBLIC</span><span className="work-symbol">✳</span></div><div className="work-art-games"><div className="game-tile tile-a">+</div><div className="game-tile tile-b">✦</div><div className="game-tile tile-c">↗</div><div className="game-tile tile-d">●</div><div className="game-word">PLAY<br/><em>TEST</em><br/>REPEAT</div></div><div className="work-card-copy"><div className="work-label">UNITY · C# · SMALL 2D GAMES</div><h3>Learning game development</h3><p>Small experiments, puzzle ideas and arcade projects. I've published a browser-based Brick Breaker and other early work while learning by making.</p><div className="work-links"><a href="https://warpredator.itch.io/" target="_blank" rel="noreferrer">Play my games on itch.io ↗</a></div></div></article>
      </div>
    </section>

    <section className="curiosity-section">
      <div className="curiosity-stamp">STILL<br/>CURIOUS<br/><span>✳</span></div>
      <div><div className="section-index">WHAT I READ ABOUT</div><h2>Beyond the<br/><em>usual stack.</em></h2><p>Linux internals, bootloaders and low-level programming are the topics I tend to read about when I’m away from app work. I’m still learning the fundamentals, but I like seeing how the pieces connect.</p><div className="curiosity-tags"><span>LINUX</span><span>OPERATING SYSTEMS</span><span>BOOTLOADERS</span><span>ASSEMBLY</span></div></div>
    </section>

    <footer className="site-footer" id="contact"><div className="footer-top"><div className="section-index">IF YOU WANT TO SAY HELLO</div><h2>That’s the story<br/><em>so far.</em></h2><p>One day, I’d like to make a game with a small team of my own. For now, I’m building the skills and finishing small projects one at a time.</p><a className="footer-cta" href="mailto:hmuhammed546@gmail.com">Have something in mind? Say hello <span>↗</span></a></div><div className="footer-bottom"><a className="wordmark" href="#top">h<span>.</span></a><span>HISHAM · KERALA, INDIA</span><div><a href="https://github.com/Hisham546" target="_blank" rel="noreferrer">GITHUB ↗</a><a href="https://www.linkedin.com/in/muhammed-hisham-m-i-56a564225/" target="_blank" rel="noreferrer">LINKEDIN ↗</a><a href="mailto:hmuhammed546@gmail.com">EMAIL ↗</a></div></div></footer>
  </main>;
}

export default App;
