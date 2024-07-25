//React Hooks
import React from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import Cookies from "universal-cookie";
//API
import { eliminarCategoria } from "../../api/categoriaAPI";
//Componentes Decorativos
import Swal from 'sweetalert2'

export function EliminarCategoria(){
    const params = useParams()   
    const navigate = useNavigate()
    console.log(params.codigo_cat)
    
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
                eliminarCategoria(params.codigo_cat)
                .then((response) => {
                    Swal.fire({
                        icon: "success",
                        title: "Eliminacion Correcta",
                        confirmButtonColor:'#3ed634',                
                        confirmButtonText : 'Siguiente',
                        text: "La categoria ha sido eliminada correctamente",            
                    });
                    navigate('/AgregarCategoria')
                    return response
                })
                .catch((error)=>{
                    navigate('/AgregarCategoria')
                    return error
            })        
            }
        }
        validarCookie()
    },[])
   
}