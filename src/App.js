import './App.css';
import { useState } from "react";

// Display Function
function Display({ display }) {
  return (
    <>{display}</>
  );
}

// Key Function
function Key({ label, onClick, className }) {
  return (
    <button onClick={onClick} className={className}>
      {label}
    </button>
  );
}

// App Function
function App() {
  const [pin, setPin] = useState("1234567890");
  const [num, setNum] = useState(0);
  const [disp, setDisp] = useState("INPUT CODE");
  const [changePinState, setChangePinState] = useState(0);

  // Number Click Handler
  const numClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
    setNum(num === 0 ? value : num + value);
    setDisp(num === 0 ? value : num + value);
  };

  // Enter Click Handler
  const enterClickHandler = () => {
    if (changePinState === 0) {
      setDisp(num === pin ? "OPEN" : "LOCKED");
    } else if (changePinState === 1) {
      setDisp(num === pin ? "ENTER NEW CODE" : "INVALID CODE");
      if (num === pin) setChangePinState(2);
    } else if (changePinState === 2) {
      if (num.length >= 8) {
        setPin(num);
        setDisp("CHANGE CODE SUCCESSFUL");
        setChangePinState(0);
      } else {
        setDisp("CODE SHOULD BE 8 DIGITS");
      }
    }
    setNum(0);
  };

  // Clear Click Handler
  const clrClickHandler = () => {
    setNum(0);
    setDisp("INPUT CODE");
  };

  // Name Click Handler
  const nameClickHandler = () => {
    setDisp("MERVIE V. ISIP");
  };

  // Subject Click Handler
  const subjClickHandler = () => {
    setDisp("CPEITEL3");
  };

  // Pin Click Handler
  const pinClickHandler = () => {
    setDisp("ENTER CURRENT CODE");
    setChangePinState(1);
  };

  return (
    <div className="App">
      <div className="Calc">
        <div className="Disp">
          <Display display={disp} />
        </div>
        <div className="Buttons">
          {[7, 8, 9, 4, 5, 6, 1, 2, 3, "RESET", 0, "ENTER"].map((item) => (
            <Key label={item} onClick={item === "ENTER" ? enterClickHandler : item === "RESET" ? clrClickHandler : numClickHandler} />
          ))}
        </div>
        <div className="nameButton">
          <Key label="NAME" onClick={nameClickHandler} />
          <Key label="SUBJ" onClick={subjClickHandler} />
          <Key label="PIN" onClick={pinClickHandler} />
        </div>
      </div>
    </div>
  );
}

export default App;