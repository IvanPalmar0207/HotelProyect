import React from "react";
import {Link} from "react-router-dom"

export function Footer(){
    return (
        <div>

            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css" />
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous"/>

        <footer className="d-flex flex-column align-items-center justify-content-center">
            <p className="footer-texto text-center">El SENA quiere brindarte la mejor estadia.
                <br/>Ven, comparte y disfruta en nuestro Hotel.</p>
            <div className="iconos-redes-sociales d-flex flex-wrap align-items-center justify-content-center">
                <a href="https://web.facebook.com/sena.soacha/?locale=es_LA&_rdc=1&_rdr" target="_blank" rel="noopener noreferrer">
                    <i className="bi bi-facebook"></i>
                </a>
                <a href="https://twitter.com/SENASoacha?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor" target="_blank" rel="noopener noreferrer">
                    <i className="bi bi-twitter"></i>
                </a>
                <a href="https://senasoachacide.blogspot.com/" target="_blank" rel="noopener noreferrer">
                    <i className="bi bi-mortarboard-fill"></i>
                </a>
                <a href="mailto:servicioalciudadano@sena.edu.co " target="_blank" rel="noopener noreferrer">
                    <i className="bi bi-envelope"></i>
                </a>
            </div>
            <div className="derechos-de-autor">Creado por: Ivan David Palmar Martinez&#169;</div> 
        </footer>
        </div>
    )
}