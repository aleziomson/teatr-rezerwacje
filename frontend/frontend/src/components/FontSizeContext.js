import React, { createContext, useContext, useState, useEffect } from "react";

const FontSizeContext = createContext();

const fontSizes = {
    small: {
        baseFontSize: "14px",
        scale: 0.9,
    },
    medium: {
        baseFontSize: "16px",
        scale: 1,
    },
    large: {
        baseFontSize: "18px",
        scale: 1.1,
    },
    extraLarge: {
        baseFontSize: "20px",
        scale: 1.2,
    }
};

export function FontSizeProvider({ children }) {
    // pobranie preferencji czcionki, podstawowo medium
    const savedFontSize = localStorage.getItem("preferredFontSize") || "medium";
    const [currentFontSize, setCurrentFontSize] = useState(savedFontSize);

    const changeFontSize = (size) => {
        if (fontSizes[size]) {
            setCurrentFontSize(size);
            localStorage.setItem("preferredFontSize", size);
            applyFontSize(size);//ustawienie rozmiaru czcionki
        }
    };

    const applyFontSize = (size) => {
        const fontSize = fontSizes[size];
        // ustawienie czcionki w pliku HTML
        document.body.style.fontSize = fontSize.baseFontSize;
    };

    useEffect(() => {
        applyFontSize(currentFontSize);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <FontSizeContext.Provider
            value={{
                currentFontSize,
                changeFontSize,
                fontSizes: Object.keys(fontSizes)
            }}
        >
            {children}
        </FontSizeContext.Provider>
    );
}

export const useFontSize = () => useContext(FontSizeContext);