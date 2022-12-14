import React, { RefObject, useEffect } from "react";
import Marker from "./Marker";

const PLACEHOLDER_TEXT = "Type something...";

interface SliderProps {
    mode: string;
    position: number;
    setPosition: (position: number) => void;
    theme: string;
    text: string;
    setText: (text: string) => void;
    fontSize: number;
    lineHeight: number;
    textContainerRef: RefObject<HTMLTextAreaElement>;
    textDisplayRef: RefObject<HTMLPreElement>;
}

const Slider: React.FC<SliderProps> = ({ mode, position, setPosition, theme, text, setText,
    fontSize, lineHeight, textContainerRef, textDisplayRef }: SliderProps) => {
    useEffect(() => {
        setPosition(window.innerHeight * 0.15);
    }, [fontSize, lineHeight, text, setPosition]);

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    }

    return (
        <div id="text-slider">
            <textarea
                id="text-container"
                ref={textContainerRef}
                className={theme}
                style={{
                    display: mode === "edit" ? "initial" : "none",
                    top: "calc(15vh - 2px)",
                    height: "85vh",
                    left: (fontSize * 0.69) + "px",
                    width: `calc(100vw - ${(fontSize * 0.69)}px)`,
                    fontSize: fontSize + "px",
                    lineHeight: lineHeight
                }}
                value={text}
                placeholder={PLACEHOLDER_TEXT}
                onChange={handleTextChange} />
            <pre
                id="text-display"
                ref={textDisplayRef}
                className={theme}
                style={{
                    display: mode === "edit" ? "none" : "initial",
                    left: (fontSize * 0.69) + 2 + "px",
                    top: position,
                    width: `calc(99vw - ${(fontSize * 0.69)}px)`,
                    fontSize: fontSize + "px",
                    lineHeight: lineHeight
                }}>
                {text}
            </pre>
            <Marker
                fontSize={fontSize}
                lineHeight={lineHeight}
                mode={mode}
                color={theme === "dark" ? "#eff6ff" : "#011327"}
                left={fontSize * 0.19}
                top="15vh"
            />
        </div>
    );
}

export default Slider;

