# Frontend Mentor - Dictionary web app solution

This is a solution to the [Dictionary web app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/dictionary-web-app-h5wwnyuKFL). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- Search for words using the input field
- See the Free Dictionary API's response for the searched word
- Play the audio file for a word when it's available
- Switch between serif, sans serif, and monospace fonts
- Switch between light and dark themes
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Screenshot
![](./src/assets/images/Screenshot%202023-04-17%20at%2015-18-30%20Dictionary%20App.png)

### Links

- Live Site URL: [ live site URL here](https://dictionarius-app.netlify.app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library

### What I learned

During this project, I learned several new skills related to web development, including:

- API integration: I learned how to use an API to retrieve data and display it on a web page. Specifically, I integrated the Free Dictionary API to allow users to search for words and see the API's response.

- Audio playback: I learned how to play audio files using JavaScript, which allowed me to include a feature that plays the pronunciation of a word when it's available in the API response.

- Font switching: I learned how to allow users to switch between different font styles (serif, sans-serif, and monospace) using JavaScript and CSS.

- Theme switching: I learned how to allow users to switch between light and dark themes, which involved changing the CSS styles of various elements based on the user's selection.

- Responsive design: I learned how to create a responsive design that adapts to different screen sizes and orientations, using CSS media queries and other techniques.

- Accessibility: I learned how to incorporate hover and focus states for interactive elements on the page, making the app more accessible to users with visual impairments or using assistive technology.

Overall, this project helped me develop a better understanding of various web development concepts and techniques, and provided me with valuable hands-on experience in creating a fully functional web application from scratch.

I'm really porud of the component I created for FontSelection. Here's the snippet:

```jsx
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
}
```
### Continued development

While I'm satisfied with the functionality and design of the current version of the dictionary app, there are several areas where I could continue to develop and improve the app in the future. Some possible directions for continued development include:

- Improved search functionality: Currently, the app relies on exact matches for word searches. In the future, I could implement more advanced search algorithms to allow for partial matches, synonyms, and related words.

- Expanded API support: While the Free Dictionary API provides a rich source of word data, there are other APIs that could be integrated to provide additional features or data. For example, I could integrate an API for word translation, or a database of idioms and expressions.

- User accounts and personalized features: In the future, I could add support for user accounts and personalized features, such as saving favorite words or creating custom word lists.

- Improved accessibility: While the current version of the app includes basic accessibility features, there is always room for improvement. I could work on further improving the app's accessibility for users with different needs and abilities.

Overall, I believe there is significant potential for continued development and improvement of the dictionary app, and I look forward to exploring these possibilities in the future.

## Author

- Frontend Mentor - [@Alberto-12](https://www.frontendmentor.io/profile/Alberto-12)

## Acknowledgments

I'm very thankful for my mentor [Tresure Kabareebe](https://github.com/trekab) that guided me through the process.
