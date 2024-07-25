//React Hooks
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom";
import Cookies from "universal-cookie";
import Swal from "sweetalert2";
//API de Usuarios
import { verTodasHabitaciones } from "../../api/habitacionAPI";
import { todosTiposHabitacion } from "../../api/tipoHabitacionAPI";
import { todosEstados } from "../../api/estadoAPI";
//Componentes estaticos
import imagePlaya from '../../static/img/playa.png';
import perfil from '../../static/img/perfil.png'
import '../../static/css/verTabla.css';
import {FooterLista} from '../../components/footerListas'

export function ListaHabitacionesCliente(){

    const [habitaciones, setHabitaciones] = useState([]);    
    const [tiposHabitacion, setTipoHabitacion] = useState([])
    const [estados, setEstados] = useState([]);

    const navigate = useNavigate()

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


    //Gestion de habitaciones

    useEffect(() => {

        async function cargarHabitaciones(){
            const response = await verTodasHabitaciones()
            setHabitaciones(response.data)
        }
        cargarHabitaciones()
    },[]);    
    
    //Gestion de los tipos de habitacion

    useEffect(() => {
        async function cargarTipoHabitacion(){
            const response = await todosTiposHabitacion()
            setTipoHabitacion(response.data)
        }   
        cargarTipoHabitacion()
    },[])

    //Nombre de los tipos de habitacion

    const obtenerNombreTipoHab = (codigo_tpH) => {
        const tipoHab1 = tiposHabitacion.find(tipoHabi => tipoHabi.codigo_tpH === codigo_tpH);
        return tipoHab1 ? tipoHab1.tipo_tpH : '';
    }

    //Gestion de los estados

    useEffect(() => {
        async function cargarEstados(){
            const response = await todosEstados()
            setEstados(response.data)
        }
        cargarEstados()
    },[])

    //Nombre del estado de la habitacion

    const obtenerNombreEstado = (codigo_ed) => {
        const estadoHab = estados.find(estado => estado.codigo_ed === codigo_ed);
        return estadoHab ? estadoHab.tipo_ed : '';
    }

    //Precio por noche

    const obtenerPrecioNoche = (codigo_tpH) => {
        const tipoHab1 = tiposHabitacion.find(tipoHabi => tipoHabi.codigo_tpH === codigo_tpH);
        return tipoHab1 ? tipoHab1.valorBase_tpH : '';
    }

    //Estilos de la tabla e imagenes

    const style = {
        with: '30px',
        height: '30px',
    };

    const styleImg = {
        with: '40px',
        height: '40px'
    }

    const styleImg1 = {
        with: '24px',
        height: '24px'
    }

    return (
        <div>
        
            <header>
                <div className="logoIzquierdo">
                    <img src={imagePlaya} alt="logoIzquierda" />
                </div>
                <h1 className="tituloEncabezado">Ver Habitaciones - Hotel Pegasus</h1>
                <div className="logoIzquierdo">
                    <img src={imagePlaya} alt="logoIzquierda" />
                </div>
            </header>

            <div className="contenedorPerfil">
                <img src={perfil} alt="logoPerfil" style={styleImg1}/>
                <h3 className="textoPerfil">Cliente</h3>
            </div>


            <ul>            
                <li><Link to='/InicioCliente' className="a">Volver</Link></li>
            </ul>

            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous" />
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>            
            <table className="table">
                <thead className="table-info">
                    <tr style={{textAlign:'center'}}>
                        <th scope='col'>Numero Habitacion</th>
                        <th scope='col'>Tipo Habitacion</th>
                        <th scope='col'>Estado Habitacion</th>
                        <th scope='col'>Descripcion de la habitacion</th>
                        <th scope='col'>Minimo de Personas</th>
                        <th scope='col'>Maximo de Personas</th>
                        <th scope='col'>Imagen de la Habitacion</th>
                        <th scope='col'>Precio noche</th>
                    </tr>
                </thead>     
                    <tbody>              
                        {habitaciones.map( hab =>
                        <tr key={hab.numeroDocumento_usu} style={{textAlign:'center'}}>
                                <td>{hab.codigo_hab}</td>
                                <td>{obtenerNombreTipoHab(hab.codigo_tpH)}</td>
                                <td>{obtenerNombreEstado(hab.codigo_ed)}</td>
                                <td>{hab.descripcion_tpH}</td>
                                <td>{hab.minimoPersonas_tpH}</td>
                                <td>{hab.maximoPersonas_tpH}</td>   
                                <td><img src={hab.image_tpH} alt="ImagenHabitacion" style={styleImg} /></td>                            
                                <td>$ {obtenerPrecioNoche(hab.codigo_tpH)} COP</td>
                        </tr>                        
                        )}                             
                    </tbody>
                </table>                                
            <FooterLista />
        </div>
    )
}
