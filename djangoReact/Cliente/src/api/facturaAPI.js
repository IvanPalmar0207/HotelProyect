import axios from "axios";

export const agregarFactura = (factura) => {
    return axios.post('http://127.0.0.1:8000/facturasAPI/apiFacturas/facturas/',factura)
}

export const todasFactura = () => {
    return axios.get('http://127.0.0.1:8000/facturasAPI/apiFacturas/facturas/')
}

export const eliminarFactura = (codigo_fac) => {
    return axios.delete(`http://127.0.0.1:8000/facturasAPI/apiFacturas/facturas/${codigo_fac}`)
}