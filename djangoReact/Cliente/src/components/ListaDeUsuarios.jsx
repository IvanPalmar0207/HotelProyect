//React Hooks
import { useEffect, useState } from "react"
import {Link, useNavigate} from "react-router-dom";
import Cookies from "universal-cookie";
//API de Usuarios
import { todosLosUsuario} from "../api/usuariosApi";
import { ListarTiposDocumento } from "../api/tiposDocumentoAPI";
import { ListarRoles } from "../api/rolesAPI";
//Componentes estaticos
import imagePlaya from '../static/img/playa.png';
import actualizar from '../static/img/actualizar.png';
import eliminar from '../static/img/eliminar.png';
import '../static/css/verTabla.css';
import perfil from '../static/img/perfil.png'
import {FooterLista} from '../components/footerListas'
import Swal from 'sweetalert2'

export function VerUsuarios(){

    const [usuarios, setUsuarios] = useState([]);    
    const [tipoDocumento, setTipoDocumento] = useState([]); 
    const [rol, setRol] = useState([]);

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


    /*Gestion de Usuarios*/

    useEffect(() => {

        async function cargarUsuarios(){
            const response = await todosLosUsuario()
            setUsuarios(response.data)
        }
        cargarUsuarios()
    },[]);

    /*Gestion de los tipo de Documento*/

    useEffect(() => {
        async function cargarTiposDocumentos(){
            const response = await ListarTiposDocumento()
            setTipoDocumento(response.data)
        }
        cargarTiposDocumentos()
    },[])

    /*Nombre de los tipos de Documento*/

    const obtenerTipoDoc = (codigo) => {
        const tipoDoc = tipoDocumento.find(doc => doc.codigo_tpD === codigo);
        return tipoDoc ? tipoDoc.tipo_tpDD : '';
    }

    /*Gestion de roles de usuario*/

    useEffect(() => {
        async function cargarRoles(){
            const response = await ListarRoles()
            setRol(response.data)
        }
        cargarRoles()
    },[])

    /*Nombre de los roles de usuarios*/

    const obtenerRol = (codigoRol) => {
        const tipoRol = rol.find(rol1 => rol1.codigo_rl === codigoRol);
        return tipoRol ? tipoRol.tipo_rl : '';
    }

    /*Navegacion de la interfaz*/

    const navigate = useNavigate()
    
    /*Estilo de la tabla e imagenes*/

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
                <h1 className="tituloEncabezado">Ver Usuarios - Hotel Pegasus</h1>
                <div className="logoIzquierdo">
                    <img src={imagePlaya} alt="logoIzquierda" />
                </div>
            </header>

            <div className="contenedorPerfil">
                <img src={perfil} alt="logoPerfil" style={styleImg}/>
                <h3 className="textoPerfil">Administrador</h3>
            </div>  

            <ul>            
                <li><Link to='/AgregarUsuario' className="a">Volver</Link></li>
            </ul>

            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous" />
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>            
            <table className="table">
                <thead className="table-info">
                    <tr style={{textAlign:'center'}}>
                        <th scope='col'>Numero de Documento</th>
                        <th scope='col'>Tipo de Documento</th>
                        <th scope='col'>Correo Electronico</th>
                        <th scope='col'>Nombres del Usuario</th>
                        <th scope='col'>Apellidos del Usuario</th>
                        <th scope='col'>Rol del Usuario</th>
                        <th scope='col'>Actualizar</th>
                        <th scope='col'>Eliminar</th>
                    </tr>
                </thead>     
                    <tbody>          

                        {usuarios.map(usuario => {
                            return(
                            <tr key={usuario.numeroDocumento_usu} style={{textAlign:'center'}}>
                                <td>{usuario.numeroDocumento_usu}</td>  
                                <td>{obtenerTipoDoc(usuario.codigo_tpD)}</td>                          
                                <td>{usuario.correoElectronico_usu}</td>
                                <td>{usuario.nombres_usu}</td>
                                <td>{usuario.apellidos_usu}</td>
                                <td>{obtenerRol(usuario.codigo_rl)}</td>                
                                <td>                                
                                    <a onClick={() => {
                                        const aceptarActualizar = Swal.mixin({
                                          });
                                          aceptarActualizar.fire({
                                            title: "Actualizar Usuario",
                                            text: "Deseas actualizar al usuario?",
                                            icon: "warning",
                                            showCancelButton: true,
                                            confirmButtonText: "Si, Actualizar!",
                                            confirmButtonColor:'#3ed634',                                                            
                                            reverseButtons: true,
                                            cancelButtonText: "No, cancelar",
                                            cancelButtonColor:'#ff2d2d',                
                                          }).then((result) => {
                                            if (result.isConfirmed) {                                                                                    
                                                navigate(`/ActualizarUsuario/${usuario.numeroDocumento_usu}`)                                           
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
                                            title: "Eliminar Usuario",
                                            text: "Estas seguro de eliminar al usuario?",
                                            icon: "warning",
                                            showCancelButton: true,
                                            confirmButtonText: "Si, Eliminar!",
                                            confirmButtonColor:'#ff2d2d',                                                            
                                            reverseButtons: true,
                                            cancelButtonText: "No, cancelar",
                                            cancelButtonColor:'#3ed634',                
                                          }).then((result) => {
                                            if (result.isConfirmed) {                                                                                    
                                                navigate(`/EliminarUsuario/${usuario.numeroDocumento_usu}`)                                           
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
