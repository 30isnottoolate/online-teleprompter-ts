import { useState, useEffect, useRef } from 'react';
import './App.css';
import Slider from "./Slider";
import Controller from "./Controller";

const DEFAULT_THEME: string = "dark"; // dark or light
const DEFAULT_TEXT: string = "";
const DEFAULT_FONT_SIZE: number = 100;
const DEFAULT_LINE_HEIGHT: number = 1.2;
const DEFAULT_TEXT_SPEED: number = 100;
const READ_SPEED_COEF: number = 0.0151; // char/ms

const App: React.FC = () => {
    const remValue = parseInt(window.getComputedStyle(document.body).getPropertyValue("font-size"));

	const [active, setActive] = useState(false);
	const [mode, setMode] = useState("edit"); // edit or read
	const [isMenuEnabled, setIsMenuEnabled] = useState(false);
	const [position, setPosition] = useState(0);
	const [viewportWidth, setViewportWidth] = useState(window.innerWidth / remValue);

	const [theme, setTheme] = useState(() => {
		if (!localStorage.getItem("theme")) {
			localStorage.setItem("theme", DEFAULT_THEME);
			return DEFAULT_THEME;
		} else {
			return localStorage.getItem("theme") + "";
		}
	});

	const [text, setText] = useState(() => {
		if (!localStorage.getItem("text")) {
			localStorage.setItem("text", DEFAULT_TEXT);
			return DEFAULT_TEXT;
		} else return localStorage.getItem("text") + "";
	});

	const [fontSize, setFontSize] = useState(() => {
		if (!localStorage.getItem("fontSize")) {
			if (viewportWidth < 44) {
				localStorage.setItem("fontSize", (40 / remValue).toString());
				return 40 / remValue;
			} else {
				localStorage.setItem("fontSize", (DEFAULT_FONT_SIZE / remValue).toString());
				return DEFAULT_FONT_SIZE / remValue;
			}
		} else return Number(localStorage.getItem("fontSize"));
	});

	const [lineHeight, setLineHeight] = useState(() => {
		if (!localStorage.getItem("lineHeight")) {
			localStorage.setItem("lineHeight", DEFAULT_LINE_HEIGHT.toString());
			return DEFAULT_LINE_HEIGHT;
		} else return Number(localStorage.getItem("lineHeight"));
	});

	const [textSpeed, setTextSpeed] = useState(() => {
		if (!localStorage.getItem("textSpeed")) {
			localStorage.setItem("textSpeed", DEFAULT_TEXT_SPEED.toString());
			return DEFAULT_TEXT_SPEED;
		} else return Number(localStorage.getItem("textSpeed"));
	});

	const textContainerRef = useRef<HTMLTextAreaElement>(null);
	const textDisplayRef = useRef<HTMLPreElement>(null);

	useEffect(() => {
		window.addEventListener("resize", () => setViewportWidth(window.innerWidth / remValue));

		return () => window.removeEventListener("resize", () => setViewportWidth(window.innerWidth / remValue));
	}, [viewportWidth]);

	useEffect(() => {
		if (theme) {
			localStorage.setItem("theme", theme);
			document.body.className = theme;
		}
	}, [theme]);

	useEffect(() => {
		localStorage.setItem("text", text);
	}, [text]);

	useEffect(() => {
		if (fontSize) localStorage.setItem("fontSize", fontSize.toString());
	}, [fontSize]);

	useEffect(() => {
		if (lineHeight) localStorage.setItem("lineHeight", lineHeight.toString());
	}, [lineHeight]);

	useEffect(() => {
		if (textSpeed) localStorage.setItem("textSpeed", textSpeed.toString());
	}, [textSpeed]);

	useEffect(() => {
		if (mode === "edit" && textContainerRef.current) textContainerRef.current.focus();
	}, [mode]);

	useEffect(() => {
		const emptyLines = (input: string) => (input.match(/^[ ]*$/gm) || []).length;

		let intervalID: ReturnType<typeof setInterval>;
		let noEmptyLinesTextHeight: number;
		let intervalValue: number;

		if (textDisplayRef.current && text) {
			noEmptyLinesTextHeight = textDisplayRef.current.offsetHeight - remValue * fontSize * lineHeight * emptyLines(text);
			intervalValue = (text.length / (noEmptyLinesTextHeight * READ_SPEED_COEF)) * (100 / textSpeed);
		} else intervalValue = 18;

		if (active) {
			intervalID = setInterval(() => setPosition(position => position - 1), intervalValue);
		} else {
			setActive(false);
		}

		return () => clearInterval(intervalID);
	}, [active, viewportWidth, text, fontSize, lineHeight, textSpeed]);

	useEffect(() => {
		if (textDisplayRef.current) {
			if (position < (7.5 * remValue - textDisplayRef.current.offsetHeight + remValue * fontSize * lineHeight)) {
				setActive(false);
			}
		}
	}, [position, fontSize, lineHeight]);

	return (
		<>
			<Controller
				active={active} setActive={setActive}
				mode={mode} setMode={setMode}
				isMenuEnabled={isMenuEnabled} setIsMenuEnabled={setIsMenuEnabled}
				setPosition={setPosition}
				viewportWidth={viewportWidth}
				theme={theme} setTheme={setTheme}
				setText={setText}
				fontSize={fontSize} setFontSize={setFontSize}
				lineHeight={lineHeight} setLineHeight={setLineHeight}
				textSpeed={textSpeed} setTextSpeed={setTextSpeed} />
			<Slider
				mode={mode}
				position={position} setPosition={setPosition}
				text={text} setText={setText}
				fontSize={fontSize}
				lineHeight={lineHeight}
				textContainerRef={textContainerRef}
				textDisplayRef={textDisplayRef} />
		</>
	);
}

export default App;
