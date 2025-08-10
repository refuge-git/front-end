// import "../css/botao.css";

// export default function Botao(props) {
//     return (
//         <button className="botao" type={props.type} onClick={props.onClick}>
//             {props.children}</button>
//     )
// }

import "../css/botao.css";

export default function Botao(props) {
    const { type = "button", variant = "primario", className = "", onClick, children } = props;

    return (
        <button
            type={type}
            onClick={onClick}
            className={`botao botao-${variant} ${className}`.trim()}
        >
            {children}
        </button>
    );
}




