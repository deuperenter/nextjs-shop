import footercss from "./footer.module.css";

const Footer = () => {
  return (
    <footer className={footercss.bar}>
      <div className={footercss.content}>
        © 2025 Enterdeuper All rights reserved. Some icons by Font Awesome
      </div>
    </footer>
  );
};

export default Footer;
