import './Parexas.css'
import { useEffect, useState } from 'react';


function Shuffle(){
    const cards = Array(8).fill(null).map((_, index) => index+1);
    const cards2 = Array(8).fill(null).map((_, index) => index+1);
    return [...cards, ...cards2].sort(() => Math.random() - 0.5);
}

function resetCards(){
    document.querySelectorAll('.card').forEach((card) => {
        card.classList.remove('selected');
    });
}


export default function Parexas({xogadores}: {xogadores: string[]}) {
    if(xogadores.length === 0){
        xogadores.push("Xogador 1")
        xogadores.push("Xogador 2")
    }
    
    const [board, setBoard] = useState(Shuffle());
    const [selected, setSelected] = useState<number[]>([]);
    const [ganador, setGanador] = useState<string | null>(null);
    const [xogador, setXogador] = useState(xogadores[0]);
    const [count, setCount] = useState<[string, number][]>([
        [xogadores[0], 0],
        [xogadores[1], 0]
    ]);

    function resetGame(){
        resetCards();
        setBoard(Shuffle());
        setSelected([]);
        setGanador(null);
        setXogador(xogadores[0]);
        setCount([
            [xogadores[0], 0],
            [xogadores[1], 0]
        ]);
        document.querySelectorAll('.found').forEach((card) => {
            card.classList.remove('found');
        });
    }

    function selectCard(e: React.MouseEvent<HTMLDivElement>){
        const elemento = e.target as HTMLElement;
        if(elemento.classList.contains('selected')) return;
        else elemento?.classList.add('selected');
        setSelected([...selected, parseInt(elemento.textContent as string)]);
    }

    useEffect(() => {
        if(selected.length === 2){
            const loader = document.querySelector('.await-cards');
            loader?.classList.add('active');
            if(selected[0] === selected[1]){
                const newCount = [...count];
                newCount.findIndex((player) => {player[0] === xogador ? player[1]++ : player[1]});
                setCount(newCount)


                setSelected([]);
                document.querySelectorAll('.selected').forEach((card) => {
                    card.classList.add('found');
                });
                if(document.querySelectorAll('.found').length === 16){
                    setGanador(count[0][1] > count[1][1] ? count[0][0] : count[1][0]);
                }
                setTimeout(() => {
                    loader?.classList.remove('active');
                }, 200);

                return;
            }
            setTimeout(() => {
                resetCards();
                setSelected([]);
                loader?.classList.remove('active');
            }, 500);

            setXogador(xogador === xogadores[0] ? xogadores[1] : xogadores[0]);
        }
    }, [selected]);
    

    return (
        <main className='game'>
            <h1> Parexas </h1>
            <h2>Turno de {xogador}</h2>
            <section className='board'>
                {
                    board.map((_,index:number) => (
                        <div key={index} className='card' onClick={selectCard}>
                            <p>{board[index]}</p>
                        </div>
                    ))
                }
            </section>
            <h3>{count[0][0]}:{count[0][1]} vs {count[1][0]}:{count[1][1]}</h3>
            <button onClick={() => {resetGame()}} className='restart'> Reiniciar </button>
            <div className='await-cards'></div>
            {ganador === null ? <></> : 
                <div className='victoria'>
                    <div className='victoria-overlay'>
                    <h2>{ganador} gañou!</h2>
                    <button onClick={() => {resetGame()}}> Xogar de novo </button>
                    </div>
                </div>
            }
        </main>
    )
}