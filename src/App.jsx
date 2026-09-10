import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Bebidas from './pages/Bebidas/Bebidas';  

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Página principal */}
        <Route path="/" element={<Home />} />

        {/* Página de inicio de sesión */}
        <Route path="/login" element={<Login />} />

        {/* Página de bebidas */}
        <Route path="/bebidas" element={<Bebidas />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
