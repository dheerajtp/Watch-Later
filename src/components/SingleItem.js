import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { addDoc, getDocs, collection, query, where } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import Loading from "./Loading";

function SingleItem({ movie, id, isAuthenticated, toprated, upcoming }) {
  const [loading, setLoading] = useState(false);
  const { addToast } = useToasts();
  const image = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  const watchLaterCollectionReference = collection(db, "watchlater");

  const addToWatchList = async () => {
    setLoading(true);
    const firstQuery = query(
      watchLaterCollectionReference,
      where("movieid", "==", movie.id),
      where("userid", "==", auth.currentUser.uid)
    );

    const document = await getDocs(firstQuery);
    if (document.docs.length > 0) {
      addToast("Movie Is Already Present In Watch Later List", {
        appearance: "error",
      });
      setLoading(false);
    } else {
      await addDoc(watchLaterCollectionReference, {
        movieid: movie.id,
        movie: {
          image: movie.poster_path,
          popularity: movie.popularity,
          title: movie.original_title,
          releasedate: movie.release_date,
          vote: movie.vote_average,
          votecount: movie.vote_count,
          overview: movie.overview,
        },
        userid: auth.currentUser.uid,
      });
      addToast("Added To Watch Later", { appearance: "success" });
      setLoading(false);
    }
  };
  if (loading) {
    return <Loading />;
  } else {
  return (
    <div className="py-5 flex justify-center items-center" key={id}>
      <div className="relative pl-1 flex justify-center rounded-xl ">
        <div className="top-0 left-0 mt-3 px-2 rounded-lg absolute z-30 bg-green-500 text-gray-100 text-xs md:text-sm font-medium md:block">
          {movie.popularity}
        </div>
        <div className="top-0 left-0 h-2 md:h-3 mt-5 px-2 absolute z-20 bg-green-500"></div>
        <div className="top-0 left-0 h-2 md:h-3 mt-6 pl-5 rounded-3xl absolute z-0 bg-green-600"></div>
        <div className="w-96 pb-2 bg-white rounded-xl shadow-xl z-10">
          <div className="relative">
            <img
              src={image}
              className="max-h-11/12 min-w-20 object-cover rounded-t-xl"
              alt={movie.original_title}
            />

            <div className="bottom-0 right-0 mb-2 mr-2 px-2 rounded-lg absolute bg-yellow-500 text-gray-100 text-xs font-medium">
              {toprated ? "Top Rated" : upcoming ? "Upcoming" : "Popular"}
            </div>
          </div>
          <div className="px-2 py-1">
            <Link to={`/movie/${movie.id}`}>
              <div className="text-sm md:text-base font-bold pr-2">
                {movie.original_title}
              </div>
            </Link>
            <div className="flex py-2">
              <div className="bg-gray-200 p-1 mr-2 rounded-full text-xs font-medium text-gray-900">
                {movie.release_date}
              </div>
              <div className="flex justify-between item-center">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 md:h-5 md:w-5 text-yellow-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>

                  <p className="text-gray-600 font-bold text-xs md:text-sm ml-1">
                    {movie.vote_average}

                    <span className="text-gray-500 font-normal">
                      {" "}
                      ({movie.vote_count} Vote Count)
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <p className="pb-1 md:pb-2 text-xs md:text-sm text-gray-500">
              {movie.overview.substring(0, 250)}..
            </p>

            {isAuthenticated ? (
              <button
                onClick={addToWatchList}
                disabled={loading ? true : false}
                className="flex items-center justify-center mx-auto p-2 pl-5 pr-5 bg-transparent border-2 border-zinc-800 text-zinc-800 text-sm rounded-lg focus:border-4 focus:border-green-300"
              >
                Add To Watch Later
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
  }
}

export default SingleItem;
