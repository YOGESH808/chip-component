import React from "react";
import { useState, useRef, useEffect } from "react";
import SuggestionList from "../SuggestionList/SuggestionList";
import "./SearchInput.css";

const SearchInput = ({ profiles }) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredProfiles, setfilteredProfiles] = useState([]);
  const [chips, setChips] = useState([]);
  const [highlightedChip, setHighlightedChip] = useState(null);
  const inputRef = useRef(null);
  const [focused,setFocused] = useState(false);
  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    setfilteredProfiles(
      profiles.filter(
        (profile) =>
          !chips.includes(profile) &&
          profile.name.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleItemSelect = (selectedItem) => {
    setChips([...chips, selectedItem]);
    setInputValue("");
    setfilteredProfiles(
      profiles.filter((profile) => profile !== selectedItem && !chips.includes(profile))
    );
  };

  const handleInputKeyDown = (event) => {
    if (
      event.key === "Backspace" &&
      inputValue === "" &&
      chips.length > 0 &&
      highlightedChip === null
    ) {
      const lastChip = chips[chips.length - 1];
      setHighlightedChip(lastChip);
    } else if (
      event.key === "Backspace" &&
      inputValue === "" &&
      highlightedChip != null
    ) {
      handleChipRemove(highlightedChip);
      setHighlightedChip(null);
    }

    if (
      event.key === "Enter" &&
      inputValue !== "" &&
      filteredProfiles.length > 0
    ) {
      setChips([...chips, filteredProfiles[0]]);
      setInputValue("");
    }
  };

  const handleChipRemove = (removedChip) => {
    const updatedChips = chips.filter((chip) => chip !== removedChip);
    setChips(updatedChips);
    setfilteredProfiles([...filteredProfiles, removedChip]);
  };

  const handleOnFocus = ()=>{
    setFocused(true)
    setfilteredProfiles(
      profiles.filter((profile) => !chips.includes(profile))
    );
  }

  const handleOnBlur = ()=>{
    setFocused(false);
    console.log("onBlur");
  }


  useEffect(()=>{
    if(!focused)
    {
      setfilteredProfiles([]);
    }
  },[setFocused]);
  return (
    <div className="search-container">
      <div className="chips-input-container">
        {chips.map((chip, index) => (
          <div
            key={index}
            className={`chip ${highlightedChip === chip ? "highlighted" : ""}`}
          >
            <img
              src={chip.image}
              alt={chip.name}
              className="chip-image"
            />
            <div className="chip-content">
              <div>{chip.name}</div>
              <button
                onClick={() => handleChipRemove(chip)}
                className="chip-remove"
              >
                X
              </button>
            </div>
          </div>
        ))}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          placeholder="Search profiles"
          onFocus={handleOnFocus}
        />
      </div>
      {(
           <SuggestionList
          handleItemSelect={handleItemSelect}
          filteredProfiles={filteredProfiles}
        />
      )}
    </div>
  );
};

export default SearchInput;
