import axios from 'axios'

export const todosLosUsuario = () => {
    return axios.get('http://127.0.0.1:8000/usuariosAPI/usuarios/usuarios/')
}

export const agregarUsuarios = (usuarios) => {
    return axios.post('http://127.0.0.1:8000/usuariosAPI/usuarios/usuarios/', usuarios)
  };

export const eliminacionUsuario = (numeroDoc) => {
    return axios.delete(`http://127.0.0.1:8000/usuariosAPI/usuarios/usuarios/${numeroDoc}`)
}

export const elegirUnoUsuario = (numeroDoc) => {
    return axios.get(`http://127.0.0.1:8000/usuariosAPI/usuarios/usuarios/${numeroDoc}`)
}

export const actualizarUsuario = (numeroDoc,usuarioNuevo) => {
    return axios.patch(`http://127.0.0.1:8000/usuariosAPI/usuarios/usuarios/${numeroDoc}/`,usuarioNuevo)
}