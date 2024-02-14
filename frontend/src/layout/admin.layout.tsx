import { Button } from "@/components/ui/button";
import { Link, Outlet } from "react-router-dom";

const AdminMainLayout = () => {
  return (
    <div>
      <div className="flex justify-end items-center py-4 gap-3">
        <Link to={"/admin/jobs"}>Job Posts</Link>
        <Button asChild>
          <Link to={"/admin/job/create"}>Post A Job</Link>
        </Button>
      </div>
      <Outlet />
    </div>
  );
};

export default AdminMainLayout;
