import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Bebidas from './pages/Bebidas/Bebidas';  
import Clima from './pages/Clima/Clima';
import Habitaciones from './pages/Habitaciones/Habitaciones';


function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/bebidas" element={<Bebidas />} />
        <Route path="/clima" element={<Clima />} />
        <Route path="/habitaciones" element={<Habitaciones />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
