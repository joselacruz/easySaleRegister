import React from "react";

export function formatTextWithLineBreaks(text) {
  return text.split("\n").map((line, index) => (
    <React.Fragment key={index}>
      {line}
      {index !== text.length - 1 && <br />}{" "}
      {/* Añade <br> después de cada línea excepto la última */}
    </React.Fragment>
  ));
}
