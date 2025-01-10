import { Link } from "react-router-dom";
import Header from "./Header";

const PageComponent = ({ children }) => {
  return (
    <div className="bg-slate-100 h-screen max-h-screen">
      <Header />
      <div className="overflow-y-scroll max-h-screen">
        <div className="mx-auto container p-4 lg:px-8 pt-24">{children}</div>
      </div>
    </div>
  );
};

export default PageComponent;
