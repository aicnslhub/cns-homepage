import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Inquiry from './pages/Inquiry';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <Router>
      <div className={`w-full min-h-screen antialiased ${isDarkMode ? 'bg-[#0B0F19] text-gray-100' : 'bg-gray-50 text-gray-800'}`}>
        
        <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

        <main className="page-container max-w-6xl mx-auto px-6 mt-12 min-h-screen">
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home isDarkMode={isDarkMode} />} />
            <Route path="/about" element={<About isDarkMode={isDarkMode} />} />
            <Route path="/products" element={<Products isDarkMode={isDarkMode} />} />
            <Route path="/inquiry" element={<Inquiry isDarkMode={isDarkMode} />} />
          </Routes>
        </main>

        <Footer isDarkMode={isDarkMode} />
        
      </div>
    </Router>
  );
}

export default App;