import React from "react";
import "./SuggestionList.css"
const SuggestionList = ({filteredItems,handleItemSelect}) => {
  return (
   <>
   {
     filteredItems.length > 0 && (
        <div className="item-list">
          <div className="item-list-scrollable">
            {
              filteredItems.slice(0, 5).map((item, index) => (
                <div
                  key={item}
                  onClick={() => handleItemSelect(item)}
                  className={`item ${index === 0 ? "first-item" : ""} `}
                >
                  {item}
                </div>
              ))}
          </div>
        </div>
      )
   }
   </>
  );
};

export default SuggestionList;
