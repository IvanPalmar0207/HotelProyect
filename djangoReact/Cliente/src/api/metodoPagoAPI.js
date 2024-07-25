import axios from "axios";

export const todosMetodosPago = () => {
    return axios.get('http://127.0.0.1:8000/facturasAPI/apiMetodoPago/metodoPago/')
}