import axios from 'axios'

export const ListarRoles = () => {
    return axios.get('http://127.0.0.1:8000/usuariosAPI/rol/rol/')
}