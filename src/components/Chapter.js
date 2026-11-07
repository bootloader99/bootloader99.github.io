import React from "react";
import ChapterSketch from "./ChapterSketch";

function Chapter({ chapter, index }) {
  return <article className={`chapter chapter-${chapter.kind} ${index % 2 ? "chapter-reverse" : ""}`} id={chapter.kind}>
    <div className="chapter-copy">
      <div className="chapter-meta"><span className="chapter-number">{chapter.number}</span><span>{chapter.year}</span></div>
      <h3>{chapter.title}</h3>
      <p>{chapter.text}</p>
      <div className="chapter-mark"><span/> {chapter.mark}</div>
      {chapter.kind === "career" && (
        <div className="chapter-career-cta">
          <a href="#experience">PROFESSIONAL EXPERIENCE <span aria-hidden="true">↓</span></a>
        </div>
      )}
      {chapter.kind === "product" && (
        <div className="chapter-career-cta">
          <a href="#business-manager">MORE ABOUT BUSINESS MANAGER <span aria-hidden="true">↓</span></a>
        </div>
      )}
    </div>
    <ChapterSketch kind={chapter.kind}/>
  </article>;
}

export default Chapter;
