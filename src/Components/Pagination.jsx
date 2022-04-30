import { Link } from "react-router-dom";
const Pagination = () => {
  return (
    <div className="flex justify-between items-center w-1/4 mx-auto">
      <nav>
        <ul>
          <li>
            <Link to="/nextpage">
              <div className="bg-navGray rounded "></div>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
