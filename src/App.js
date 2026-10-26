import React, { useState } from "react";
import "./App.css";

const stops = [
  { id: "workshop", number: "01", emoji: "🛠️", title: "The Workshop", subtitle: "Apps & products", color: "mint" },
  { id: "arcade", number: "02", emoji: "🕹️", title: "The Arcade", subtitle: "Indie games", color: "amber" },
  { id: "campfire", number: "03", emoji: "🔥", title: "The Campfire", subtitle: "About & contact", color: "rose" },
];

function PixelTree({ className = "" }) {
  return <div className={`pixel-tree ${className}`} aria-hidden="true"><i /><b /><span /></div>;
}

function WorldMap({ active, onSelect }) {
  return (
    <section className="world-frame" aria-label="Interactive portfolio map">
      <div className="world-toolbar">
        <span className="world-dot" /><span className="world-dot" /><span className="world-dot" />
        <span className="world-caption">HISHAM'S LITTLE CORNER OF THE INTERNET</span>
        <span className="map-coordinates">35° 41' N · 139° 41' E</span>
      </div>
      <div className="world-map">
        <div className="sun" aria-hidden="true" />
        <div className="cloud cloud-one" aria-hidden="true" /><div className="cloud cloud-two" aria-hidden="true" />
        <div className="mountain mountain-back" aria-hidden="true" /><div className="mountain mountain-front" aria-hidden="true" />
        <div className="lake" aria-hidden="true" />
        <div className="path path-one" aria-hidden="true" /><div className="path path-two" aria-hidden="true" />
        <PixelTree className="tree-a" /><PixelTree className="tree-b" /><PixelTree className="tree-c" /><PixelTree className="tree-d" />
        <div className="map-label label-hill">THE BUILDING HILLS</div>
        <button className={`map-stop stop-workshop ${active === "workshop" ? "selected" : ""}`} onClick={() => onSelect("workshop")} aria-pressed={active === "workshop"}>
          <span className="stop-art workshop-art"><span>▦</span><i /></span><span className="stop-name">WORKSHOP</span><span className="stop-hint">apps & products</span>
        </button>
        <button className={`map-stop stop-arcade ${active === "arcade" ? "selected" : ""}`} onClick={() => onSelect("arcade")} aria-pressed={active === "arcade"}>
          <span className="stop-art arcade-art"><span>✦</span><i /></span><span className="stop-name">PIXEL ARCADE</span><span className="stop-hint">tiny games, big ideas</span>
        </button>
        <button className={`map-stop stop-campfire ${active === "campfire" ? "selected" : ""}`} onClick={() => onSelect("campfire")} aria-pressed={active === "campfire"}>
          <span className="stop-art campfire-art"><span>⌁</span><i /></span><span className="stop-name">CAMPFIRE</span><span className="stop-hint">the human behind it</span>
        </button>
        <div className="map-sign">YOU ARE HERE <span>↙</span></div>
        <div className="map-bottom-note"><span className="pixel-heart">♥</span> BUILT WITH CURIOSITY, NOT A GAME ENGINE</div>
      </div>
    </section>
  );
}

function App() {
  const [active, setActive] = useState("workshop");
  const selected = stops.find((stop) => stop.id === active) || stops[0];

  return (
    <main className="site-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Hisham home"><span className="brand-mark">H<span>.</span></span><span>hisham<span className="brand-muted">dev</span></span></a>
        <nav className="topnav" aria-label="Main navigation">
          <a href="#world">Explore</a><a href="#featured">Featured work</a><a href="#about">About</a>
        </nav>
        <a className="top-contact" href="mailto:hmuhammed546@gmail.com">Say hello <span>↗</span></a>
      </header>

      <section className="intro" id="top">
        <div className="eyebrow"><span className="status-pip" /> INDEPENDENT DEVELOPER · KERALA, INDIA</div>
        <h1>I make useful things.<br /><span>And sometimes, little worlds.</span></h1>
        <p className="intro-copy">I'm Hisham, a mobile app developer who builds with React Native and makes small games with Unity. This is my corner of the internet. Have a look around.</p>
        <div className="intro-actions"><a className="button button-dark" href="#world">Explore my world <span>↓</span></a><a className="text-link" href="https://github.com/Hisham546" target="_blank" rel="noreferrer">GitHub profile <span>↗</span></a></div>
      </section>

      <section className="world-section" id="world">
        <div className="section-heading"><div><span className="kicker">A SMALL WORLD, MANY CURIOSITIES</span><h2>Pick a place to start.</h2></div><p>Tap a location on the map<br className="desktop-break" /> or use the cards below.</p></div>
        <WorldMap active={active} onSelect={setActive} />
        <div className="location-cards" aria-label="Explore portfolio sections">
          {stops.map((stop) => <button key={stop.id} className={`location-card ${stop.color} ${active === stop.id ? "active" : ""}`} onClick={() => setActive(stop.id)} aria-pressed={active === stop.id}>
            <span className="card-number">{stop.number}</span><span className="card-emoji">{stop.emoji}</span><span className="card-copy"><strong>{stop.title}</strong><small>{stop.subtitle}</small></span><span className="card-arrow">↗</span>
          </button>)}
        </div>
      </section>

      <section className={`feature-panel feature-${active}`} id="featured" aria-live="polite">
        <div className="feature-copy">
          <span className="kicker">CURRENTLY EXPLORING · {selected.number}</span>
          <h2>{active === "workshop" ? <>Built to be<br /><em>made your own.</em></> : active === "arcade" ? <>Small games.<br /><em>Lots of heart.</em></> : <>Curious by nature.<br /><em>Developer by craft.</em></>}</h2>
          {active === "workshop" ? <><p>My main project is Business Manager, a local-first React Native CLI template for running everyday business workflows. It includes customers, products, quotations, invoices, expenses, reports and PDF export, with no backend required.</p><div className="feature-tags"><span>React Native CLI</span><span>TypeScript</span><span>SQLite</span><span>Offline-first</span></div><div className="feature-actions"><a className="button button-dark" href="https://hmuhammed7.gumroad.com/l/snpiki" target="_blank" rel="noreferrer">Get Business Manager · $39 <span>↗</span></a><a className="text-link" href="https://github.com/Hisham546/Business-manager" target="_blank" rel="noreferrer">Source & details <span>↗</span></a></div></> :
          active === "arcade" ? <><p>I like making compact games with a clear idea at their core. I've experimented with Unity and published a browser-based Brick Breaker on itch.io, alongside smaller puzzle and arcade prototypes.</p><div className="feature-tags"><span>Unity 6</span><span>C#</span><span>HTML5</span><span>Game feel</span></div><div className="feature-actions"><a className="button button-dark" href="https://itch.io/" target="_blank" rel="noreferrer">Find me on itch.io <span>↗</span></a><a className="text-link" href="https://github.com/Hisham546" target="_blank" rel="noreferrer">Game projects <span>↗</span></a></div></> :
          <><p>I'm a mobile developer with around four years of experience building React Native apps for Android and iOS. Outside client work, I'm drawn to game development, how operating systems work, and the details that make software feel thoughtful.</p><div className="feature-tags"><span>React Native</span><span>JavaScript</span><span>TypeScript</span><span>Unity</span></div><div className="feature-actions"><a className="button button-dark" href="mailto:hmuhammed546@gmail.com">Let's talk <span>↗</span></a><a className="text-link" href="https://www.linkedin.com/in/muhammed-hisham-m-i-56a564225/" target="_blank" rel="noreferrer">LinkedIn <span>↗</span></a></div></>}
        </div>
        <div className="feature-visual" aria-hidden="true">
          {active === "workshop" ? <div className="product-window"><div className="window-bar"><i/><i/><i/><span>business-manager</span></div><div className="mini-app"><aside><b>BM.</b><i/><i/><i/><i/></aside><div className="mini-content"><small>GOOD MORNING</small><strong>Your business,<br/>at a glance.</strong><div className="mini-stats"><i/><i/><i/></div><div className="mini-chart"><span/><span/><span/><span/><span/><span/><span/></div></div></div><span className="visual-sticker">BUILT TO RESKIN ↗</span></div> :
          active === "arcade" ? <div className="arcade-machine"><div className="arcade-top">HISHAM'S ARCADE</div><div className="arcade-screen"><span>PIXEL</span><strong>QUEST</strong><i>PRESS START</i></div><div className="arcade-controls"><b/><span/><i/><i/></div><span className="visual-sticker">INSERT CURIOSITY</span></div> :
          <div className="campfire-scene"><div className="moon"/><div className="camp-mountain"/><div className="camp-tree">▲<br/>▲<br/>▮</div><div className="campfire">✦</div><span className="camp-caption">KEEP LEARNING. KEEP MAKING.</span></div>}
        </div>
      </section>

      <section className="about-strip" id="about"><div><span className="kicker">A FEW THINGS I CARE ABOUT</span><h2>Good software is thoughtful software.</h2></div><div className="about-points"><p><span>01</span>Useful details over flashy features</p><p><span>02</span>Learning how things work underneath</p><p><span>03</span>Building independently, one release at a time</p></div></section>
      <footer className="footer"><a className="brand" href="#top"><span className="brand-mark">H<span>.</span></span><span>hisham<span className="brand-muted">dev</span></span></a><p>Made with care, somewhere in Kerala.</p><div><a href="https://github.com/Hisham546" target="_blank" rel="noreferrer">GitHub ↗</a><a href="mailto:hmuhammed546@gmail.com">Email ↗</a></div></footer>
    </main>
  );
}

export default App;
