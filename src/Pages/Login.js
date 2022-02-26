import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase-config";
import { useNavigate } from "react-router-dom";

function Login({ setIsAuthenticated }) {
  let navigate = useNavigate();

  const signInWithGoogleFunction = async () => {
    try {
      await signInWithPopup(auth, provider);
      localStorage.setItem("isAuthenticated", true);
      setIsAuthenticated(true);
      navigate("/");
    } catch (Err) {
      alert(Err);
    }
  };
  return (
    <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-center text-indigo-600 sm:text-3xl">
          Get started today
        </h1>

        <p className="max-w-md mx-auto mt-4 text-center text-gray-500">
          Watch Later is a website where you can keep track of popular movies,
          top rated movies and upcoming movies. It also gives the option to show
          a movie in detail by clicking in the movie title in each movie with
          some similiar movie suggestions. We can also login using the google
          account and add a movie to the watch later list and remove it from the
          list too. It is created to keep track of movies which we may love to
          watch later.
        </p>
        <p className="max-w-md mx-auto mt-4 text-center text-gray-500">
          Nb: We Will Not Share Your Details With Any One.
        </p>
        <div className="max-w-xl mx-auto mb-0 space-y-4 pt-6">
          <button
            className="block w-full px-5 py-3 text-sm font-medium text-white bg-indigo-600 rounded-lg"
            onClick={signInWithGoogleFunction}
          >
            Sign in With Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
