//React Hooks
import { React, useState, useEffect } from "react";
import {Link, useParams} from "react-router-dom";
import {useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Cookies from "universal-cookie";
//APIs
import { actualizarCategoria } from "../../api/categoriaAPI";
import { elegirUnaCategoria } from "../../api/categoriaAPI";
//Componentes estaticos
import '../../static/css/actualizarCategoria.css';
import perfil from '../../static/img/perfil.png'
import imagePlaya from '../../static/img/playa.png'
import {Footer} from "../../components/footer";

import Swal from 'sweetalert2'

export function ActualizarCategoria(){

    const [imagenCat, setIamgenCat] = useState([]);

    const styleImg = {
        with: '24px',
        height: '24px'
    }

    const subirImagen = (e) =>{
        setIamgenCat(e)
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

    const {register, setValue, handleSubmit, formState: errors} = useForm();

    const params = useParams()

    useEffect(() => {
        async function cargarCategoria(){
            const response = await elegirUnaCategoria(params.codigo_cat)
            setValue("nombre_cat", response.data.nombre_cat)
            setValue("descripcion_cat", response.data.descripcion_cat)
        }
        cargarCategoria()
    },[])

    const navigate = useNavigate();

    const envioForm = handleSubmit(async (data) => {            

            const valorFormulario = new FormData()

            valorFormulario.append("nombre_cat", data.nombre_cat);
            valorFormulario.append("descripcion_cat", data.descripcion_cat);        

            for (let index = 0; index < imagenCat.length; index++) {
                valorFormulario.append('imagen_cat',imagenCat[index])
            }                    

            //Validacion Formulario

            let numeros = /[1-999999999999]/g

            if(data.nombre_cat.match(numeros)){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'El nombre de la categoria no debe contener numeros',
                    confirmButtonText: "Reenviar",
                    allowEnterKey:true,
                    allowOutsideClick:false,
                    confirmButtonColor:"red"
                    }
                )
                return false  
            }else if(data.descripcion_cat.match(numeros)){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'La descripcion de la categoria no debe contener numeros',
                    confirmButtonText: "Reenviar",
                    allowEnterKey:true,
                    allowOutsideClick:false,
                    confirmButtonColor:"red"
                    }
                )
                return false  
            }else if(data.descripcion_cat.length > 70){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'La descripcion de la categoria puede tener mas de 70 caracteres',
                    confirmButtonText: "Reenviar",
                    allowEnterKey:true,
                    allowOutsideClick:false,
                    confirmButtonColor:"red"
                    }
                )
                return false  
            }else{
                await actualizarCategoria(params.codigo_cat,valorFormulario)
                .then((res)=>{
                    Swal.fire({
                        icon: "success",
                        title: "Actualizacion Correcta",
                        confirmButtonColor:'#3ed634',                
                        confirmButtonText : 'Siguiente',
                        text: "La categoria se ha actualizado correctamente",            
                    }); 
                    console.log(res)                        
                    navigate('/ListaCategoria')
                }) 
                .catch((errr)=>{
                     Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        confirmButtonColor:'#ff3333',                
                        confirmButtonText : 'Volver',
                         text: "Hubo un problema actualizando la categoria!",
                        footer: 'Se te olvido elegir una imagen'
                     });
                     console.error('Error al agregar usuarios:', errr);
                 })              
            }
        }
      );

    return (
        
            <div>                        
                <header>
                    <div className="logoIzquierdo">
                        <img src={imagePlaya}alt="logoIzquierda" />
                    </div>
                    <h1 className="tituloEncabezado">Actualizar Categorias - Hotel Pegasus</h1>
                    <div className="logoIzquierdo">
                        <img src={imagePlaya} alt="logoIzquierda" />
                    </div>
                </header>

                <div className="contenedorPerfil">
                    <img src={perfil} alt="logoPerfil" style={styleImg}/>
                    <h3 className="textoPerfil">Administrador</h3>
                </div> 

                <div className="contenedorEnlaces">
                    <ul>
                        <li><Link to='/ListaCategoria' className="a">Volver</Link></li>
                    </ul>   
                </div>

                <section className="formRegistroActualizarCat">
                    <form className="contenedorActualizarCat" onSubmit={envioForm} encType="multipart/form-data">

                        <div className="campo">
                            <label htmlFor="nombre_cat">Nombre de la categoria</label>
                            <input type="text" {...register("nombre_cat", {required : true})}/>
                            {errors.nombre_cat && <span>El campo es obligatorio</span>}        
                        </div>

                        <br />

                        <div className="campo">
                            <label htmlFor="descripcion_cat">Descripcion. Categoria:</label>
                            <input type="text" {...register("descripcion_cat", {required : true})}/>
                            {errors.descripcion_cat && <span>El campo es obligatorio</span>}        
                        </div>

                        <br />

                        <div className="campo">
                            <label htmlFor="imagen_cat">Imagen de la categoria:</label>
                            <input type="file" name='imagen_cat' multiple onChange={(e) => subirImagen(e.target.files)}/>
                            {errors.imagen_cat && <span>El campo es obligatorio</span>}        
                        </div>

                        <br />
                        <button className="boton">Agregar</button>
                        <br />
                    </form>                            
                </section>
                <Footer />
            </div>    
        )
}