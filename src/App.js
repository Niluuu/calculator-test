import React, { useState, useEffect } from "react";
import charactersFour from "./static/apiForFour";
import charactersTwo from "./static/apiForTwo";
import History from "./components/history";
import CharactersTwoRow from "./components/charactersTwoRow";
import CharactersFourRow from "./components/charactersFourRow";
import axios from "axios";
import moment from "moment";

function App() {
  const [val, setVal] = useState("");
  const [calculations, setCalculations] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCalculation()
      .then((data) => setCalculations(data.data))
      .then(setLoading(false));
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

    if (!Number.isNaN(+name)) {
      setVal(val + name);
    }

    if (val.length > 0) {
      const lastCaracter = val ? val.slice(-1) : val;

      if (name === ".") {
        if (!Number.isNaN(+lastCaracter)) {
          setVal(val + name);
        }
      }

      if (name === "clear") {
        setVal(val.slice(0, -1));
      }

      if (name === "=") {
        if (!Number.isNaN(+lastCaracter)) {
          const newCalculation = {
            calculation: val,
            date: moment(new Date()).format("hh:mm:ss: DD-MM-YYYY"),
            id: new Date(),
          };

          const result = eval(val);

          postCalculation(newCalculation).then(() =>
            getCalculation()
              .then((data) => setCalculations(data.data))
              .then(setLoading(false))
          );
          setVal(result);
        }
      }

      if (name === "+/-") {
        if (!Number.isNaN(+lastCaracter)) {
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
        if (!Number.isNaN(+lastCaracter)) {
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
        calculations && <History store={calculations} />
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
