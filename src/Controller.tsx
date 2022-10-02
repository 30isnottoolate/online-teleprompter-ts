import React from 'react';
import './Teleprompter.css';

interface ControllerProps {
    isActive: boolean;
    setIsActive: (isActive: boolean) => void;
    mode: string;
    setMode: (mode: string) => void;
    theme: string;
    setTheme: (theme: string) => void;
    isMenuEnabled: boolean;
    setIsMenuEnabled: (isMenuEnabled: boolean) => void;
    setPosition: (position: number) => void;
    viewportWidth: number;
    setText: (text: string) => void;
    fontSize: number;
    setFontSize: (fontSize: number) => void;
    lineHeight: number;
    setLineHeight: (lineHeight: number) => void;
    textSpeed: number;
    setTextSpeed: (textSpeed: number) => void;
}

const Controller: React.FC<ControllerProps> = ({ isActive, setIsActive, mode, setMode, theme, setTheme,
    isMenuEnabled, setIsMenuEnabled, setPosition, viewportWidth, setText, fontSize, setFontSize,
    lineHeight, setLineHeight, textSpeed, setTextSpeed }: ControllerProps) => {

    const handleIsActive = () => {
        if (isActive) {
            setIsActive(false);
        } else {
            setIsActive(true);
            setMode("read");
            setIsMenuEnabled(false);
        }
    }

    const handleReset = () => {
        setIsActive(false);
        setPosition(window.innerHeight * 0.15);
    }

    const handleMode = () => {
        if (mode === "edit") {
            setMode("read");
            setIsMenuEnabled(false);
        } else {
            setMode("edit");
            setIsActive(false);
            setPosition(window.innerHeight * 0.15);
        }
    }

    const handleTheme = () => {
        if (theme === "dark") {
            setTheme("light");
        } else {
            setTheme("dark");
        }
    }

    const handleDefault = () => {
        if (viewportWidth < 701) {
            setFontSize(40);
        } else setFontSize(100);

        setLineHeight(1.2);
        setTextSpeed(100);
    }

    const handleClear = () => {
        setText("");
        setMode("edit");
    }

    const getButtonPresence = () => {
        if (viewportWidth < 701) {
            return "initial";
        } else return "none";
    }

    const getDivPresence = () => {
        if (viewportWidth < 701) {
            if (isMenuEnabled) {
                return "grid";
            } else return "none";
        } else return "grid";
    }

    const getControllerHeight = () => {
        if (viewportWidth < 701 && isMenuEnabled) {
            return "40vh";
        } else return "15vh";
    }

    const getGridTemplate = () => {
        if (viewportWidth < 701) {
            if (isMenuEnabled) {
                return "repeat(5, auto)";
            } else return "repeat(2, auto)";
        } else return "auto";
    }

    const handleIsMenuEnabled = () => setIsMenuEnabled(!isMenuEnabled);

    const handleFontSize = (e: React.ChangeEvent<HTMLInputElement>) => setFontSize(Number(e.target.value));

    const handleLineHeight = (e: React.ChangeEvent<HTMLInputElement>) => setLineHeight(Number(e.target.value));

    const handleTextSpeed = (e: React.ChangeEvent<HTMLInputElement>) => setTextSpeed(Number(e.target.value));

    return (
        <div
            id="controller"
            className={isActive ? "transparent" : "visible"}>
            <div id="logo">
                <h1>
                    Online Teleprompter
                </h1>
            </div>
            <div id="main-buttons-group">
                <button
                    id="start-stop"
                    className="main-buttons" >
                    {isActive ? "Stop" : "Start"}
                </button>
                <button
                    id="reset"
                    className="main-buttons"
                    disabled={mode === "edit" ? true : false}>
                    Reset
                </button>
                <button id="clear" className="main-buttons" >Clear</button>
                <button
                    id="settings-button"
                    className="main-buttons">
                    Settings
                </button>
            </div>
            <div id="mode-group" >
                <span>Current mode: </span>
                <button
                    id="mode"
                    className="mode-buttons" >
                    {mode === "edit" ? "Edit" : "Read"}
                </button>
                <span>Color theme: </span>
                <button
                    id="theme"
                    className="mode-buttons" >
                    {theme === "dark" ? "Dark" : "Light"}
                </button>
            </div>
            <div id="settings" >
                <label htmlFor="font-size">Font size: </label>
                <input
                    id="font-size"
                    type="range" min="40" max="150" step="1"
                    value={fontSize} />
                <span>{fontSize}</span>
                <label htmlFor="line-height">Line height: </label>
                <input
                    id="line-height"
                    type="range" min="1" max="1.5" step="0.01"
                    value={lineHeight} />
                <span></span>
                <label htmlFor="text-speed">Text speed: </label>
                <input
                    id="text-speed"
                    type="range" min="20" max="200" step="1"
                    value={textSpeed} />
                <span>{textSpeed}</span>
            </div>
            <div id="default-container" >
                <button
                    id="default">
                </button>
            </div>
        </div>
    );
}

export default Controller;
