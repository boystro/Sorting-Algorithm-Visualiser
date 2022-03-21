import React from "react";
import "./DesignComponents.scss";

export default function DesignComponents() {
  const VIEWPORT_WIDTH = window.innerWidth;
  const VIEWPORT_HEIGHT = window.innerHeight;

  const MIN_CIRCLE_SIZE = 25;
  const MAX_CIRCLE_SIZE = 300;
  const CIRCLE_COUNT = 6;

  function generateDesignCircles() {
    let arr = new Array(CIRCLE_COUNT);
    let top, left, size;
    for (let i = 0; i < arr.length; i++) {
      size = randomNumber(MIN_CIRCLE_SIZE, MAX_CIRCLE_SIZE);
      top = randomNumber(0, VIEWPORT_HEIGHT - size);
      left = randomNumber(0, VIEWPORT_WIDTH - size);
      arr[i] = {
        top: top,
        left: left,
        width: size,
        height: size,
      };
    }
    return arr.map((value, idx) => {
      return <div className="circle" key={idx} style={value}></div>;
    });
  }

  return <div className="design-components">{generateDesignCircles()}</div>;
}

function randomNumber(min = 0, max = 1) {
  return Math.floor(min + Math.random() * (max - min));
}
