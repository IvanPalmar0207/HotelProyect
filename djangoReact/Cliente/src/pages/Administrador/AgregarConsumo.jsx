//React Hooks
import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import { useForm } from "react-hook-form";
import {useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
//APIs 
import { verTodasReservas } from "../../api/reservaAPI";
import { verTodosServicios } from "../../api/servicioAPI";
import { agregarConsumo } from "../../api/consumoAPI";
//Componentes estaticos
import '../../static/css/agregarConsumo.css';
import imagePlaya from '../../static/img/playa.png'
import perfil from '../../static/img/perfil.png'
import {Footer} from "../../components/footer";
import Swal from 'sweetalert2'

export function AgregarConsumo(){
    const [reserva, setReserva] = useState([])
    const [servicio, setServicio] = useState([])
    const [valorSelectReserva, setValorSelectReserva] = useState("");
    const [valorSelectservicio, setValorSelectServicio] = useState("");

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
        async function listarServicio(){
            const response = await verTodosServicios()
            setServicio(response.data)
        }
        listarServicio()
    },[])

    useEffect(() => {
        async function listarReservas(){
            const response = await verTodasReservas()
            setReserva(response.data)
        }
        listarReservas()
    },[])

    const {register, handleSubmit, formState: errors} = useForm();

    const navigate = useNavigate();

    const handleChangeSelectServicio = (event) => {
        setValorSelectServicio(event.target.value);
      };

    const handleChangeSelectReserva = (event) => {
        setValorSelectReserva(event.target.value);
    };

    const envioForm = handleSubmit(async (data) => {
            
        const valorFormulario = new FormData()
        
        valorFormulario.append("codigo_res", valorSelectReserva);
        valorFormulario.append("codigo_ser", valorSelectservicio);
        valorFormulario.append("cantidad_con", data.cantidad_con);
        valorFormulario.append("precioUnitario_con", data.precioUnitario_con);

        //Validacion de formulario

        let minusculas = /[a-z]/g

        let mayusculas = /[A-Z]/g    

        //Validacion de la reserva 

        var codigo_res = valorSelectReserva

        let fechaInicio = ''
        let fechaSalida = ''

        reserva.map(res => {
            if (codigo_res == res.codigo_res){
                fechaSalida = res.fechaSalida_res
                fechaInicio = res.fechaInicio_res
            }
        })

        //Validacion de las fechas

        let fechaActual = new Date()
    
        let fechaInicio_res = new Date(fechaInicio)
        let fechaSalida_res = new Date(fechaSalida)

        console.log(fechaInicio_res)
        console.log(fechaActual)
        
        if(fechaActual > fechaSalida_res){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No se pueden cargar consumos despues de la fecha de salida de la reserva',
                confirmButtonText: "Reenviar",
                allowEnterKey:true,
                allowOutsideClick:false,
                confirmButtonColor:"red"
                }
            )
            return false   
        }
        else if(fechaActual < fechaInicio_res){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No se pueden cargar consumos si aun no ha iniciado la reserva',
                confirmButtonText: "Reenviar",
                allowEnterKey:true,
                allowOutsideClick:false,
                confirmButtonColor:"red"
                }
            )
            return false   
        }else if(data.cantidad_con.match(mayusculas) || data.cantidad_con.match(minusculas)){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'La cantidad no puede contener letras',
                confirmButtonText: "Reenviar",
                allowEnterKey:true,
                allowOutsideClick:false,
                confirmButtonColor:"red"
                }
            )
            return false   
        }else if(data.precioUnitario_con.match(mayusculas) || data.precioUnitario_con.match(minusculas)){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El precio unitario del consumo no debe contener letras',
                confirmButtonText: "Reenviar",
                allowEnterKey:true,
                allowOutsideClick:false,
                confirmButtonColor:"red"
                }
            )
            return false   
        }

        try{            
            await agregarConsumo(valorFormulario)
            Swal.fire({
                icon: "success",
                title: "Consumo Agregado",
                confirmButtonColor:'#3ed634',                
                confirmButtonText : 'Siguiente',
                text: "El consumo ha sido agregado correctamente",            
            });         
            navigate('/Navigation')
        }
        catch{
            Swal.fire({
                icon: "error",
                title: "Oops...",
                confirmButtonColor:'#ff3333',                
                confirmButtonText : 'Volver',
                text: "Ha ocurrido un error agregando el consumo, intenta nuevamente",                
            }); 
        }})

    return (
        
            <div>                        
                <header>
                    <div className="logoIzquierdo">
                        <img src={imagePlaya}alt="logoIzquierda" />
                    </div>
                    <h1 className="tituloEncabezado">Gestion de Consumos - Hotel Pegasus</h1>
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
                        <li><Link to='/AgregarCategoria' className="a">Volver</Link></li>
                        <li><Link to='/ListaConsumo' className="a">Ver Consumos</Link></li>                       
                    </ul>   
                </div>

                <section className="formRegistroAgregarConsumo">
                    <form className="contenedorAgregarConsumo" onSubmit={envioForm} >

                        <div className ="campo">
                            <label htmlFor="codigo_res">Codigo de la Reserva:</label>
                            <select className="input" name="codigo_res" id="codigo_res" required                  
                            {...register("codigo_res", {required : true})}                                      
                            value = {valorSelectReserva}
                            onChange={handleChangeSelectReserva}                
                            >        
                            <option></option>
                            {reserva.map(res =>
                                    <option key={res.codigo_res} value={res.codigo_res}>{res.codigo_res}</option>
                            )}
                            </select >
                            {errors.tipoDocumento_usu && <span>El campo es obligatorio</span>}        
                        </div>

                        <br />

                        <div className ="campo">
                            <label htmlFor="codigo_ser">Servicio Consumido:</label>
                            <select className="input" name="codigo_ser" id="codigo_ser" required                  
                            {...register("codigo_ser", {required : true})}                                      
                            value = {valorSelectservicio}
                            onChange={handleChangeSelectServicio}                
                            >        
                            <option></option>
                            {servicio.map(ser =>
                                    <option key={ser.codigo_ser} value={ser.codigo_ser}>{ser.nombre_ser}</option>
                            )}
                            </select >
                            {errors.tipoDocumento_usu && <span>El campo es obligatorio</span>}        
                        </div>                                       

                        <br />

                        <div className="campo">
                            <label htmlFor="cantidad_con">Cantidad Consumida:</label>
                            <input type="text" name="cantidad_con" id="cantidad_con" required
                            {...register("cantidad_con", {required : true})}                    
                            />
                            {errors.numeroDocumento_usu && <span>El campo es obligatorio</span>}
                        </div>
                        
                        <br />

                        <div className="campo">
                            <label htmlFor="precioUnitario_con">Precio Unitario:</label>
                            <input type="text" name="precioUnitario_con" id="precioUnitario_con" required
                            {...register("precioUnitario_con", {required : true})}                    
                            />
                            {errors.numeroDocumento_usu && <span>El campo es obligatorio</span>}
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