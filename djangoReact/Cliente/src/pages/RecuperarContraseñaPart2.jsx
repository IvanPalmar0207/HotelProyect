//React Hooks
import React, {useState ,useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
//API
import { actualizarUsuario } from "../api/usuariosApi";
import { elegirUnoUsuario } from "../api/usuariosApi";
//Componentes Decorativos
import '../static/css/RecuperarContraseñaFinal.css';
import imagePlaya from '../static/img/playa.png'
import {Footer} from "../components/footer";
import Swal from 'sweetalert2'
//EnviarCorreos
import emailjs from '@emailjs/browser';


export function RecuperarContraseñaParte2(){

    const {register, handleSubmit, formState: errors} = useForm();

    const [usuario, setUsuario] = useState([])

    const navigate = useNavigate();

    const formularioEmail = useRef()

    const params = useParams()

    console.log(params.numeroDocumento_usu)
    console.log(params.correoElectronico_usu)
    
    useEffect(()=>{
        async function validarUsuario(){
            const response = await elegirUnoUsuario(params.numeroDocumento_usu)
            setUsuario(response.data)
        }
        validarUsuario()
    },[])




    const envioForm = handleSubmit(async (data1) => {   

        
        const valorFormulario = new FormData()

        valorFormulario.append("contrasena_usu", data1.contrasena_usu);        
        
        var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,16}/;

        //Validacion de formulario

        if(data1.contrasena_usu.length < 8 || data1.contrasena_usu.length > 16){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'La contraseña no puede tener menos de 8 caracteres o mas de 16',
                confirmButtonText: "Reenviar",
                allowEnterKey:true,
                allowOutsideClick:false,
                confirmButtonColor:"red"
                }
            )
            return false                
        }else if(!regex.test(data1.contrasena_usu)){
            Swal.fire({
                icon: 'error',
                title: 'Contraseña incorrecta',
                text: 'Recuerda que la contraseña debe contener almenos una letra minuscula, una letra mayuscula, un numero y un caracter especial',
                confirmButtonText: "Reenviar",
                allowEnterKey:true,
                allowOutsideClick:false,
                confirmButtonColor:"red"
                }
            )
            console.error(errors)
        }else if(data1.contrasena_usu != data1.confirmarContrasena_usu){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Debes confirmar la contraseña, los dos campos deben ser iguales',
                confirmButtonText: "Reenviar",
                allowEnterKey:true,
                allowOutsideClick:false,
                confirmButtonColor:"red"
                }
            )

            console.log(data1.confirmarContrasena_usu)
            console.log(data1.contrasena_usu)

            return false                                            
        }else{    
            await actualizarUsuario(params.numeroDocumento_usu,valorFormulario)
            .then((res)=>{
                Swal.fire({
                    icon: "success",
                    title: "Restablecimiento Completado",
                    confirmButtonColor:'#3ed634',                
                    confirmButtonText : 'Siguiente',
                    text: "El restablecimiento ha sido exitoso. Revisa tu correo(Gmail) para mas informacion",            
                }); 
                console.log(res)    

                const data = {
                    numeroDocumento_usu: params.numeroDocumento_usu,
                    correoElectronico_usu: params.correoElectronico_usu,
                    contrasena_usu: data1.contrasena_usu
                }

                emailjs.send("service_6k4ieqj","template_tofwae6",data,{
                        publicKey: '22S3JXamXGKGgd7Iq'
                });
                                                           
                navigate('/')
            }) 
            .catch((errr)=>{
                 Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    confirmButtonColor:'#ff3333',                
                    confirmButtonText : 'Volver',
                    text: "No se ha podido restablcer tu contraseña. Revisa tu email(Gamil) e intenta nuevamente",                    
                 });
                 console.error('Error al agregar usuarios:', errr);
                 
                const data = {
                    numeroDocumento_usu: params.numeroDocumento_usu,
                    correoElectronico_usu: params.correoElectronico_usu
                }

                emailjs.send("service_6k4ieqj","template_ruwj818",data,{
                    publicKey: '22S3JXamXGKGgd7Iq'
                });                          
             })                         

             return true

            }        
        })




    return (
        
            <div>                        
                <header>
                    <div className="logoIzquierdo">
                        <img src={imagePlaya}alt="logoIzquierda" />
                    </div>
                    <h1 className="tituloEncabezado">Reestablecer Contraseña</h1>
                    <div className="logoIzquierdo">
                        <img src={imagePlaya} alt="logoIzquierda" />
                    </div>
                </header>

                <div className="contenedorEnlaces">
                    <ul>
                        <li><Link to='/RecuperarContraseñaParte1' className="a">Volver</Link></li>                        
                    </ul>   
                </div>

                <section className="formRegistroRecuperarFinal">
                    <form className="contenedorRecuperarFinal" onSubmit={envioForm}  ref={formularioEmail}>
                        

                        <div className="campo">
                            <label htmlFor="contrasena_usu">Contraseña: </label>
                            <input type="password" name="contrasena_usu" id="contrasena_usu" required 
                            {...register("contrasena_usu", {required : true})}                                                
                            />
                            {errors.contrasena_usu && <span>El campo es obligatorio</span>}                                    
                        </div> 

                        <br />


                        <div className="campo">
                            <label htmlFor="confirmarContrasena_usu">Confirmar contraseña: </label>
                            <input type="password" name="confirmarContrasena_usu" id="confirmarContrasena_usu" required 
                            {...register("confirmarContrasena_usu", {required : true})}                                                
                            />
                            {errors.contrasena_usu && <span>El campo es obligatorio</span>}                                    
                        </div>

                        <br />

                        <br />
                                <button className="boton">Restablecer</button>

                    </form>                            
                </section>
                <Footer />
            </div>    
        )
}