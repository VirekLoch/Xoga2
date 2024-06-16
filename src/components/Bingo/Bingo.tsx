import './Bingo.css'
import { useState, useEffect } from 'react'

function generateCard(): number[]{
    const card = [];
    let i = 0;
    let j = 0;
    while(j < 3){

        const positionsEmpty = Array(9).fill(true);
        for (let i = 0; i < 4; i++) {
            const randomIndex = Math.floor(Math.random() * positionsEmpty.length);
            positionsEmpty[randomIndex] = false;
        }
        while(i < 9){
            const number = Math.floor(Math.random() * 99) + 1;
            if(card.indexOf(number) === -1){
                if(positionsEmpty[i])
                    card.push(number);
                else
                    card.push(-1);
                i++;
            }
        }
        i = 0;
        j++;
    }
    return card;
}

const selectCard = (e: React.MouseEvent<HTMLDivElement>) => { 
    e.currentTarget.classList.toggle('selected');
}

export function Bingo({xogadores}: {xogadores: string[]}){
    if(xogadores.length === 0){
        xogadores.push("Xogador 1")
        xogadores.push("Xogador 2")
    }

    const [cardP1, setCardP1] = useState<number[]>(generateCard());
    const [cardP2, setCardP2] = useState<number[]>(generateCard());
    const [numbers, setNumbers] = useState<Array<number>>([]);
    const [winner, setWinner] = useState<string | null>(null);
    let  pullNumber =Array(99).fill(0).map((_, index) => index + 1).sort(() => Math.random() - 0.5);

    const resetGame = () => {
        setCardP1(generateCard());
        setCardP2(generateCard());
        setNumbers([]);
        pullNumber = Array(99).fill(0).map((_, index) => index + 1).sort(() => Math.random() - 0.5);
        setWinner(null);
        document.querySelectorAll('.carton').forEach(carton => {
            carton.querySelectorAll('.numero').forEach(numero => {
                numero.classList.remove('selected');
            });
        });
        document.querySelectorAll('.error').forEach(error => {
            error.classList.remove('error');
        });
        document.querySelectorAll('.found').forEach(found => {
            found.classList.remove('found');
        });
    }

    const chekBingo = () => {
        document.querySelectorAll('.error').forEach(error => {
            error.classList.remove('error');
        });
        document.querySelectorAll('.found').forEach(found => {
            found.classList.remove('found');
        });
        document.querySelectorAll('.carton').forEach(carton => {
            const selectedNumbers = carton.querySelectorAll('.selected');
            const emptyNumbers = carton.querySelectorAll('.empty');
            const numbersList = [...numbers];
            const numbersFound = [];

            if(selectedNumbers.length === 0) return;

            selectedNumbers.forEach(numero => {
                const number = parseInt(numero.textContent as string);
                if(numbersList.indexOf(number) !== -1){
                    numbersList.splice(numbersList.indexOf(number), 1);
                    numbersFound.push(number);
                    numero.classList.add('found');
                }else{
                    numero.classList.add('error');
                }
            });

            if(numbersFound.length + emptyNumbers.length === 27){
                setWinner(carton.classList[2]);
            }
        });
    }
    useEffect(() => {
        const interval = setInterval(() => {
            if((pullNumber.length === 0) || (winner !== null)){
                clearInterval(interval);
                console.log('Bingo');
            }
            else{
                const number = pullNumber.pop() as number;
                setNumbers(prevNumbers => [...prevNumbers, number]);
            }    
        }, 5000);
        return () => clearInterval(interval);
    }, [winner]);

    return (
        <main className="bingo">
            <h1>Bingo</h1>
            <div className='cartones'>
                <div className={`carton ${xogadores[0]}`}>
                    {
                        cardP1.map((number, index) => (
                            <div key={index} className={`numero ${number === -1 ? 'empty' : ''}`} onClick={selectCard}>{number === -1 ? null : number}</div>
                        ))
                    }
                </div>
                <div className='pulledNumbers'>
                    {
                        numbers.slice(-9).map((number, index) => (
                            <div key={index} className='numero'>{number}</div>
                        ))
                    }
                </div>
                <div className={`carton ${xogadores[1]}`}>
                    {
                        cardP2.map((number, index) => (
                            <div key={index} className={`numero ${number === -1 ? 'empty' : ''}`} onClick={selectCard}>{number === -1 ? null : number}</div>
                        ))
                    }
                </div>
            </div>
            <div className='botones'>
                <button onClick={chekBingo}>Bingo</button>
                <button onClick={resetGame}>Reset Game</button>
            </div>

            {winner === null ? <></> : 
                <div className='victoria'>
                    <div className='victoria-overlay'>
                        <h2>{winner} gañou!</h2>
                        <button onClick={resetGame}>Xogar de novo</button>
                    </div>
                </div>
            }
        </main>
    )
}