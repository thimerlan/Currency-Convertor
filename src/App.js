import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";
import "./Select.css";

function App() {
  const [rates, setRates] = useState({});
  const [cash, setCash] = useState("");
  const [result, setResult] = useState("");
  const [toPrice, setToPrice] = useState("RUB");
  const [fromPrice, setFromPrice] = useState("USD");
  useEffect(() => {
    async function fetData() {
      try {
        const res = await axios.get("https://cdn.cur.su/api/latest.json");
        setRates(res.data.rates);
      } catch (error) {}
    }
    fetData();
  }, []);


  
  const buckCal = () => {
    let price = cash / rates[fromPrice];
    let result = price * rates[toPrice];
    return setResult(result);
  };
  const buckCalForward = () => {
    let resultx = (rates[fromPrice] / rates[toPrice]) * result;
    console.log(resultx);
    console.log(rates[fromPrice] / rates[toPrice]);
    setCash(resultx);
  };
  const clearInputs = () => {
    setCash("");
    setResult("");
  };

  return (
    <div className="App">
      <main>
        <div className="container">
          <div className="wrapper">
            <div className="top">
              <h1>Welcome to Converter!</h1>
            </div>
            <div className="middle">
              <input
                value={cash}
                onChange={(e) => {
                  setCash(e.target.value);
                }}
                id="minValue"
                placeholder={`Enter ${fromPrice}`}
                type="number"
              />
              <div>
                <div className="containerSelect">
                  <select
                    onChange={(e) => {
                      setFromPrice(e.target.value);
                    }}
                    id="select1"
                    className="selectClassName"
                  >
                    <option value={"RUB"}>RUB</option>
                    <option value={"UZS"}>UZS</option>
                    <option selected value={"USD"}>
                      UZD
                    </option>
                  </select>
                  <label htmlFor="select1" className="downArrow"></label>
                </div>
              </div>

              <span>TO :</span>
              <br />
              <input
                value={result}
                onChange={(e) => {
                  setResult(e.target.value);
                }}
                id="maxValue"
                placeholder={`${toPrice}`}
                type="number"
              />
              <div>
                <div className="containerSelect">
                  <select
                    onChange={(e) => {
                      setToPrice(e.target.value);
                    }}
                    id="select1"
                    className="selectClassName"
                  >
                    <option selected value={"RUB"}>
                      RUB
                    </option>
                    <option value={"UZS"}>UZS</option>
                    <option value={"USD"}>UZD</option>
                  </select>
                  <label htmlFor="select1" className="downArrow"></label>
                </div>
              </div>
            </div>
            <div className="footer">
              {cash.length ? (
                <button
                  disabled={cash ? false : true}
                  onClick={() => buckCal()}
                  // onClick={() => buckCal()}
                  id="generate"
                >
                  Go Ahead !
                </button>
              ) : (
                <button
                  disabled={!cash ? false : true}
                  onClick={() => buckCalForward()}
                  // onClick={() => buckCal()}
                  id="generate"
                >
                  Go Ahead !
                </button>
              )}
              <button onClick={() => clearInputs()} id="generate">
                Clear !
              </button>
            </div>
            <div className="result"></div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
