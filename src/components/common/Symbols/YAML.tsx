import React from "react";

type YAMLSymbolProps = {
  className?: string,
  onClick: () => void,
};

const YAMLSymbol: React.FC<YAMLSymbolProps> = ({ className, onClick }) => {
  return (
    <div className={className} style={{ display: "inline-block" }}>
      <svg className="yaml-button" onClick={onClick} xmlns="http://www.w3.org/2000/svg" width={32} height={32}>
        <path
          d="M1.656.27a1.528 1.528 0 0 1 2.121.386L7.16 5.543 10.97.593a1.527 1.527 0 0 1 2.136-.277c.665.512.79 1.47.278 2.137L8.62 8.645v5.578a1.526 1.526 0 0 1-3.05 0V8.602L1.27 2.39A1.528 1.528 0 0 1 1.656.27ZM17.762 0c.605 0 1.152.355 1.394.91l5.586 12.7c.34.769-.008 1.667-.777 2.007a1.527 1.527 0 0 1-2.012-.781l-1.387-3.152h-5.609l-1.387 3.152a1.524 1.524 0 0 1-2.789-1.227L16.367.91c.242-.555.79-.91 1.395-.91Zm-1.465 8.637h2.93l-1.465-3.328Zm2.914 8.695c.644.191 1.09.785 1.09 1.461v11.684a1.523 1.523 0 1 1-3.047 0v-6.524l-2.785 4.305c-.27.418-.727.676-1.227.695a1.525 1.525 0 0 1-1.27-.61l-3.35-4.472v6.606a1.526 1.526 0 0 1-3.052 0V19.3a1.525 1.525 0 0 1 2.742-.914l4.786 6.379 4.402-6.801a1.524 1.524 0 0 1 1.71-.633Zm4.644-.062c.844 0 1.528.683 1.528 1.523v10.16h4.062a1.523 1.523 0 1 1 0 3.047h-5.59c-.84 0-1.523-.684-1.523-1.523V18.793c0-.84.684-1.523 1.523-1.523Zm0 0"
          style={{
            stroke: "none",
            fillRule: "nonzero",
            fill: "#000",
            fillOpacity: 1,
          }}
        />
      </svg>
    </div>
  );
};

export default YAMLSymbol;
