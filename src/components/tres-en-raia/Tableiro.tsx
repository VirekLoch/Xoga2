import { SQUARE, SQUARE2 } from "./Cuadrado.js";
import { useState } from "react";
import { WINER_COMBINATIONS, TURNS } from "../Consts.js";
import './tres-en-raia.css';

export function Board ({xogadores}: {xogadores: string[]}){
    const [board, setBoard] = useState(() => {
        const savedBoard = window.localStorage.getItem('board');
        return savedBoard ? JSON.parse(savedBoard) : Array(9).fill(null);
    });
    const [turn, setTurn] = useState(() => {
        const savedTurn = window.localStorage.getItem('turn');
        return savedTurn ? JSON.parse(savedTurn) : TURNS.X;
    });
    const [winner, setWinner] = useState<string|null|boolean>(null);
    const [nomJugador, setNomJugador] = useState(xogadores[0]);

    const checkWinner = (board: unknown[]) => {
        for(const combination of WINER_COMBINATIONS){
        const [a, b, c] = combination;
        if(board[a] && board[a] === board[b] && board[a] === board[c]){
            return board[a];
        }
        }
        return null;
    }

    const updateBoard = (index: string | number) => {
        if(board[index] !== null || winner) return;
        const newBoard = [...board];
        newBoard[index as number] = turn;
        setBoard(newBoard);

        const newWiner = checkWinner(newBoard);

        if(newWiner){
            if(nomJugador)
                setWinner(nomJugador);
            else
                setWinner(newWiner.toString());
        return;
        }
        
        if(!newBoard.includes(null)){
        setWinner(false);
        return;
        }

        const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
        setTurn(newTurn);
        setNomJugador(nomJugador === xogadores[0] ? xogadores[1] : xogadores[0]);

        //window.localStorage.setItem('board', JSON.stringify(newBoard));
        //window.localStorage.setItem('turn', JSON.stringify(newTurn));
        
    }

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setTurn(turn === TURNS.X ? TURNS.O : TURNS.X);
        setWinner(null);
        setNomJugador(winner === xogadores[0] ? xogadores[1] : xogadores[0]);
        window.localStorage.removeItem('board');
        window.localStorage.removeItem('turn');
    }

    return (
        <>
        <main className='game'>
        <h1>Tres en Raia</h1>
        <section className='boardTresEnRaia'>
            {
                board.map((_: unknown, index: number) => (
                    <SQUARE key={index} index={index} updateBoard={updateBoard}>
                        {board[index]}
                    </SQUARE>
                ))
            }
        </section>

        <section className='turn'>
            <SQUARE2 isSelected={turn === TURNS.X}>
            {TURNS.X}
            </SQUARE2>
            <SQUARE2 isSelected={turn === TURNS.O}>
            {TURNS.O}
            </SQUARE2>
        </section>
        <button className='boton-reset' onClick={resetGame}>Recomezar</button>


        {
            winner !== null  && (
            <div className='blur'>
                <section className='winner'>
                <h2>{
                    winner === false ? 'Empate' : `Vencedor: ${winner}`
                }</h2>
                <button className='boton-reset' onClick={resetGame}>Recomezar</button>
                </section>
            </div>

            )
        }

        </main>
        </>
    )
}