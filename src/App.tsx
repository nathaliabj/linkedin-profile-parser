import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RetrieveUserPopUp from "./components/PopUp";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <RetrieveUserPopUp />
        </header>
      </div>
    </Router>
  );
}

export default App;
