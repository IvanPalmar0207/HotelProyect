//React Hooks
import React from "react";
import { useEffect, useState } from "react"
import {Link, useNavigate,useParams} from "react-router-dom";
import Cookies from "universal-cookie";
//API de Usuarios
import { todasFactura } from "../api/facturaAPI";
import { verTodasReservas } from "../api/reservaAPI";
import { verTodasHabitaciones } from "../api/habitacionAPI";
import { todosTiposHabitacion } from "../api/tipoHabitacionAPI";
import { todosLosUsuario } from "../api/usuariosApi";
import { todosConsumo } from "../api/consumoAPI";
import { verTodosServicios } from "../api/servicioAPI";
//Componentes estaticos
import imagePlaya from '../static/img/playa.png';
import eliminar from '../static/img/eliminar.png';
import descargar from '../static/img/descargar.png';
import '../static/css/verTabla.css';
import {FooterLista} from '../components/footerListas'
import perfil from '../static/img/perfil.png'
import Swal from 'sweetalert2'
//Factura PDF
import { jsPDF } from "jspdf";
import 'jspdf-autotable'


export function VerFacturas(){

    const [factura, setfactura] = useState([]);    
    const [reserva, setReserva] = useState([]);    
    const [habitacion, setHabitacion] = useState([]);
    const [tipoHabitacion, setTipoHabitacion] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [consumos, setConsumos] = useState([]);
    const [servicios, setServicios] = useState([]);

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


    useEffect(() => {
        async function cargarFacturas(){
            const response = await todasFactura()
            setfactura(response.data)
        }
        cargarFacturas()
    },[]);

    useEffect(() => {
        async function cargarReservas(){
            const response = await verTodasReservas()
            setReserva(response.data)
        }
        cargarReservas()
    },[])

    useEffect(() => {
        async function cargasHabitacion(){
            const response = await verTodasHabitaciones()
            setHabitacion(response.data)
        }
        cargasHabitacion()
    },[])

    useEffect (() => {
        async function cargarTiposHabitacion(){
            const response = await todosTiposHabitacion()
            setTipoHabitacion(response.data)
        }
        cargarTiposHabitacion()
    },[])

    useEffect (() => {
        async function cargarUsuarios(){
            const response = await todosLosUsuario()
            setUsuarios(response.data)
        }
        cargarUsuarios()
    },[])

    useEffect (() => {
        async function cargarConsumos(){
            const response = await todosConsumo()
            setConsumos(response.data)
        }
        cargarConsumos()
    },[])

    useEffect (() => {
        async function cargarServicios(){
            const response = await verTodosServicios()
            setServicios(response.data)
        }
        cargarServicios()
    },[])

    const navigate = useNavigate()
    
    //Estilos 
    const style = {
        with: '30px',
        height: '30px',
    };

    const styleImg = {
        with: '24px',
        height: '24px'
    }

    //Generar factura en PDF    

    const generarPDF = ((codigo_fac, precioFinal) => {
        const pdf = new jsPDF();
        console.log(codigo_fac)

        let valorTotal = 0
        let codigoFactura = ''
        let codigoReserva = ''
        let fechaEmision = 0

        let fechaInicio = ''
        let fechaSalida = ''
        let cantidadJoven = 0
        let cantidadAdulto = 0

        let numeroDocumento = ''
        let nombres = ''
        let apellidos = ''
        let correoElectronico = ''

        var data = []

        let numeroHabitacion = ''
        let tipoHabitacion1 = ''
        let valorHabitacion = 0

        factura.map(fac => {
            if(fac.codigo_fac === codigo_fac){
                codigoFactura = fac.codigo_fac
                codigoReserva = fac.codigo_res
                fechaEmision = fac.fechaEmision_fac
                valorTotal = fac.valorTotal_fac 
                
                reserva.map(res => {
                    if(fac.codigo_res === res.codigo_res){
                        fechaInicio = res.fechaInicio_res
                        fechaSalida = res.fechaSalida_res
                        cantidadJoven = res.cantidadJovenes_res
                        cantidadAdulto = res.cantidadAdultos_res
                        
                        usuarios.map(usu => {
                            if(res.numeroDocumento_cli === usu.numeroDocumento_usu){
                                numeroDocumento = usu.numeroDocumento_usu
                                nombres = usu.nombres_usu
                                apellidos = usu.apellidos_usu
                                correoElectronico = usu.correoElectronico_usu
                            }
                        })

                        consumos.map( con => {
                            if(res.codigo_res === con.codigo_res){
                                servicios.map(ser => {
                                    if(con.codigo_ser === ser.codigo_ser){                                        
                                        let fechaConsumo = new Date(con.fecha_con)                                        
                                        data.push(
                                            [con.cantidad_con, ser.nombre_ser,  `${fechaConsumo.getDate()} / ${fechaConsumo.toLocaleDateString('default',{month : 'short'})} / ${fechaConsumo.getFullYear()}, ${fechaConsumo.getHours()} : ${fechaConsumo.getMinutes()} : ${fechaConsumo.getSeconds()}`, con.precioUnitario_con, con.cantidad_con * con.precioUnitario_con]
                                        )
                                    }
                                }
                                )
                            }
                        })

                        habitacion.map(hab => {
                            if(res.codigo_hab === hab.codigo_hab){
                                numeroHabitacion = hab.codigo_hab
                                tipoHabitacion.map(tHab => {
                                    if(hab.codigo_tpH === tHab.codigo_tpH){
                                        tipoHabitacion1 = tHab.tipo_tpH
                                        valorHabitacion = tHab.valorBase_tpH
                                    }
                                })
                            }
                        })

                    }
                })

            }
        })

        let fecha1 = new Date(fechaSalida)
        let fecha2 = new Date(fechaInicio)

        let totalNoches = fecha1.getDay() - fecha2.getDay()

        let fechaEmision1 = new Date(fechaEmision)
        

        //Titulo
        pdf.setFontSize(30)
        pdf.setFont('helvetica','bold')
        pdf.setTextColor(100, 211, 0)
        pdf.text(`HOTEL PEGASUS`,62, 20)

        //Codigo de la factura

        pdf.setFontSize(20)
        pdf.setFont('helvetica','normal')
        pdf.setTextColor('black')
        pdf.text(`Factura Nro.`, 30, 80, null, 90);
        pdf.setTextColor(100, 211, 0)
        pdf.text(String(codigoFactura), 30, 40, null, 90);   
        
        //Codigo de la reserva y fecha de emision
        
        pdf.setFontSize(14)
        pdf.setTextColor('black')
        pdf.text(`Codigo de la reserva: ${codigoReserva}`, 45,37)             
        pdf.text(`Fecha de emision de la factura: ${fechaEmision1.getDate()} / ${fechaEmision1.toLocaleDateString('default',{month : 'long'})} / ${fechaEmision1.getFullYear()}, ${fechaEmision1.getHours()} : ${fechaEmision1.getMinutes()} : ${fechaEmision1.getSeconds()}`, 45,50)

        //Separador de contenido
        pdf.setTextColor(100, 211, 0)
        pdf.text(`-------------------------------------------------------------------------------------`, 45,60)             

        //Info del cliente
        pdf.setFont('helvetica','bold')
        pdf.setTextColor(100, 211, 0)
        pdf.text(`Datos del cliente`,45, 70)
        pdf.setFont('helvetica','normal')
        pdf.setTextColor('black')
        pdf.text(numeroDocumento, 45, 80)
        pdf.text(nombres, 45, 90)
        pdf.text(apellidos, 45, 100)
        pdf.text(correoElectronico, 45, 110)

        //Datos de la reserva

        pdf.setFont('helvetica','bold')
        pdf.setTextColor(100, 211, 0)
        pdf.text(`Datos de la reserva`,110, 70)
        pdf.setFont('helvetica','normal')
        pdf.setTextColor('black')
        pdf.text(`Fecha de llegada: ${fecha2.getDate()}/${fecha2.toLocaleDateString('default',{month : 'short'})}/${fecha2.getFullYear()}, ${fecha2.getHours()} : ${fecha2.getMinutes()}`, 110, 80)
        pdf.text(`Fecha de salida: ${fecha1.getDate()}/${fecha1.toLocaleDateString('default', {month : 'short'})}/${fecha1.getFullYear()}, ${fecha1.getHours()} : ${fecha1.getMinutes()}`, 110, 90)
        pdf.text(`Numero de menores de edad: ${String(cantidadJoven)}`, 110, 100)
        pdf.text(`Numero de mayores de edad: ${String(cantidadAdulto)}`, 110, 110)

        pdf.setTextColor(100, 211, 0)
        pdf.text(`-----------------------------------------------------------------------------------------------------`, 20,120)             

        //Consumo de servicios
        pdf.setFontSize(20)
        pdf.setFont('helvetica','bold')
        pdf.setTextColor(100, 211, 0)
        pdf.text(`Consumo de Servicios`,67, 128)

        const columnas = ['Cantidad','Nombre','Fecha del consumo','Precio Unitario','Valor Total']

        pdf.autoTable({
            startY: 133,
            head: [columnas],
            headStyles :{fillColor : [100, 211, 0],
                        halign: 'center',
                        fontSize: 12,
                        lineWidth: 0.5},        
            body : data,
            bodyStyles :{halign: 'center',
                        fontSize: 12,
                        lineWidth: 0.5,}            
                                                    
        })        

        pdf.setFontSize(14)
        pdf.setFont('helvetica','normal')
        pdf.text(`-----------------------------------------------------------------------------------------------------`, 20,230)             

        //Pie de pagina

        pdf.setFont('helvetica','bold')
        pdf.setTextColor(100, 211, 0)
        pdf.text(`Datos de la habitacion`,20, 240)
        pdf.setFont('helvetica','normal')
        pdf.setTextColor('black')
        pdf.text(`Nro: ${numeroHabitacion}`, 20, 250)
        pdf.text(`Tipo: ${tipoHabitacion1}`, 20, 260)
        pdf.text(`Valor por noche: ${valorHabitacion}`, 20, 270)
        pdf.text(`Noches de estancia: ${totalNoches}`, 20, 280)

        pdf.setFontSize(14)
        pdf.setFont('helvetica','bold')
        pdf.setTextColor(100, 211, 0)
        pdf.text(`Valor Tolal`,95, 240)
        pdf.setFont('helvetica','normal')
        pdf.setTextColor('black')
        pdf.text(`El valor total es:`, 90, 250)        
        pdf.text(`$ ${String(precioFinal)} COP`, 90, 260)

        pdf.setFont('helvetica','bold')
        pdf.setFontSize(16)
        pdf.setTextColor(100, 211, 0)
        pdf.text(`Gracias por \ntu estancia\nen el Hotel \nPegasus`,150, 245)        

        pdf.save(`factura_${nombres+apellidos}_${codigo_fac}.pdf`)
    })

    return (
        <div>
        
            <header>
                <div className="logoIzquierdo">
                    <img src={imagePlaya} alt="logoIzquierda" />
                </div>
                <h1 className="tituloEncabezado">Ver Facturas - Hotel Pegasus</h1>
                <div className="logoIzquierdo">
                    <img src={imagePlaya} alt="logoIzquierda" />
                </div>
            </header>

            <div className="contenedorPerfil">
                <img src={perfil} alt="logoPerfil" style={styleImg}/>
                <h3 className="textoPerfil">Administrador</h3>
            </div>

            <ul>            
                <li><Link to='/AgregarFacturas' className="a">Volver</Link></li>
            </ul>

            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous" />
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>            
            <table className="table">
                <thead className="table-info">
                    <tr style={{textAlign:'center'}}>
                        <th scope='col'>Codigo de la Factura</th>
                        <th scope='col'>Codigo de la Reserva</th>
                        <th scope='col'>Fecha de Emision</th>
                        <th scope='col'>Valor Total</th>
                        <th scope='col'>Eliminar</th>
                        <th scope='col'>Descargar PDF</th>
                    </tr>
                </thead>     
                    <tbody>              
                        {factura.map(fac =>{
                        let fechaEmision1 = new Date(fac.fechaEmision_fac)
                        return (<tr key={fac.codigo_fac} style={{textAlign:'center'}}>
                                <td>{fac.codigo_fac}</td>
                                <td>{fac.codigo_res}</td>
                                <td>{`${fechaEmision1.getDate()} / ${fechaEmision1.toLocaleDateString('default',{month : 'long'})} / ${fechaEmision1.getFullYear()}, ${fechaEmision1.getHours()} : ${fechaEmision1.getMinutes()} : ${fechaEmision1.getSeconds()}`}</td>
                                <td>$ {fac.valorTotal_fac} COP</td>  
                                <td>
                                    <a onClick={() =>{                    
                                        const aceptarElimnar = Swal.mixin({
                                          });
                                          aceptarElimnar.fire({
                                            title: "Estas seguro de eliminar la factura?",
                                            text: "No se podra revertir la operacion",
                                            icon: "warning",
                                            showCancelButton: true,
                                            confirmButtonText: "Si, Eliminar!",
                                            confirmButtonColor:'#ff2d2d',                                                            
                                            reverseButtons: true,
                                            cancelButtonText: "No, cancelar",
                                            cancelButtonColor:'#3ed634',                
                                          }).then((result) => {
                                            if (result.isConfirmed) {                                                                                    
                                                navigate(`/EliminarFactura/${fac.codigo_fac}`)                                           
                                            } else if (
                                              /* Read more about handling dismissals below */
                                              result.dismiss === Swal.DismissReason.cancel
                                            ) {
                                              aceptarElimnar.fire({
                                                title: "Operacion Cancelada",
                                                text: "No se eliminara la factura seleccionada",
                                                icon: "error",
                                                confirmButtonColor:'#ff2d2d',   
                                                confirmButtonText: "Volver atras"                                                         
                                            });
                                            }
                                          });                                     
                                    }}                                                                                                          
                                    ><img src={eliminar} alt="imagenEliminar" style={style} /></a>                                                    
                                </td>
                                <td>
                                    <a onClick={() =>{                    
                                        const aceptarElimnar = Swal.mixin({
                                          });
                                          aceptarElimnar.fire({
                                            title: "Deseas descargar la factura?",
                                            icon: "warning",
                                            showCancelButton: true,
                                            confirmButtonText: "Si, Descargar!",
                                            confirmButtonColor:' #3ed634',  
                                            reverseButtons: true,
                                            cancelButtonText: "No, cancelar",
                                            cancelButtonColor:'#ff2d2d',                
                                          }).then((result) => {
                                            if (result.isConfirmed) {                                                                                   
                                                generarPDF(fac.codigo_fac, fac.valorTotal_fac)                                                                                        
                                            } else if (
                                              /* Read more about handling dismissals below */
                                              result.dismiss === Swal.DismissReason.cancel
                                            ) {
                                              aceptarElimnar.fire({
                                                title: "Operacion Cancelada",
                                                text: "No se descargara la factura",
                                                icon: "error",
                                                confirmButtonColor:'#ff2d2d',   
                                                confirmButtonText: "Volver atras"                                                         
                                            });
                                            }
                                          });                                     
                                    }}                                                                                                          
                                    ><img src={descargar} alt="imagenEliminar" style={style} /></a>                                                    
                                </td>
                        </tr>                        
                        )})}                             
                    </tbody>
                </table>                                
            <FooterLista />
        </div>
    )
}
