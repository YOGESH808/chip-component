import React from "react";
import { useState, useRef, useEffect } from "react";
import SuggestionList from "../SuggestionList/SuggestionList";
import "./SearchInput.css"
const SearchInput = ({items}) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [chips, setChips] = useState([]);
  const [highlightedChip, setHighlightedChip] = useState(null);
  const inputRef = useRef(null);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    setFilteredItems(
      items.filter(
        (item) =>
          !chips.includes(item) &&
          item.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleItemSelect = (selectedItem) => {
    setChips([...chips, selectedItem]);
    setInputValue("");
    setFilteredItems(
      items.filter(
        (item) => item !== selectedItem && !chips.includes(item)
      )
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
      // console.log("Highlighted", highlightedChip);
    } else if (
      event.key === "Backspace" &&
      inputValue === "" &&
      highlightedChip != null
    ) {
      handleChipRemove(highlightedChip);
      setHighlightedChip(null);
      console.log("Highlighted chip after removing", highlightedChip);
    }

    if (
      event.key === "Enter" &&
      inputValue !== "" &&
      filteredItems.length > 0
    ) {
      setChips([...chips, filteredItems[0]]);
      setInputValue("");
    }
  };

  const handleChipRemove = (removedChip) => {
    console.log("removing chip", removedChip);
    const updatedChips = chips.filter((chip) => chip !== removedChip);
    setChips(updatedChips);
    setFilteredItems([...filteredItems, removedChip]);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    console.log(highlightedChip);
  }, [chips, highlightedChip]);

  return (
    <div className="search-container">
      <div className="chips-input-container">
        {chips.map((chip, index) => (
          <div
            key={index}
            className={`chip ${highlightedChip === chip ? "highlighted" : ""}`}
          >
            {chip}
            <button
              onClick={() => handleChipRemove(chip)}
              className="chip-remove"
            >
              X
            </button>
          </div>
        ))}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          placeholder="Search items"
        />
      </div>
      {inputValue !=="" && <SuggestionList handleItemSelect={handleItemSelect} filteredItems={filteredItems}/>}
    </div>
  );
};

export default SearchInput;