import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";
import "./Select.css";

//cdn.cur.su/api/nbu.json
// https://cdn.cur.su/api/latest.json
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
  //   console.log(rates);
  const buckCal = () => {
    let price = cash / rates[fromPrice];
    let result = price * rates[toPrice];
    return setResult(result);
  };

  console.log(result);
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
              <button onClick={() => buckCal()} id="generate">
                Go Ahead !
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
