import React from "react";
import "./App.css";

const chapters = [
  { number: "01", year: "BEFORE THE CODE", title: "I wanted to know what was underneath.", text: "Long before I knew how to program, I was curious about the technology I used every day. Android rooting, bootloader unlocking and custom ROMs pulled me in. I once looked into building a ROM from a phone because I didn't have a PC. I barely knew how to code. I just wanted to understand how it worked.", mark: "ROOT / EXPLORE / REPEAT", kind: "origin" },
  { number: "02", year: "THE FIRST CAREER CHAPTER", title: "Curiosity became a craft.", text: "After college, I studied development more seriously and joined the industry. Across three companies and roughly four years, I worked with Android, Kotlin, Jetpack Compose, Flutter and React Native. Mobile development became my day-to-day craft, with React Native at the centre of most of my work.", mark: "ANDROID · IOS · MOBILE", kind: "career" },
  { number: "03", year: "THE TURNING POINT", title: "I wanted to make something of my own.", text: "After stepping away from corporate work, I started making room for a long-standing interest: game development. I began learning Unity, following tutorials, experimenting and publishing small 2D games. They're early projects, but each one teaches me something I couldn't learn by only watching.", mark: "LEARN BY MAKING", kind: "games" },
  { number: "04", year: "A SIDE QUEST THAT GREW", title: "I didn't leave app development behind.", text: "While learning game development, I used the experience I'd built over the years to create Business Manager: a functional, local-first React Native app template for everyday small-business workflows. It brought together a lot of lessons from real app development, and gave me a product of my own to shape.", mark: "BUSINESS MANAGER / LOCAL-FIRST", kind: "product" },
  { number: "05", year: "STILL IN PROGRESS", title: "The deeper I go, the more I want to know.", text: "My curiosity keeps wandering beyond the app layer: into Linux, operating systems, bootloaders and low-level programming. I'm still a beginner in some of those areas, and that's part of the appeal. The long-term dream is to make a game for a team of my own. I'm not there yet. For now, I'm learning, building, and taking the next step.", mark: "NO FINAL LEVEL YET", kind: "future" },
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
          <p className="hero-pretitle">A STORY STILL BEING WRITTEN</p>
          <h1>First, I wanted<br/>to know <em>how.</em><br/>Now, I want to<br/><span>make things.</span></h1>
          <p className="hero-description">I'm Hisham. A mobile developer, an aspiring indie game maker, and a curious person who keeps following questions down rabbit holes.</p>
          <a className="scroll-cue" href="#story"><span className="scroll-line"/> SCROLL THROUGH THE STORY <b>↓</b></a>
        </div>
        <div className="hero-art" aria-label="An abstract illustration of curiosity connecting systems, apps and games">
          <div className="hero-art-label label-top">CURIOSITY / 1999—∞</div>
          <div className="hero-sun"/>
          <div className="hero-ring ring-a"/><div className="hero-ring ring-b"/><div className="hero-ring ring-c"/>
          <div className="hero-core"><span>?</span></div>
          <div className="orbit-object object-phone"><i/><i/><i/><b/></div>
          <div className="orbit-object object-code"><span>{"{ }"}</span></div>
          <div className="orbit-object object-game"><span>✳</span></div>
          <div className="hero-art-label label-bottom">OBSERVE → EXPLORE → BUILD</div>
        </div>
      </div>
      <div className="hero-foot"><span>NOT A STRAIGHT LINE.</span><span>JUST THE WAY HERE.</span><span className="foot-star">✳</span></div>
    </section>

    <section className="story-intro" id="story">
      <div className="section-index">FIELD NOTES / 01—05</div>
      <div><h2>This isn't a list of skills.<br/><em>It's how I got here.</em></h2><p>From tinkering with Android without a computer, to building mobile apps professionally, to making my own apps and games. The tools changed. The urge to understand things never really did.</p></div>
    </section>

    <section className="chapters" aria-label="My journey">
      {chapters.map((chapter, index) => <Chapter key={chapter.kind} chapter={chapter} index={index}/>)}
    </section>

    <section className="work-section" id="work">
      <div className="section-index">CURRENT BUILDS / 02</div>
      <div className="work-heading"><h2>Things I've made<br/><em>along the way.</em></h2><p>Not a finished catalogue. Just a few real things that mark where I've been spending my time.</p></div>
      <div className="work-grid">
        <article className="work-card work-business"><div className="work-card-top"><span>01 / APP PRODUCT</span><span className="work-symbol">↗</span></div><div className="work-art-business"><div className="tiny-dashboard"><div><b>BM.</b><span>BUSINESS OVERVIEW</span></div><strong>Everything in<br/>one place.</strong><section><i/><i/><i/></section><footer><b/><b/><b/><b/><b/></footer></div></div><div className="work-card-copy"><div className="work-label">REACT NATIVE · TYPESCRIPT · SQLITE</div><h3>Business Manager</h3><p>A local-first business management template for customers, sales, quotations, invoices, expenses and reports. Built to be customised, with no backend required.</p><div className="work-links"><a href="https://hmuhammed7.gumroad.com/l/snpiki" target="_blank" rel="noreferrer">Explore the product ↗</a><a href="https://github.com/Hisham546/Business-manager" target="_blank" rel="noreferrer">GitHub ↗</a></div></div></article>
        <article className="work-card work-games"><div className="work-card-top"><span>02 / LEARNING IN PUBLIC</span><span className="work-symbol">✳</span></div><div className="work-art-games"><div className="game-tile tile-a">+</div><div className="game-tile tile-b">✦</div><div className="game-tile tile-c">↗</div><div className="game-tile tile-d">●</div><div className="game-word">PLAY<br/><em>TEST</em><br/>REPEAT</div></div><div className="work-card-copy"><div className="work-label">UNITY · C# · SMALL 2D GAMES</div><h3>Learning game development</h3><p>Small experiments, puzzle ideas and arcade projects. I've published a browser-based Brick Breaker and other early work while learning by making.</p><div className="work-links"><a href="https://github.com/Hisham546" target="_blank" rel="noreferrer">Browse my GitHub ↗</a></div></div></article>
      </div>
    </section>

    <section className="curiosity-section">
      <div className="curiosity-stamp">STILL<br/>CURIOUS<br/><span>✳</span></div>
      <div><div className="section-index">OPEN TABS / ALWAYS</div><h2>There's always<br/>something <em>underneath.</em></h2><p>Right now, that means game development. It also means reading about Linux, operating systems, bootloaders and low-level programming, even when I'm still figuring out the basics. I like knowing what's happening beneath the surface.</p><div className="curiosity-tags"><span>LINUX & OS</span><span>BOOTLOADERS</span><span>GAME DESIGN</span><span>LOW-LEVEL SYSTEMS</span></div></div>
    </section>

    <footer className="site-footer" id="contact"><div className="footer-top"><div className="section-index">END OF LOG / FOR NOW</div><h2>Still figuring it out.<br/><em>Still making things.</em></h2><p>The long-term dream is to build a game with a team of my own. There's a long road between here and there, and I'm happy to keep learning my way along it.</p><a className="footer-cta" href="mailto:hmuhammed546@gmail.com">Have something in mind? Say hello <span>↗</span></a></div><div className="footer-bottom"><a className="wordmark" href="#top">h<span>.</span></a><span>MADE WITH CURIOSITY IN KERALA.</span><div><a href="https://github.com/Hisham546" target="_blank" rel="noreferrer">GITHUB ↗</a><a href="https://www.linkedin.com/in/muhammed-hisham-m-i-56a564225/" target="_blank" rel="noreferrer">LINKEDIN ↗</a><a href="mailto:hmuhammed546@gmail.com">EMAIL ↗</a></div></div></footer>
  </main>;
}

export default App;
