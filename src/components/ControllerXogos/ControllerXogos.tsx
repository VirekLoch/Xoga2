import { Board } from "../tres-en-raia/Tableiro.tsx";
import { Taboeiro } from "../Conecta-catro/Taboeiro.tsx";

type ControllerXogosProps = {
    xogo: string | null;
    setXogo: (value: string|null) => void;
    xogadores: string[];
};
export function ControllerXogos({xogo, setXogo , xogadores}: ControllerXogosProps){
    return (
        <>
        <main>
            <div className="corpo-xogo">
            {
                xogo === "Tres en raia" ? (
                    <Board xogadores={xogadores}/>
                ) : (
                    <Taboeiro xogadores={xogadores}/>
                )
            }
            </div>
        </main>
        <footer>
            <button onClick={()=> setXogo(null)}>Voltar</button>
        </footer>
        </>
    )
}