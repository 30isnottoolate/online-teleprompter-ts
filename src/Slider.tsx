import React, { RefObject, useEffect } from "react";

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
    textMarkerRef: RefObject<HTMLParagraphElement>;
}

const Slider: React.FC<SliderProps> = ({ mode, position, setPosition, theme, text, setText,
    fontSize, lineHeight, textContainerRef, textDisplayRef, textMarkerRef }: SliderProps) => {
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
                    top: "15vh",
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
                    top: (position + 2),
                    width: `calc(99vw - ${(fontSize * 0.69)}px)`,
                    fontSize: fontSize + "px",
                    lineHeight: lineHeight
                }}>
                {text}
            </pre>
            <p
                id="text-marker"
                ref={textMarkerRef}
                className={theme}
                style={{
                    display: mode === "edit" ? "none" : "initial",
                    left: (fontSize * 0.19),
                    top: "15vh",
                    fontSize: fontSize + "px",
                    lineHeight: lineHeight
                }}>&#129170;</p>
        </div>
    );
}

export default Slider;

