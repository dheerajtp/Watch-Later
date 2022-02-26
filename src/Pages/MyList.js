import React, { useState, useEffect } from "react";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import WatchLaterSingleMovie from "../components/WatchLaterSingleMovie";
import ReactPaginate from "react-paginate";
import Loading from "../components/Loading";
import Empty from "../components/Empty";
import { Navigate } from "react-router-dom";

function MyList({ isAuthenticated }) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState([]);
  const watchLaterCollectionReference = collection(db, "watchlater");

  const [pageNumber, setPageNumber] = useState(0);

  const contentPerPage = 9;
  const pagesVisited = pageNumber * contentPerPage;
  const pageCount = Math.ceil(details.length / contentPerPage);

  const displayContent = details
    .slice(pagesVisited, pagesVisited + contentPerPage)
    .map((movie) => {
      return (
        <React.Fragment key={movie.movie.movieid}>
          <WatchLaterSingleMovie
            movie={movie}
            id={movie.movie.movieid}
            isAuthenticated={isAuthenticated}
          />
        </React.Fragment>
      );
    });

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const getDetails = async () => {
    try {
      setLoading(true);
      const firstQuery = query(
        watchLaterCollectionReference,
        where("userid", "==", auth.currentUser.uid)
      );

      const document = await getDocs(firstQuery);
      setDetails(
        document.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
      );
      setLoading(false);
    } catch (err) {
      setError(true);
    }
  };

  useEffect(() => {
    getDetails();
  }, []);
  if (error) {
    return <Navigate to="/error" />;
  } else if (loading) {
    return <Loading />;
  } else if (details.length <= 0) {
    return <Empty />;
  } else {
    return (
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <h1 className="flex items-center justify-center text-3xl font-extrabold text-transparent sm:text-5xl bg-clip-text bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 pb-6">
            My List
          </h1>
          <div className="flex flex-wrap  space-x-4 -m-4 items-center justify-center">
            {displayContent}
          </div>
          <div className="pt-6">
            <ReactPaginate
              previousLabel={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3 h-3"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              }
              nextLabel={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3 h-3"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              }
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={"paginationContainer"}
              disabledClassName={"previousBtn"}
              previousLinkClassName={"previousBtn"}
              nextLinkClassName={"nextBtn"}
              activeClassName={"activeBtn"}
            />
          </div>
        </div>
      </section>
    );
  }
}

export default MyList;
