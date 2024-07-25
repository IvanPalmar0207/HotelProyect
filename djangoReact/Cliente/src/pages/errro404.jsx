//React Hooks
import React from "react"
import { Link } from "react-router-dom";
//Componentes Decorativos
import '../static/css/error404.css'
import robot404 from '../static/img/error404.jpg';

export function Error404(){
    return (
        <div>
            <h2>PAGE NOT FOUND <i class="bi bi-bug-fill"></i> <br/> ERROR 404</h2>
            <p>The request URL was not found on this server. That's all we khow currently.</p>
            <div class="contenedorEnlace">
                <Link to={'/'}>Go Back?</Link>
            </div>
            <div class="contenedorImg">
                <img src={ robot404 } alt="imagenError"/>
            </div>
        </div>
        )
}