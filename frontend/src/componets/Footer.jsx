import "../css/compoents/Footer.css"


export default function Footer() {
    return (
        <div className ="footer">
           <div>
            <p>Gameify</p>
            <p>555 555 555 MVA</p>
            <p><a href="tel:4755555555"></a>555 55 555</p>
           </div>
           <div>
            <p><a href="/Login">Logg inn</a></p>
            <p><a href="/Register">Register</a></p>
            <p><a href="#">About us</a></p>
            
           </div>
           <div>
            <p><a href="#">Conctact oss</a></p>
            <p><a href="#">see our new games</a></p>
            <p><a href="#">Join our newsletter</a></p>
           </div>
        </div>
    );
}