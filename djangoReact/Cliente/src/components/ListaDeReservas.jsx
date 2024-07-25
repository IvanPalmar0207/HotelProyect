//React Hooks
import { useEffect, useState } from "react"
import {Link, useNavigate,useParams} from "react-router-dom";
import Cookies from "universal-cookie";
//API de Usuarios
import { verTodasReservas } from "../api/reservaAPI";
//Componentes estaticos
import imagePlaya from '../static/img/playa.png';
import actualizar from '../static/img/actualizar.png';
import eliminar from '../static/img/eliminar.png';
import '../static/css/verTabla.css';
import perfil from '../static/img/perfil.png'
import {FooterLista} from '../components/footerListas'
import Swal from 'sweetalert2'

export function VerReservas(){

    const [reservas, setReservas] = useState([]);    

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
        async function cargarReservas(){
            const response = await verTodasReservas()
            setReservas(response.data)
        }
        cargarReservas()
    },[]);

    const navigate = useNavigate()
    
    const style = {
        with: '30px',
        height: '30px',
    };

    
    const styleImg = {
        with: '24px',
        height: '24px'
    }

    return (
        <div>
        
            <header>
                <div className="logoIzquierdo">
                    <img src={imagePlaya} alt="logoIzquierda" />
                </div>
                <h1 className="tituloEncabezado">Ver Reservas - Hotel Pegasus</h1>
                <div className="logoIzquierdo">
                    <img src={imagePlaya} alt="logoIzquierda" />
                </div>
            </header>

            <div className="contenedorPerfil">
                <img src={perfil} alt="logoPerfil" style={styleImg}/>
                <h3 className="textoPerfil">Administrador</h3>
            </div>

            <ul>            
                <li><Link to='/AgregarReserva' className="a">Volver</Link></li>
            </ul>

            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous" />
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>            
            <table className="table">
                <thead className="table-info">
                    <tr style={{textAlign:'center'}}>
                        <th scope='col'>Cod Reserva</th>
                        <th scope='col'>Numero de Documento</th>
                        <th scope='col'>Fecha de Inicio</th>
                        <th scope='col'>Fecha de Salida</th>
                        <th scope='col'>Cantidad de Jovenes</th>
                        <th scope='col'>Cantidad de Adultos</th>
                        <th scope='col'>Numero Habitacion</th>
                        <th scope='col'>Actualizar</th>
                        <th scope='col'>Eliminar</th>
                    </tr>
                </thead>     
                    <tbody>              
                        {reservas.map( reserva =>{
                        let fechaInicio = new Date(reserva.fechaInicio_res)
                        let fechaSalida = new Date(reserva.fechaSalida_res)                        
                        
                        return (<tr key={reserva.codigo_res} style={{textAlign:'center'}}>
                                <td>{reserva.codigo_res}</td>
                                <td>{reserva.numeroDocumento_cli}</td>
                                <td>{`${fechaInicio.getDate()} / ${fechaInicio.toLocaleDateString('default',{month : 'long'})} / ${fechaInicio.getFullYear()}, ${fechaInicio.getHours()} : ${fechaInicio.getMinutes()} : ${fechaInicio.getSeconds()}`}</td>
                                <td>{`${fechaSalida.getDate()} / ${fechaSalida.toLocaleDateString('default',{month : 'long'})} / ${fechaSalida.getFullYear()}, ${fechaSalida.getHours()} : ${fechaSalida.getMinutes()} : ${fechaSalida.getSeconds()}`}</td>
                                <td>{reserva.cantidadJovenes_res}</td>
                                <td>{reserva.cantidadAdultos_res}</td>
                                <td>{reserva.codigo_hab}</td>          
                                <td>                                
                                    <a onClick={() => {
                                        const aceptarActualizar = Swal.mixin({
                                          });
                                          aceptarActualizar.fire({
                                            title: "Actualizar Reserva",
                                            text: "Deseas actualizar la reserva?",
                                            icon: "warning",
                                            showCancelButton: true,
                                            confirmButtonText: "Si, Actualizar!",
                                            confirmButtonColor:'#3ed634',                                                            
                                            reverseButtons: true,
                                            cancelButtonText: "No, cancelar",
                                            cancelButtonColor:'#ff2d2d',                
                                          }).then((result) => {
                                            if (result.isConfirmed) {                                                                                    
                                                navigate(`/ActualizarReserva/${reserva.codigo_res}`)                                           
                                            } else if (
                                              /* Read more about handling dismissals below */
                                              result.dismiss === Swal.DismissReason.cancel
                                            ) {
                                              aceptarActualizar.fire({
                                                title: "Operacion Cancelada",
                                                text: "No se actualizara el registro seleccionado",
                                                icon: "error",
                                                confirmButtonColor:'#3ed634',   
                                                confirmButtonText: "Volver atras"                                                         
                                            });
                                            }
                                          });                                     

                                    }}><img src={actualizar} alt="imagenActualizar" style={style} /></a>
                                </td>
                                <td>
                                    <a onClick={() =>{                    
                                        const aceptarElimnar = Swal.mixin({
                                          });
                                          aceptarElimnar.fire({
                                            title: "Eliminar Reserva",
                                            text: "No se podra revertir la operacion",
                                            icon: "warning",
                                            showCancelButton: true,
                                            confirmButtonText: "Si, Eliminar!",
                                            confirmButtonColor:'#ff2d2d',                                                            
                                            reverseButtons: true,
                                            cancelButtonText: "No, cancelar",
                                            cancelButtonColor:'#3ed634',                
                                          }).then((result) => {
                                            if (result.isConfirmed) {                                                                                    
                                                navigate(`/EliminarReserva/${reserva.codigo_res}`)                                           
                                            } else if (
                                              result.dismiss === Swal.DismissReason.cancel
                                            ) {
                                              aceptarElimnar.fire({
                                                title: "Operacion Cancelada",
                                                text: "No se eliminara la reserva seleccionada",
                                                icon: "error",
                                                confirmButtonColor:'#ff2d2d',   
                                                confirmButtonText: "Volver atras"                                                         
                                            });
                                            }
                                          });                                     
                                    }}                                                                                                          
                                    ><img src={eliminar} alt="imagenEliminar" style={style} /></a>                                                    
                                </td>
                        </tr>                        
                        )})}                             
                    </tbody>
                </table>                                
            <FooterLista />
        </div>
    )
}
