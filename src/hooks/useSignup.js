import { useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

const baseURL = "https://multi-backend-production.up.railway.app";

const useSignup = () => {
  const { dispatch } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  const signup = async (username, email, password) => {
    setIsLoading(true);
    setIsError(null);
    const response = await fetch(baseURL + "/api/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });
    const json = await response.json();
    if (!response.ok) {
      setIsError(json.msg);
    } else {
      dispatch({ type: "LOGIN", payload: json });
    }
    setIsLoading(false);
  };
  return { signup, isError, isLoading };
};

export default useSignup;
