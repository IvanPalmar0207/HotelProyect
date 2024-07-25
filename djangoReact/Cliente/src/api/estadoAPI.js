import axios from "axios";

export const todosEstados = () =>{
    return axios.get('http://127.0.0.1:8000/habitacionesAPI/estadoHabitacion/estadoHabitacion/')
}