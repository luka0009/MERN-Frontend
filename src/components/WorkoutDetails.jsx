import axios from "axios";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { RiChatDeleteLine } from "react-icons/ri";
import { formatDistanceToNow } from "date-fns";
import { useAuthContext } from "../hooks/useAuthcontext";

export default function WorkoutDetails({ workout }) {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      return;
    }
    const response = await axios.delete(
      `https://mern-app-a3em.onrender.com/api/workouts/${workout._id}`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    if (response.status >= 200 && response.status < 300) {
      dispatch({ type: "DELETE_WORKOUT", payload: response.data });
    }
  };

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Reps: </strong>
        {workout.reps}
      </p>
      <p style={{ marginTop: "8px" }}>
        Added{" "}
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <span onClick={handleClick}>
        Delete <RiChatDeleteLine className="icon" />{" "}
      </span>
    </div>
  );
}
