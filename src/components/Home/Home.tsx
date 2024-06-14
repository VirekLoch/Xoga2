import { ControllerXogos } from '../ControllerXogos/ControllerXogos.tsx'
import './Home.css'
import ListarXogos from './listar-xogos.tsx'
import xogos from './xogos-disponhibles.json'
import { useState } from 'react'

export default function Home() {
    const [xogoActual, setXogo] = useState<string | null>(null)
    const [xogadores, setXogadores] = useState<string[]>([])
    const [flag, setFlag] = useState<boolean>(false)
    console.log(xogadores)


    const createPlayers = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const xogadores = event.target as HTMLFormElement
        if(xogadores.xogador1.value === '' || xogadores.xogador2.value === '') return 
        if(xogadores.xogador1.value === xogadores.xogador2.value) return 
        setXogadores([xogadores?.xogador1.value, xogadores?.xogador2.value])
        setFlag(false)
    }

    const handleFlag = () => {
        setFlag(true)
    }


    return (
        <>
        <header>
            { xogadores.length < 1 ?(
                    <button onClick={handleFlag}> Quen xoga? </button>

                ) :(
                    <div className='xogadores'>
                        <p>{xogadores[0]}</p>
                        <p>VS</p>
                        <p>{xogadores[1]}</p>
                    </div>
                    
                )   
            }
            { flag ?(
                <div className='div-blur'>
                    <form onSubmit={createPlayers} className='form-nomes'>
                        <h3>Xogador 1:</h3>
                        <input type="text" placeholder="Xogador 1" name='xogador1'/>
                        <h3>Xogador 2:</h3>
                        <input type="text" placeholder="Xogador 2" name='xogador2'/>
                        <button type="submit"> Xogar </button>
                    </form>
                </div>
                ) :(
                <>

                </>
                )
            }    

            <div className='div-right'>

                {
                    xogadores.length > 0 ?(
                        <button onClick={() => setXogadores([])}> Cambiar xogadores </button>
                    ) :(
                        <></>
                    )
                }

            </div>

        </header>
        <main>
            { xogoActual==null ?(
                <>
                <h1>XOGA2</h1>
                <p>Benvidos a Xoga2 un novo entorno interativo</p>
                <ListarXogos xogos={xogos.xogos} setFunction={setXogo}/>
                <p>Pronto mais...</p>
                </>
                ) :(
                <ControllerXogos xogo={xogoActual} setXogo={setXogo} xogadores={xogadores}/>
                )
            }
        </main>
        </>
    )
}