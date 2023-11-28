import React, { useState } from 'react';
import './App.css';

function App() {
  const [gradient, setGradient] = useState('');

  const generateRandomColor = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  };

  const generateGradient = () => {
    const numColors = Math.floor(Math.random() * 4) + 2;
    let gradientColors = '';

    for (let i = 0; i < numColors; i++) {
      gradientColors += generateRandomColor();
      if (i !== numColors - 1) gradientColors += ', ';
    }

    setGradient(`linear-gradient(to right, ${gradientColors})`);
  };

  return (
    <div className="App">
      <div className="gradient-box" style={{ background: gradient }}></div>
      <button onClick={generateGradient}>Generate Gradient</button>
    </div>
  );
}

export default App;
