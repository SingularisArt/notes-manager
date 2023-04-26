import { Routes, Route, HashRouter } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import { routes } from '../routes';

import './App.css';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {routes}
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
