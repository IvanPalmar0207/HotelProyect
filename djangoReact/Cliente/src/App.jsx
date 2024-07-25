import {BrowserRouter, Route, Routes, Navigate, HashRouter} from "react-router-dom";

//Administrador
import { Navigation } from "./pages/Administrador/Navigation";

//Modulo de Usuarios
import { IniciarSesion } from "./pages/IniciarSesion";
import { RegistrarseInicio } from "./pages/RegistrarseInicio";
import { RecuperarContraseñaParte1 } from "./pages/recuperarContraseñaPart1";
import { RecuperarContraseñaParte2 } from "./pages/RecuperarContraseñaPart2";
import { AgregarUsuarios } from './pages/Administrador/AgregarUsuarios';
import { ListaUsuarios } from './pages/Administrador/ListarUsuarios';
import {EliminarUsuario} from './pages/Administrador/EliminarUsuario';
import {ActualizarUsuario} from './pages/Administrador/ActualizarUsuario';
import { ValidarSesion } from "./pages/validarSesion";
//Modulo de Habitaciones
import { AgregarHabitacion } from "./pages/Administrador/AgregarHabitacion";
import { ListarHabitaciones } from "./pages/Administrador/ListarHabitaciones";
import { EliminarHabitacion } from "./pages/Administrador/EliminarHabitacion";
import { ActualizarHabitacion } from "./pages/Administrador/ActualizarHabitacion";
//Modulo de Reservas
import { AgregarReserva } from "./pages/Administrador/AgregarReserva";
import { ListaReservas } from "./pages/Administrador/ListaReservas";
import { EliminarReserva } from "./pages/Administrador/EliminarReserva";
import { ActualizarReserva } from "./pages/Administrador/ActualizarReserva";
//Modulo de Servicios
//Categorias
import { AgregarCategoria } from "./pages/Administrador/AgregarCategoria";
import { VerCategorias } from "./components/ListaDeCategorias";
import { EliminarCategoria } from "./pages/Administrador/EliminarCategoria";  
import { ActualizarCategoria } from "./pages/Administrador/ActualizarCategoria";
//Servicios
import { AgregarServicio } from "./pages/Administrador/AgregarServicio";
import { ListaServicios } from "./pages/Administrador/ListarServicio";
import { EliminarServicio } from "./pages/Administrador/EliminarServicio";
import { ActualizarServicio } from "./pages/Administrador/ActualizarServicio";
//Consumo
import { AgregarConsumo } from "./pages/Administrador/AgregarConsumo";
import { ListaConsumos } from "./pages/Administrador/ListaConsumos";
import { EliminarConsumo } from "./pages/Administrador/EliminarConsumo";
import { ActualizarConsumo } from "./pages/Administrador/ActualizarConsumo";
//Modulo de Facturas
import { AgregarFactura } from "./pages/Administrador/AgregarFactura";
import { ListaFacturas } from "./pages/Administrador/ListaFactura";
import { EliminarFactura } from "./pages/Administrador/EliminarFactura";

//Cliente
import { ListaHabitacionesInicio } from "./pages/ListaHabitaciones";
import { InicioCliente } from "./pages/Cliente/InicioCliente";
import { ListaHabitacionesCliente } from "./pages/Cliente/ListaHabitacionesCliente";
import { ListaFacturasCliente } from "./pages/Cliente/ListaFacturasCliente";
import { ListaCategoriasCliente } from "./pages/Cliente/ListaCategoriasCliente";
import { AgregarReservaCliente } from "./pages/Cliente/AgregarReservaCliente";
import { ListaReservasCliente } from "./pages/Cliente/ListaReservasCliente";
import { ActualizarReservaCliente } from "./pages/Cliente/ActualizarReservaCliente";
import { EliminarReservaCliente } from "./pages/Cliente/EliminarReservaCliente";
import { ListaServiciosCliente } from "./pages/Cliente/ListaServiciosCliente";
import { ValidarFacturas } from "./pages/Cliente/ValidarFacturas";
import { ValidarReservas } from "./pages/Cliente/ValidarReservas";

//Recepcionista
import { InicioRecepcionista } from "./pages/Recepcionista/InicioRecepcionista";
import { ListaHabitacionesRecepcionista } from "./pages/Recepcionista/ListaHabitacionesRecepcionista";
import { ListaServiciosRecepcionista } from "./pages/Recepcionista/ListaServiciosRecepcionista";
import { ListaCategoriasRecepcionista } from "./pages/Recepcionista/ListaCategoriasRecepcionista";
import { AgregarFacturaRecepcionista } from "./pages/Recepcionista/AgregarFacturaRecepcionista";
import { ListaFacturasRecepcionista } from "./pages/Recepcionista/ListaFacturasRecepcionista";
import { AgregarConsumoRecepcionista } from "./pages/Recepcionista/ActualizarFacturaRecepcionista";
import { AgregarReservaRecepcionista } from "./pages/Recepcionista/AgregarReservaRecepcionista";
import { ListaReservasRecepcionista } from "./pages/Recepcionista/ListaReservasRecepcionista";
import { ActualizarReservaRecepcionista } from "./pages/Recepcionista/ActualizarReservaRecepcionista";
import { EliminarReservaRecepcionista } from "./pages/Recepcionista/EliminarReservaRecepcionista";

//Mesero y Room Service
import { ListaServiciosMR } from "./pages/MeseroRoomService/ListaDeServiciosMR";
import { InicioMeseroRoom } from "./pages/MeseroRoomService/InicioMeseroRoom";
import { ActualizarServicioMR } from "./pages/MeseroRoomService/ActualizarServicioMR";
import { AgregarConsumoMR } from "./pages/MeseroRoomService/AgregarConsumoMR";

//Errores
import { Error404 } from "./pages/errro404";

function App() {

  return (  
    <HashRouter>
      <Routes>
        {/*Inicio de Sesion*/}
        <Route path="/" element={<IniciarSesion />} />
        <Route path="/RegistrarseInicio" element={<RegistrarseInicio />} />
        <Route path="/RecuperarContraseñaParte1" element={<RecuperarContraseñaParte1 />} />
        <Route path="/RecuperarContraseñaParte2/:numeroDocumento_usu/:correoElectronico_usu" element={<RecuperarContraseñaParte2 />} />    

        {/*Administrador*/}
        {/*Modulo de Usuarios*/}
        <Route path="/Navigation" element={<Navigation />}></Route>
        <Route path="/ListaUsuarios" element={<ListaUsuarios />} />        
        <Route path="/AgregarUsuario" element={<AgregarUsuarios />} />
        <Route path="/EliminarUsuario/:numeroDocumento" element={<EliminarUsuario />} />
        <Route path="/ActualizarUsuario/:numeroDocumento" element={<ActualizarUsuario />}></Route>
        <Route path="/ValidarSesion/:numeroDocumento" element={<ValidarSesion />}></Route>

        {/*Modulo de habitaciones*/}
        <Route path="/ListaHabitacion" element={<ListarHabitaciones />}></Route>
        <Route path="/AgregarHabitacion" element={<AgregarHabitacion />}></Route>
        <Route path="/EliminarHabitacion/:codigo_hab" element={<EliminarHabitacion />}></Route>
        <Route path="/ActualizarHabitacion/:codigo_hab" element={<ActualizarHabitacion />}></Route>
        {/*Modulo de Reserva*/}
        <Route path="/ListaReserva" element={<ListaReservas />}></Route>
        <Route path="/AgregarReserva" element={<AgregarReserva />}></Route>
        <Route path="/EliminarReserva/:codigo_res" element={<EliminarReserva />}></Route>
        <Route path="/ActualizarReserva/:codigo_res" element={<ActualizarReserva />}></Route>
       
        {/*Categorias*/}
        <Route path="/ListaCategoria" element={<VerCategorias />}></Route>
        <Route path="/AgregarCategoria" element={<AgregarCategoria />}></Route>
        <Route path="/EliminarCategoria/:codigo_cat" element={<EliminarCategoria />}></Route>
        <Route path="/ActualizarCategoria/:codigo_cat" element={<ActualizarCategoria />}></Route>
        {/*Servicios*/}
        <Route path="/ListaServicio" element={<ListaServicios />}></Route>
        <Route path="/AgregarServicio" element={<AgregarServicio />}></Route>
        <Route path="/EliminarServicio/:codigo_ser" element={<EliminarServicio />}></Route>
        <Route path="/ActualizarServicio/:codigo_ser" element={<ActualizarServicio />}></Route>
        {/*Consumos*/}
        <Route path="/ListaConsumo" element={<ListaConsumos />}></Route>
        <Route path="/AgregarConsumo" element={<AgregarConsumo />}></Route>
        <Route path="/EliminarConsumo/:numero_con" element={<EliminarConsumo />}></Route>
        <Route path="/ActualizarConsumo/:numero_con" element={<ActualizarConsumo />}></Route>        
        {/*Modulo de Facturas*/}
        <Route path="/ListaFacturas" element={<ListaFacturas />}></Route>
        <Route path="/AgregarFacturas" element={<AgregarFactura />}></Route>
        <Route path="/EliminarFactura/:codigo_fac" element={<EliminarFactura />}></Route>

        {/*Cliente*/}
        <Route path="/ListaHabitacionesInicio" element={<ListaHabitacionesInicio />}></Route> 
        <Route path="/InicioCliente" element={<InicioCliente />}></Route> 
        <Route path="/ListaHabitacionesCliente" element={<ListaHabitacionesCliente />}></Route>  
        <Route path="/ListaFacturasCliente/:numeroDocumento" element={<ListaFacturasCliente />}></Route>         
        <Route path="/ListaCategoriasCliente" element={<ListaCategoriasCliente />}></Route>         
        <Route path="/ListaServiciosCliente" element={<ListaServiciosCliente />}></Route>                 
        <Route path="/AgregarReservaCliente" element={<AgregarReservaCliente />}></Route> 
        <Route path="/ListaReservasCliente/:numeroDocumento" element={<ListaReservasCliente />}></Route>
        <Route path="/ActualizarReservaCliente/:codigo_res" element={<ActualizarReservaCliente />}></Route>
        <Route path="/EliminarReservaCliente/:codigo_res" element={<EliminarReservaCliente />}></Route>
        <Route path="/ValidarFacturas" element={<ValidarFacturas />}></Route> 
        <Route path="/ValidarReservas" element={<ValidarReservas />}></Route>         
              
        {/*Recepcionista*/}
        <Route path="/InicioRecepcionista" element = {<InicioRecepcionista />}></Route>
        <Route path="/ListaHabitacionesRecepcionista" element = {<ListaHabitacionesRecepcionista />}></Route>
        <Route path="/ListaServiciosRecepcionista" element = {<ListaServiciosRecepcionista />}></Route>
        <Route path="/ListaCategoriasRecepcionista" element = {<ListaCategoriasRecepcionista />}></Route>
        <Route path="/AgregarFacturaRecepcionista" element = {<AgregarFacturaRecepcionista />}></Route>
        <Route path="/ListaFacturasRecepcionista" element = {<ListaFacturasRecepcionista />}></Route>
        <Route path="/AgregarConsumoRecepcionista" element = {<AgregarConsumoRecepcionista />}></Route>
        <Route path="/AgregarReservaRecepcionista" element = {<AgregarReservaRecepcionista />}></Route>            
        <Route path="/ListaReservasRecepcionista" element = {<ListaReservasRecepcionista />}></Route>
        <Route path="/ActualizarReservaRecepcionista/:codigo_res" element = {<ActualizarReservaRecepcionista />}></Route>     
        <Route path="/EliminarReservaRecepcionista/:codigo_res" element = {<EliminarReservaRecepcionista />}></Route>     

        {/*Mesero y Room Service*/}
        <Route path="/ListaServiciosMERS" element = {<ListaServiciosMR />}></Route>
        <Route path="/InicioMeseroRoom" element = {<InicioMeseroRoom />}></Route>
        <Route path="/AgregarConsumoMR" element = {<AgregarConsumoMR />}></Route>
        <Route path="/ActualizarServicioMR/:codigo_ser" element = {<ActualizarServicioMR />}></Route>      

        {/*Errores del Sistema*/}
        <Route path="*" element={<Error404 />}></Route>
      </Routes>          
    </HashRouter>
  )
}

export default App