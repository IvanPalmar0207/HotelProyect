import React, { useEffect, useState } from "react";
import {Link, Navigate} from "react-router-dom";
import Cookies from "universal-cookie";
//Api's
import { todosLosUsuario } from "../../api/usuariosApi";
//Archivos Estaticos
import '../../static/css/validarFacturas.css';
import imagePlaya from '../../static/img/playa.png'
import { useForm } from "react-hook-form";
import {useNavigate } from "react-router-dom";
import perfil from '../../static/img/perfil.png'
import {Footer} from "../../components/footer";
import Swal from 'sweetalert2'

export function ValidarFacturas(){

    const [usuarios, setUsuario] = useState([])

    const cookies = new Cookies();

    useEffect(() => {
        async function validarCookie(){
            if(!cookies.get('numeroDocumento_usu')){
                Swal.fire({
                    icon: 'error',
                    title: 'ERROR 403',
                    text: 'Acceso restringido, no tienes los permisos correspondientes!',
                    confirmButtonText: "Volver!",
                    allowEnterKey:true,
                    allowOutsideClick:false,
                    confirmButtonColor:"red"
                    }
                )
                navigate('/')
            }
            else if(cookies.get('codigo_rl') == 1){
                Swal.fire({
                    icon: 'error',
                    title: 'ERROR 403',
                    text: 'Acceso restringido, no tienes los permisos correspondientes!',
                    confirmButtonText: "Volver!",
                    allowEnterKey:true,
                    allowOutsideClick:false,
                    confirmButtonColor:"red"
                    }
                )                
                navigate('/Navigation')
            }
            else if(cookies.get('codigo_rl') == 3){
                Swal.fire({
                    icon: 'error',
                    title: 'ERROR 403',
                    text: 'Acceso restringido, no tienes los permisos correspondientes!',
                    confirmButtonText: "Volver!",
                    allowEnterKey:true,
                    allowOutsideClick:false,
                    confirmButtonColor:"red"
                    }
                )      
                navigate('/InicioMeseroRoom')
            }            
            else if(cookies.get('codigo_rl') == 4){
                Swal.fire({
                    icon: 'error',
                    title: 'ERROR 403',
                    text: 'Acceso restringido, no tienes los permisos correspondientes!',
                    confirmButtonText: "Volver!",
                    allowEnterKey:true,
                    allowOutsideClick:false,
                    confirmButtonColor:"red"
                    }
                )      
                navigate('/InicioRecepcionista')
            }
            else if(cookies.get('codigo_rl') == 5){
                Swal.fire({
                    icon: 'error',
                    title: 'ERROR 403',
                    text: 'Acceso restringido, no tienes los permisos correspondientes!',
                    confirmButtonText: "Reenviar",
                    allowEnterKey:true,
                    allowOutsideClick:false,
                    confirmButtonColor:"red"
                    }
                )      
                navigate('/InicioMeseroRoom')
            }
        }
        validarCookie()
    },[])


    useEffect(() => {
        async function listarUsuarios(){
            const response = await todosLosUsuario()
            setUsuario(response.data)
        }
        listarUsuarios()
    },[])

    const styleImg = {
        with: '24px',
        height: '24px'
    }

    const {register, handleSubmit, formState: errors} = useForm();

    const navigate = useNavigate();

    const envioForm = handleSubmit(async (data) => {        
            
            //Validar Formulario

            let minusculas = /[a-z]/g

            let mayusculas = /[A-Z]/g

            if(data.numeroDocumento_usu.match(minusculas) || data.numeroDocumento_usu.match(mayusculas)){
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
            }else if(data.numeroDocumento_usu.length < 5){
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
                console.log(data.numeroDocumento_usu.length)
                return false
            }else if(data.numeroDocumento_usu.length > 10){
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
                console.log(data.numeroDocumento_usu.length)
                return false
            }else{

                let codigo_rl = ''
                usuarios.map(usu => {
                    if(usu.numeroDocumento_usu == data.numeroDocumento_usu){
                        codigo_rl = usu.codigo_rl
                    }
                })

                if(codigo_rl == 2){
                    Swal.fire({
                        icon: "success",
                        title: "Numero de documento correcto",
                        confirmButtonColor:'#3ed634',                
                        confirmButtonText : 'Siguiente',
                        text: "Ahora podras visualizar todas tus facturas",            
                    })
                    navigate(`/ListaFacturasCliente/${data.numeroDocumento_usu}`) 
                    return true
                }
                else if(codigo_rl != 2){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'El usuario no es un cliente, intenta con tu numero de documento',
                        confirmButtonText: "Reenviar",
                        allowEnterKey:true,
                        allowOutsideClick:false,
                        confirmButtonColor:"red"
                        }
                    )
                    return false
                }                                 
            }
            
           })        

    return (
        
            <div>                        
                <header>
                    <div className="logoIzquierdo">
                        <img src={imagePlaya}alt="logoIzquierda" />
                    </div>
                    <h1 className="tituloEncabezado">Validar las Facturas</h1>
                    <div className="logoIzquierdo">
                        <img src={imagePlaya} alt="logoIzquierda" />
                    </div>
                </header>

                <div className="contenedorPerfil">
                    <img src={perfil} alt="logoPerfil" style={styleImg}/>
                    <h3 className="textoPerfil">Cliente</h3>
                </div>


                <div className="contenedorEnlaces">
                    <ul>
                        <li><Link to='/InicioCliente' className="a">Volver</Link></li>
                    </ul>   
                </div>

                <section className="formRegistroValidar">
                    <form className="contenedorValidar" onSubmit={envioForm} >
                        
                        <h2>Facturas</h2>

                        <br />
                        <br />

                        <div className="campoValidar">
                            <label htmlFor="numeroDoc">Numero de Documento:</label>
                            <input type="text" name="numeroDoc" id="numeroDoc" required
                            {...register("numeroDocumento_usu", {required : true})}                    
                            />
                            {errors.numeroDocumento_usu && <span>El campo es obligatorio</span>}
                        </div>

                        <br />
                        <br />

                        <button className="boton">Ingresa</button>
                    </form>                            
                </section>
                <Footer />
            </div>    
        )
}