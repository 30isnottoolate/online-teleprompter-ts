import { useState, useEffect, useRef } from 'react';
import './Teleprompter.css';
import Slider from "./Slider";
import Controller from "./Controller";

const DEFAULT_THEME: string = "dark"; // dark or light
const DEFAULT_TEXT: string = "";
const DEFAULT_FONT_SIZE: number = 100;
const DEFAULT_LINE_HEIGHT: number = 1.2;
const DEFAULT_TEXT_SPEED: number = 100;
const READ_SPEED_COEF: number = 0.0151; // char/ms

const Teleprompter: React.FC = () => {
	const [active, setActive] = useState(false);
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
		} else return localStorage.getItem("text") + "";
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
		} else return Number(localStorage.getItem("fontSize"));
	});

	const [lineHeight, setLineHeight] = useState(() => {
		if (localStorage.getItem("lineHeight") === null) {
			localStorage.setItem("lineHeight", DEFAULT_LINE_HEIGHT.toString());
			return DEFAULT_LINE_HEIGHT;
		} else return Number(localStorage.getItem("lineHeight"));
	});

	const [textSpeed, setTextSpeed] = useState(() => {
		if (localStorage.getItem("textSpeed") === null) {
			localStorage.setItem("textSpeed", DEFAULT_TEXT_SPEED.toString());
			return DEFAULT_TEXT_SPEED;
		} else return Number(localStorage.getItem("textSpeed"));
	});

	const textContainerRef = useRef<HTMLTextAreaElement>(null);
	const textDisplayRef = useRef<HTMLPreElement>(null);
	const textMarkerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		window.addEventListener("resize", () => setViewportWidth(window.innerWidth));
		return () => window.removeEventListener("resize", () => setViewportWidth(window.innerWidth));
	}, [viewportWidth]);

	useEffect(() => {
		if (theme) localStorage.setItem("theme", theme);
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

    const countEmptyLines = (input: string) => {
        return (input.match(/^[ ]*$/gm) || []).length;
    }

	useEffect(() => {
		let intervalID: ReturnType<typeof setInterval>;
		let noEmptyLinesTextHeight: number;
		let intervalValue: number;

		if (textDisplayRef.current && text) {
			noEmptyLinesTextHeight = textDisplayRef.current.offsetHeight - fontSize * lineHeight * countEmptyLines(text);
			intervalValue = (text.length / (noEmptyLinesTextHeight * READ_SPEED_COEF))
			* (100 / textSpeed);
		} else intervalValue = 18;

		if (active) {
			intervalID = setInterval(() => setPosition(position => position - 1), intervalValue);
		} else {
			setActive(false);
		}

		return () => clearInterval(intervalID);
	}, [active, viewportWidth, text, fontSize, lineHeight, textSpeed]);

	useEffect(() => {
		if (textDisplayRef.current && textMarkerRef.current) {
			if (!(textDisplayRef.current.offsetHeight > ((-1) * position + fontSize * lineHeight + textMarkerRef.current.offsetTop))) {
				setActive(false);
			}
		}
	}, [position, fontSize, lineHeight]);

	return (
		<div id="teleprompter" className={theme || "dark"}>
			<Controller
				active={active} setActive={setActive}
				mode={mode} setMode={setMode}
				isMenuEnabled={isMenuEnabled} setIsMenuEnabled={setIsMenuEnabled}
				setPosition={setPosition}
				viewportWidth={viewportWidth}
				theme={theme || "dark"} setTheme={setTheme}
				setText={setText}
				fontSize={fontSize} setFontSize={setFontSize}
				lineHeight={lineHeight} setLineHeight={setLineHeight}
				textSpeed={textSpeed} setTextSpeed={setTextSpeed} />
			<Slider
				mode={mode}
				position={position} setPosition={setPosition}
				theme={theme || "dark"}
				text={text} setText={setText}
				fontSize={fontSize}
				lineHeight={lineHeight}
				textContainerRef={textContainerRef}
				textDisplayRef={textDisplayRef}
				textMarkerRef={textMarkerRef} />
		</div>
	);
}

export default Teleprompter;
