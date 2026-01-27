import "./Footer.css"

function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-col">
          <h3>WHO WE ARE?</h3>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Tour</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>SUPPORT</h3>
          <ul>
            <li><a href="#">Affiliate Programs</a></li>
            <li><a href="#">Advertise</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>PARTNERS</h3>
          <ul>
            <li><a href="#">Knowledge Base</a></li>
            <li><a href="#">Video Guides</a></li>
            <li><a href="#">Report a Bug</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>LEGAL</h3>
          <ul>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms &amp; Conditions</a></li>
            <li><a href="#">Cookie Policy</a></li>
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
