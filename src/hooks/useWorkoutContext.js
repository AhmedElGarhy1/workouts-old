import { useContext } from "react";
import { WorkoutContext } from "../Context/WorkoutContext";

export const useWorkoutContext = () => {
  const context = useContext(WorkoutContext);
  if (!context) {
    return Error("You Must Use this Hook inside the WorkoutContextProvider");
  }
  return context;
};
