import CustomSelectBox from "./CustomSelectBox/CustomSelectBox";
import ToggleSwitch from "./ToggleSwitch/ToggleSwitch";
import Main from "./Main/Main";
import { useState } from "react";

const Dictionary = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedFont, setSelectedFont] = useState("Inter");/*this*/

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <div
      id="dictionary"
      className={darkMode ? "dark-mode" : ""}
    >
      <header>
        <CustomSelectBox
          darkMode={darkMode}
          selectedFont={selectedFont}
          onFontSelect={setSelectedFont}
        />
        <ToggleSwitch darkMode={darkMode} onToggle={toggleDarkMode} />
      </header>

      <Main selectedFont={selectedFont} />
    </div>
  );
};

export default Dictionary;
