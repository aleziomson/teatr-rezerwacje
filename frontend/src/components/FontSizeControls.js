import React from "react";
import { useFontSize } from "./FontSizeContext";
import "./FontSizeControls.css"; // Załóżmy, że stworzyłeś ten plik ze stylami

export function FontSizeControls() {
    const { currentFontSize, changeFontSize, fontSizes } = useFontSize();

    return (
        <div className="font-size-controls">
            <span>Rozmiar czcionki: </span>
            <div className="font-size-buttons">
                {fontSizes.map((size) => (
                    <button
                        key={size}
                        className={`font-size-button ${currentFontSize === size ? "active" : ""}`}
                        onClick={() => changeFontSize(size)}
                    >
                        {size === "small" && "A"}
                        {size === "medium" && "A"}
                        {size === "large" && "A"}
                        {size === "extraLarge" && "A"}
                    </button>
                ))}
            </div>
        </div>
    );
}

// Alternatywnie, możemy stworzyć komponent z suwakiem
export function FontSizeSlider() {
    const { currentFontSize, changeFontSize } = useFontSize();

    const sizeValues = {
        "small": 1,
        "medium": 2,
        "large": 3,
        "extraLarge": 4
    };

    const handleChange = (e) => {
        const value = parseInt(e.target.value);
        const size = Object.keys(sizeValues).find(key => sizeValues[key] === value);
        changeFontSize(size);
    };

    return (
        <div className="font-size-slider">
            <span className="small-icon">A</span>
            <input
                type="range"
                min="1"
                max="4"
                value={sizeValues[currentFontSize]}
                onChange={handleChange}
            />
            <span className="large-icon">A</span>
        </div>
    );
}