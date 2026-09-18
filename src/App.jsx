import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Bebidas from './pages/Bebidas/Bebidas';  
import Clima from './pages/Clima/Clima';
import Habitaciones from './pages/Habitaciones/Habitaciones';
import MisBebidas from './pages/MisBebidas/Misbebidas';
import LoginRedirect from './components/auth/LoginRedirect';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginRedirect><Login /></LoginRedirect>} />
        <Route path="/bebidas" element={<Bebidas />} />
        <Route path="/clima" element={<Clima />} />
        <Route path="/habitaciones" element={<Habitaciones />} />
        <Route path="/mis-bebidas" element={<MisBebidas />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
