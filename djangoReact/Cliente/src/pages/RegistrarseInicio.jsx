import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import { ListarRoles } from "../api/rolesAPI";
import { ListarTiposDocumento } from "../api/tiposDocumentoAPI"
import { todosLosUsuario } from "../api/usuariosApi";
import '../static/css/registrarInicio.css';
import imagePlaya from '../static/img/playa.png'
import { useForm } from "react-hook-form";
import { agregarUsuarios } from "../api/usuariosApi";
import {useNavigate } from "react-router-dom";
import {Footer} from "../components/footer";
import Swal from 'sweetalert2'
import md5 from 'md5'

export function RegistrarseInicio(){

    const [roles, setRoles] = useState([])
    const [tiposDoc, setTiposDoc] = useState([])
    const [usuarios, setUsuarios] = useState([])
    const [valorSelectTipo, setValorSelectTipo] = useState("");
    const [valorSelectRol, setValoRol] = useState("");


    useEffect(()=>{
        async function listarRoles(){
            const response = await ListarRoles()
            setRoles(response.data)
        }
        listarRoles()
    },[])

    useEffect(() => {
        async function listarTipoDocumento(){
            const response = await ListarTiposDocumento();
            setTiposDoc(response.data)
        }
        listarTipoDocumento()
    },[])

    useEffect(() => {
        async function listarUusario(){
            const response = await todosLosUsuario()
            setUsuarios(response.data)            
        }
        listarUusario()
    },[])

    const {register, handleSubmit, formState: errors} = useForm();

    const navigate = useNavigate();

    const handleChangeSelect = (event) => {
        setValorSelectTipo(event.target.value);
      };
    
    const handleChangeSelectRol = (event) => {
        setValoRol(event.target.value);
    };
    

    const envioForm = handleSubmit(async (data) => {
            const valorFormulario = {
                numeroDocumento_usu : data.numeroDocumento_usu,
                nombres_usu : data.nombres_usu,
                apellidos_usu : data.apellidos_usu,
                correoElectronico_usu : data.correoElectronico_usu,
                codigo_tpD : valorSelectTipo,
                codigo_rl : 2,
                contrasena_usu: md5(data.contrasena_usu)                        
            }

            //Validar Formulario

            let minusculas = /[a-z]/g

            let mayusculas = /[A-Z]/g

            let numeros = /[1-999999999999]/g
            
            let validacionEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

            var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,16}/;

            let correoElectronico = ''

            usuarios.map(usu => {
                if(usu.correoElectronico_usu === data.correoElectronico_usu){
                    correoElectronico = usu.correoElectronico_usu
                }
            })
    
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
            }else if(!validacionEmail.test(data.correoElectronico_usu)){
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
            }else if(data.correoElectronico_usu === correoElectronico){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'El correo electronico seleccionado ya existe dentro del sistema',
                    confirmButtonText: "Reenviar",
                    allowEnterKey:true,
                    allowOutsideClick:false,
                    confirmButtonColor:"red"
                    }
                )
                return false  
            }else if(data.nombres_usu.match(numeros) ){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'El nombre no puede contener numeros',
                    confirmButtonText: "Reenviar",
                    allowEnterKey:true,
                    allowOutsideClick:false,
                    confirmButtonColor:"red"
                    }
                )
                return false  
            }else if(data.apellidos_usu.match(numeros)){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'El apellido no puede contener numeros',
                    confirmButtonText: "Reenviar",
                    allowEnterKey:true,
                    allowOutsideClick:false,
                    confirmButtonColor:"red"
                    }
                )
                return false 
            }else if(data.contrasena_usu.length < 8 || data.contrasena_usu. length > 16){
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
            }else if(!regex.test(data.contrasena_usu)){
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
            }
            else if(data.contrasena_usu != data.reContrasena_usu){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Las contraseña deben de ser iguales',
                    confirmButtonText: "Reenviar",
                    allowEnterKey:true,
                    allowOutsideClick:false,
                    confirmButtonColor:"red"
                    }
                )
                return false
            }
            else{
                await agregarUsuarios(valorFormulario)
                .then((res)=>{
                    Swal.fire({
                        icon: "success",
                        title: "Registro Correcto",
                        confirmButtonColor:'#3ed634',                
                        confirmButtonText : 'Siguiente',
                        text: "La usuario ha sido registrado correctamente",            
                    });
                    console.log(res)
                    navigate('/');        
                })
                .catch((errr)=>{
                     Swal.fire({
                         icon: "error",
                        title: "Oops...",
                        confirmButtonColor:'#ff3333',                
                        confirmButtonText : 'Volver',
                        text: 'El numero de documento ya existe'                    
                    });
                    console.error('Error al agregar usuarios:', errr);
                })
            }
                });

    return (
        
            <div>                        
                <header>
                    <div className="logoIzquierdo">
                        <img src={imagePlaya}alt="logoIzquierda" />
                    </div>
                    <h1 className="tituloEncabezado">Registrate con Pegasus</h1>
                    <div className="logoIzquierdo">
                        <img src={imagePlaya} alt="logoIzquierda" />
                    </div>
                </header>

                <div className="contenedorEnlaces">
                    <ul>                  
                    </ul>   
                </div>

                <section className="formRegistroInicio">
                    <form className="contenedorRegistroInicio" onSubmit={envioForm} >
                        
                        <div className="campo">
                            <label htmlFor="numeroDoc">Numero de Documento:</label>
                            <input type="text" name="numeroDoc" id="numeroDoc" required
                            {...register("numeroDocumento_usu", {required : true})}                    
                            />
                            {errors.numeroDocumento_usu && <span>El campo es obligatorio</span>}
                        </div>
                    

                        <br />

                        <div className ="campo">
                            <label htmlFor="tipoDoc">Tipo de Documento:</label>
                            <select className="input" name="tipoDoc" id="tipoDoc" required                  
                            {...register("tipoDocumento_usu", {required : true})}                                      
                            value = {valorSelectTipo}
                            onChange={handleChangeSelect}                
                            >        
                            <option></option>
                            {tiposDoc.map(tipo =>
                                    <option key={tipo.codigo_tpD} value={tipo.codigo_tpD}>{tipo.tipo_tpDD}</option>
                            )}
                            </select >
                            {errors.tipoDocumento_usu && <span>El campo es obligatorio</span>}        
                        </div>

                        <br />

                        <div className="campo">
                            <label htmlFor="email">Correo Electronico: </label>
                            <input type="email" name="email" id="email" required 
                            {...register("correoElectronico_usu", {required : true})}                                                
                            />
                            {errors.correoElectronico_usu && <span>El campo es obligatorio</span>}        
                        </div>

                        <br />

                        <div className="campo">
                            <label htmlFor="nombre">Nombres del usuario:</label>
                            <input type="text" name="nombre" id="nombre" required 
                            {...register("nombres_usu", {required : true})}                                                
                            />
                            
                        </div>
                        {errors.nombres_usu && <span>El campo es obligatorio</span>}        
                        <br />

                        <div className="campo">
                            <label htmlFor="apellido">Apellidos del usuario:</label>
                            <input type="text" name="apellido" id="apellido" required 
                            {...register("apellidos_usu", {required : true})}                                                
                            />
                        {errors.apellidos_usu && <span>El campo es obligatorio</span>}                                
                        </div>
                
                        <br />

                        <div className="campo">
                            <label htmlFor="contrasena">Contraseña del usuario:</label>
                            <input type="password" name="contrasena" id="contrasena" required 
                            {...register("contrasena_usu", {required : true})}                                                
                            />
                            {errors.contrasena_usu && <span>El campo es obligatorio</span>}                                
                        </div>

                        <br />

                        <div className="campo">
                            <label htmlFor="reContrasena_usu">Confirmar Contraseña:</label>
                            <input type="password" name="reContrasena_usu" id="reContrasena_usu" required 
                            {...register("reContrasena_usu", {required : true})}                                                
                            />
                            {errors.reContrasena_usu && <span>El campo es obligatorio</span>}                                
                        </div>

                        <br />

                        <button className="boton">Ingresa</button>
                        <br/>
                            <Link onClick={() =>{                    
                                        const aceptarElimnar = Swal.mixin({
                                          });
                                          aceptarElimnar.fire({
                                            title: "Ya tienes cuenta?",
                                            icon: "warning",
                                            showCancelButton: true,
                                            confirmButtonText: "Si!",
                                            confirmButtonColor:' #3ed634',  
                                            reverseButtons: true,
                                            cancelButtonText: "No!",
                                            cancelButtonColor:'#ff2d2d',                
                                          }).then((result) => {
                                            if (result.isConfirmed) {                                                                                   
                                                navigate('/')
                                            } else if (
                                              /* Read more about handling dismissals below */
                                              result.dismiss === Swal.DismissReason.cancel
                                            ) {
                                              aceptarElimnar.fire({
                                                title: "Operacion Cancelada",
                                                text: "Elegiste crear una nueva cuenta",
                                                icon: "error",
                                                confirmButtonColor:'#ff2d2d',   
                                                confirmButtonText: "Volver atras"                                                         
                                            });
                                            }
                                          });                                     
                                    }}>Ya tienes cuenta?</Link>
                        <br/>    
                    </form>                            
                </section>
                <Footer />
            </div>    
        )
}