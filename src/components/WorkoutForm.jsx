import { useState } from "react";
import axios from "axios";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

export default function WorkoutForm() {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState(0);
  const [reps, setReps] = useState(0);
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }
    const workout = { title, load, reps };
    try {
      const response = await axios.post(
        "http://localhost:4000/api/workouts",
        JSON.stringify(workout),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (response.status >= 200 && response.status < 300) {
        setTitle("");
        setLoad(0);
        setReps(0);
        setError(null);
        setEmptyFields([]);
        dispatch({ type: "CREATE_WORKOUT", payload: response.data });
        console.log("new workout added", response.data);
      } else {
        setError(response.statusText);
        setEmptyFields(response.data.emptyFields);
      }
    } catch (error) {
      if (error.response) {
        console.log(error);
        console.log(error.response);
        const { data } = error.response;
        setError(data.error);
        setEmptyFields(data.emptyFields);
      }
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a new workout</h3>

      <label> Excersize title: </label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes("title") ? "error" : ""}
      />

      <label> Load (in kG): </label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className={emptyFields.includes("load") ? "error" : ""}
      />

      <label> Reps: </label>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={emptyFields.includes("reps") ? "error" : ""}
      />

      <button>Add a workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}
