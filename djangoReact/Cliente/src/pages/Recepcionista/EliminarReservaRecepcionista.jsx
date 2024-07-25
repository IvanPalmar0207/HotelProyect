//React Hooks
import React, { useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Cookies from "universal-cookie";
//API
import { eliminarReserva } from "../../api/reservaAPI";
import { unaReserva } from "../../api/reservaAPI";
import { actualizarHabitacionPatc } from "../../api/habitacionAPI";
//Componentes Decorativos
import Swal from 'sweetalert2'

export function EliminarReservaRecepcionista(){

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
        else{
            useEffect(()=>{
                async function listarHabitacion(){
                    const response = await verTodasHabitaciones()
                    setHabitaciones(response.data)
                }
                listarHabitacion()
            },[])
        
            useEffect(() => {
                async function listarUsuarios(){
                    const response = await todosLosUsuario()
                    setUsuarios(response.data)
                }
                listarUsuarios()
            },[])
        
            
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
                    navigate('/AgregarReservaRecepcionista')
                    return response
                })
                .catch((error)=>{
                    navigate('/AgregarReservaRecepcionista')
                    return error
            })                   
        }
    }
    validarCookie()
},[])

}