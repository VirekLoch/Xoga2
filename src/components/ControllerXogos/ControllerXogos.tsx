import { Board } from "../tres-en-raia/Tableiro.tsx";
import { Taboeiro } from "../Conecta-catro/Taboeiro.tsx";
import  Parexas from "../Parexas/Parexas.tsx";

type ControllerXogosProps = {
    xogo: string | null;
    setXogo: (value: string|null) => void;
    xogadores: string[];
};
export function ControllerXogos({xogo, setXogo , xogadores}: ControllerXogosProps){

    const tresEnRaiaComponent = <Board xogadores={xogadores}/> ;
    const conectaCatroComponent = <Taboeiro xogadores={xogadores}/>;
    const parexasComponent = <Parexas xogadores={xogadores}/>;

    let toRet = null;

    switch(xogo){
        case "Tres en raia":
            toRet = tresEnRaiaComponent;
            break;
        case "Conecta 4":
            toRet = conectaCatroComponent;
            break;
        case "Parexas":
            toRet = parexasComponent;
            break;
    }

    return (
        <>
        <main>
            {toRet}
        </main>
        <footer>
            <button onClick={()=> setXogo(null)}>Voltar</button>
        </footer>
        
        </>
    )
}