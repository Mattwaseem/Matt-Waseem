import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainScene from './components/MainScene';
import MastersNarrative from './narratives/MastersNarrative';
import BachelorsNarrative from './narratives/BachelorsNarrative';
// Import other narrative components as needed

function App() {
  return (
    // No need for <Router> here since we're using it in index.js
    <Routes>
      <Route path="/" element={<MainScene />} />
      <Route path="/masters" element={<MastersNarrative />} />
      <Route path="/bachelors" element={<BachelorsNarrative />} />
      {/* Define other routes for each narrative */}
      {/* ... */}
    </Routes>
  );
}

export default App;
