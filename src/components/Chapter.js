import React from "react";
import ChapterSketch from "./ChapterSketch";

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

export default Chapter;
