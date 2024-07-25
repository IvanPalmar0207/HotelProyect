//React Hooks
import { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import {useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Cookies from "universal-cookie";
//APIs para las listas desplegables
import { todosTiposHabitacion } from "../../api/tipoHabitacionAPI";
import { todosEstados } from "../../api/estadoAPI";
import { agregarHabitacion } from "../../api/habitacionAPI";
//Componentes estaticos
import '../../static/css/agregarHabitacion.css';
import perfil from '../../static/img/perfil.png'
import imagePlaya from '../../static/img/playa.png'
import {Footer} from "../../components/footer";

import Swal from 'sweetalert2'

export function AgregarHabitacion(){

    const [tipoHabitacion, setTipoHabitacion] = useState([])
    const [estados, setEstado] = useState([])
    const [valorSelectTipoHabitacion, setValorTipoHabitacion] = useState("");
    const [valorSelectEstado, setValoEstado] = useState("");
    const [imagenHab, setIamgenHab] = useState([]);

    const styleImg = {
        with: '24px',
        height: '24px'
    }

    const subirImagen = (e) =>{
        setIamgenHab(e)
    }

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
        async function listarTipoHabitacion(){
            const response = await todosTiposHabitacion()
            setTipoHabitacion(response.data)
            console.log(response.data)
        }
        listarTipoHabitacion()
    },[])

    useEffect(() => {
        async function listarEstados(){
            const response = await todosEstados();
            setEstado(response.data)
        }
        listarEstados()
    },[])

    const {register, handleSubmit, formState: errors} = useForm();

    const navigate = useNavigate();

    const handleChangeSelectEstado = (event) => {
        setValoEstado(event.target.value);
      };
    
    const handleChangeSelectTipoHab = (event) => {
        setValorTipoHabitacion(event.target.value);
    };

    const envioForm = handleSubmit(async (data) => {            


            const valorFormulario = new FormData()

            valorFormulario.append("codigo_hab", data.codigo_hab);
            valorFormulario.append("codigo_tpH", valorSelectTipoHabitacion);
            valorFormulario.append("codigo_ed", valorSelectEstado);
            valorFormulario.append("descripcion_tpH", data.descripcion_tpH);
            valorFormulario.append("minimoPersonas_tpH", data.minimoPersonas_tpH);
            valorFormulario.append("maximoPersonas_tpH", data.maximoPersonas_tpH);      

            for (let index = 0; index < imagenHab.length; index++) {
                valorFormulario.append('image_tpH',imagenHab[index])
            }                    

            let minusculas = /[a-z]/g

            let mayusculas = /[A-Z]/g

            let numeros = /[1-999999999999]/g
                
            if(data.codigo_hab.match(minusculas) || data.codigo_hab.match(mayusculas)){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'El numero de la habitacion no puede contener letras',
                    confirmButtonText: "Reenviar",
                    allowEnterKey:true,
                    allowOutsideClick:false,
                    confirmButtonColor:"red"
                    }
                )
                return false   
            }else if(data.descripcion_tpH.match(numeros)){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'La descripcion no puede contener numeros, todo tiene que ser letras',
                    confirmButtonText: "Reenviar",
                    allowEnterKey:true,
                    allowOutsideClick:false,
                    confirmButtonColor:"red"
                    }
                )
                return false   
            }else if(data.descripcion_tpH.length > 70){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'La descripcion no puede tener mas de 70 caracteres',
                    confirmButtonText: "Reenviar",
                    allowEnterKey:true,
                    allowOutsideClick:false,
                    confirmButtonColor:"red"
                    }
                )
                return false   
            }else if(data.minimoPersonas_tpH.match(minusculas) || data.minimoPersonas_tpH.match(mayusculas)){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'El campo del minimo de personas no puede contener letras',
                    confirmButtonText: "Reenviar",
                    allowEnterKey:true,
                    allowOutsideClick:false,
                    confirmButtonColor:"red"
                    }
                )
                return false   
            }else if(data.maximoPersonas_tpH.match(minusculas) || data.maximoPersonas_tpH.match(mayusculas)){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'El campo del maximo de personas no puede contener letras',
                    confirmButtonText: "Reenviar",
                    allowEnterKey:true,
                    allowOutsideClick:false,
                    confirmButtonColor:"red"
                    }
                )
                return false   
            }else if(data.maximoPersonas_tpH < data.minimoPersonas_tpH){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'El maximo de personas debe de ser superior al minimo de personas',
                    confirmButtonText: "Reenviar",
                    allowEnterKey:true,
                    allowOutsideClick:false,
                    confirmButtonColor:"red"
                    }
                )
                return false   
            }else{                        
                await agregarHabitacion(valorFormulario)
                .then((res)=>{
                    Swal.fire({
                        icon: "success",
                        title: "Habitacion Registrada",
                        confirmButtonColor:'#3ed634',                
                        confirmButtonText : 'Siguiente',
                        text: "La habitacion ha sido registrada correctamente",            
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
                        text: "Hubo un problema registrando la habitacion!",
                        footer: 'Uno de los campos es incorrecto, trata nuevamente'
                    });
                     console.error('Error al agregar usuarios:', errr);
                })
            }              
        }
      );

    return (
        
            <div>                        
                <header>
                    <div className="logoIzquierdo">
                        <img src={imagePlaya}alt="logoIzquierda" />
                    </div>
                    <h1 className="tituloEncabezado">Gestion de Habitaciones</h1>
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
                        <li><Link to='/ListaHabitacion' className="a">Ver Habitaciones</Link></li>                       
                    </ul>   
                </div>

                <section className="formRegistroAgregarHab">
                    <form className="contenedorAgregarHab" onSubmit={envioForm} encType="multipart/form-data">

                        <div className="campo">
                            <label htmlFor="codigo_hab">Numero de la habitacion: </label>
                            <input type="text" {...register("codigo_hab", {required : true})}/>
                            {errors.codigo_hab && <span>El campo es obligatorio</span>}        
                        </div>                                     

                        <br />

                        <div className ="campo">
                            <label htmlFor="codigo_tpH">Tipo de habitacion:</label>
                            <select className="input"  name="codigo_tpH" id="codigo_tpH" required
                            {...register("codigo_tpH", {required : true})}                                      
                            value = {valorSelectTipoHabitacion}
                            onChange={handleChangeSelectTipoHab}                
                            >        
                            <option></option>
                            {tipoHabitacion.map(tipoHab =>
                                    <option key={tipoHab.codigo_tpH} value={tipoHab.codigo_tpH}>{tipoHab.tipo_tpH}</option>
                            )}
                            </select >
                            {errors.codigo_tpH && <span>El campo es obligatorio</span>}        
                        </div>      

                        <br />

                        <div className ="campo">
                            <label htmlFor="codigo_ed">Estado de la habitacion:</label>
                            <select className="input"  name="codigo_ed" id="codigo_ed" required
                            {...register("codigo_ed", {required : true})}                                      
                            value = {valorSelectEstado}
                            onChange={handleChangeSelectEstado}                
                            >        
                            <option></option>
                            {estados.map(estadoHab =>
                                    <option key={estadoHab.codigo_ed} value={estadoHab.codigo_ed}>{estadoHab.tipo_ed}</option>
                            )}
                            </select >
                            {errors.codigo_tpH && <span>El campo es obligatorio</span>}        
                        </div>         

                        <br />


                        <div className="campo">
                            <label htmlFor="descripcion_tpH">Descripcion. Habitacion: </label>
                            <input type="text" {...register("descripcion_tpH", {required : true})}/>
                            {errors.descripcion_tpH && <span>El campo es obligatorio</span>}        
                        </div>

                        <br />


                        <div className="campo">
                            <label htmlFor="minimoPersonas_tpH">Minimo de Personas: </label>
                            <input type="text" {...register("minimoPersonas_tpH", {required : true})}/>
                            {errors.minimoPersonas_tpH && <span>El campo es obligatorio</span>}        
                        </div>

                        <br />

                        <div className="campo">
                            <label htmlFor="maximoPersonas_tpH">Maximo de Personas: </label>
                            <input type="text" {...register("maximoPersonas_tpH", {required : true})}/>
                            {errors.maximoPersonas_tpH && <span>El campo es obligatorio</span>}        
                        </div>

                        <br />

                        <div className="campo">
                            <label htmlFor="image_tpH">Imagen de la habitacion:</label>
                            <input type="file" name='image_tpH' multiple onChange={(e) => subirImagen(e.target.files)}/>
                            {errors.image_tpH && <span>El campo es obligatorio</span>}        
                        </div>

                        <br />
                        <button className="boton">Agregar</button>
                        <br/>
                    </form>                            
                </section>
                <Footer />
            </div>    
        )
}