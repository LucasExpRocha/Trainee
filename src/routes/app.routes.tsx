import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home/home";
import { EditCar } from "../pages/Home/window/Edit";
import { Init } from "../pages/Home/window/Init";
import { ListCars } from "../pages/Home/window/List";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="/" element={<Init />}/>
        <Route path="list" element={<ListCars />}/>
        <Route path="list/edit/:id" element={<EditCar />}/>
      </Route>
    </Routes>
  );
}
