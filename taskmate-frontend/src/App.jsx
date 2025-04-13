// src/App.jsx
import React from "react";
import Header from "./components/Header";
import Home from "./pages/Home";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Home />
    </div>
  );
};

export default App;
