import { useState } from "react";
import "./Footer.css"
import { Link } from "react-router-dom";

function Footer() {
  const [email,setEmail] = useState("");
  
  const enviarFormulario = async (e) => {
    e.preventDefault();

    let res = await fetch("http://127.0.0.1:8000/api/contacto", {
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body: JSON.stringify({email}),
    });

    let data = await res.json();
    console.log(data);
    setEmail("");
  }
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-col">
          <h3>WHO WE ARE?</h3>
          <ul>
             <li><Link to="/normas">About Us</Link></li>
            <li><Link to="/normas">Careers</Link></li>
            <li><Link to="/normas">Tour</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>SUPPORT</h3>
          <ul>
            <li><Link to="/normas">Affiliate Programs</Link></li>
            <li><Link to="/normas">Advertise</Link></li>
            <li><Link to="/normas">FAQ</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>PARTNERS</h3>
          <ul>
            <li><Link to="/normas">Knowledge Base</Link></li>
            <li><Link to="/normas">Video Guides</Link></li>
            <li><Link to="/normas">Report a Bug</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>LEGAL</h3>
          <ul>
            <li><Link to="/normas">Privacy Policy</Link></li>
            <li><Link to="/normas">Terms &amp; Conditions</Link></li>
            <li><Link to="/normas">Cookie Policy</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>NEWSLETTER</h3>
          <form className="newsletter" onSubmit={enviarFormulario}>
            <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <button type="submit">→</button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="social-icons">
          <img src="http://zent.es/imagenes_producto/Instagram.png" alt="Instagram" />
          <img src="http://zent.es/imagenes_producto/Twiter.png" alt="Twitter" />
          <img src="http://zent.es/imagenes_producto/facebook.png" alt="Facebook" />
        </div>
        <p>Copyright © 2026 Zent</p>
      </div>
    </footer>
  )
}

export default Footer;
