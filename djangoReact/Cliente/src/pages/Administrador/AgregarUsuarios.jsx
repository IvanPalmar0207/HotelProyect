import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import { ListarRoles } from "../../api/rolesAPI";
import { ListarTiposDocumento } from "../../api/tiposDocumentoAPI"
import { todosLosUsuario } from "../../api/usuariosApi";
import '../../static/css/agregarUsuario.css';
import imagePlaya from '../../static/img/playa.png'
import { useForm } from "react-hook-form";
import { agregarUsuarios } from "../../api/usuariosApi";
import {useNavigate } from "react-router-dom";
import {Footer} from "../../components/footer";
import perfil from '../../static/img/perfil.png'
import Cookies from "universal-cookie";
import Swal from 'sweetalert2'
import md5 from 'md5'

export function AgregarUsuarios(){

    const [roles, setRoles] = useState([])
    const [tiposDoc, setTiposDoc] = useState([])
    const [usuarios, setUsuarios] = useState([])
    const [valorSelectTipo, setValorSelectTipo] = useState("");
    const [valorSelectRol, setValoRol] = useState("");

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
            else if(cookies.get('codigo_rl') == 2){
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
                navigate('/InicioCliente')
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
    
    const styleImg = {
        with: '24px',
        height: '24px'
    }

    const envioForm = handleSubmit(async (data) => {
            const valorFormulario = {
                ...data,
                codigo_tpD : valorSelectTipo,
                codigo_rl : valorSelectRol,
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
                console.log(data1.numeroDocumento_usu.length)
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
            }else{
                await agregarUsuarios(valorFormulario)
                .then((res)=>{
                    Swal.fire({
                        icon: "success",
                        title: "Usuario Registrado",
                        confirmButtonColor:'#3ed634',                
                        confirmButtonText : 'Siguiente',
                        text: "La usuario ha sido registrado correctamente",            
                    });
                    console.log(res)
                    navigate('/Navigation');        
                })
                .catch((errr)=>{
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        confirmButtonColor:'#ff3333',                
                        confirmButtonText : 'Volver',
                        text: 'El numero de documento ya existe, intenta nuevamente!'
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


                <div className="contenedorPerfil">
                    <img src={perfil} alt="logoPerfil" style={styleImg}/>
                    <h3 className="textoPerfil">Administrador</h3>
                </div>
    

                <div className="contenedorEnlaces">
                    <ul>
                        <li><Link to='/Navigation' className="a">Volver</Link></li>
                        <li><Link to='/ListaUsuarios' className="a">Ver Usuarios</Link></li>                       
                    </ul>   
                </div>

                <section className="formRegistro">
                    <form className="contenedor" onSubmit={envioForm} >
                        
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
                            <label htmlFor="rol">Rol de usuario:</label>
                            <select className="input" name="rol" id="rol" required 
                            {...register("rol_usu", { required: true })}
                            value = {valorSelectRol}
                            onChange={handleChangeSelectRol}
                            >                
                            <option></option>
                            {roles.map(rol =>
                                    <option key={rol.codigo_rl} value={rol.codigo_rl}>{rol.tipo_rl}</option>
                            )}
                            </select>
                            {errors.rol_usu && <span>El campo es obligatorio</span>}                                
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

                        <button className="boton">Ingresa</button>
                    </form>                            
                </section>
                <Footer />
            </div>    
        )
}