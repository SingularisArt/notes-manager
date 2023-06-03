import { Routes, Route, HashRouter } from 'react-router-dom';
import { routes } from '../routes';

import MainLayout from '../components/layout/MainLayout';
import './App.css';

import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

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
