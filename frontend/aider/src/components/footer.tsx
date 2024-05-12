import "../styles/footer.css";
import Who from "../assets/img/WHO.png"

export const Footer = ()=>{
    return <div className="footer">
        <hr />
        <div className="col">
            <h4>Home</h4>
            <p>privacy</p>
            <p>policies</p>
        </div>
        <div className="col">
            <h4>About</h4>
            <p>Our mission</p>
            <p>Be a member</p>
        </div>
        <div className="col l">
            <h4>Sponsored by</h4>
            <img src={Who} alt="" />
        </div>
    </div>
}