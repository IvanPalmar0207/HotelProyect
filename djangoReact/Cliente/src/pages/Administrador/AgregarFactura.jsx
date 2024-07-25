//React Hooks
import { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import {useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Cookies from "universal-cookie";
//APIs para las listas desplegables
import { verTodasReservas } from "../../api/reservaAPI";
import { agregarFactura } from "../../api/facturaAPI";
import { todosMetodosPago } from "../../api/metodoPagoAPI";
import { todosConsumo } from "../../api/consumoAPI";
import { verTodasHabitaciones } from "../../api/habitacionAPI";
import { todosTiposHabitacion } from "../../api/tipoHabitacionAPI";
//Componentes estaticos
import '../../static/css/agregarFactura.css';
import imagePlaya from '../../static/img/playa.png'
import perfil from '../../static/img/perfil.png'
import {Footer} from "../../components/footer";

import Swal from 'sweetalert2'

export function AgregarFactura(){

    const [reserva, setReserva] = useState([])
    const [metodoPago, setMetodoPago] = useState([])
    const [consumo,setConsumo] = useState([])
    const [habitaciones, setHabitaciones] = useState([])
    const [tipoHabitaciones, setTipoHabitaciones] = useState([])
    const [valorSelectReserva, setValorReserva] = useState("");
    const [valorSelectMetodo1, setValorMetodo1] = useState("");
    const [valorSelectMetodo2, setValorMetodo2] = useState("");

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

    useEffect(() => {
        async function listarReservas(){
            const response = await verTodasReservas();
            setReserva(response.data)
        }
        listarReservas()
    },[])

    useEffect(() => {
        async function listarConsumos(){
            const response = await todosConsumo()
            setConsumo(response.data)
        }
        listarConsumos()
    },[])

    useEffect(() => {
        async function listarMetodosPago(){
            const response = await todosMetodosPago()
            setMetodoPago(response.data)
        }
        listarMetodosPago()
    },[])

    useEffect(()=> {
        async function listarHabitaciones(){
            const response = await verTodasHabitaciones()
            setHabitaciones(response.data)
        }
        listarHabitaciones()
    },[])

    useEffect(() => {
        async function listarTiposHabtiacion(){
            const response = await todosTiposHabitacion()
            setTipoHabitaciones(response.data)
        }
        listarTiposHabtiacion()
    },[])

    const {register, handleSubmit, formState: errors} = useForm();

    const navigate = useNavigate();
 
    const handleChangeSelectReserva = (event) => {
        setValorReserva(event.target.value);
    };

     
    const handleChangeSelectMetodo1 = (event) => {
        setValorMetodo1(event.target.value);
    };

     
    const handleChangeSelectMetodo2 = (event) => {
        setValorMetodo2(event.target.value);
    };
    
    const envioForm = handleSubmit(async (data) => {            


            const valorFormulario = new FormData()

            valorFormulario.append("codigo_res", valorSelectReserva)

            let valorHabitacion = 0

            reserva.map(res => {
                if(res.codigo_res == valorSelectReserva){
                    habitaciones.map(hab => {
                        if(hab.codigo_hab == res.codigo_hab){
                            tipoHabitaciones.map(tipoHab => {
                                if (hab.codigo_tpH == tipoHab.codigo_tpH){
                                   valorHabitacion = tipoHab.valorBase_tpH
                                }
                            })
                        }
                    })
                }
            })

            let fechaActual = new Date()            

            var fechaSalida = ''
            var fechaInicio = ''

            reserva.map(res => {
                if (res.codigo_res == valorSelectReserva){
                    fechaSalida = res.fechaSalida_res
                    fechaInicio = res.fechaInicio_res
                }            
            })

            let fecha1 = new Date(fechaSalida)
            let fecha2 = new Date(fechaInicio)

            let totalNoches = fecha1.getDay() - fecha2.getDay()

            if(fechaActual < fecha1){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'No se puede generar una factura antes de la fecha de salida',
                    confirmButtonText: "Reenviar",
                    allowEnterKey:true,
                    allowOutsideClick:false,
                    confirmButtonColor:"red"
                    }
                )
                return false
            }
            else if(valorSelectMetodo2 == ''){
                let precio = 0
                consumo.map(con => {
                    if(con.codigo_res == valorSelectReserva){
                        console.log(con.numero_con)
                        valorFormulario.append("numero_con", con.numero_con)
                        precio += con.cantidad_con * con.precioUnitario_con
                    }
                })                         
                valorFormulario.append("valorTotal_fac", (valorHabitacion * totalNoches) + precio)
                valorFormulario.append("codigo_mP", valorSelectMetodo1)                                

                await agregarFactura(valorFormulario)
                .then((res)=>{
                    Swal.fire({
                        icon: "success",
                        title: "Factura Generada",
                        confirmButtonColor:'#3ed634',                
                        confirmButtonText : 'Siguiente',
                        text: "La Factura ha sido generada correctamente",            
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
                     text: "Hubo un problema generando la factura",
                     footer: 'Uno de los campos es incorrecto, trata nuevamente'
                 });
                 console.error('Error al agregar factura:', errr);
             })        
            }else{
                let precio = 0
                consumo.map(con => {
                    if(con.codigo_res == valorSelectReserva){
                        console.log(con.numero_con)
                        valorFormulario.append("numero_con", con.numero_con)
                        precio += con.cantidad_con * con.precioUnitario_con
                    }
                })                         
                valorFormulario.append("valorTotal_fac",(valorHabitacion * totalNoches) + precio)
                valorFormulario.append("codigo_mP", valorSelectMetodo1)
                valorFormulario.append("codigo_mP", valorSelectMetodo2) 
                
                await agregarFactura(valorFormulario)
                    .then((res)=>{
                    Swal.fire({
                        icon: "success",
                        title: "Factura Generada",
                        confirmButtonColor:'#3ed634',                
                        confirmButtonText : 'Siguiente',
                        text: "La Factura ha sido generada correctamente",            
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
                        text: "Hubo un problema generando la factura",
                        footer: 'Uno de los campos es incorrecto, trata nuevamente'
                    });
                    console.error('Error al agregar factura:', errr);
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
                    <h1 className="tituloEncabezado">Gestion de Facturas - Hotel Pegasus</h1>
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
                        <li><Link to='/ListaFacturas' className="a">Ver Facturas</Link></li>                       
                    </ul>   
                </div>

                <section className="formRegistroAgregarFac">
                    <form className="contenedorAgregarFac" onSubmit={envioForm} encType="multipart/form-data">

                        <div className ="campo">
                            <label htmlFor="codigo_res">Numero de Reserva:</label>
                            <select className="input"  name="codigo_res" id="codigo_res" required
                            {...register("codigo_res", {required : true})}                                      
                            value = {valorSelectReserva}
                            onChange={handleChangeSelectReserva}                
                            >        
                            <option></option>
                            {reserva.map(res =>
                                    <option key={res.codigo_res} value={res.codigo_res}>{res.codigo_res}</option>
                            )}
                            </select >
                            {errors.codigo_res && <span>El campo es obligatorio</span>}        
                        </div>      

                        <br />

                        <div className ="campo">
                            <label htmlFor="codigo_mP">Metodo de Pago:</label>
                            <select className="input"  name="codigo_mP" id="codigo_mP" required
                            {...register("codigo_mP", {required : true})}                                      
                            value = {valorSelectMetodo1}
                            onChange={handleChangeSelectMetodo1}                
                            >        
                            <option value=''></option>
                            {metodoPago.map(mp1 =>
                                    <option key={mp1.codigo_mP} value={mp1.codigo_mP}>{mp1.tipo_mP}</option>
                            )}
                            </select >
                            {errors.codigo_mP && <span>El campo es obligatorio</span>}        
                        </div>      

                        <br />

                        <div className ="campo">
                            <label htmlFor="codigo_mP1">Segundo metodo de pago(opcional):</label>
                            <select className="input"  name="codigo_mP1" id="codigo_mP1" 
                            {...register("codigo_mP1", {required : false})}                                      
                            value = {valorSelectMetodo2}
                            onChange={handleChangeSelectMetodo2}                
                            >        
                            <option value=''></option>
                            {metodoPago.map(mp2 =>
                                    <option key={mp2.codigo_mP} value={mp2.codigo_mP}>{mp2.tipo_mP}</option>
                            )}
                            </select >
                            {errors.codigo_res && <span>El campo es obligatorio</span>}        
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