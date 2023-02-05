import React, { Dispatch, SetStateAction } from "react";

interface MainButtonsProps {
    active: boolean;
    setActive: Dispatch<SetStateAction<boolean>>;
    mode: string;
    setMode: Dispatch<SetStateAction<string>>;
    setIsMenuEnabled: Dispatch<SetStateAction<boolean>>;
    setPosition: Dispatch<SetStateAction<number>>;
    setText: Dispatch<SetStateAction<string>>;
}

const MainButtons: React.FC<MainButtonsProps> = (
    { active, setActive, mode, setMode, setIsMenuEnabled, setPosition, setText }: MainButtonsProps) => {

    const remValue = parseInt(window.getComputedStyle(document.body).getPropertyValue("font-size"));

    const changeActive = () => {
        if (active) {
            setActive(false);
        } else {
            setActive(true);
            setMode("read");
            setIsMenuEnabled(false);
        }
    }

    const resetSlider = () => {
        setActive(false);
        setPosition(7.5 * remValue);
    }

    const clearText = () => {
        setText("");
        setMode("edit");
    }

    const changeIsMenuEnabled = () => setIsMenuEnabled(prevState => !prevState);

    return (
        <div id="main-buttons-group">
            <button
                id="start-stop"
                className="main-buttons"
                onClick={changeActive} >
                {active ? "Stop" : "Start"}
            </button>
            <button
                id="reset"
                className="main-buttons"
                onClick={resetSlider}
                disabled={mode === "edit" ? true : false}>
                Reset
            </button>
            <button
                id="clear"
                className="main-buttons"
                onClick={clearText} >
                Clear
            </button>
            <button
                id="settings-button"
                className="main-buttons"
                onClick={changeIsMenuEnabled}>
                Settings
            </button>
        </div>
    );
}

export default MainButtons;
