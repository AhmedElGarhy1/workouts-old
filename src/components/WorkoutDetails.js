import React from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { formatDistanceToNow } from "date-fns";
const WorkoutDetails = ({ workout, url }) => {
  const { dispatch } = useWorkoutContext();

  const handleDelete = async () => {
    const response = await fetch(url + workout._id, {
      method: "DELETE",
    });
    const json = await response.json();
    dispatch({ type: "DELETE_WORKOUT", preload: json });
  };
  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg): </strong>
        {workout.loads}
      </p>
      <p>
        <strong>Reps : </strong>
        {workout.reps}
      </p>
      <p>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <span className="material-symbols-outlined" onClick={handleDelete}>
        delete
      </span>
    </div>
  );
};

export default WorkoutDetails;
