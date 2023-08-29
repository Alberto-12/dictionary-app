import React, { useState, useEffect } from "react";
import SearchIcon from "../../assets/images/icon-search.svg";
import "./Main.css";
import icon from "../../assets/images/icon-play.svg";
import NewWindow from "../../assets/images/icon-new-window.svg";
import iconHover from "../../assets/images/icon-play-hover.svg";

const Main = ({ darkMode, selectedFont }) => {
  const [wordData, setWordData] = useState(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getRandomWord = () => {
    const words = [
      "apple",
      "banana",
      "chocolate",
      "elephant",
      "guitar",
      "orange",
    ];
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  };

  useEffect(() => {
    if (isInitialLoad) {
      const randomWord = getRandomWord();
      fetchWordData(randomWord);
      setIsInitialLoad(false);
    }
  }, [isInitialLoad]);

  const fetchWordData = (word) => {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      .then(async (res) => {
        if (!res.ok) {
          throw new Error();
        }
        setError(false);
        setErrorMessage("");
        return res.json();
      })
      .then((data) => {
        setWordData(data);
        setIsLoading(false); // Set loading state to false on success
      })
      .catch(() => {
        setError(true);
        setErrorMessage("No Definitions Found");
        setWordData(null);
        setIsLoading(false); // Set loading state to false on error
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchWord = e.target.elements.search.value;
    fetchWordData(searchWord);
  };

  if (isLoading && wordData === null) {
    return <div>Loading...</div>; // Show loading indicator
  }

  return (
    <div id="main-container" className={`${darkMode ? "dark-mode" : ""}`}>
      <div style={{ fontFamily: selectedFont }}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="search-input"
            name="search"
            placeholder="Search for any word…"
            style={{
              backgroundImage: `url(${SearchIcon})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "95% 50%",
              fontFamily: selectedFont,
            }}
          />
        </form>
        {/* Rest of your code */}
        {wordData && wordData.length > 0 ? (
          <div>
            <div id="word-audio-div">
              <div>
                <h1 id="word">{wordData[0]?.word}</h1>
                <p id="phonetic">{wordData[0]?.phonetics[0]?.text}</p>
              </div>
              <div
                id="play-icon"
                style={{
                  backgroundImage: `url(${isHovered ? iconHover : icon})`,
                  width: "50px",
                  height: "50px",
                  cursor: "pointer",
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => {
                  const audioObj = wordData[0].phonetics.find((p) => p.audio);
                  if (audioObj) {
                    const audio = new Audio(audioObj.audio);
                    audio.play();
                  }
                }}
              ></div>
            </div>

            {/* Check if wordData has meanings */}
            {wordData[0]?.meanings?.map((meaning, index) => (
              <div key={index}>
                <div id="definition-div">
                  <p id="definition">{meaning?.partOfSpeech}</p>
                  <hr />
                </div>
                <p id="meaning">Meaning</p>
                <ul id="meanings">
                  {meaning?.definitions?.map((definition, index) => (
                    <li key={index}>{definition.definition}</li>
                  ))}
                </ul>
                <div id="synonymos-div">
                  <h3 id="synonymos">Synonyms</h3>
                  {meaning?.definitions?.[0]?.synonyms?.length > 0 ? (
                    <p id="synonymos-example">
                      {meaning.definitions[0].synonyms[0]}
                    </p>
                  ) : meaning?.synonyms && meaning.synonyms.length > 0 ? (
                    <p id="synonymos-example">{meaning.synonyms[0]}</p>
                  ) : (
                    <p id="synonymos-example">No synonyms found.</p>
                  )}
                </div>
              </div>
            ))}

            <hr id="bottom-hr" />
            <div id="link-div">
              <a id="source" href="/">
                Source
              </a>
              <div id="source-div">
                <a
                  id="link"
                  href={wordData[0]?.sourceUrls?.[0]}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {wordData[0]?.sourceUrls?.[0]}
                </a>
                <a
                  href={wordData[0]?.sourceUrls?.[0]}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <img src={NewWindow} alt="New Window" />
                </a>
              </div>
            </div>
          </div>
        ) : wordData === null && !isInitialLoad ? (
          // Handle the case when no data is available (error)
          <div id="error-message">
            <div id="error-emoji">😕</div>
            <p id="first-error-message">{errorMessage}</p>
            <div id="second-error-message">
              Sorry pal, we couldn't find definitions for the word you were
              looking for. You can try the search again at a later time or head
              to the web instead.
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Main;

