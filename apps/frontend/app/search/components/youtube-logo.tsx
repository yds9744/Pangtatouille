import React from "react";

const YouTubeLogo = () => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-8 h-8"
    >
      {/* Red background of the logo */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23.498 6.203a2.806 2.806 0 00-1.972-1.977C19.637 4 12 4 12 4s-7.636 0-9.526.226A2.806 2.806 0 00.502 6.203 29.956 29.956 0 000 12c.002 1.957.157 3.906.502 5.797a2.806 2.806 0 001.972 1.977c1.89.226 9.526.226 9.526.226s7.636 0 9.526-.226a2.806 2.806 0 001.972-1.977c.345-1.89.5-3.84.502-5.797a29.955 29.955 0 00-.502-5.797z"
        fill="#FF0000"
      />
      {/* White triangle (play button) */}
      <path d="M9.75 15.454V8.545l6.545 3.455-6.545 3.454z" fill="#FFFFFF" />
    </svg>
  );
};

export default YouTubeLogo;
