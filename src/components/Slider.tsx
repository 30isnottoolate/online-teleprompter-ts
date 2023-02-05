import React, { RefObject } from "react";
import Marker from "./Marker";

const PLACEHOLDER_TEXT = "Type something...";

interface SliderProps {
    mode: string;
    position: number;
    text: string;
    setText: React.Dispatch<React.SetStateAction<string>>;
    fontSize: number;
    lineHeight: number;
    textContainerRef: RefObject<HTMLTextAreaElement>;
    textDisplayRef: RefObject<HTMLPreElement>;
}

const Slider: React.FC<SliderProps> = ({ mode, position, text, setText,
    fontSize, lineHeight, textContainerRef, textDisplayRef }: SliderProps) => {

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    }

    return (
        <div id="text-slider">
            <textarea
                id="text-container"
                ref={textContainerRef}
                style={{
                    display: mode === "edit" ? "initial" : "none",
                    height: "calc(100vh - 7.5rem)",
                    left: `${fontSize * 0.69}rem`,
                    width: `calc(100vw - ${fontSize * 0.69}rem)`,
                    fontSize: `${fontSize}rem`,
                    lineHeight: lineHeight
                }}
                value={text}
                placeholder={PLACEHOLDER_TEXT}
                spellCheck={false}
                onChange={handleTextChange} />
            <pre
                id="text-display"
                ref={textDisplayRef}
                style={{
                    display: mode === "edit" ? "none" : "initial",
                    left: `${fontSize * 0.69}rem`,
                    top: position,
                    width: `calc(100vw - 0.75rem - ${fontSize * 0.69}rem)`,
                    fontSize: `${fontSize}rem`,
                    lineHeight: lineHeight
                }}>
                {text}
            </pre>
            {mode === "read" &&
                <Marker
                    fontSize={fontSize}
                    lineHeight={lineHeight}
                />}
        </div>
    );
}

export default Slider;

