import "./Footer.css"
import { Link } from "react-router-dom";

function Footer() {
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
          <form className="newsletter">
            <input type="email" placeholder="Enter your email" />
            <button type="submit">→</button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="social-icons">
          <img src="/imagesideas/Instagram.png" alt="Instagram" />
          <img src="/imagesideas/Twiter.png" alt="Twitter" />
          <img src="/imagesideas/facebook.png" alt="Facebook" />
        </div>
        <p>Copyright © 2017 sendesingnz. All Rights Reserved</p>
      </div>
    </footer>
  )
}

export default Footer
