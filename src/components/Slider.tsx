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
    textMargin: number;
    textContainerRef: RefObject<HTMLTextAreaElement>;
    textDisplayRef: RefObject<HTMLPreElement>;
}

const Slider: React.FC<SliderProps> = ({ mode, position, text, setText,
    fontSize, lineHeight, textMargin, textContainerRef, textDisplayRef }: SliderProps) => {

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    }

    return (
        <div id="text-slider">
            {mode === "edit" &&
                <textarea
                    id="text-container"
                    ref={textContainerRef}
                    style={{
                        left: `${fontSize * 0.69}rem`,
                        width: `calc(100vw - ${fontSize * 0.69}rem)`,
                        fontSize: `${fontSize}rem`,
                        lineHeight: lineHeight,
                        padding: `0 calc(${textMargin}vw + ${fontSize * 0.69}rem) 0 ${textMargin}vw`
                    }}
                    value={text}
                    placeholder={PLACEHOLDER_TEXT}
                    spellCheck={false}
                    onChange={handleTextChange}
                />}
            {mode === "read" &&
                <pre
                    id="text-display"
                    ref={textDisplayRef}
                    style={{
                        left: `${fontSize * 0.69}rem`,
                        top: position,
                        width: `calc(100vw - 0.75rem - ${fontSize * 0.69}rem)`,
                        fontSize: `${fontSize}rem`,
                        lineHeight: lineHeight,
                        padding: `0 calc(${textMargin}vw + ${fontSize * 0.69}rem) 0 ${textMargin}vw`
                    }}>
                    {text}
                </pre>}
            {mode === "read" &&
                <Marker
                    fontSize={fontSize}
                    lineHeight={lineHeight}
                    textMargin={textMargin}
                />}
        </div>
    );
}

export default Slider;
