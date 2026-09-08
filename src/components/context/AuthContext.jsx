import { createContext, useContext, useState } from 'react';
import usuarios from '../../data/usuarios.json';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(() => {
    const sesionGuardada = localStorage.getItem('usuarioSesion');

    return sesionGuardada
      ? JSON.parse(sesionGuardada)
      : null;
  });

  const iniciarSesion = (nombreUsuario, password) => {
    const usuarioEncontrado = usuarios.find(
      (user) =>
        user.usuario.toLowerCase() === nombreUsuario.trim().toLowerCase() &&
        user.password === password
    );

    if (!usuarioEncontrado) {
      return {
        success: false,
        message: 'Usuario o contraseña incorrectos',
      };
    }

    const datosSesion = {
      id: usuarioEncontrado.id,
      usuario: usuarioEncontrado.usuario,
      nombre: usuarioEncontrado.nombre,
      correo: usuarioEncontrado.correo,
      rol: usuarioEncontrado.rol,
    };

    localStorage.setItem(
      'usuarioSesion',
      JSON.stringify(datosSesion)
    );

    setUsuario(datosSesion);

    return {
      success: true,
      user: datosSesion,
    };
  };

  const cerrarSesion = () => {
    localStorage.removeItem('usuarioSesion');
    setUsuario(null);
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        iniciarSesion,
        cerrarSesion,
        estaAutenticado: !!usuario,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}