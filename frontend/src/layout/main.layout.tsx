import Navigation from "@/components/shared/Navigation";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div>
      <Navigation />
      <Outlet />
    </div>
  );
};

export default MainLayout;
