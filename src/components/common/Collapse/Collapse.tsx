import React, { useState } from 'react';

type CollapseProps = {
  onClick: () => void;
  title: string;
  // children: React.ReactNode;
};

// const Collapse: React.FC<CollapseProps> = ({ title, children }) => {
//   const [isToggled, setIsToggled] = useState(false);

//   const handleToggle = () => {
//     setIsToggled(!isToggled);
//   };

//   return (
//     <div>
//       <button
//         style={{
//           cursor: 'pointer',
//           border: 'none',
//           background: 'none',
//           margin: 0,
//           padding: 0,
//           fontSize: 'inherit',
//           color: 'inherit',
//           fontWeight: 'bold',
//         }}
//         onClick={handleToggle}
//       >
//         {isToggled ? '▼' : '►'} {title}
//       </button>
//       {isToggled && (
//         <div style={{ paddingLeft: '10px', fontWeight: 'normal' }}>
//           {children}
//         </div>
//       )}
//     </div>
//   );
// };

const Collapse: React.FC<CollapseProps> = ({ title, onClick }) => {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
    onClick()
  };

  return (
    <div>
      <button
        style={{
          cursor: 'pointer',
          border: 'none',
          background: 'none',
          margin: 0,
          padding: 0,
          fontSize: 'inherit',
          color: 'inherit',
          fontWeight: 'bold',
        }}
        onClick={handleToggle}
      >
        {isToggled ? '▼' : '►'} {title}
      </button>
    </div>
  );
};

export default Collapse;
