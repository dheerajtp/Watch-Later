import React, { useState, useEffect } from "react";
import Loading from "../components/Loading";
import SingleItem from "../components/SingleItem";
import { Navigate } from "react-router-dom";
import Empty from "../components/Empty";

function Home({ isAuthenticated }) {
  const [error, setError] = useState(false);
  const [details, setDetails] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

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

  const onSearch = async () => {
    setPageNumber(1);
    console.log(search.length);
    let query = search.replace(" ", "%20");
    console.log(query);
    if (query.length <= 0) {
    } else {
      setLoading(true);
      try {
        const datadetails = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDBapi}&language=en-US&query=${query}&page=${pageNumber}&include_adult=false`,
          {
            headers: {
              Accept: "application/json",
              "content-type": "application/json",
            },
          }
        );
        const data = await datadetails.json();
        setTotalPage(data.total_pages);
        setDetails(data.results);
        setLoading(false);
      } catch (err) {
        setError(true);
      }
    }
  };

  const getDetails = async () => {
    try {
      setLoading(true);
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

  useEffect(() => {
    if (search.length <= 0) {
      getDetails();
    } else {
      onSearch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber]);

  if (error) {
    return <Navigate to="/error" />;
  } else if (loading) {
    return (
      <>
        <div
          className="flex items-center max-w-md mx-auto bg-white rounded-lg "
          x-data="{ search: '' }"
        >
          <div className="w-full">
            <input
              type="search"
              className="w-full px-4 py-1 text-gray-800 rounded-full focus:outline-none"
              placeholder="search"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </div>
          <div>
            <button
              type="submit"
              className="flex items-center bg-blue-500 justify-center w-12 h-12 text-white rounded-r-lg"
              onClick={onSearch}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <Loading />
      </>
    );
  } else if (details.length <= 0) {
    return (
      <>
        <div
          className="flex items-center max-w-md mx-auto bg-white rounded-lg "
          x-data="{ search: '' }"
        >
          <div className="w-full">
            <input
              type="search"
              className="w-full px-4 py-1 text-gray-800 rounded-full focus:outline-none"
              placeholder="search"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </div>
          <div>
            <button
              type="submit"
              className="flex items-center bg-blue-500 justify-center w-12 h-12 text-white rounded-r-lg"
              onClick={onSearch}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <Empty />
      </>
    );
  } else {
    return (
      <>
        <div
          className="flex items-center max-w-md mx-auto bg-white rounded-lg "
          x-data="{ search: '' }"
        >
          <div className="w-full">
            <input
              type="search"
              className="w-full px-4 py-1 text-gray-800 rounded-full focus:outline-none"
              placeholder="search"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </div>
          <div>
            <button
              type="submit"
              className="flex items-center bg-blue-500 justify-center w-12 h-12 text-white rounded-r-lg"
              onClick={onSearch}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap  space-x-4 -m-4 items-center justify-center">
              {details.map((movie) => {
                return (
                  <React.Fragment key={movie.id}>
                    <SingleItem
                      movie={movie}
                      id={movie.id}
                      isAuthenticated={isAuthenticated}
                    />
                  </React.Fragment>
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
                class="block w-20 h-8 leading-8 text-center border bg-blue-600 border-blue-600 rounded text-white"
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

export default Home;
