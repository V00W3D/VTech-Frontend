import { FaEnvelope, FaInstagram, FaFacebook, FaPhone } from "react-icons/fa";

const contactInfo = [
  {
    name: "Gmail",
    icon: <FaEnvelope className="icon" />,
    link: "mailto:tuemail@gmail.com",
  },
  {
    name: "Instagram",
    icon: <FaInstagram className="icon" />,
    link: "https://instagram.com/tuusuario",
  },
  {
    name: "Facebook",
    icon: <FaFacebook className="icon" />,
    link: "https://facebook.com/tuusuario",
  },
  {
    name: "Teléfono",
    icon: <FaPhone className="icon" />,
    link: "tel:+5491122334455",
  },
];

export default contactInfo;
