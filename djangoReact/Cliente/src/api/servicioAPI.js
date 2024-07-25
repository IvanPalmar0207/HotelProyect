import axios from "axios";

export const agregarServicio = (servicio) =>{
    return axios.post('http://127.0.0.1:8000/serviciosAPI/apiServicio/servicios/', servicio)
}

export const verTodosServicios = () => {
    return axios.get('http://127.0.0.1:8000/serviciosAPI/apiServicio/servicios/')
}

export const eliminarServicio = (codigo_ser) => {
    return axios.delete(`http://127.0.0.1:8000/serviciosAPI/apiServicio/servicios/${codigo_ser}`)
}

export const eligirServicio = (codigo_ser) => {
    return axios.get(`http://127.0.0.1:8000/serviciosAPI/apiServicio/servicios/${codigo_ser}`)
}

export const actualizarServicio = (codigo_ser, servicios) => {
    return axios.patch(`http://127.0.0.1:8000/serviciosAPI/apiServicio/servicios/${codigo_ser}/`, servicios)
}