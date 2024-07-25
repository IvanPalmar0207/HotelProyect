//React Hooks
import React, { useEffect, useState } from "react";
import {Link, useParams} from "react-router-dom";
import { useForm } from "react-hook-form";
import {useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
//APIs 
import { verTodasHabitaciones } from "../../api/habitacionAPI";
import { unaReserva } from "../../api/reservaAPI";
import { actualizarReserva } from "../../api/reservaAPI";
import { todosLosUsuario } from "../../api/usuariosApi";
import { actualizarHabitacionPatc } from "../../api/habitacionAPI";
//Componentes estaticos
import '../../static/css/actualizarReserva.css';
import imagePlaya from '../../static/img/playa.png'
import perfil from '../../static/img/perfil.png'
import {Footer} from "../../components/footer";
import Swal from 'sweetalert2'

export function ActualizarReservaCliente(){

    const [habitacion, setHabitaciones] = useState([])
    const [valorSelectHabitacion, setValorSelectHabitacion] = useState("");
    const [usuarios, setUsuarios] = useState([])

    const styleImg = {
        with: '24px',
        height: '24px'
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

    useEffect(()=>{
        async function listarHabitacion(){
            const response = await verTodasHabitaciones()
            setHabitaciones(response.data)
        }
        listarHabitacion()
    },[])

    useEffect(() => {
        async function listarUsuarios(){
            const response = await todosLosUsuario()
            setUsuarios(response.data)
        }
        listarUsuarios()
    },[])

    const {register, setValue, handleSubmit, formState: errors} = useForm();

    const params = useParams()

    useEffect(() => {
        async function cargarReserva(){
            const response = await unaReserva(params.codigo_res)            
            setValue("numeroDocumento_cli", response.data.numeroDocumento_cli)
            setValue("cantidadJovenes_res", response.data.cantidadJovenes_res)
            setValue("cantidadAdultos_res", response.data.cantidadAdultos_res)
        }
        cargarReserva()
    },[])

    const navigate = useNavigate();

    const handleChangeSelectHabitacion = (event) => {
        setValorSelectHabitacion(event.target.value);
      };

    const envioForm = handleSubmit(async (data) => {
            
        const valorFormulario = new FormData()
            
            valorFormulario.append("numeroDocumento_cli", data.numeroDocumento_cli);
            valorFormulario.append("fechaInicio_res", data.fechaInicio_res);
            valorFormulario.append("fechaSalida_res", data.fechaSalida_res);
            valorFormulario.append("cantidadJovenes_res", data.cantidadJovenes_res);
            valorFormulario.append("cantidadAdultos_res", data.cantidadAdultos_res);
            valorFormulario.append("codigo_hab", valorSelectHabitacion);      

            //Validacion de Formulario

            let minusculas = /[a-z]/g

            let mayusculas = /[A-Z]/g

            //Validacion de fechas

            const fechaInicio_res = new Date(data.fechaInicio_res)
            const fechaSalida_res = new Date(data.fechaSalida_res)
                        
            let fechaActual = new Date()         

            var codigo_ed = ''
    
            var maximoPersonas_tpH = ''

            //Validacion de la habitacion
        
            habitacion.map(hab => {
                if(data.codigo_hab == hab.codigo_hab){
                    codigo_ed = hab.codigo_ed
                    maximoPersonas_tpH = hab.maximoPersonas_tpH
                }})  
                
            var codigo_rl = ''

            //Validacion de la Habitacion

            usuarios.map(usu => {
                if(usu.numeroDocumento_usu == data.numeroDocumento_cli){
                    codigo_rl = usu.codigo_rl
                }
            })

            var totalHuespedes = Number(data.cantidadAdultos_res) + Number(data.cantidadJovenes_res)

            if(data.numeroDocumento_cli.length < 5){
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
                console.log(data.numeroDocumento_cli.length)
                return false
            }else if(data.numeroDocumento_cli.length > 10){
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
                console.log(data.numeroDocumento_cli.length)
                return false
            }else if (codigo_rl == ''){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'El numero de documento no corresponde a ningun usuario',
                    confirmButtonText: "Reenviar",
                    allowEnterKey:true,
                    allowOutsideClick:false,
                    confirmButtonColor:"red"
                    }
                )
                return false
            }
            else if(codigo_rl != 2){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'El usuario al que se le esta generando la reserva no es un cliente',
                    confirmButtonText: "Reenviar",
                    allowEnterKey:true,
                    allowOutsideClick:false,
                    confirmButtonColor:"red"
                    }
                )
                return false
            }
            else if(data.numeroDocumento_cli.match(mayusculas) || data.numeroDocumento_cli.match(minusculas)){
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
            }else if(data.cantidadJovenes_res.match(minusculas) || data.cantidadJovenes_res.match(mayusculas)){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'La cantidad de jovenes no puede contener letras',
                    confirmButtonText: "Reenviar",
                    allowEnterKey:true,
                    allowOutsideClick:false,
                    confirmButtonColor:"red"
                    }
                )
                return false   
            }else if(data.cantidadAdultos_res.match(minusculas) || data.cantidadAdultos_res.match(mayusculas)){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'La cantidad de adultos no puede contener letras',
                    confirmButtonText: "Reenviar",
                    allowEnterKey:true,
                    allowOutsideClick:false,
                    confirmButtonColor:"red"
                    }
                )
                return false   
            }else if(totalHuespedes > maximoPersonas_tpH){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'La maxima capacidad de personas se ve superada, por favor elige otra habitacion',
                    confirmButtonText: "Reenviar",
                    allowEnterKey:true,
                    allowOutsideClick:false,
                    confirmButtonColor:"red"
                    }
                )
                return false   
            }else if(fechaInicio_res >= fechaSalida_res){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'La fecha de inicio no puede ser mayor o igual a la de salida',
                    confirmButtonText: "Reenviar",
                    allowEnterKey:true,
                    allowOutsideClick:false,
                    confirmButtonColor:"red"
                    }
                )
                return false 
            }
            else if (fechaInicio_res < fechaActual){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'La fecha de inicio no puede ser menor a la fecha actual',
                    confirmButtonText: "Reenviar",
                    allowEnterKey:true,
                    allowOutsideClick:false,
                    confirmButtonColor:"red"
                    }
                )
                return false 
            }else{
                await actualizarReserva(params.codigo_res,valorFormulario)
                .then(async (res)=>{
                    Swal.fire({
                        icon: "success",
                        title: "Actualizacion Correcta ",
                        confirmButtonColor:'#3ed634',                
                        confirmButtonText : 'Siguiente',
                        text: "La reserva ha sido actualizada correctamente",            
                    });
                    console.log(res)

                    const valorFormularioHab = new FormData()
            
                    let numeroHabitacion = valorSelectHabitacion

                    valorFormularioHab.append("codigo_ed", 4);      
                    await actualizarHabitacionPatc(numeroHabitacion, valorFormularioHab).then((res)=>
                    {
                        console.log(res.data)
                    }).catch((err) => {
                        console.log(err)
                    })
                    navigate('/ListaReservasCliente');        
                 })
                 .catch((errr)=>{
                     Swal.fire({
                         icon: "error",
                         title: "Oops...",
                         confirmButtonColor:'#ff3333',                
                         confirmButtonText : 'Volver',
                         text: "Hubo un problema actualizando la reserva!",
                         footer: 'Uno de los campos es incorrecto, trata nuevamente'
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
                    <h1 className="tituloEncabezado">Actualizar Reservas - Hotel Pegasus</h1>
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
                        <li><Link to='/ValidarReservas' className="a">Volver</Link></li>
                    </ul>   
                </div>

                <section className="formRegistroActualizarReserva">
                    <form className="contenedorActualizarReserva" onSubmit={envioForm} >
                        
                        <div className="campo">
                            <label htmlFor="numeroDoc">Numero de Documento:</label>
                            <input type="text" name="numeroDoc" id="numeroDoc" disabled
                            {...register("numeroDocumento_cli", {required : true})}                    
                            />
                            {errors.numeroDocumento_usu && <span>El campo es obligatorio</span>}
                        </div>                    

                        <br />

                        <div className="campo">
                            <label htmlFor="fechaInicio_res">Fecha de inicio:</label>
                            <input type="Date" name="fechaInicio_res" id="fechaInicio_res" required
                            {...register("fechaInicio_res", {required : true})}                    
                            />
                            {errors.numeroDocumento_usu && <span>El campo es obligatorio</span>}
                        </div>

                        <br />

                        <div className="campo">
                            <label htmlFor="fechaSalida_res">Fecha de Salida:</label>
                            <input type="Date" name="fechaInicio_res" id="fechaInicio_res" required
                            {...register("fechaSalida_res", {required : true})}                    
                            />
                            {errors.numeroDocumento_usu && <span>El campo es obligatorio</span>}
                        </div>

                        <br />

                        <div className="campo">
                            <label htmlFor="cantidadJovenes_res">Cantidad de Jovenes:</label>
                            <input type="text" name="cantidadJovenes_res" id="cantidadJovenes_res" required
                            {...register("cantidadJovenes_res", {required : true})}                    
                            />
                            {errors.numeroDocumento_usu && <span>El campo es obligatorio</span>}
                        </div>

                        <br />

                        <div className="campo">
                            <label htmlFor="cantidadAdultos_res">Cantidad de Adultos:</label>
                            <input type="text" name="cantidadAdultos_res" id="cantidadAdultos_res" required
                            {...register("cantidadAdultos_res", {required : true})}                    
                            />
                            {errors.numeroDocumento_usu && <span>El campo es obligatorio</span>}
                        </div>

                        <br />

                        <div className ="campo">
                            <label htmlFor="codigo_hab">Numero de la Habitacion:</label>
                            <select className="input" name="codigo_hab" id="codigo_hab" required                  
                            {...register("codigo_hab", {required : true})}                                      
                            value = {valorSelectHabitacion}
                            onChange={handleChangeSelectHabitacion}                
                            >        
                            <option></option>
                            {habitacion.map(hab =>{
                                    if(hab.codigo_ed === 1)
                                    return (<option key={hab.codigo_hab} value={hab.codigo_hab}>{hab.codigo_hab}</option>)                                    
                                }                                
                            )}
                            </select >
                            {errors.tipoDocumento_usu && <span>El campo es obligatorio</span>}        
                        </div>

                        <br />

                        <button className="boton">Ingresa</button>
                        <br/>   
                    </form>                            
                </section>
                <Footer />
            </div>    
        )
}