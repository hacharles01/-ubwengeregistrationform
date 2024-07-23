import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="card-footer">
      <p>© {currentYear} All rights reserved to MIFOTRA</p>
    </div>
  );
};

export default Footer;
