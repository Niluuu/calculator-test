import React from "react";

export default function CharactersFourRow({ characters, handleClick }) {
  return (
    <div className="character-row characters-four-raw">
      <div className="btn-row">
        {characters[0].map((character) => (
          <button
            key={character}
            name={
              character === "/static/media/remove.291b516c.svg"
                ? "clear"
                : character
            }
            onClick={handleClick}
          >
            {character === "/static/media/remove.291b516c.svg" && (
              <img
                src={character}
                alt={character}
                className="button-remove"
                name="clear"
              />
            )}
            {character.length < 3 && character}
          </button>
        ))}
      </div>
      <div className="btn-row">
        {characters[1].map((character) => (
          <button key={character} name={character} onClick={handleClick}>
            {character}
          </button>
        ))}
      </div>
      <div className="btn-row">
        {characters[2].map((character) => (
          <button key={character} name={character} onClick={handleClick}>
            {character}
          </button>
        ))}
      </div>
      <div className="btn-row">
        {characters[3].map((character) => (
          <button key={character} name={character} onClick={handleClick}>
            {character}
          </button>
        ))}
      </div>
      <div className="btn-row">
        {characters[4].map((character) => (
          <button
            key={character}
            name={character}
            onClick={handleClick}
            className={character === "=" ? "button-result " : null}
          >
            {character}
          </button>
        ))}
      </div>
    </div>
  );
}
