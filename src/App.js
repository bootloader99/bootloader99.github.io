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
          </div>
        </div>
        <img className="project-detail-cover" src={businessManagerCover} alt="Business Manager interface showcase"/>
      </div>
      <section className="project-case-intro">
        <span className="project-detail-number">THE ENGINEERING STORY</span>
        <h3>Not just a collection of screens.</h3>
        <p>I wanted to make a useful starting point for another developer: something with real business workflows, a maintainable structure, and enough native project access to customise it for a specific product. That meant thinking about data integrity and hand-off, not only the interface.</p>
      </section>
      <section className="project-architecture">
        <div className="project-section-heading"><span className="project-detail-number">01 / ARCHITECTURE</span><h3>Keep responsibilities in their own place.</h3><p>The main flow separates presentation from data access, so a screen doesn't need to own every SQL query and business rule.</p></div>
        <div className="architecture-flow" aria-label="Application architecture flow">
          <div><span>01</span><strong>Screen</strong><small>UI and user input</small></div><b aria-hidden="true">→</b>
          <div><span>02</span><strong>Hook</strong><small>Loading and refresh state</small></div><b aria-hidden="true">→</b>
          <div><span>03</span><strong>Repository</strong><small>Queries and business operations</small></div><b aria-hidden="true">→</b>
          <div><span>04</span><strong>SQLite</strong><small>Persistent local data</small></div>
        </div>
        <p className="project-architecture-note">This is the dominant pattern, not a claim that every screen follows an identical sequence. The goal is to keep SQL and multi-step data operations out of the UI where practical, while leaving the code understandable for someone adapting the template.</p>
      </section>
      <div className="project-detail-grid">
        <article className="project-detail-block">
          <span className="project-detail-number">02 / WHY OP-SQLITE</span>
          <h3>A relational model for relational business data.</h3>
          <p>Customers, products, invoices, line items and payments are connected records. SQLite gives the app structured tables, constraints and transactions without asking the buyer to provision a server. I chose <code>@op-engineering/op-sqlite</code> after checking its Android and iOS support and visible upstream maintenance activity, rather than picking a storage library just because it was familiar.</p>
          <p className="project-tradeoff"><strong>The trade-off:</strong> this is a native dependency. Platform compatibility and native builds matter when upgrading it, and local storage does not provide cloud sync by itself.</p>
          <a className="project-inline-link" href="https://github.com/OP-Engineering/op-sqlite" target="_blank" rel="noreferrer">OP-SQLite source ↗</a>
        </article>
        <article className="project-detail-block">
          <span className="project-detail-number">03 / DATA INTEGRITY</span>
          <h3>Transactions where a workflow changes multiple records.</h3>
          <p>A sale is more than inserting one row. The workflow validates item quantities, prices, discounts and tax, calculates totals, writes the sale and its items, and adjusts tracked stock within a database transaction. If a step fails, the operation can roll back instead of leaving half a sale behind.</p>
          <p className="project-tradeoff"><strong>Another deliberate detail:</strong> line items keep product-name and price snapshots, so changing a product later doesn't rewrite the history of an earlier transaction.</p>
        </article>
        <article className="project-detail-block">
          <span className="project-detail-number">04 / SCHEMA EVOLUTION</span>
          <h3>Existing installs need a path forward.</h3>
          <p>The database tracks a schema version and applies ordered migrations. The current migration sequence reaches version 6, including changes to invoice lifecycle states and related foreign-key tables. That is important for a reusable template: a schema change should account for people who already have data, not only a fresh install.</p>
          <p className="project-tradeoff"><strong>Design constraint:</strong> migrations must preserve existing records while changing the structure, and should be tested against both new and previously initialized databases.</p>
        </article>
        <article className="project-detail-block">
          <span className="project-detail-number">05 / DOCUMENT LIFECYCLE</span>
          <h3>Business rules belong close to the data operation.</h3>
          <p>Quotations don't deduct stock. Converting an accepted quotation creates a linked invoice and marks the quotation as converted in a transaction, with guards against converting it twice. Invoice items retain their own snapshots so later product edits don't silently alter an issued document.</p>
          <p className="project-tradeoff"><strong>Why it matters:</strong> these are business invariants, not just UI states. They need to hold even when the same operation is triggered from a different screen later.</p>
        </article>
        <article className="project-detail-block">
          <span className="project-detail-number">06 / WHY REACT NATIVE CLI</span>
          <h3>Let buyers own the native project.</h3>
          <p>I used the React Native Community CLI rather than hiding the native projects behind a managed workflow. For a template people may rebrand, sign and distribute, direct access to Android Gradle configuration and the iOS Xcode/CocoaPods project gives them room to change the app beyond its JavaScript UI.</p>
          <p className="project-tradeoff"><strong>The trade-off:</strong> buyers need the relevant native toolchains, and dependency changes may require platform-specific build verification.</p>
        </article>
        <article className="project-detail-block">
          <span className="project-detail-number">07 / BACKUP AND RESTORE</span>
          <h3>Offline-first also means owning data safety.</h3>
          <p>The app supports versioned JSON export/import and a confirmed data reset. Import validates the supported backup version, payload shape, dates and record references before replacing business data. This gives users a way to move their data, but it is not automatic cloud backup or synchronization.</p>
          <p className="project-tradeoff"><strong>Important limitation:</strong> an exported backup only protects against device loss if the user stores it somewhere separate and safe.</p>
        </article>
        <article className="project-detail-block">
          <span className="project-detail-number">08 / DOCUMENTS WITHOUT A SERVER</span>
          <h3>Generate invoice PDFs on-device.</h3>
          <p>Invoice PDFs are created locally with <code>pdf-lib</code> and <code>@pdf-lib/fontkit</code>, including bundled Noto Sans font data. I needed to create and lay out documents, not simply display an existing PDF, so a generation library fit the job better than a viewer-only component.</p>
          <p className="project-tradeoff"><strong>What needs care:</strong> custom invoice layouts should be checked with long descriptions, totals, special characters and the target devices' output.</p>
        </article>
      </div>
      <section className="project-lessons">
        <span className="project-detail-number">WHAT BUILDING A SELLABLE TEMPLATE CHANGED FOR ME</span>
        <p>A feature can work on my machine and still be difficult for another developer to adopt. I had to consider setup instructions, identifiers, app branding, native builds, data migration, backup behavior and the less obvious edge cases that appear when records are linked together.</p>
        <p>That's the standard I wanted to work towards: not an enterprise platform, and not a finished app for every business, but a solid base someone can understand, customise and continue building.</p>
      </section>
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
          <p className="hero-description">I’m <span className="hero-name-highlight">Hisham</span>. I build mobile apps with React Native, make small games, and love figuring out how things work. What started with tinkering with Android has grown into a curiosity that keeps me exploring technology and building things of my own.</p>
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

    <section className="experience-section" id="experience">
      <div className="section-index">A FEW YEARS OF MAKING MOBILE APPS / 03</div>
      <div className="experience-heading">
        <h2>Four years of<br/><em>building for mobile.</em></h2>
        <p>It started with one eCommerce app and grew into a mix of projects for different people and different needs. Most of that time has been spent with React Native, building for both Android and iOS.</p>
      </div>

      <div className="experience-story">
        <article className="experience-story-entry">
          <div className="experience-story-marker"><span>01</span><i/></div>
          <div className="experience-story-copy">
            <p className="work-label">THE FIRST PROJECT · ECOMMERCE</p>
            <h3>Getting a store<br/><em>onto someone's phone.</em></h3>
            <p>My first project was an eCommerce app for Android and iOS. I worked on the app with React Native, including the seller onboarding experience, and used Redux Toolkit to handle asynchronous state. I also worked alongside the backend and design teams as the app came together and went to the Play Store and App Store.</p>
          </div>
        </article>

        <article className="experience-story-entry">
          <div className="experience-story-marker"><span>02</span><i/></div>
          <div className="experience-story-copy">
            <p className="work-label">A MIX OF CLIENT PROJECTS</p>
            <h3>Different apps,<br/><em>different everyday problems.</em></h3>
            <p>After that came several React Native apps across education, ERP billing and AMC service management. I worked on features shaped by client requirements, fixed issues that showed up in production, and improved performance as newer Android versions brought their own changes. I also got familiar with the less glamorous but important part: publishing and maintaining apps on both stores.</p>
          </div>
        </article>
      </div>

      <article className="experience-feature">
        <div className="experience-feature-top"><span>MORE RECENTLY</span><span>REACT NATIVE / EXPO</span></div>
        <div className="experience-feature-body">
          <div className="experience-feature-intro">
            <p className="work-label">HEALTHCARE & COMMUNITY</p>
            <h3>A bigger app<br/><em>with more moving parts.</em></h3>
            <p>Most recently, I worked on a healthcare-focused social community app, building it from the ground up with React Native and Expo for Android and iOS. It brought together community features, conversations and podcasts, and gave me the chance to work on some parts of the app in more depth.</p>
          </div>
          <div className="experience-contributions">
            <div><p><strong>Chat and presence</strong>Real-time messaging for text, images and GIFs, with live user presence and last-seen updates using AWS Amplify Gen 2.</p></div>
            <div><p><strong>Swipe-based discovery</strong>Profile discovery interactions built with React Native Gesture Handler and Reanimated.</p></div>
            <div><p><strong>Podcasts and production care</strong>In-app audio playback with React Native Track Player, alongside production fixes, client-requested features and crash monitoring with Firebase Crashlytics.</p></div>
          </div>
        </div>
        <div className="experience-stack"><span>REACT NATIVE</span><span>EXPO</span><span>ANDROID & iOS</span><span>REDUX TOOLKIT</span><span>AWS AMPLIFY</span><span>GESTURE HANDLER</span><span>REANIMATED</span><span>TRACK PLAYER</span><span>FIREBASE CRASHLYTICS</span></div>
      </article>
      <p className="experience-ending">Different apps, different teams, and a lot of learning in between. Somewhere in all that, building mobile apps stopped being something I was curious about and became the thing I do.</p>
    </section>

    <section className="work-section" id="work">
      <div className="section-index">CURRENT BUILDS / 02</div>
      <div className="work-heading"><h2>Things I’m building<br/><em>on my own.</em></h2><p>I like building things from scratch, whether it’s a tool someone else can use or a small game idea I want to bring to life. These are two different sides of that.</p></div>
      <div className="work-grid">
        <article className="work-card work-business"><div className="work-card-top"><span>01 / APP TEMPLATE</span><span className="work-symbol">↗</span></div><button className="business-cover-link" type="button" onClick={() => setBusinessDetailsOpen(true)} aria-label="Open Business Manager project details"><img className="business-cover" src={businessManagerCover} alt="Business Manager app showcase"/><span className="business-cover-hint">TAKE A CLOSER LOOK <b>↗</b></span></button><div className="work-card-copy"><div className="work-label">REACT NATIVE · TYPESCRIPT · SQLITE</div><h3>Business Manager</h3><p>A local-first business management template for customers, sales, quotations, invoices, expenses and reports. Built to be customised, with no backend required.</p><div className="work-links"><a href="https://hmuhammed7.gumroad.com/l/snpiki" target="_blank" rel="noreferrer">Explore the product ↗</a></div></div></article>
        <article className="work-card work-games"><div className="work-card-top"><span>02 / LEARNING IN PUBLIC</span><span className="work-symbol">✳</span></div><div className="work-art-games"><div className="game-tile tile-a">+</div><div className="game-tile tile-b">✦</div><div className="game-tile tile-c">↗</div><div className="game-tile tile-d">●</div><div className="game-word">PLAY<br/><em>TEST</em><br/>REPEAT</div></div><div className="work-card-copy"><div className="work-label">UNITY · C# · SMALL 2D GAMES</div><h3>Making games</h3><p>Small game ideas, mechanics and experiments built with Unity. A space to explore ideas, try things out, make mistakes and slowly get better at turning concepts into playable experiences.</p><div className="work-links"><a href="https://warpredator.itch.io/" target="_blank" rel="noreferrer">Play my games on itch.io ↗</a></div></div></article>
      </div>
    </section>

    <section className="build-notes-section" id="notes">
      <div className="section-index">FIELD NOTES / THINGS I’VE LEARNED ALONG THE WAY</div>
      <div className="build-notes-heading">
        <h2>A few things<br/><em>worth writing down.</em></h2>
        <p>Small notes from building apps: decisions, trade-offs and details that are easy to miss when you're focused on getting a feature working.</p>
      </div>
      <div className="build-notes-list">
        <details className="build-note">
          <summary>
            <span className="build-note-index">NOTE 01 · REACT NATIVE / SQLITE</span>
            <span className="build-note-title">Offline-first is more than choosing a local database.</span>
            <span className="build-note-meta">DATA MODELLING · TRANSACTIONS · BACKUPS <b>＋</b></span>
          </summary>
          <div className="build-note-body">
            <p>When I started building Business Manager, I knew it had to work without asking the user to create an account or depend on a server. SQLite was a natural fit, but choosing a local database was only the beginning.</p>
            <p>Business data is connected. A sale can contain several line items, update stock, and refer to customer and product records. Those changes need to succeed together. I used database transactions for multi-step operations so a failure doesn't leave a half-written sale behind.</p>
            <p>I also had to think about what happens after the first release. A database schema changes as an app grows, so the app tracks its schema version and applies ordered migrations. Existing installs need a safe path forward; testing only a fresh database isn't enough.</p>
            <p>And because the data lives on the device, export and restore matter. Business Manager uses a versioned JSON backup format and validates the data before importing it. That isn't cloud sync, and it doesn't protect someone who loses both their device and their backup, but it gives users a deliberate way to move their data.</p>
            <p className="build-note-takeaway"><strong>What I took away:</strong> offline-first isn't a storage-library feature. It affects data relationships, failure handling, schema changes and the way users protect their information.</p>
          </div>
        </details>
        <details className="build-note">
          <summary>
            <span className="build-note-index">NOTE 02 · REACT NATIVE / RELEASES</span>
            <span className="build-note-title">Getting a React Native app ready to ship.</span>
            <span className="build-note-meta">ANDROID · iOS · RELEASE PREPARATION <b>＋</b></span>
          </summary>
          <div className="build-note-body">
            <p>A React Native app can be built with Expo or the Community CLI, and both approaches can produce real Android and iOS applications. Expo has taken care of many parts of the native workflow that developers once had to manage themselves, so using the CLI isn't automatically a better or more capable choice.</p>
            <p>The right setup depends on the project. Expo provides a productive managed workflow and tools for building and shipping apps, while the Community CLI gives direct ownership of the native Android and iOS project files. That lower-level access can be useful when a project needs particular native customisation or when its dependencies and workflow call for it.</p>
            <p>I've worked with both: an Expo app for a healthcare and community product, and a Community CLI project for Business Manager. The workflows differ, but neither removes the need to understand how the app is configured and how it reaches users.</p>
            <p>Before calling a release ready, I want to verify more than the JavaScript bundle. I check the platform builds, app identifiers, signing and configuration, then install and launch the app on the relevant targets. Dependency changes can affect Android and iOS differently, so both paths deserve attention.</p>
            <p className="build-note-takeaway"><strong>What I took away:</strong> there's no universal winner between Expo and the Community CLI. Choose the workflow that fits the app, then verify the actual builds and release process instead of assuming a successful development run guarantees a smooth release.</p>
          </div>
        </details>
      </div>
    </section>

    <section className="curiosity-section">
      <div className="curiosity-stamp">ONE DAY<br/>AT A TIME<br/><span>✳</span></div>
      <div><div className="section-index">WHAT I’M WORKING TOWARDS</div><h2>A game of<br/><em>my own.</em></h2><p>The bigger goal is to make a PC game and release it on Steam one day: something I can take from the first rough idea to a finished game people can install, play and make their own memories with. I don’t know what that game will be yet, or everything it will take to get there. For now, I’m building the skills through smaller projects, one piece at a time.</p><div className="curiosity-tags"><span>SMALL GAMES</span><span>UNITY</span><span>THE LONG GAME</span></div></div>
    </section>

    <footer className="site-footer" id="contact"><div className="footer-top"><div className="section-index">IF YOU WANT TO SAY HELLO</div><h2>That’s the story<br/><em>so far.</em></h2><p className="footer-invitation">Always interested in building something useful, untangling a tricky app problem, or helping a project find its way forward.</p><a className="footer-cta" href="https://mail.google.com/mail/?view=cm&amp;fs=1&amp;to=hmuhammed546%40gmail.com&amp;su=Hello%20Hisham" target="_blank" rel="noreferrer">Say hello <span>↗</span></a></div><div className="footer-bottom"><a className="wordmark" href="#top">h<span>.</span></a><span>HISHAM · PLANET EARTH</span><div><a href="https://github.com/bootloader99" target="_blank" rel="noreferrer">GITHUB ↗</a><a href="https://www.linkedin.com/in/muhammed-hisham-m-i-56a564225/" target="_blank" rel="noreferrer">LINKEDIN ↗</a><a href="https://mail.google.com/mail/?view=cm&amp;fs=1&amp;to=hmuhammed546%40gmail.com&amp;su=Hello%20Hisham" target="_blank" rel="noreferrer">EMAIL ↗</a></div></div></footer>
  </main>
  </>;
}

export default App;
