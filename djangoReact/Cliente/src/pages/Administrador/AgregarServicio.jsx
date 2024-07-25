//React Hooks
import { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import {useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Cookies from "universal-cookie";
//APIs para las listas desplegables
import { agregarServicio } from "../../api/servicioAPI";
import { verTodaCategorias } from "../../api/categoriaAPI";
//Componentes estaticos
import '../../static/css/agregarServicio.css';
import imagePlaya from '../../static/img/playa.png'
import perfil from '../../static/img/perfil.png'
import {Footer} from "../../components/footer";

import Swal from 'sweetalert2'

export function AgregarServicio(){
    
    const [categoria, setCategoria] = useState([])
    const [imagenSer, setIamgenSer] = useState([]);
    const [valorCat, setValorCat] = useState('');

    const styleImg = {
        with: '24px',
        height: '24px'
    }

    const subirImagen = (e) =>{
        setIamgenSer(e)
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

    useEffect(()=>{
        async function cargarCategorias(){
            const response = await verTodaCategorias()
            setCategoria(response.data)
        }
        cargarCategorias()
    },[])

    const handleChangeSelectCat = (event) => {
        setValorCat(event.target.value);
    };

    const {register, handleSubmit, formState: errors} = useForm();

    const navigate = useNavigate();

    const envioForm = handleSubmit(async (data) => {            

            const valorFormulario = new FormData()

            valorFormulario.append("nombre_ser", data.nombre_ser);
            valorFormulario.append("descripcion_ser", data.descripcion_ser);    
            valorFormulario.append('codigo_cat',valorCat)    

            for (let index = 0; index < imagenSer.length; index++) {
                valorFormulario.append('imagen_ser',imagenSer[index])
            }                    

            //Validacion Formulario

            let numeros = /[1-999999999999]/g

            if(data.nombre_ser.match(numeros)){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'El nombre del servicio no debe contener numeros',
                    confirmButtonText: "Reenviar",
                    allowEnterKey:true,
                    allowOutsideClick:false,
                    confirmButtonColor:"red"
                    }
                )
                return false  
            }else if(data.descripcion_ser.match(numeros)){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'La descripcion del servicio no debe contener numeros',
                    confirmButtonText: "Reenviar",
                    allowEnterKey:true,
                    allowOutsideClick:false,
                    confirmButtonColor:"red"
                    }
                )
                return false  
            }else if(data.descripcion_ser.length > 70){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'La descripcion no debe de tener mas de 70 caracteres',
                    confirmButtonText: "Reenviar",
                    allowEnterKey:true,
                    allowOutsideClick:false,
                    confirmButtonColor:"red"
                    }
                )
                return false  
            }else{            
                await agregarServicio(valorFormulario)
                .then((res)=>{
                    Swal.fire({
                        icon: "success",
                        title: "Servicio Registrado",
                        confirmButtonColor:'#3ed634',                
                        confirmButtonText : 'Siguiente',
                        text: "El servicio se ha agregado correctamente",            
                    });
                    console.log(res)                        
                    navigate('/Navigation')
                })
                .catch((errr)=>{
                    Swal.fire({
                         icon: "error",
                        title: "Oops...",
                        confirmButtonColor:'#ff3333',                
                        confirmButtonText : 'Volver',
                        text: "Hubo un problema agregando el servicio!",
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
                    <h1 className="tituloEncabezado">Agregar Servicios</h1>
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
                        <li><Link to='/AgregarCategoria' className="a">Volver</Link></li>
                        <li><Link to='/ListaServicio' className="a">Ver Servicios</Link></li>
                    </ul>   
                </div>

                <section className="formRegistroAgregarSer">
                    <form className="contenedorAgregarSer" onSubmit={envioForm} encType="multipart/form-data">

                        <div className="campo">
                            <label htmlFor="nombre_ser">Nombre del Servicio</label>
                            <input type="text" {...register("nombre_ser", {required : true})}/>
                            {errors.nombre_ser && <span>El campo es obligatorio</span>}        
                        </div>

                        <br />

                        <div className="campo">
                            <label htmlFor="descripcion_ser">Descripcion del Servicio:</label>
                            <input type="text" {...register("descripcion_ser", {required : true})}/>
                            {errors.descripcion_ser && <span>El campo es obligatorio</span>}        
                        </div>

                        <br />

                        <div className="campo">
                            <label htmlFor="imagen_ser">Imagen del servicio:</label>
                            <input type="file" name='imagen_ser' multiple onChange={(e) => subirImagen(e.target.files)}/>
                            {errors.imagen_ser && <span>El campo es obligatorio</span>}        
                        </div>

                        <br />

                        <div className ="campo">
                            <label htmlFor="codigo_cat">Categoria del servicio:</label>
                            <select className="input" name="codigo_cat" id="codigo_cat" required                  
                            {...register("codigo_cat", {required : true})}                                      
                            value = {valorCat}
                            onChange={handleChangeSelectCat}                
                            >        
                            <option></option>
                            {categoria.map(cat =>
                                    <option key={cat.codigo_cat} value={cat.codigo_cat}>{cat.nombre_cat}</option>
                            )}
                            </select >
                            {errors.codigo_cat && <span>El campo es obligatorio</span>}        
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