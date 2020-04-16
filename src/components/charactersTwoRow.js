import React from "react";

export default function CharactersTwoRow({ characters, handleClick }) {
  return (
    <div className="character-row characters-two-raw">
      <div className="btn-row">
        {characters[0].map((character) => (
          <button key={character} name={character} onClick={handleClick}>
            {character}
          </button>
        ))}
      </div>
      <div className="btn-row">
        {characters[1].map((character) => (
          <button
            key={character}
            name={
              character === "/static/media/remove.291b516c.svg"
                ? "clear"
                : character
            }
            onClick={handleClick}
            className={character === "=" ? "button-result " : null}
          >
            {character === "/static/media/remove.291b516c.svg" && (
              <img
                src={character}
                alt={character}
                className="button-remove"
                name="clear"
              />
            )}
            {character.length < 5 && character}
          </button>
        ))}
      </div>
    </div>
  );
}
