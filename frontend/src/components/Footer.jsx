import React from "react";

const Footer = () => {
  return (
    <footer className="bg-bg-secondary p-6 flex justify-center items-center">
      <span className="text-white">
        Hecho por{" "}
        <a
          className="text-white underline hover:no-underline"
          href="https://julandrod.github.io/"
          target="_blank"
        >
          Julandrod
        </a>{" "}
        | 2023 🇨🇴
      </span>
    </footer>
  );
};

export default Footer;
