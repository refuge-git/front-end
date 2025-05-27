import "../css/botao.css";

export default function Botao(props){
    return(
        <button className="botao" type={props.type} onClick={props.onClick}>
            {props.children}</button>
    )
}