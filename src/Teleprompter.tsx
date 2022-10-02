import { useState, useEffect, useRef } from 'react';
import './Teleprompter.css';

const DEFAULT_THEME: string = "dark"; // dark or light
const DEFAULT_TEXT: string = "";
const DEFAULT_FONT_SIZE: number = 100;
const DEFAULT_LINE_HEIGHT: number = 1.2;
const DEFAULT_TEXT_SPEED: number = 100;
const READ_SPEED_COEF: number = 0.0151; // char/ms

const Teleprompter: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState("edit"); // edit or read
  const [isMenuEnabled, setIsMenuEnabled] = useState(false);
  const [position, setPosition] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  const [theme, setTheme] = useState(() => {
    if (localStorage.getItem("theme") === null) {
        localStorage.setItem("theme", DEFAULT_THEME);
        return DEFAULT_THEME;
    } else {
        return localStorage.getItem("theme");
    }
});

const [text, setText] = useState(() => {
    if (localStorage.getItem("text") === null) {
        localStorage.setItem("text", DEFAULT_TEXT);
        return DEFAULT_TEXT;
    } else {
        return localStorage.getItem("text");
    }
});

const [fontSize, setFontSize] = useState(() => {
    if (localStorage.getItem("fontSize") === null) {
        if (viewportWidth < 701) {
            localStorage.setItem("fontSize", (40).toString());
            return 40;
        } else {
            localStorage.setItem("fontSize", DEFAULT_FONT_SIZE.toString());
            return DEFAULT_FONT_SIZE;
        }
    } else return localStorage.getItem("fontSize");
});

const [lineHeight, setLineHeight] = useState(() => {
    if (localStorage.getItem("lineHeight") === null) {
        localStorage.setItem("lineHeight", DEFAULT_LINE_HEIGHT.toString());
        return DEFAULT_LINE_HEIGHT;
    } else {
        return localStorage.getItem("lineHeight");
    }
});

const [textSpeed, setTextSpeed] = useState(() => {
    if (localStorage.getItem("textSpeed") === null) {
        localStorage.setItem("textSpeed", DEFAULT_TEXT_SPEED.toString());
        return DEFAULT_TEXT_SPEED;
    } else {
        return localStorage.getItem("textSpeed");
    }
});

  const textContainerRef = useRef(null);
  const textDisplayRef = useRef(null);
  const textMarkerRef = useRef(null);

  useEffect(() => {
    window.addEventListener("resize", () => setViewportWidth(window.innerWidth));
    return () => window.removeEventListener("resize", () => setViewportWidth(window.innerWidth));
}, [viewportWidth]);

  return (
    <div id="teleprompter">
      Hello!
    </div>
  );
}

export default Teleprompter;
