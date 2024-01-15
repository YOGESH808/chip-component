import { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  function generateRandomItemList() {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const items = [];

    for (let i = 1; i <= 1000; i++) {
      const randomLetter =
        alphabet[Math.floor(Math.random() * alphabet.length)];
      const randomNumber = Math.floor(Math.random() * 1000);
      const item = `Item ${randomLetter}${randomNumber}`;
      items.push(item);
    }

    return items;
  }

  const items = useRef(generateRandomItemList());
  const [inputValue, setInputValue] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [chips, setChips] = useState([]);
  const [highlightedChip,setHighlightedChip] = useState(null);
  const inputRef = useRef(null);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    setFilteredItems(
      items.current.filter(
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
      items.current.filter(
        (item) => item !== selectedItem && !chips.includes(item)
      )
    );
  };

  const handleInputKeyDown = (event) => {
    if (event.key === "Backspace" && inputValue === "" && chips.length > 0 && highlightedChip===null) {
      const lastChip = chips[chips.length - 1];
      setHighlightedChip(lastChip);
      // console.log("Highlighted", highlightedChip);
    } else if(event.key === "Backspace" && inputValue === "" && highlightedChip!=null){  
      handleChipRemove(highlightedChip);
      setHighlightedChip(null);
      console.log("Highlighted chip after removing", highlightedChip);
    }
    
    if (event.key === "Enter" && inputValue !== "" && filteredItems.length>0) {
      setChips([...chips, filteredItems[0]]);
      setInputValue("");

    }
  };

  const handleChipRemove = (removedChip) => {
    console.log("removing chip",removedChip);
    const updatedChips = chips.filter((chip) => chip !== removedChip);
    setChips(updatedChips);
    setFilteredItems([...filteredItems, removedChip]);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    console.log(highlightedChip);
  }, [chips,highlightedChip]);

  return (
    <div className="search-container">
      <div className="chips-input-container">
        {chips.map((chip, index) => (
          
          <div key={index} className={`chip ${highlightedChip===chip?'highlighted':''}`} >
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
      {
        (filteredItems.length>0 && inputValue!=="") &&
        <div className="item-list">
        <div className="item-list-scrollable">
          {inputValue !== "" &&
            filteredItems.slice(0, 5).map((item,index) => (
              <div
                key={item}
                onClick={() => handleItemSelect(item)}
                className={`item ${index===0?"first-item":""} `}
              >
                {item}
              </div>
            ))}
        </div>
      </div>}
    </div>
  );
}

export default App;