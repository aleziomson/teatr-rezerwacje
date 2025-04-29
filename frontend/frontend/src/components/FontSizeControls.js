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