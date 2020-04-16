import React, { useState, useEffect } from "react";
import charactersFour from "./static/apiForFour";
import charactersTwo from "./static/apiForTwo";
import History from "./components/history";
import CharactersTwoRow from "./components/charactersTwoRow";
import CharactersFourRow from "./components/charactersFourRow";
import axios from "axios";

function App() {
  const [val, setVal] = useState("");
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCalculation()
      .then((data) => setStore(data.data))
      .finally(setLoading(false));
  }, []);

  async function getCalculation() {
    setLoading(true);

    let data = await axios.get("http://localhost:3000/calculations");
    return data;
  }

  async function postCalculation(obj) {
    let response = await axios.post("http://localhost:3000/calculations", obj);
    return response;
  }

  function handleClick(e) {
    const name = e.target.name;

    if (
      name === "1" ||
      name === "2" ||
      name === "3" ||
      name === "4" ||
      name === "5" ||
      name === "6" ||
      name === "7" ||
      name === "8" ||
      name === "9" ||
      name === "0"
    ) {
      setVal(val + name);
    }

    if (val.length > 0) {
      const lastLetter = val ? val.slice(-1) : val;

      if (name === ".") {
        if (
          lastLetter === "1" ||
          lastLetter === "2" ||
          lastLetter === "3" ||
          lastLetter === "4" ||
          lastLetter === "5" ||
          lastLetter === "6" ||
          lastLetter === "7" ||
          lastLetter === "8" ||
          lastLetter === "9" ||
          lastLetter === "0"
        ) {
          setVal(val + name);
        }
      }

      if (name === "clear") {
        setVal(val.slice(0, -1));
      }

      if (name === "=") {
        if (
          lastLetter === "1" ||
          lastLetter === "2" ||
          lastLetter === "3" ||
          lastLetter === "4" ||
          lastLetter === "5" ||
          lastLetter === "6" ||
          lastLetter === "7" ||
          lastLetter === "8" ||
          lastLetter === "9" ||
          lastLetter === "0"
        ) {
          const newCalculation = {
            calculation: val,
            date: new Date(),
            id: new Date(),
          };

          const result = eval(val);

          postCalculation(newCalculation).then(() =>
            getCalculation()
              .then((data) => setStore(data.data))
              .finally(setLoading(false))
          );
          setVal(result);
        }
      }

      if (name === "+/-") {
        if (
          lastLetter === "1" ||
          lastLetter === "2" ||
          lastLetter === "3" ||
          lastLetter === "4" ||
          lastLetter === "5" ||
          lastLetter === "6" ||
          lastLetter === "7" ||
          lastLetter === "8" ||
          lastLetter === "9" ||
          lastLetter === "0"
        ) {
          const getVal = val
            .match(/[+-]?\d+(?:\.\d+)?/g)
            .map(Number)
            .pop();

          if (Math.sign(getVal) < 0) {
            const positive = Math.abs(getVal).toString();
            const replacedNum = val.replace(/[0-9]+(?!.*[0-9])/, positive);
            setVal(replacedNum);
            // console.log("replacedNumPoitive", positive);
          } else {
            const negative = -Math.abs(getVal).toString();
            const replacedNum = val.replace(/[0-9]+(?!.*[0-9])/, negative);
            setVal(replacedNum);
            // console.log("replacedNumnegativ", negative);
          }
        }
      }

      if (
        name === "-" ||
        name === "+" ||
        name === "/" ||
        name === "%" ||
        name === "*"
      ) {
        if (
          lastLetter === "1" ||
          lastLetter === "2" ||
          lastLetter === "3" ||
          lastLetter === "4" ||
          lastLetter === "5" ||
          lastLetter === "6" ||
          lastLetter === "7" ||
          lastLetter === "8" ||
          lastLetter === "9" ||
          lastLetter === "0"
        ) {
          setVal(val + name);
        }
      }
    }

    if (name === "C" || name === "CE") {
      setVal("");
    }
  }

  return (
    <div className="container">
      {loading ? (
        <div className="loader">loading... please wait</div>
      ) : (
        store && <History store={store} />
      )}
      <div className="calculator">
        <div className="calculator-output">{val}</div>
        <CharactersFourRow
          characters={charactersFour}
          handleClick={handleClick}
        />
        <CharactersTwoRow
          characters={charactersTwo}
          handleClick={handleClick}
        />
      </div>
    </div>
  );
}

export default App;
