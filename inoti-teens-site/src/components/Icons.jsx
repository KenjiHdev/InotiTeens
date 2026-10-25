import React from "react";

export function HeartCrossIcon({ size = 20, color = "#E0272D" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M12.5 22.5L7.2 17.2C4.9 14.9 4.9 11.2 7.2 8.9C9.5 6.6 13.2 6.6 15.5 8.9"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M16.5 8.9C18.8 6.6 22.5 6.6 24.8 8.9C27.1 11.2 27.1 14.9 24.8 17.2L16 26V17.2H19.5"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.5 15.2H15.2V11.8"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CrownOfThornsDivider() {
  return (
    <div className="thorn-divider" role="separator" aria-hidden="true">
      <svg
        className="thorn-icon-spin"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="32"
          cy="32"
          r="18"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="6 3"
        />
        <circle
          cx="32"
          cy="32"
          r="14"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        {/* Espinhos radiais estilizados */}
        <path
          d="M32 8L34 14L30 14Z M32 56L34 50L30 50Z M8 32L14 34L14 30Z M56 32L50 34L50 30Z M15 15L20 19L17 21Z M49 49L44 45L47 43Z M49 15L44 19L47 21Z M15 49L20 45L17 43Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}
