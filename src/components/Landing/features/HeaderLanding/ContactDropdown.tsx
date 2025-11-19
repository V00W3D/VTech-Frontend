import { useState, useEffect, useRef } from "react";
import contactInfo from "./ContactInfo";

const ContactDropdown = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => setOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="slime-nav-dropdown" ref={dropdownRef}>
      <button
        className="slime-nav-dropdown-btn"
        onClick={toggleDropdown}
        aria-expanded={open}
      >
        <span>Contacto ▼</span>
      </button>

      <div className={`slime-nav-dropdown-menu ${open ? "open" : ""}`}>
        {contactInfo.map((item, i) => (
          <a
            key={i}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="slime-contact-item"
          >
            {item.icon} {item.name}
          </a>
        ))}
      </div>
    </div>
  );
};

export default ContactDropdown;
