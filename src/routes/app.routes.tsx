import { Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home/home';

export function AppRoutes(){
  return (
    <Routes>
      <Route path="/" element={<Home/>}>
        <Route path=':pathname'>
          <Route path="list" />
          <Route path="create" />
        </Route>
      </Route>
    </Routes>
  )}