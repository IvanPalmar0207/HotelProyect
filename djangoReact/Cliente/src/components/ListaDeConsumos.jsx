//React Hooks
import { useEffect, useState } from "react"
import {Link, useNavigate,useParams} from "react-router-dom";
//API de Usuarios
import { todosConsumo } from "../api/consumoAPI";
import { verTodosServicios } from "../api/servicioAPI";
import Cookies from "universal-cookie";
//Componentes estaticos
import imagePlaya from '../static/img/playa.png';
import actualizar from '../static/img/actualizar.png';
import eliminar from '../static/img/eliminar.png';
import '../static/css/verTabla.css';
import perfil from '../static/img/perfil.png'
import {FooterLista} from '../components/footerListas'
import Swal from 'sweetalert2'

export function VerConsumos(){

    const [consumo, setConsumo] = useState([]);    
    const [servicios, setServicios] = useState([]);

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

    
    //Gestion de los consumos

    useEffect(() => {
        async function cargarConsumo(){
            const response = await todosConsumo()
            setConsumo(response.data)
        }
        cargarConsumo()
    },[]);

    //Gestion de servicios

    useEffect(() => {
        async function cargarServicio(){
            const response = await verTodosServicios()
            setServicios(response.data)
        }
        cargarServicio()
    },[])

    //Nombre del servicio

    const obtenerNombreServicio = (codigo_ser) => {
        const servicioVer = servicios.find(ser => ser.codigo_ser === codigo_ser)
        return servicioVer ? servicioVer.nombre_ser : '';
    }   

    //Navegabilidad de la interfaz

    const navigate = useNavigate()
    
    //Estilos de la table e imagenes

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
                <h1 className="tituloEncabezado">Ver Consumo - Hotel Pegasus</h1>
                <div className="logoIzquierdo">
                    <img src={imagePlaya} alt="logoIzquierda" />
                </div>
            </header>

            <div className="contenedorPerfil">
                <img src={perfil} alt="logoPerfil" style={styleImg}/>
                <h3 className="textoPerfil">Administrador</h3>
            </div>

            <ul>            
                <li><Link to='/AgregarConsumo' className="a">Volver</Link></li>
            </ul>

            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous" />
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>            
            <table className="table">
                <thead className="table-info">
                    <tr style={{textAlign:'center'}}>
                        <th scope='col'>Codigo de la Reserva</th>
                        <th scope='col'>Nombre del Servicio</th>
                        <th scope='col'>Fecha del Consumo</th>
                        <th scope='col'>Cantidad Consumida</th>
                        <th scope='col'>Precio Unitario</th>
                        <th scope='col'>Actualizar</th>
                        <th scope='col'>Eliminar</th>
                    </tr>
                </thead>     
                    <tbody>              
                        {consumo.map(con =>{
                        let fechaConsumo = new Date(con.fecha_con)

                        return(<tr key={con.numero_con} style={{textAlign:'center'}}>
                                <td>{con.codigo_res}</td>
                                <td>{obtenerNombreServicio(con.codigo_ser)}</td>                                
                                <td>{`${fechaConsumo.getDate()} / ${fechaConsumo.toLocaleDateString('default',{month : 'long'})} / ${fechaConsumo.getFullYear()}, ${fechaConsumo.getHours()} : ${fechaConsumo.getMinutes()} : ${fechaConsumo.getSeconds()}`}</td>
                                <td>{con.cantidad_con}</td>
                                <td>{con.precioUnitario_con}</td>
                                <td>                                
                                    <a onClick={() => {
                                        const aceptarActualizar = Swal.mixin({
                                          });
                                          aceptarActualizar.fire({
                                            title: "Actualizar Consumo",
                                            text: "Deseas actualizar el Consumo?",
                                            icon: "warning",
                                            showCancelButton: true,
                                            confirmButtonText: "Si, Actualizar!",
                                            confirmButtonColor:'#3ed634',                                                            
                                            reverseButtons: true,
                                            cancelButtonText: "No, cancelar",
                                            cancelButtonColor:'#ff2d2d',                
                                          }).then((result) => {
                                            if (result.isConfirmed) {                                                                                    
                                                navigate(`/ActualizarConsumo/${con.numero_con}`)                                           
                                            } else if (
                                              /* Read more about handling dismissals below */
                                              result.dismiss === Swal.DismissReason.cancel
                                            ) {
                                              aceptarActualizar.fire({
                                                title: "Operacion Cancelada",
                                                text: "No se actualizara el consumo seleccionado",
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
                                            title: "Estas seguro de eliminar el consumo?",
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
                                                navigate(`/EliminarConsumo/${con.numero_con}`)                                           
                                            } else if (
                                              /* Read more about handling dismissals below */
                                              result.dismiss === Swal.DismissReason.cancel
                                            ) {
                                              aceptarElimnar.fire({
                                                title: "Operacion Cancelada",
                                                text: "No se eliminara el registro seleccionado",
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
