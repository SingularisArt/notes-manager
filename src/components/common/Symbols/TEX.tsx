import React from 'react';

type TEXSymbolProps = {
  className?: string;
  onClick: () => void;
};

const TEXSymbol: React.FC<TEXSymbolProps> = ({ className, onClick }) => {
  return (
    <div className={className} style={{ display: 'inline-block' }}>
      <svg
        className="tex-button"
        onClick={onClick}
        xmlns="http://www.w3.org/2000/svg"
        width={40}
        height={40}
      >
        <path
          d="M14.168 16.402c-.16-1.953-.305-3.445-2.86-3.445H9.888v10.5h2.683v.766l-3.855-.04-3.852.04v-.766h2.68v-10.5H6.105c-2.558 0-2.699 1.512-2.859 3.445H2.5l.355-4.207H14.56l.355 4.207h-.75Zm0 0"
          style={{
            stroke: 'none',
            fillRule: 'nonzero',
            fill: '#000',
            fillOpacity: 1,
          }}
        />
        <path
          d="M24.11 28.164H13.011v-.766h1.883V16.832h-1.883v-.762h10.797l.515 4.207h-.75c-.265-2.289-.851-3.445-3.57-3.445h-2.766V21.5h1.047c1.707 0 1.883-.75 1.883-2.078h.75v4.918h-.75c0-1.348-.18-2.074-1.883-2.074h-1.047v5.129h2.77c3.09 0 3.75-1.383 4.125-4.032h.75Zm0 0"
          style={{
            stroke: 'none',
            fillRule: 'nonzero',
            fill: '#000',
            fillOpacity: 1,
          }}
        />
        <path
          d="M34.66 23.984c-.676 0-2.453 0-3.02.036v-.77h1.473l-3.195-4.441-3.16 4.226c.523.16 1.07.23 1.617.215v.766c-.445-.04-1.969-.04-2.52-.04-.5 0-1.937 0-2.343.04v-.766h.476a9.12 9.12 0 0 0 1.032-.055c.625-.054.675-.105.832-.32l3.57-4.75-3.942-5.523h-1.73v-.766c.48.035 2.238.035 2.84.035.73 0 2.398 0 3.039-.035v.766H28.16l2.645 3.695 2.593-3.48a5.147 5.147 0 0 0-1.617-.215v-.766c.446.035 1.989.035 2.543.035.5 0 1.914 0 2.324-.035v.766h-.46a6.25 6.25 0 0 0-1.047.054c-.586.051-.657.086-.836.32l-3 4.012 4.492 6.262H37.5v.766c-.445-.032-2.273-.032-2.84-.032Zm0 0"
          style={{
            stroke: 'none',
            fillRule: 'nonzero',
            fill: '#000',
            fillOpacity: 1,
          }}
        />
      </svg>
    </div>
  );
};

export default TEXSymbol;
