import axios from "axios";

export const agregarCategoria = (categoria) => {
    return axios.post('http://127.0.0.1:8000/serviciosAPI/apiCategoria/categoria/', categoria)
}

export const verTodaCategorias = () => {
    return axios.get('http://127.0.0.1:8000/serviciosAPI/apiCategoria/categoria/')
}

export const eliminarCategoria = (codigo_cat) => {
    return axios.delete(`http://127.0.0.1:8000/serviciosAPI/apiCategoria/categoria/${codigo_cat}`)
}

export const elegirUnaCategoria = (codigo_cat) => {
    return axios.get(`http://127.0.0.1:8000/serviciosAPI/apiCategoria/categoria/${codigo_cat}`)
}

export const actualizarCategoria = (codigo_cat, categoria) => {
    return axios.patch(`http://127.0.0.1:8000/serviciosAPI/apiCategoria/categoria/${codigo_cat}/`, categoria)
}