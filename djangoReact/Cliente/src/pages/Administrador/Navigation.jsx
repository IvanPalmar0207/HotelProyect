//React Hooks
import {Link} from "react-router-dom"
import { useNavigate } from "react-router-dom";
//Componentes estaticos
import '../../static/css/navegacion.css'
import imagePlaya from '../../static/img/playa.png'
import imageSpa from '../../static/img/spa.jpg'
import perfil from '../../static/img/perfil.png'
import {Footer} from "../../components/footer";
import Swal from 'sweetalert2'
import Cookies from "universal-cookie";
import { useEffect } from "react";


export function Navigation(){
    const navigate = useNavigate()

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

    return (    

        <body>

            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css" />
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous"/>
            <title>HOTEL PEGASUS</title>

        <header>
            <div class="logoIzquierdo">
                <img src={imagePlaya} alt="logoIzquierda" />
            </div>
            <h1 class="tituloEncabezado">BIENVENIDO ADMINISTRADOR</h1>
            <div class="logoIzquierdo">
                <img src={imagePlaya} alt="logoIzquierda" />
            </div>
        </header>

        <div className="contenedorPerfil">
            <img src={perfil} alt="logoPerfil" style={styleImg}/>
            <h3 className="textoPerfil">Administrador</h3>
        </div>
    
        <div class="contenedorEnlacesNavigation">
            <ul>
                <li><Link to='/AgregarUsuario' className="a">Gestion de Usuarios</Link></li>
                <li><Link to='/AgregarHabitacion' className="a">Gestion de Habitaciones</Link></li>
                <li><Link to='/AgregarReserva' className="a">Gestion de Reservas</Link></li>
                <li><Link to='/AgregarCategoria' className="a">Gestion de Servicios</Link></li>        
                <li><Link to='/AgregarFacturas' className="a">Gestion de Facturas</Link></li>   
                <li><Link className="a" onClick={() =>{                    
                                        const aceptarCierre = Swal.mixin({
                                          });
                                          aceptarCierre.fire({
                                            title: "Deseas cerrar sesion?",
                                            icon: "warning",
                                            showCancelButton: true,
                                            confirmButtonText: "Si",
                                            confirmButtonColor:' #3ed634',  
                                            reverseButtons: true,
                                            cancelButtonText: "No",
                                            cancelButtonColor:'#ff2d2d',                
                                          }).then((result) => {
                                            if (result.isConfirmed) {
                                                cookies.remove('numeroDocumento_usu', { path: '/' })
                                                cookies.remove('correoElectronico_usu', { path: '/' })                                                                                
                                                cookies.remove('contrasena_usu', { path: '/' })                                                                                
                                                cookies.remove('codigo_rl', { path: '/' })                                                 
                                                navigate('/')                                                                                        
                                            } else if (                                              
                                              result.dismiss === Swal.DismissReason.cancel
                                            ) {
                                              aceptarCierre.fire({
                                                title: "Cierre de sesion cancelado",                                                
                                                icon: "error",
                                                confirmButtonColor:'#ff2d2d',   
                                                confirmButtonText: "Volver atras"                                                         
                                            });
                                            }
                                          });                                     
                                    }} >Cerrar Sesion</Link></li>        
            </ul>    
        </div>
    
        <section class="descripcionContenido">
            <div class="contenedorDescripcion">
                <h2><i class="bi bi-airplane-engines-fill"></i>PODRAS DISFRUTAR DE LA MEJOR COMPAÑIA<i class="bi bi-airplane-engines-fill"></i></h2>
                <div class="componentesDescripcion">
                    <div class="textoDescripcion">
                        <p>El Hotel Pegasus es un oasis de elegancia y comodidad que desafía la imaginación. Ubicado en un escenario pintoresco en las faldas
                            de las majestuosas montañas del Valle de Serenidad, este hotel es un verdadero refugio de lujo. Desde el momento en que pones un pie en el vestíbulo,
                            te sumerges en un mundo de encanto y sofisticación.
    
                            La arquitectura del Hotel Pegasus combina elementos contemporáneos con un toque de la antigua Grecia, evocando la sensación de estar en un palacio de los dioses.
                            Las columnas esculpidas, los mosaicos relucientes y las esculturas mitológicas que decoran los espacios comunes te transportan a un mundo mágico.
                            Las habitaciones son santuarios de relajación y opulencia. Cada una de las habitaciones y suites está diseñada con una paleta de colores suaves y lujosos tejidos que te envuelven en un confort celestial.
                            Desde los balcones privados, podrás disfrutar de vistas panorámicas de los verdes valles y los picos nevados que se elevan hacia el cielo.
                        </p>
                    </div>
                    <div class="imagenDescripcion">
                        <img src={imageSpa} alt="imagenSpa" width="100px" height="100px" />
                    </div>
                </div>
            </div>
        </section>    
        <Footer />
    </body>
    
    )
}
