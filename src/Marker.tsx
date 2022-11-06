import React, { RefObject } from 'react';
import './Teleprompter.css';

interface MarkerProps {
    textMarkerRef: RefObject<HTMLDivElement>,
    fontSize: number,
    lineHeight: number,
    color: string,
    mode: string,
    top: string,
    left: number
}

const Marker: React.FC<MarkerProps> = ({ textMarkerRef, fontSize, lineHeight, color, mode, top, left }: MarkerProps) => {
    return (
        <div ref={textMarkerRef}>
            <svg
                className="text-marker"
                height={fontSize}
                fill={color}
                style={{ display: (mode === "read" ? "initial" : "none"), top: top, left: left, padding: `${fontSize * (lineHeight - 1) / 2} 0` }}
                viewBox="0 0 57 150">
                <path d="M 7.00,45.00 C 7.00,45.00 7.00,111.00 7.00,111.00 7.00,111.00 49.00,78.00 49.00,78.00 49.00,78.00 7.00,45.00 7.00,45.00 Z" />
            </svg>
        </div>
    );
}

export default Marker;