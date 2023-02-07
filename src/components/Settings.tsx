import React, { Dispatch, SetStateAction } from 'react';

interface SettingsProps {
    divPresence: string;
    fontSize: number;
    setFontSize: Dispatch<SetStateAction<number>>;
    lineHeight: number;
    setLineHeight: Dispatch<SetStateAction<number>>;
    textSpeed: number;
    setTextSpeed: Dispatch<SetStateAction<number>>;
    textMargin: number;
    setTextMargin: Dispatch<SetStateAction<number>>;
}

const Settings: React.FC<SettingsProps> =
    ({ divPresence, fontSize, setFontSize, lineHeight, setLineHeight, textSpeed, setTextSpeed, textMargin, setTextMargin }: SettingsProps) => {

        const remValue = parseInt(window.getComputedStyle(document.body).getPropertyValue("font-size"));

        const changeFontSize = (e: React.ChangeEvent<HTMLInputElement>) => setFontSize(Number(e.target.value) / remValue);
        const changeLineHeight = (e: React.ChangeEvent<HTMLInputElement>) => setLineHeight(Number(e.target.value));
        const changeTextSpeed = (e: React.ChangeEvent<HTMLInputElement>) => setTextSpeed(Number(e.target.value));
        const changeTextMargin = (e: React.ChangeEvent<HTMLInputElement>) => setTextMargin(Number(e.target.value));

        return (
            <div
                id="settings"
                style={{ display: divPresence }} >
                <label htmlFor="font-size">Font size: </label>
                <input
                    id="font-size"
                    className="settings-slider"
                    type="range" min="40" max="150" step="1"
                    value={fontSize * remValue}
                    onChange={changeFontSize}
                />
                <span>{(fontSize * remValue).toFixed(0)}</span>
                <label htmlFor="line-height">Line height: </label>
                <input
                    id="line-height"
                    className="settings-slider"
                    type="range" min="1" max="1.5" step="0.01"
                    value={lineHeight}
                    onChange={changeLineHeight}
                />
                <span>{lineHeight.toFixed(2)}</span>
                <label htmlFor="text-speed">Text speed: </label>
                <input
                    id="text-speed"
                    className="settings-slider"
                    type="range" min="20" max="200" step="1"
                    value={textSpeed}
                    onChange={changeTextSpeed}
                />
                <span>{textSpeed}</span>
                <label htmlFor="text-margin">Margin: </label>
                <input
                    id="text-margin"
                    className="settings-slider"
                    type="range" min="0" max="40" step="1"
                    value={textMargin}
                    onChange={changeTextMargin}
                />
                <span>{textMargin}</span>
            </div>
        );
    }

export default Settings;
