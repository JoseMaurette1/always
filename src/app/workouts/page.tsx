"use client";
import { useEffect, useState } from "react";

interface Set {
  weight: number;
  reps: number;
}

interface Workout {
  id: number;
  date: string;
  sets: Set[];
}

export default function Workouts() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const res = await fetch("/api/workouts");
      const data = await res.json();
      setWorkouts(data);
    };

    fetchWorkouts();
  }, []);

  return (
    <div>
      <h1>My Workouts</h1>
      {workouts.map((workout) => (
        <div key={workout.id}>
          <h3>{new Date(workout.date).toLocaleDateString()}</h3>
          <ul>
            {workout.sets.map((set, index) => (
              <li key={index}>
                Weight: {set.weight} lbs, Reps: {set.reps}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
