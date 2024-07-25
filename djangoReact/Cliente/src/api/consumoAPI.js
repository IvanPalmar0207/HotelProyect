import axios from "axios";

export const agregarConsumo = (consumo) =>{
    return axios.post('http://127.0.0.1:8000/serviciosAPI/apiConsumo/consumo/', consumo)
}

export const todosConsumo = () => {
    return axios.get('http://127.0.0.1:8000/serviciosAPI/apiConsumo/consumo/')
}

export const eliminarConsumo = (numero_con) => {
    return axios.delete(`http://127.0.0.1:8000/serviciosAPI/apiConsumo/consumo/${numero_con}`)
}

export const verUnoConsumo = (numero_con) => {
    return axios.get(`http://127.0.0.1:8000/serviciosAPI/apiConsumo/consumo/${numero_con}`)
}

export const actualizarConsumo = (numero_con, consumo) =>{
    return axios.patch(`http://127.0.0.1:8000/serviciosAPI/apiConsumo/consumo/${numero_con}/`,consumo)
}