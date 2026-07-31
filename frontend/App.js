import React, { useEffect } from 'react';
import Rotas from './src/Rotas';
import useAuthStore from './src/Zustand/RegistroLogin';

export default function App() {
  const carregarTokenSalvo = useAuthStore((state) => state.carregarTokenSalvo);

  useEffect(() => {
    carregarTokenSalvo();
  }, [carregarTokenSalvo]);

  return <Rotas />;
}