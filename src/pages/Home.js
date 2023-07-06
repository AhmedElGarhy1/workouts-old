import React, { useEffect } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { useAuthContext } from "../hooks/useAuthContext";

const baseURL = "https://multi-backend-production.up.railway.app";
const url = baseURL + "/api/workouts/";

const Home = () => {
  const { user } = useAuthContext();

  const { workouts, dispatch } = useWorkoutContext();

  useEffect(() => {
    if (!user || !user.token) return;
    fetch(url, {
      headers: {
        Authorization: "Bearer " + user.token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "SET_WORKOUTS", preload: data });
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch, user]);

  return (
    <div>
      <h2>Home</h2>
      <div className="home">
        <div className="workouts">
          {workouts &&
            workouts.length > 0 &&
            workouts.map((workout) => (
              <WorkoutDetails url={url} key={workout._id} workout={workout} />
            ))}
        </div>
        <WorkoutForm url={url} />
      </div>
    </div>
  );
};

export default Home;
