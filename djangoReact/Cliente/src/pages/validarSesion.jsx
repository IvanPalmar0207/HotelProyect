//React Hooks
import React from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from 'universal-cookie'
//API
import { elegirUnoUsuario } from "../api/usuariosApi";
//Componentes Decorativos
import Swal from 'sweetalert2'

export function ValidarSesion(){

    const cookies = new Cookies()

    const params = useParams()   
    const navigate = useNavigate()
    console.log(params.numeroDocumento)

    const [usuario, setUsuario] = useState([])

    useEffect(() => {
        async function cargarUsuario(){
            const response = await elegirUnoUsuario(params.numeroDocumento)
            setUsuario(response.data)
        }
        cargarUsuario()
    },[])

    const rol = usuario.codigo_rl

    if (rol == 1){
        Swal.fire({
            icon: "success",
            title: "Inicio de Sesion Correcto",
            confirmButtonColor:'#3ed634',                
            confirmButtonText : 'Siguiente',
            text: "Bienvenido Administrador",                       
        });
        console.log(cookies.get('numeroDocumento_usu'))
        console.log(cookies.get('correoElectronico_usu'))
        console.log(cookies.get('contrasena_usu'))
        cookies.set('codigo_rl', rol, {path : '/'})
        navigate('/Navigation')
    }else if(rol == 2){
        Swal.fire({
            icon: "success",
            title: "Inicio de Sesion Correcto",
            confirmButtonColor:'#3ed634',                
            confirmButtonText : 'Siguiente',
            text: "Bienvenido Cliente",            
        });
        console.log(cookies.get('numeroDocumento_usu'))
        console.log(cookies.get('correoElectronico_usu'))
        console.log(cookies.get('contrasena_usu'))
        cookies.set('codigo_rl', rol, {path : '/'})
        navigate('/InicioCliente')
    }else if(rol == 3){
        Swal.fire({
            icon: "success",
            title: "Inicio de Sesion Correcto",
            confirmButtonColor:'#3ed634',                
            confirmButtonText : 'Siguiente',
            text: "Bienvenido Mesero",            
        });
        console.log(cookies.get('numeroDocumento_usu'))
        console.log(cookies.get('correoElectronico_usu'))
        console.log(cookies.get('contrasena_usu'))
        cookies.set('codigo_rl', rol, {path : '/'})
        navigate('/InicioMeseroRoom')
    }
    else if(rol == 4){
        Swal.fire({
            icon: "success",
            title: "Inicio de Sesion Correcto",
            confirmButtonColor:'#3ed634',                
            confirmButtonText : 'Siguiente',
            text: "Bienvenido Recepcionista",            
        });
        console.log(cookies.get('numeroDocumento_usu'))
        console.log(cookies.get('correoElectronico_usu'))
        console.log(cookies.get('contrasena_usu'))
        cookies.set('codigo_rl', rol, {path : '/'})
        navigate('/InicioRecepcionista')
    }else if(rol == 5){
        Swal.fire({
            icon: "success",
            title: "Inicio de Sesion Correcto",
            confirmButtonColor:'#3ed634',                
            confirmButtonText : 'Siguiente',
            text: "Bienvenido Room Service",            
        });
        console.log(cookies.get('numeroDocumento_usu'))
        console.log(cookies.get('correoElectronico_usu'))
        console.log(cookies.get('contrasena_usu'))
        cookies.set('codigo_rl', rol, {path : '/'})
        navigate('/InicioMeseroRoom')
    }
}