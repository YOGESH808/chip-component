import React from "react";
import "./SuggestionList.css";
const SuggestionList = ({filteredProfiles,handleItemSelect }) => {
  return (
    <>
     {filteredProfiles.length > 0 && (
        <div className="item-list">
          <div className="item-list-scrollable">
            {filteredProfiles.map((profile, index) => (
              <div
                key={profile.id}
                onClick={() => handleItemSelect(profile)}
                className={`item ${index === 0 ? "first-item" : ""}`}
              >
                <img
                  src={profile.image}
                  alt={profile.name}
                  className="profile-image"
                />
                <div className="profile-details">
                  <div className="profile-name">{profile.name}</div>
                  <div className="profile-email">{profile.email}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default SuggestionList;
