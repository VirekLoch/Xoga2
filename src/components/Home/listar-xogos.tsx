type ListarXogosProps = {
    xogos: {
        nome: string;
        descricion: string;
        imaxe: string;
        ref: string;
    }[];
    setFunction: (value: string|null) => void;

};

export default function ListarXogos({xogos, setFunction}: ListarXogosProps ){
    return (
        <div className="listar-xogos">
            <ul>
                {xogos.map((xogo) => (
                    <div key={xogo.nome} className="xogo-container" onClick={()=> setFunction(xogo.nome)}>
                        <h3 className="xogo-nome">{xogo.nome}</h3>
                        <img src={xogo.imaxe} alt={xogo.nome} className="xogo-imaxe" />
                        <p className="xogo-descripcion">{xogo.descricion}</p>
                    </div>
                ))}
            </ul>
        
        </div>
    )
}