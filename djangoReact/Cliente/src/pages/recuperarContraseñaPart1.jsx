//React Hooks
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
//API
import { todosLosUsuario } from "../api/usuariosApi";
//Componentes Decorativos
import '../static/css/RecuperarContraseña.css';
import imagePlaya from '../static/img/playa.png'
import {Footer} from "../components/footer";
import Swal from 'sweetalert2'

export function RecuperarContraseñaParte1(){

    const [usuario, setUsuario] = useState([])

    const {register, handleSubmit, formState: errors} = useForm();

    const navigate = useNavigate();

    const formularioEmail = useRef()
    
    useEffect(()=>{
        async function validarUsuario(){
            const response = await todosLosUsuario()
            setUsuario(response.data)
        }
        validarUsuario()
    },[])

    const envioForm = handleSubmit(async (data1) => {   
        
        //Validacion de formulario

        let minusculas = /[a-z]/g

        let mayusculas = /[A-Z]/g
        
        let validacionEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        if(data1.numeroDocumento_usu.match(minusculas) || data1.numeroDocumento_usu.match(mayusculas)){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El numero de documento no puede contener letras',
                confirmButtonText: "Reenviar",
                allowEnterKey:true,
                allowOutsideClick:false,
                confirmButtonColor:"red"
                }
            )
            return false                
        }else if(data1.numeroDocumento_usu.length < 5){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El numero de documento no puede tener menos de 5 numeros',
                confirmButtonText: "Reenviar",
                allowEnterKey:true,
                allowOutsideClick:false,
                confirmButtonColor:"red"
                }
            )
            console.log(data1.numeroDocumento_usu.length)
            return false
        }else if(data1.numeroDocumento_usu.length > 10){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El numero de documento no puede tener mas de 10 numeros',
                confirmButtonText: "Reenviar",
                allowEnterKey:true,
                allowOutsideClick:false,
                confirmButtonColor:"red"
                }
            )
            console.log(data1.numeroDocumento_usu.length)
            return false
        }else if(!validacionEmail.test(data1.correoElectronico_usu)){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El correo electronico es incorrecto, intenta nuevamente',
                confirmButtonText: "Reenviar",
                allowEnterKey:true,
                allowOutsideClick:false,
                confirmButtonColor:"red"
                }
            )
            return false                                            
        }else{

            let numeroDocumento = ''
            let correoElectronico = ''

            usuario.map(usu => {
                if(data1.numeroDocumento_usu == usu.numeroDocumento_usu && 
                    data1.correoElectronico_usu == usu.correoElectronico_usu ){
                        numeroDocumento = usu.numeroDocumento_usu
                        correoElectronico = usu.correoElectronico_usu
                    }
                })

                if(numeroDocumento === data1.numeroDocumento_usu &&
                    correoElectronico === data1.correoElectronico_usu){
                    Swal.fire({
                            icon: "success",
                            title: "Datos validados correctamente",
                            confirmButtonColor:'#3ed634',                
                            confirmButtonText : 'Siguiente',
                            text: "Se ha validado el numero de documento y el correo electronico.",            
                        })
                    navigate(`/RecuperarContraseñaParte2/${data1.numeroDocumento_usu}/${data1.correoElectronico_usu}`)  
                    console.log('salio')
                    return true
                }else{
                    Swal.fire({
                        icon: "error",
                        title: "Datos Invalidos",
                        confirmButtonColor:"red",
                        confirmButtonText : 'Volver atras',
                        text: "No se han podido validar los datos",            
                    })
                    console.log('entro')
                    return false
                }
        }})



    return (
        
            <div>                        
                <header>
                    <div className="logoIzquierdo">
                        <img src={imagePlaya}alt="logoIzquierda" />
                    </div>
                    <h1 className="tituloEncabezado">Validar Datos</h1>
                    <div className="logoIzquierdo">
                        <img src={imagePlaya} alt="logoIzquierda" />
                    </div>
                </header>

                <div className="contenedorEnlaces">
                    <ul>
                        <li><Link to='/' className="a">Volver</Link></li>                        
                    </ul>   
                </div>

                <section className="formRegistroRecuperar1">
                    <form className="contenedorRecuperar1" onSubmit={envioForm}  ref={formularioEmail}>
                        
                        <div className="campo">
                            <label htmlFor="numeroDoc">Numero de Documento:</label>
                            <input type="text" name="numeroDoc" id="numeroDoc"
                            {...register("numeroDocumento_usu", {required : true})}                    
                            />
                            {errors.numeroDocumento_usu && <span>El campo es obligatorio</span>}
                        </div>
                                            
                        <br />

                        <div className="campo">
                            <label htmlFor="correoElectronico_usu">Correo Electronico: </label>
                            <input type="email" name="correoElectronico_usu" id="correoElectronico_usu" required 
                            {...register("correoElectronico_usu", {required : true})}                                                
                            />
                            {errors.correoElectronico_usu && <span>El campo es obligatorio</span>}        
                        </div>

                        <br />

                        <br />
                                <button className="boton">Siguiente</button>

                    </form>                            
                </section>
                <Footer />
            </div>    
        )
}