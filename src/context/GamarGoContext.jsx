import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

const GamarGoContext = createContext();

export const GamarGoProvider = ({ children }) => {

  const [bebidasFavoritas, setBebidasFavoritas] = useState([]);
  const [reservaciones, setReservaciones] = useState([]);


  useEffect(() => {

    const favoritosGuardados =
      localStorage.getItem('gamarGo_favoritos');

    const reservacionesGuardadas =
      localStorage.getItem('gamarGo_reservaciones');


    if (favoritosGuardados) {

      setBebidasFavoritas(
        JSON.parse(favoritosGuardados)
      );

    }


    if (reservacionesGuardadas) {

      setReservaciones(
        JSON.parse(reservacionesGuardadas)
      );

    }

  }, []);


  useEffect(() => {

    localStorage.setItem(
      'gamarGo_favoritos',
      JSON.stringify(bebidasFavoritas)
    );

  }, [bebidasFavoritas]);



  useEffect(() => {

    localStorage.setItem(
      'gamarGo_reservaciones',
      JSON.stringify(reservaciones)
    );

  }, [reservaciones]);



  const agregarFavorito = (bebida) => {

    setBebidasFavoritas((actuales) => {

      const existe = actuales.some(
        (item) => item.id === bebida.id
      );


      if (existe) {
        return actuales;
      }


      return [
        ...actuales,
        bebida,
      ];

    });

  };



  const eliminarFavorito = (id) => {

    setBebidasFavoritas((actuales) =>
      actuales.filter(
        (bebida) => bebida.id !== id
      )
    );

  };



  const esFavorito = (id) => {

    return bebidasFavoritas.some(
      (bebida) => bebida.id === id
    );

  };



  const reservarHabitacion = (reservacion) => {

    const nuevaReservacion = {

      id: Date.now(),

      habitacionId:
        reservacion.habitacion.id,

      habitacion:
        reservacion.habitacion.nombre,

      imagen:
        reservacion.habitacion.imagen,

      precio:
        reservacion.habitacion.precio,

      entrada:
        reservacion.entrada,

      salida:
        reservacion.salida,

      huespedes:
        reservacion.huespedes,

      fechaReserva:
        new Date().toISOString(),

      estado: 'Confirmada',

    };


    setReservaciones((actuales) => [

      ...actuales,

      nuevaReservacion,

    ]);


    return nuevaReservacion;

  };



  const cancelarReservacion = (id) => {

    setReservaciones((actuales) =>
      actuales.filter(
        (reservacion) =>
          reservacion.id !== id
      )
    );

  };


  return (

    <GamarGoContext.Provider
      value={{

        bebidasFavoritas,

        reservaciones,

        agregarFavorito,

        eliminarFavorito,

        esFavorito,

        reservarHabitacion,

        cancelarReservacion,

      }}
    >

      {children}

    </GamarGoContext.Provider>

  );

};


export const useGamarGo = () => {

  return useContext(GamarGoContext);

};