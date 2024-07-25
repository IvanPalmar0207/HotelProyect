//React Hooks
import { useEffect, useState } from "react"
import {Link, useNavigate,useParams} from "react-router-dom";
import Cookies from "universal-cookie";
//API de Usuarios
import { verTodosServicios } from "../../api/servicioAPI";
import { verTodaCategorias } from "../../api/categoriaAPI";
//Componentes estaticos
import imagePlaya from '../../static/img/playa.png';
import actualizar from '../../static/img/actualizar.png';
import '../../static/css/verTabla.css';
import {FooterLista} from '../../components/footerListas'
import perfil from '../../static/img/perfil.png'
import Swal from 'sweetalert2'

export function ListaServiciosMR(){

    const [servicios, setServicios] = useState([]);  
    const [categoria, setCategoria] = useState([]);  

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
        }
        validarCookie()
    },[])


    //Gestion de servicios

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

    //Navegabilidad de la interfaz

    const navigate = useNavigate()
    
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
                <h1 className="tituloEncabezado">Ver Servicio - Hotel Pegasus</h1>
                <div className="logoIzquierdo">
                    <img src={imagePlaya} alt="logoIzquierda" />
                </div>
            </header>

            <div className="contenedorPerfil">
                <img src={perfil} alt="logoPerfil" style={styleImg1}/>
                <h3 className="textoPerfil">Mesero o Room Service</h3>
            </div>

            <ul>            
                <li><Link to='/InicioMeseroRoom' className="a">Volver</Link></li>
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
                        <th scope='col'>Actualizar</th>
                    </tr>
                </thead>     
                    <tbody>              
                        {servicios.map(ser =>
                        <tr key={ser.codigo_ser} style={{textAlign:'center'}}>
                                <td>{ser.nombre_ser}</td>
                                <td>{obtenerNombreCategoria(ser.codigo_cat)}</td>
                                <td>{ser.descripcion_ser}</td>                                
                                <td><img src={ser.imagen_ser} alt="categoriaImagen" style={styleImg} /> </td>                                                             
                                <td>                                
                                    <a onClick={() => {
                                        const aceptarActualizar = Swal.mixin({
                                          });
                                          aceptarActualizar.fire({
                                            title: "Actualizar Servicio",
                                            text: "Deseas actualizar el servicio?",
                                            icon: "warning",
                                            showCancelButton: true,
                                            confirmButtonText: "Si, Actualizar!",
                                            confirmButtonColor:'#3ed634',                                                            
                                            reverseButtons: true,
                                            cancelButtonText: "No, cancelar",
                                            cancelButtonColor:'#ff2d2d',                
                                          }).then((result) => {
                                            if (result.isConfirmed) {                                                                                    
                                                navigate(`/ActualizarServicioMR/${ser.codigo_ser}`)                                           
                                            } else if (
                                              /* Read more about handling dismissals below */
                                              result.dismiss === Swal.DismissReason.cancel
                                            ) {
                                              aceptarActualizar.fire({
                                                title: "Operacion Cancelada",
                                                text: "No se actualizara el servicio seleccionado",
                                                icon: "error",
                                                confirmButtonColor:'#3ed634',   
                                                confirmButtonText: "Volver atras"                                                         
                                            });
                                            }
                                          });                                     

                                    }}><img src={actualizar} alt="imagenActualizar" style={style} /></a>
                                </td>                    
                        </tr>                        
                        )}                             
                    </tbody>
                </table>                                
            <FooterLista />
        </div>
    )
}
