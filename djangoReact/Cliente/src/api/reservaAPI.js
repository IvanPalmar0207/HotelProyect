import axios from "axios";

export const agregarReserva  = (reserva) => {
    return axios.post('http://127.0.0.1:8000/reservasAPI/apiReserva/apiReserva/', reserva)
}

export const verTodasReservas = () =>{
    return axios.get('http://127.0.0.1:8000/reservasAPI/apiReserva/apiReserva/')
}

export const eliminarReserva = (codigo_res) => {
    return axios.delete(`http://127.0.0.1:8000/reservasAPI/apiReserva/apiReserva/${codigo_res}`)
}

export const unaReserva = (codigo_res) => {
    return axios.get(`http://127.0.0.1:8000/reservasAPI/apiReserva/apiReserva/${codigo_res}`)
}

export const actualizarReserva  = (codigo_res, reserva) => {
    return axios.patch(`http://127.0.0.1:8000/reservasAPI/apiReserva/apiReserva/${codigo_res}/`, reserva)
}