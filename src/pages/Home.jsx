import React, { useEffect, useState } from "react";
import axios from "axios";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthcontext";

export default function Home() {
  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(true);
  console.log('isLoading',isLoading);
  useEffect(() => {

    const fetchWorkouts = async () => {
      setIsLoading(true);
      const response = await axios("https://mern-app-a3em.onrender.com/api/workouts", {
        headers: {
          'Authorization': `Bearer ${user.token}` 
        }
      });

      if (response.status === 200) {
        dispatch({ type: "SET_WORKOUTS", payload: response.data });
        console.log(response.data);
        setIsLoading(false);
      }
    };
    if (user) {
      fetchWorkouts();
    }
  }, [dispatch, user]);

  return (
    <div className="home">
      {isLoading ? <div className="loading-button"> </div> : (<div className="workouts">
        {workouts.length > 0 ? (workouts.map((workout) => {
          return <WorkoutDetails key={workout._id} workout={workout} />;
        })) : <p style={{textAlign: 'center', fontSize: '40px', color: 'black'}}>No workouts added yet</p>}
      </div>)}
      <WorkoutForm />
    </div>
  );
}
