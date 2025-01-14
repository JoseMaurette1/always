import { useState } from "react";

interface Set {
  weight: string;
  reps: string;
}

export default function WorkoutForm() {
  const [date, setDate] = useState<string>("");
  const [sets, setSets] = useState<Set[]>([{ weight: "", reps: "" }]);

  const handleAddSet = () => {
    setSets([...sets, { weight: "", reps: "" }]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const workoutData = {
      userId: 1,
      date,
      sets: sets.map((set) => ({
        weight: parseFloat(set.weight),
        reps: parseInt(set.reps),
      })),
    };

    const res = await fetch("/api/workouts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(workoutData),
    });

    if (res.ok) {
      alert("Workout logged successfully!");
    } else {
      alert("Failed to log workout");
    }
  };

  return <>Add Workout Form Here</>;
}
