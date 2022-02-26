import React, { useState, useEffect } from "react";
import Loading from "../components/Loading";
import { Navigate, useParams } from "react-router-dom";
import RecomendationSingle from "../components/RecomendationSingle";

function SingleMovie({ isAuthenticated }) {
  let { id } = useParams();
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [movieRecomendation, setMovieRecomendation] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const getRecomendationDetails = async () => {
    try {
      setLoading(true);
      const datadetails = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${process.env.REACT_APP_TMDBapi}&page=${pageNumber}`,
        {
          headers: {
            Accept: "application/json",
            "content-type": "application/json",
          },
        }
      );
      const data = await datadetails.json();
      setLoading(false);
      if (data.status_code === 34) {
        setError(true);
      } else {
        setMovieRecomendation(data.results);
        setTotalPage(data.total_pages);
      }
    } catch (err) {
      setError(true);
    }
  };

  const getDetails = async () => {
    try {
      setLoading(true);
      const datadetails = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDBapi}`,
        {
          headers: {
            Accept: "application/json",
            "content-type": "application/json",
          },
        }
      );
      const data = await datadetails.json();
      setLoading(false);
      if (data.status_code === 34) {
        setError(true);
      } else {
        setDetails(data);
      }
    } catch (err) {
      setError(true);
    }
  };

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
        `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${process.env.REACT_APP_TMDBapi}&page=${pageNumber}`,
        {
          headers: {
            Accept: "application/json",
            "content-type": "application/json",
          },
        }
      );
      const data = await datadetails.json();
      setLoading(false);
      if (data.status_code === 34) {
        setError(true);
      } else {
        setMovieRecomendation(data.results);
        setTotalPage(data.total_pages);
      }
    } catch (err) {
      setError(true);
    }
  };

  useEffect(() => {
    getDetails();
    getRecomendationDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  if (loading) {
    return <Loading />;
  } else if (error) {
    return <Navigate to="/error" />;
  } else {
    return (
      <>
        <section className="relative bg-white">
          <img
            className="absolute inset-0 object-[75%] sm:object-[25%] object-cover w-full h-full opacity-25 sm:opacity-100"
            src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
            alt="Couple on a bed with a dog"
          />

          <div className="hidden sm:block sm:inset-0 sm:absolute sm:bg-gradient-to-r sm:from-white sm:to-transparent"></div>

          <div className="relative max-w-screen-xl px-4 py-32 mx-auto lg:h-screen lg:items-center lg:flex">
            <div className="max-w-xl text-center sm:text-left">
              <h1 className="text-3xl font-extrabold sm:text-5xl">
                <strong className="font-extrabold text-rose-700 sm:block">
                  {details.original_title}
                </strong>
              </h1>

              <p className="max-w-lg mt-4 sm:leading-relaxed sm:text-xl">
                {details.overview}
              </p>

              <p className="max-w-lg mt-4 sm:leading-relaxed sm:text-xl text-rose-700">
                {details.genres?.map((genre) => {
                  return <span className="p-2">{genre.name}</span>;
                })}
              </p>
              <h1 class="text-3xl pt-1 font-extrabold sm:text-5xl">
                {details.tagline}
              </h1>

              <div className="flex flex-wrap gap-4 mt-8 text-center">
                {isAuthenticated ? (
                  <span className="block w-full px-12 py-3 text-sm font-medium text-white rounded shadow bg-rose-600 sm:w-auto active:bg-rose-500 hover:bg-rose-700 focus:outline-none focus:ring">
                    Add To Watch Later
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </section>
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto">
            <h1 className="flex items-center justify-center text-3xl font-extrabold text-transparent sm:text-5xl bg-clip-text bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 pb-6">
              Movie Recommendations
            </h1>
            <div className="flex flex-wrap  space-x-4 -m-4 items-center justify-center">
              {movieRecomendation.map((movie) => {
                return (
                  <RecomendationSingle
                    movie={movie}
                    id={movie.id}
                    isAuthenticated={isAuthenticated}
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

export default SingleMovie;
