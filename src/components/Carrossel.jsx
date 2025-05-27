import React, { useState, useEffect } from "react";
import "../css/carrossel.css";
import img1 from '../assets/IMG-CARROSSEL1.png';
import img2 from '../assets/IMG-CARROSSEL2.png';
import img3 from '../assets/IMG-CARROSSEL3.png';

const imagens = [
img1,img2,img3
]

export default function Carrossel() {

    const [index, setIndex] = useState(0);

    useEffect(() => {
        const intervalo = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % imagens.length)
        }, 3000);

        return () => clearInterval(intervalo);
    }, []);

    return (
        <div className="carrossel">
            <img src={imagens[index]} alt={`Imagem ${index + 1}`} />
            <div className="pontos">
                {imagens.map((_, i) => (
                    <span key={i} className={i === index ? 'ativo' : ''}></span>
                ))}
            </div>
        </div>
    )
}