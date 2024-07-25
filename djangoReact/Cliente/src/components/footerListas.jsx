import imagenHotel from '../static/img/hotel.png'

export function FooterLista(){
    return (
        <div>
        <footer>
            <div className="contenedorFooter">
                <img src={imagenHotel} alt="hotelIcono"/>
                <h3>Hotel Pegasus</h3>
            </div>
            </footer>
        </div>
    )
}