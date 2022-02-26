import React, { useState, useEffect } from "react";
import Loading from "../components/Loading";
import SingleItem from "../components/SingleItem";
import { Navigate } from "react-router-dom";

function Latest({ isAuthenticated, toprated }) {
  const [error, setError] = useState(false);
  const [details, setDetails] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);

  const nextButtonHandler = () => {
    setPageNumber(pageNumber + 1);
    nextAndPreviousHandler();
  };

  const previousButtonHandler = () => {
    setPageNumber(pageNumber - 1);
    nextAndPreviousHandler();
  };

  const nextAndPreviousHandler = async () => {
    setLoading(true);
    try {
      const datadetails = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDBapi}&language=en-US&page=${pageNumber}`,
        {
          headers: {
            Accept: "application/json",
            "content-type": "application/json",
          },
        }
      );
      const data = await datadetails.json();
      setDetails(data.results);
      setTotalPage(data.total_pages);
      setLoading(false);
    } catch (err) {
      setError(true);
    }
  };

  const getDetails = async () => {
    try {
      setLoading(true);
      const datadetails = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_TMDBapi}&language=en-US&page=${pageNumber}`,
        {
          headers: {
            Accept: "application/json",
            "content-type": "application/json",
          },
        }
      );
      const data = await datadetails.json();
      setDetails(data.results);
      setTotalPage(data.total_pages);
      setLoading(false);
    } catch (err) {
      setError(true);
    }
  };

  useEffect(() => {
    getDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber]);

  if (error) {
    return <Navigate to="/error" />;
  } else if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  } else {
    return (
      <>
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap  space-x-4 -m-4 items-center justify-center">
              {details.map((movie) => {
                return (
                  <SingleItem
                    movie={movie}
                    id={movie.id}
                    isAuthenticated={isAuthenticated}
                    toprated={toprated}
                  />
                );
              })}
            </div>
          </div>
        </section>
        <ol className="flex justify-center space-x-1 text-xs font-medium m-4">
          {pageNumber <= 1 ? (
            ""
          ) : (
            <li>
              <button
                className="block w-20 h-8 leading-8 text-center border bg-blue-600 border-blue-600 rounded text-white"
                onClick={previousButtonHandler}
              >
                Previous
              </button>
            </li>
          )}
          {pageNumber === totalPage ? (
            ""
          ) : (
            <li>
              <button
                className="inline-flex items-center justify-center w-20 h-8 border bg-blue-600 border-blue-600 rounded text-white"
                onClick={nextButtonHandler}
              >
                Next
              </button>
            </li>
          )}
        </ol>
      </>
    );
  }
}

export default Latest;
