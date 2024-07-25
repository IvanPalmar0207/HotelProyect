//React Hooks
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import md5 from 'md5'
import Cookies from 'universal-cookie'
//API
import { todosLosUsuario } from "../api/usuariosApi";
//Componentes Decorativos
import '../static/css/iniciarSesion.css';
import imagePlaya from '../static/img/playa.png'
import {Footer} from "../components/footer";
import Swal from 'sweetalert2'


export function IniciarSesion(){    

    const cookies = new Cookies()

    useEffect(() => {
        async function validarCookie(){
        if(cookies.get('codigo_rl') == 1){
            Swal.fire({
                icon: 'error',
                title: 'Ops...',
                text: 'Debes cerrar sesion para volver a la pagina principal',
                confirmButtonText: "Volver!",
                allowEnterKey:true,
                allowOutsideClick:false,
                confirmButtonColor:"red"
                }
            )
            navigate('/Navigation')
        }
        else if(cookies.get('codigo_rl') == 2){
            Swal.fire({
                icon: 'error',
                title: 'Ops...',
                text: 'Debes cerrar sesion para volver a la pagina principal',
                confirmButtonText: "Volver!",
                allowEnterKey:true,
                allowOutsideClick:false,
                confirmButtonColor:"red"
                }
            )                
            navigate('/InicioCliente')
        }           
        else if(cookies.get('codigo_rl') == 3){
            Swal.fire({
                icon: 'error',
                title: 'Ops...',
                text: 'Debes cerrar sesion para volver a la pagina principal',
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
                title: 'Ops...',
                text: 'Debes cerrar sesion para volver a la pagina principal',
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
                title: 'Ops...',
                text: 'Debes cerrar sesion para volver a la pagina principal',
                confirmButtonText: "Volver!",
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


    console.log(cookies)

    const {register, handleSubmit, formState: errors} = useForm();
    const [usuario, setUsuario] = useState([])

    const navigate = useNavigate();

    useEffect (() => {
        async function todosUsuarios(){
            const response = await todosLosUsuario()
            setUsuario(response.data)
        }
        todosUsuarios()
    },[])

    const envioForm = handleSubmit(async (data1) => {   
        
        //Validacion de formulario

        let minusculas = /[a-z]/g

        let mayusculas = /[A-Z]/g
        
        let validacionEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,16}/;

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
        }else if(data1.contrasena_usu.length < 8 || data1.contrasena_usu.length > 16){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'La contraseña no puede tener menos de 8 ni mas de 16 caracteres',
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
        }else{            
            const filtrarUsuarios = usuario.filter(usu =>
                usu.numeroDocumento_usu === data1.numeroDocumento_usu &&
                usu.correoElectronico_usu === data1.correoElectronico_usu &&
                usu.contrasena_usu === md5(data1.contrasena_usu)
            )
            
            filtrarUsuarios.forEach(usu => {
                console.log(usu.numeroDocumento_usu);
                console.log(usu.correoElectronico_usu);
                console.log(usu.contrasena_usu);
    
                let numeroDoc = usu.numeroDocumento_usu;
                let correoElectronico = usu.correoElectronico_usu;
                let contrasena = usu.contrasena_usu;

                cookies.remove('numeroDocumento_usu', { path: '/' })
                cookies.remove('correoElectronico_usu', { path: '/' })                                                                                
                cookies.remove('contrasena_usu', { path: '/' })                                                                                
                cookies.remove('codigo_rl', { path: '/' })                                                 
            
                cookies.set('numeroDocumento_usu', numeroDoc, { path: '/' });
                cookies.set('correoElectronico_usu', correoElectronico, { path: '/' });
                cookies.set('contrasena_usu', contrasena, { path: '/' });            
                navigate(`ValidarSesion/${numeroDoc}`)        
            });
        }        
})

    return (
        
            <div>                        
                <header>
                    <div className="logoIzquierdo">
                        <img src={imagePlaya}alt="logoIzquierda" />
                    </div>
                    <h1 className="tituloEncabezado">Inicia Sesion con Pegasus</h1>
                    <div className="logoIzquierdo">
                        <img src={imagePlaya} alt="logoIzquierda" />
                    </div>
                </header>

                <div className="contenedorEnlaces1">
                    <ul>
                        <li><Link to='/ListaHabitacionesInicio' className="a">Habitaciones Pegasus</Link></li>                        
                        <div className="ayudas-sistema">
                            <li>
                                <Link to='#'>Ayudas del Sistema</Link>
                                <ul className="menu-vertical">
                                    <li><a href="https://drive.google.com/drive/u/0/folders/1kSocNFEUoiBCIAl_katzO_yZlqz_HN8O" target="_blank" rel="noopener noreferrer">Manual de Usuario</a></li>
                                    <li><a href="https://drive.google.com/drive/u/0/folders/1IkEhSrdz8ZXEQCORV0vTEUdQa33qeMBs" target="_blank" rel="noopener noreferrer">Manual Tecnico</a></li>
                                </ul>
                            </li>
                        </div>
                    </ul>   
                </div>

                <section className="formRegistroIniciarSesion">
                    <form className="contenedorIniciarSesion" onSubmit={envioForm} >
                        
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

                        <div className="campo">
                            <label htmlFor="contrasena_usu">Contraseña: </label>
                            <input type="password" name="contrasena_usu" id="contrasena_usu" required                             
                            {...register("contrasena_usu", {required : true})}                                                
                            />
                            {errors.contrasena_usu && <span>El campo es obligatorio</span>}                                    
                        </div>

                        <br />
                                <button className="boton" >Ingresa</button>

                        <div className="contenedorOpciones">
                            <br/>
                                <Link onClick={() =>{                    
                                        const aceptarElimnar = Swal.mixin({
                                          });
                                          aceptarElimnar.fire({
                                            title: "Deseas crear una cuenta?",
                                            icon: "warning",
                                            showCancelButton: true,
                                            confirmButtonText: "Si, siguiente!",
                                            confirmButtonColor:' #3ed634',  
                                            reverseButtons: true,
                                            cancelButtonText: "No, cancelar",
                                            cancelButtonColor:'#ff2d2d',                
                                          }).then((result) => {
                                            if (result.isConfirmed) {                                                                                   
                                                navigate('/RegistrarseInicio')
                                            } else if (
                                              /* Read more about handling dismissals below */
                                              result.dismiss === Swal.DismissReason.cancel
                                            ) {
                                              aceptarElimnar.fire({
                                                title: "Operacion Cancelada",
                                                text: "No se creara una nueva cuenta",
                                                icon: "error",
                                                confirmButtonColor:'#ff2d2d',   
                                                confirmButtonText: "Volver atras"                                                         
                                            });
                                            }
                                          });                                     
                                    }}>No tienes cuenta?</Link>
                            <br/>    
                            <br/>

                                <Link onClick={() =>{                    
                                        const aceptarElimnar = Swal.mixin({
                                          });
                                          aceptarElimnar.fire({
                                            title: "Olvidaste la contraseña?",
                                            icon: "warning",
                                            showCancelButton: true,
                                            confirmButtonText: "Si, cambiar!",
                                            confirmButtonColor:' #3ed634',  
                                            reverseButtons: true,
                                            cancelButtonText: "No, cancelar",
                                            cancelButtonColor:'#ff2d2d',                
                                          }).then((result) => {
                                            if (result.isConfirmed) {                                                                                   
                                                navigate('/RecuperarContraseñaParte1')                                                                                        
                                            } else if (
                                              /* Read more about handling dismissals below */
                                              result.dismiss === Swal.DismissReason.cancel
                                            ) {
                                              aceptarElimnar.fire({
                                                title: "Operacion Cancelada",
                                                text: "No se actualizara la contraseña",
                                                icon: "error",
                                                confirmButtonColor:'#ff2d2d',   
                                                confirmButtonText: "Volver atras                                                "                                                         
                                            });
                                            }
                                          });                                     
                                    }}>Olvidaste la contraseña?</Link>
                            <br/>
                        </div>
                    </form>                            
                </section>
                <Footer />
            </div>    
        )
}