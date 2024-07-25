//React Hooks
import React from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import Cookies from "universal-cookie";
//API
import { eliminarConsumo } from "../../api/consumoAPI";
//Componentes Decorativos
import Swal from 'sweetalert2'

export function EliminarConsumo(){
    const params = useParams()   
    const navigate = useNavigate()
    console.log(params.numero_con)
    
    const cookies = new Cookies();

    useEffect(() => {
        async function validarCookie(){
            if(!cookies.get('numeroDocumento_usu')){
                navigate('/')
            }
            else if(cookies.get('codigo_rl') == 2){       
                navigate('/InicioCliente')
            }
            else if(cookies.get('codigo_rl') == 3){                     
                navigate('/InicioMeseroRoom')
            }            
            else if(cookies.get('codigo_rl') == 4){            
                navigate('/InicioRecepcionista')
            }
            else if(cookies.get('codigo_rl') == 5){
                navigate('/InicioMeseroRoom')
            }
            else{
                eliminarConsumo(params.numero_con)
                .then((response) => {
                    Swal.fire({
                        icon: "success",
                        title: "Eliminacion Correcta",
                        confirmButtonColor:'#3ed634',                
                        confirmButtonText : 'Siguiente',
                        text: "El consumo ha sido eliminado correctamente",            
                    });
                    navigate('/AgregarConsumo')
                    return response.data
                })
                .catch((error)=>{
                    navigate('/AgregarConsumo')
                    return error
            })   
            }
        }
        validarCookie()
    },[])
        
}