import { CircleOff } from "lucide-react";
import { Link } from "react-router-dom";

const ZeroItems = () => {
  return (
    <div>
      <div className="my-11  flex-col justify-center items-center text-center py-6 ">
        <CircleOff size={50} color="#d3d3d338" width={"100%"} />
        <h2 className="text-[#d3d3d338] mt-4">No job openings found</h2>
        <h4 className="mt-4 text-[#d3d3d338]">
          Create a job post by clicking{" "}
          <Link to={"/admin/job/create"}>
            <u>POST A JOB</u>
          </Link>{" "}
          button in Navigation bar
        </h4>
      </div>
    </div>
  );
};

export default ZeroItems;
