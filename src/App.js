import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import imagen from './cryptomonedas.png';
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';


const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width: 992px){
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #FFF;
  text-align: left;
  font-weight:700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
  }
`;

function App() {

  const [moneda, setMoneda] = useState('');
  const [criptomoneda, setCriptomoneda] = useState('');
  const [resultado, setResultado] = useState({});

  useEffect(() => {

    const cotizarCriptomoneda = async () => {
      
    if(moneda === '') return;

    //Consultar la API para conseguir cotizacion.
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`; 

    const resultado = await axios.get(url);

    setResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
     
    }
    cotizarCriptomoneda()
  },[moneda, criptomoneda])

  return (
    <Contenedor>

      <div>
        <Imagen
          src={imagen}
          alt="Imagen crypto"
        />
      </div>

      <div>
        <Heading>Cotiza criptomonedas al instante</Heading>
        
        <Formulario
          setMoneda={setMoneda}
          setCriptomoneda={setCriptomoneda}
        />

      <Cotizacion
        resultado={resultado}
      />
      </div>




    </Contenedor>
  );
}

export default App;
