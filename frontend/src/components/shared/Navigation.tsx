import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="flex py-12 justify-between items-center">
      <div>
        <Link to={"/"} className="text-4xl font-medium">HirelyAI</Link>
      </div>
      <div className="flex justify-center gap-x-8 items-center">
        <Link to={"/home"}>Home</Link>
        <div className="flex gap-x-4 items-center">
          <Link to={"/home"}>Sign In</Link>
          <Link to={"/home"}>Sign Up</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
