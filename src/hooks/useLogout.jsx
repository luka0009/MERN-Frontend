import { useAuthContext } from "./useAuthcontext";
import { useWorkoutsContext } from "./useWorkoutsContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: setWorkouts } = useWorkoutsContext();

  const logOut = () => {
    localStorage.removeItem("user");

    dispatch({ type: "LOGOUT" });
    setWorkouts({type: 'SET_WORKOUTS', payload: []});
  };

  return { logOut };
};
