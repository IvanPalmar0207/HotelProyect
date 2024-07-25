//React Hooks
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "universal-cookie";
//API
import { eliminarReserva } from "../../api/reservaAPI";
import { actualizarHabitacionPatc } from "../../api/habitacionAPI";
import { unaReserva } from "../../api/reservaAPI";
//Componentes Decorativos
import Swal from 'sweetalert2'

export function EliminarReserva(){
    
    const params = useParams()   
    const navigate = useNavigate()
    console.log(params.codigo_res)
    
    
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
            else{
                useEffect(() => {
                    async function cargarReserva(){
                        const response = await unaReserva(params.codigo_res)            
                        const valorFormulario = {    
                            codigo_ed : 1,    
                        }       
                       actualizarHabitacionPatc(response.data.codigo_hab, valorFormulario)
                    }
                    cargarReserva()
                },[])
            
                eliminarReserva(params.codigo_res)
                    .then((response) => {
                        Swal.fire({
                            icon: "success",
                            title: "Eliminacion Correcta",
                            confirmButtonColor:'#3ed634',                
                            confirmButtonText : 'Siguiente',
                            text: "La reserva ha sido eliminada correctamente",            
                        });
                        navigate('/AgregarReserva')
                        return response
                    })
                    .catch((error)=>{
                        navigate('/AgregarReserva')
                        return error
                }) 
            }
        }
        validarCookie()
    },[])
        
}