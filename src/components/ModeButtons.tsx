import React from 'react';

interface ModeButtonsProps {
    divPresence: string;
    changeMode: () => void;
    mode: string;
    theme: string;
    setTheme: React.Dispatch<React.SetStateAction<string>>;
    textDirection: string;
    setTextDirection: React.Dispatch<React.SetStateAction<string>>;
}

const ModeButtons: React.FC<ModeButtonsProps> =
    ({ divPresence, changeMode, mode, theme, setTheme, textDirection, setTextDirection }: ModeButtonsProps) => {

        const changeTheme = () => setTheme(prevState => prevState === "light" ? "dark" : "light");
        const changeTextDirection = () => setTextDirection(prevState => prevState === "ltr" ? "rtl" : "ltr")

        return (
            <div
                id="mode-group"
                style={{ display: divPresence }} >
                <span>Current mode: </span>
                <button
                    id="mode"
                    className="mode-buttons"
                    onClick={changeMode} >
                    {mode === "edit" ? "Edit" : "Read"}
                </button>
                <span>Color theme: </span>
                <button
                    id="theme"
                    className="mode-buttons"
                    onClick={changeTheme} >
                    {theme === "dark" ? "Dark" : "Light"}
                </button>
                <span>Text direction: </span>
                <button
                    id="text-direction"
                    className="mode-buttons"
                    onClick={changeTextDirection} >
                    {textDirection === "ltr" ? "Normal" : "Inverse"}
                </button>
            </div>
        );
    }

export default ModeButtons;
