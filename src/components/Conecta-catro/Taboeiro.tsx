import { TABLERO, JUGADORES, MOVES } from '../Consts.ts'
import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState } from 'react'
import { checkWinner } from './utils.ts'
import './Taboeiro.css';

export function Taboeiro ({xogadores}: {xogadores: string[]}){
    if(xogadores.length === 0){
      xogadores.push("Xogador 1")
      xogadores.push("Xogador 2")
    }

    const [tablero, setTablero] = useState(TABLERO);
    const [jugador, setJugador] = useState(JUGADORES[1]);
    const [ganador, setGanador] = useState<string|null>(null);
    const [nomJugador, setNomJugador] = useState(xogadores[0]);

    const jugada = (index: number) => () => {
      if(ganador) return;
      const newTablero = [...tablero];
  
      let fila = [...tablero[index]];
      if(!fila.includes(null))
        return;
    
      fila = fila.reverse();
  
      const i = fila.indexOf(null);
      if(i === -1) return;
      fila[i] = jugador;
      fila = fila.reverse();
  
      newTablero[index] = fila;
      setTablero(newTablero);
  
      const newWiner = checkWinner(newTablero);
      if(newWiner){
        if(nomJugador)
          setGanador(nomJugador);
        else
          setGanador(newWiner);
        return ;
      }
  
      jugador === JUGADORES[1] ? setJugador(JUGADORES[2]) : setJugador(JUGADORES[1]);
      
      nomJugador === xogadores[0] ? setNomJugador(xogadores[1]) : setNomJugador(xogadores[0]);
    };
  
    const resetGame = () => {
      setTablero(TABLERO);
      setJugador(jugador===JUGADORES[1] ? JUGADORES[2] : JUGADORES[1]);
      setNomJugador(nomJugador===xogadores[0] ? xogadores[1] : xogadores[0]);
      setGanador(null);
    };
  
  
    return (
      <>
      
        <style>{`
          .movimiento:hover .id {
            cursor: pointer;  
            display: block; 
          }
          `}</style>
        <h1>Conecta 4</h1>
        <h2>Turno de {nomJugador}</h2>
        <div className='set-movimiento'>
          {MOVES.map((_, i) => (
            <div key={i} className='movimiento' 
             onClick={jugada(i)}
            >
            <p className='id'> {jugador} </p>
            </div>
          ))}
        </div>
        <div className="tablero">
          {tablero.map((fila, i) => (
            <div key={i} className="columna">
              {fila.map((casilla: string | number | boolean | ReactElement<unknown, string | JSXElementConstructor<unknown>> | Iterable<ReactNode> | ReactPortal | null | undefined, j: Key | null | undefined) => (
                <div key={j} className="casilla">
                  {casilla}
                </div>
              ))}
            </div>
          ))}
        </div>
        <button onClick={resetGame}
            className='boton-reset'
            >Recomezar</button>
        {ganador && 
        <div className="background-ganador">
          <div className="ganador">
            <h2>{ganador} Gañou!</h2>
            <button onClick={resetGame}
            className='boton-reset'
            >Recomezar</button>
          </div>
        </div>
        }
      </>
    )
}
