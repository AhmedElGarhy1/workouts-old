import React, { useState } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutForm = ({ url }) => {
  const { dispatch } = useWorkoutContext();
  const { user } = useAuthContext();

  const [title, setTitle] = useState("");
  const [reps, setReps] = useState("");
  const [loads, setLoads] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !user.token) return;

    const data = { title, reps, loads };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.token,
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    console.log(json);
    if (response.ok) {
      setTitle("");
      setReps("");
      setLoads("");
      setError(null);
      dispatch({ type: "ADD_WORKOUT", preload: json });
    } else {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>
      <label>Exercise Title: </label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        className={emptyFields.includes("title") ? "error" : ""}
        value={title}
      />
      <label>Loads (in kg): </label>
      <input
        type="text"
        onChange={(e) => setLoads(e.target.value)}
        className={emptyFields.includes("loads") ? "error" : ""}
        value={loads}
      />
      <label>Reps: </label>
      <input
        type="text"
        onChange={(e) => setReps(e.target.value)}
        className={emptyFields.includes("reps") ? "error" : ""}
        value={reps}
      />
      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
