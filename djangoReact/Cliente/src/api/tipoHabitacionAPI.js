import axios from "axios";

export const todosTiposHabitacion = () => {
    return axios.get('http://127.0.0.1:8000/habitacionesAPI/tipoHabitacion/tiposHabitacion/')
}    