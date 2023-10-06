import React from "react";

function Footer() {
  return (
    <div className="footer" style={{ display: 'flex', flexDirection: 'column' }}>
      <footer className="py-2 bg-dark">
        <div className="container-fluid">
          <p className="m-0 text-center text-white">
            Copyright &copy;The C Learning Hub
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;