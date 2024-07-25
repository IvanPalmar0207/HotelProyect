import axios from "axios";

export const agregarHabitacion = (habitacion) => {
    return axios.post('http://127.0.0.1:8000/habitacionesAPI/habitacion/habitacion/', habitacion)
}

export const verTodasHabitaciones = () =>{
    return axios.get('http://127.0.0.1:8000/habitacionesAPI/habitacion/habitacion/')
}

export const eliminarHabitacion = (codigo) => {
    return axios.delete(`http://127.0.0.1:8000/habitacionesAPI/habitacion/habitacion/${codigo}`)
}

export const elegirHabitacion = (codigo_hab) => {
    return axios.get(`http://127.0.0.1:8000/habitacionesAPI/habitacion/habitacion/${codigo_hab}`)
}

export const actualizarHabitacion = (codigo_hab, habitacion) => {
    return axios.patch(`http://127.0.0.1:8000/habitacionesAPI/habitacion/habitacion/${codigo_hab}/`, habitacion)
}

export const actualizarHabitacionPatc = (codigo_hab, habitacion) => {
    return axios.patch(`http://127.0.0.1:8000/habitacionesAPI/habitacion/habitacion/${codigo_hab}/`, habitacion)
}