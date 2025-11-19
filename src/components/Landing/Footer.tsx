import "@CSS/LandingLayout/Footer/General.css";
const Footer = () => {
  return (
    <footer className="slime-footer" id="footer">
      <div className="slime-footer-container">
        {/* ─────────────── 📍 Local ─────────────── */}
        <div className="slime-footer-section">
          <h2>📍 Local</h2>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.7183536154903!2d-65.20110822379092!3d-26.817095189216882!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225c23b7b6e863%3A0x976c9adc5013942c!2sUniversidad%20Tecnol%C3%B3gica%20Nacional%20-%20Facultad%20Regional%20Tucum%C3%A1n!5e0!3m2!1ses-419!2sar!4v1763313823006!5m2!1ses-419!2sar"
            width="350"
            height="220"
            style={{ border: 0, borderRadius: "12px" }}
            loading="lazy"
            allowFullScreen={false}
          ></iframe>
          <ul>
            <li>Horario: 8:00 a 20:00 (Lun-Vie)</li>
          </ul>
        </div>

        {/* ─────────────── 📞 Contacto ─────────────── */}
        <div className="slime-footer-section">
          <h2>Contacto (Soporte)</h2>
          <ul>
            <li>
              {"Tel:    "}
              <a
                href="https://wa.me/543815559420"
                target="_blank"
                rel="noopener noreferrer"
              >
                +54 381 555 9420
              </a>
            </li>
            <li>
              {"Email:  "}
              <a
                href="https://mailto:vtechsoporte@gmail.com"
                target="_blank"
                rel="noopener no referrer"
              >
                vtechsoporte@gmail.com
              </a>
            </li>
          </ul>
        </div>

        {/* ─────────────── 🔗 Links ─────────────── */}
        <div className="slime-footer-section">
          <h2>🔗 Enlaces</h2>
          <ul>
            <li>
              <a href="#home">Inicio</a>
            </li>
            <li>
              <a href="#servicios">Servicios</a>
            </li>
            <li>
              <a href="#footer">Contacto</a>
            </li>
          </ul>
        </div>
      </div>

      {/* ────────────── COPYRIGHT ────────────── */}
      <div className="slime-footer-bottom">
        <p>
          © {new Date().getFullYear()} V Tech – Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
