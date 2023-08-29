import Arrow from "../../assets/images/icon-arrow-down.svg";
import "./CustomSelectBox.css";
import Logo from "../../assets/images/logo.svg";
import React, { useState, useEffect, useRef } from "react";

const CustomSelectBox = ({ darkMode, selectedFont, onFontSelect }) => {
  const [selectedOption, setSelectedOption] = useState({
    label: "San Serif",
    value: "Inter",
  });
  const [fontFamily, setFontFamily] = useState("Inter");
  const options = [
    { label: "San Serif", value: "Inter", dataFont: "Inter" },
    { label: "Serif", value: "Lora", dataFont: "Lora" },
    { label: "Mono", value: "Inconsolata", dataFont: "Inconsolata" },
  ];
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const ref = useRef(null);

  const handleArrowClick = () => {
    setIsOptionsOpen(!isOptionsOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOptionsOpen(false);
    const selectedOption = options.find((o) => o.label === option.label);
    if (selectedOption) {
      const selectedFont = selectedOption.dataFont;
      setFontFamily(selectedFont);
      onFontSelect(selectedFont);
    }
  };

  useEffect(() => {
    console.log("fontFamily:", fontFamily);
    if (ref.current) {
      const selectedElement = ref.current.querySelector(
        `[data-font="${fontFamily}"]`
      );
      console.log("selectedElement:", selectedElement);
      if (selectedElement) {
        selectedElement.classList.add("selected");
      }
    }
  }, [ref, fontFamily]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOptionsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <div id="header-container" className={darkMode ? "dark-mode" : ""}>
      <img src={Logo} alt="Logo" />
      <div className={`custom-select-box ${darkMode ? "dark-mode" : ""}`}>
        <div className={`select-box ${isOptionsOpen ? "open" : ""}`} ref={ref}>
          <div
            className={`selected-option ${selectedOption.value.toLowerCase()}-font`}
            onClick={handleArrowClick}
          >
            {selectedOption.label}
            <img id="arrow" src={Arrow} alt="Arrow down" />
          </div>
          {isOptionsOpen && (
            <div className="options" style={{ fontFamily: fontFamily }}>
              {options.map((option) => (
                <div
                  key={option.value}
                  className={`option ${
                    selectedOption.value === option.value ? "selected" : ""
                  }`}
                  data-font={option.dataFont}
                  onClick={() => handleOptionClick(option)}
                >
                  {option.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomSelectBox;
