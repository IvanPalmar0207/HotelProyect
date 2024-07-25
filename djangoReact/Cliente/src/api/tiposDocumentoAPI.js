import axios from 'axios'
export const ListarTiposDocumento = () => {
    return axios.get('http://127.0.0.1:8000/usuariosAPI/tipoDocumento/tipoDocumento/')
}