import React, { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");

  const handleClick = (value) => {
    setInput(input + value);
  };

  const calculate = () => {
    try {
      setInput(eval(input).toString());
    } catch {
      setInput("Error");
    }
  };

  const clear = () => {
    setInput("");
  };

  const deleteLast = () => {
    setInput(input.slice(0, -1));
  };

  return (
    <div className="container">
      <div className="calculator">
        <h1>Calculator</h1>

        <input
          type="text"
          value={input}
          className="display"
          readOnly
        />

        <div className="buttons">
          <button onClick={clear} className="special">AC</button>
          <button onClick={deleteLast} className="special">DEL</button>
          <button onClick={() => handleClick("%")} className="operator">%</button>
          <button onClick={() => handleClick("/")} className="operator">÷</button>

          <button onClick={() => handleClick("7")}>7</button>
          <button onClick={() => handleClick("8")}>8</button>
          <button onClick={() => handleClick("9")}>9</button>
          <button onClick={() => handleClick("*")} className="operator">×</button>

          <button onClick={() => handleClick("4")}>4</button>
          <button onClick={() => handleClick("5")}>5</button>
          <button onClick={() => handleClick("6")}>6</button>
          <button onClick={() => handleClick("-")} className="operator">−</button>

          <button onClick={() => handleClick("1")}>1</button>
          <button onClick={() => handleClick("2")}>2</button>
          <button onClick={() => handleClick("3")}>3</button>
          <button onClick={() => handleClick("+")} className="operator">+</button>

          <button onClick={() => handleClick("0")} className="zero">0</button>
          <button onClick={() => handleClick(".")}>.</button>
          <button onClick={calculate} className="equal">=</button>
        </div>
      </div>
    </div>
  );
}

export default App;