import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";

function Nav({ isAuthenticated, setIsAuthenticated }) {
  let navigate = useNavigate();
  const signOutFunction = async () => {
    await signOut(auth);
    localStorage.clear();
    setIsAuthenticated(false);
    navigate("/mylist");
  };

  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
          to="/"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm3 2h6v4H7V5zm8 8v2h1v-2h-1zm-2-2H7v4h6v-4zm2 0h1V9h-1v2zm1-4V5h-1v2h1zM5 5v2H4V5h1zm0 4H4v2h1V9zm-1 4h1v2H4v-2z"
              clipRule="evenodd"
            />
          </svg>
          <span className="ml-3 text-xl">Watch Later</span>
        </Link>
        {isAuthenticated ? (
          <>
            <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
              </svg>
              <Link className="mr-5 hover:text-gray-900" to="/mylist">
                My List
              </Link>

              <Link className="mr-5 hover:text-gray-900" to="/toprated">
                Top Rated
              </Link>
              <Link className="mr-5 hover:text-gray-900" to="/upcoming">
                Upcoming
              </Link>
            </nav>
            <button
              onClick={signOutFunction}
              className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
            >
              Log Out
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-4 h-4 ml-1"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </button>
          </>
        ) : (
          <>
            <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
              <Link className="mr-5 hover:text-gray-900" to="/toprated">
                Top Rated
              </Link>
              <Link className="mr-5 hover:text-gray-900" to="/upcoming">
                Upcoming
              </Link>
            </nav>
            <Link
              to="/login"
              className="inline-flex items-center lg:items-end bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
            >
              Log In
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-4 h-4 ml-1"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Nav;
