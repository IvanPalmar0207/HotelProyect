//React Hooks
import { useEffect, useState } from "react"
import {Link, useNavigate,useParams} from "react-router-dom";
import Cookies from "universal-cookie";
//API de Usuarios
import { verTodosServicios } from "../../api/servicioAPI";
import { verTodaCategorias } from "../../api/categoriaAPI";
//Componentes estaticos
import imagePlaya from '../../static/img/playa.png';
import perfil from '../../static/img/perfil.png'
import '../../static/css/verTabla.css';
import {FooterLista} from '../../components/footerListas'
import Swal from "sweetalert2";


export function ListaServiciosRecepcionista(){

    const [servicios, setServicios] = useState([]);    
    const [categoria, setCategoria] = useState([]);

    const navigate = useNavigate()

    const cookies = new Cookies()

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
        else if(cookies.get('codigo_rl') == 5){
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
    }
    validarCookie()
    },[])


    //Gestion de Servicios

    useEffect(() => {

        async function cargarServicios(){
            const response = await verTodosServicios()
            setServicios(response.data)
        }
        cargarServicios()
    },[]);    
    
    //Gestion de las categorias

    useEffect(() => {
        async function cargarCategoria(){
            const response = await verTodaCategorias()
            setCategoria(response.data)
        }
        cargarCategoria()
    },[])
    
    //Nombre de las categorias
    
    const obtenerNombreCategoria = (codigo_cat) => {
        const categoriaSer = categoria.find(cat => cat.codigo_cat === codigo_cat);
        return categoriaSer ? categoriaSer.nombre_cat : ''
    }

    //Estilo de la tabla e imagenes

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
                <h1 className="tituloEncabezado">Ver Servicio - Hotel Pegasus</h1>
                <div className="logoIzquierdo">
                    <img src={imagePlaya} alt="logoIzquierda" />
                </div>
            </header>

            <div className="contenedorPerfil">
                <img src={perfil} alt="logoPerfil" style={styleImg1}/>
                <h3 className="textoPerfil">Recepcionista</h3>
            </div>

            <ul>            
                <li><Link to='/InicioRecepcionista' className="a">Volver</Link></li>
            </ul>

            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous" />
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>            
            <table className="table">
                <thead className="table-info">
                    <tr style={{textAlign:'center'}}>
                    <th scope='col'>Nombre del Servicio</th>
                        <th scope='col'>Categoria del servicio</th>
                        <th scope='col'>Descripcion del Servicio</th>
                        <th scope='col'>Imagen del Servicio</th>
                    </tr>
                </thead>     
                    <tbody>              
                        {servicios.map(ser =>
                        <tr key={ser.codigo_ser} style={{textAlign:'center'}}>
                                <td>{ser.nombre_ser}</td>
                                <td>{obtenerNombreCategoria(ser.codigo_cat)}</td>
                                <td>{ser.descripcion_ser}</td>                                
                                <td> <img src={ser.imagen_ser} alt="categoriaImagen" style={styleImg} /> </td>                                                             
                        </tr>                        
                        )}                             
                    </tbody>
                </table>                                
            <FooterLista />
        </div>
    )
}
