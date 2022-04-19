import React from "react";
import Details from "./Details";
import Issues from "./Issues";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" exact element={<Issues />} />
          <Route path="/issues/:id" element={<Details />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
