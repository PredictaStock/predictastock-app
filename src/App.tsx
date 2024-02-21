import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './screens/mainPage/main';
import StockPage from './screens/stockPage/stockPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/stockPage/:stockName" element={<StockPage />} />
        <Route path="/" element={<Main />} />
      </Routes>
    </Router>
  );
}

export default App;
