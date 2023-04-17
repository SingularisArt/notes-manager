import React from "react";

type TEXSymbolProps = {
  className?: string,
};

const TEXSymbol: React.FunctionComponent<TEXSymbolProps> = ({ className }) => {
  return (
    <div className={className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={800}
        height={800}
        viewBox="0 0 32 32"
      >
        <path
          d="M11.333 13.122c-.128-1.562-.241-2.756-2.287-2.756H7.91v8.4h2.145v.611l-3.083-.029-3.082.029v-.611h2.144v-8.4h-1.15c-2.046 0-2.159 1.208-2.287 2.756H2l.284-3.367h9.362l.284 3.367h-.6Z"
          style={{
            fill: "000",
          }}
        />
        <path
          d="M19.289 22.53H10.41v-.61h1.506v-8.453H10.41v-.611h8.637l.412 3.367h-.6c-.213-1.833-.682-2.756-2.855-2.756h-2.213V17.2h.838c1.364 0 1.505-.6 1.505-1.662h.6v3.935h-.6c0-1.08-.142-1.662-1.505-1.662h-.838v4.106h2.216c2.472 0 3-1.108 3.3-3.225h.6Z"
          style={{
            fill: "000",
          }}
        />
        <path
          d="M27.727 19.186c-.54 0-1.96 0-2.415.029V18.6h1.179l-2.557-3.552-2.529 3.381a4.1 4.1 0 0 0 1.295.171v.611c-.355-.029-1.576-.029-2.017-.029-.4 0-1.548 0-1.875.029V18.6h.383a7.459 7.459 0 0 0 .824-.043c.5-.043.54-.085.667-.256l2.854-3.801-3.153-4.418H19V9.47c.384.028 1.79.028 2.273.028.582 0 1.918 0 2.429-.028v.611h-1.174l2.117 2.955 2.074-2.784a4.1 4.1 0 0 0-1.293-.17V9.47c.356.028 1.591.028 2.032.028.4 0 1.534 0 1.861-.028v.611h-.369a5.264 5.264 0 0 0-.838.043c-.469.043-.526.071-.667.256l-2.4 3.21 3.591 5.01H30v.611c-.355-.025-1.818-.025-2.273-.025Z"
          style={{
            fill: "000",
          }}
        />
      </svg>
    </div>
  );
};

export default TEXSymbol;