import React from 'react';

type PDFSymbolProps = {
  className?: string;
  onClick: () => void;
};

const PDFSymbol: React.FC<PDFSymbolProps> = ({ className, onClick }) => {
  return (
    <div className={className} style={{ display: 'inline-block' }}>
      <svg
        className="pdf-button"
        onClick={onClick}
        xmlns="http://www.w3.org/2000/svg"
        width={32}
        height={32}
      >
        <path
          d="M23.734 20.879c-.39.113-.96.125-1.574.035a7.565 7.565 0 0 1-1.992-.59c1.176-.172 2.09-.12 2.871.156.188.067.492.243.695.399Zm-6.57-1.082c-.047.012-.094.023-.14.039-.317.086-.626.168-.922.246l-.403.102c-.804.203-1.629.41-2.445.66.312-.746.598-1.5.879-2.239a95.82 95.82 0 0 1 .64-1.652c.114.184.23.367.352.55.55.845 1.246 1.622 2.04 2.294Zm-2.05-8.41c.054.918-.145 1.804-.438 2.656-.36-1.05-.524-2.211-.078-3.148.117-.239.21-.368.273-.434.094.144.219.469.242.926Zm-4.208 11.656c-.199.363-.406.7-.617 1.02-.508.765-1.344 1.585-1.77 1.585-.042 0-.093-.003-.167-.085-.047-.047-.055-.086-.051-.133.011-.282.386-.785.926-1.25a9.365 9.365 0 0 1 1.68-1.137Zm14.192-2.125c-.067-.941-1.649-1.543-1.664-1.547-.61-.219-1.274-.324-2.032-.324-.804 0-1.675.117-2.797.379a9.731 9.731 0 0 1-2.496-2.567c-.285-.433-.539-.863-.761-1.285.543-1.297 1.03-2.691.941-4.258-.07-1.25-.637-2.093-1.402-2.093-.528 0-.98.39-1.352 1.164-.656 1.37-.484 3.129.516 5.226-.36.848-.696 1.723-1.02 2.57-.402 1.055-.816 2.145-1.285 3.18-1.312.52-2.39 1.149-3.285 1.922-.59.504-1.3 1.277-1.34 2.082-.02.383.11.73.375 1.008.281.297.633.453 1.024.453 1.28 0 2.515-1.762 2.75-2.117.472-.707.914-1.5 1.343-2.414 1.09-.395 2.25-.688 3.375-.973l.403-.101c.304-.078.617-.16.941-.25.34-.094.691-.188 1.047-.282 1.156.735 2.398 1.215 3.61 1.391 1.019.148 1.925.063 2.538-.258.551-.285.582-.73.57-.906Zm2.484 8.078c0 1.719-1.52 1.824-1.824 1.828H6.195c-1.715 0-1.816-1.527-1.82-1.828V3.004c0-1.723 1.52-1.824 1.82-1.828H19.41l.008.008V6.34c0 1.035.625 2.992 2.996 2.992h5.121l.047.047Zm-1.215-20.84h-3.953c-1.715 0-1.816-1.515-1.82-1.816V2.363Zm2.387 20.84V8.891L20.594.695V.66h-.04L19.899 0H6.195C5.16 0 3.2.629 3.2 3.004v25.992c0 1.04.63 3.004 2.996 3.004h19.567c1.035 0 2.992-.629 2.992-3.004Zm0 0"
          style={{
            stroke: 'none',
            fillRule: 'nonzero',
            fill: '#eb5757',
            fillOpacity: 1,
          }}
        />
      </svg>
    </div>
  );
};

export default PDFSymbol;
