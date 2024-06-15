import { Board } from "../tres-en-raia/Tableiro.tsx";
import { Taboeiro } from "../Conecta-catro/Taboeiro.tsx";
import  Parexas from "../Parexas/Parexas.tsx";

type ControllerXogosProps = {
    xogo: string | null;
    setXogo: React.Dispatch<React.SetStateAction<string | null>>;
    xogadores: string[];
};

function navigateTo(path:string) {
    window.history.pushState({},'' , path)
    const navigationEvent = new Event('pushstate')
    window.dispatchEvent(navigationEvent)
}

export function ControllerXogos({xogo, setXogo , xogadores}: ControllerXogosProps){

    const tresEnRaiaComponent = <Board xogadores={xogadores}/> ;
    const conectaCatroComponent = <Taboeiro xogadores={xogadores}/>;
    const parexasComponent = <Parexas xogadores={xogadores}/>;

    let toRet = null;

    switch(xogo){
        case "Tres en raia":
            toRet = tresEnRaiaComponent;
            navigateTo('/tres-en-raia')
            break;
        case "Conecta 4":
            toRet = conectaCatroComponent;
            navigateTo('/conecta-catro')
            break;
        case "Parexas":
            toRet = parexasComponent;
            navigateTo('/parexas')
            break;
    }

    return (
        <>
        <main>
            {toRet}
        </main>
        <footer>
            <button onClick={()=> {setXogo(null); navigateTo('/');}}>Voltar</button>
        </footer>
        
        </>
    )
}