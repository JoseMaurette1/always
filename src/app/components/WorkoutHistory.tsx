"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

interface Set {
  weight: number;
  reps: number;
}

interface Exercise {
  name: string;
  sets: Set[];
}

interface WorkoutEntry {
  date: string; // ISO date string
  exercises: Exercise[];
}

export default function WorkoutHistory() {
  const [upperWorkoutHistory, setUpperWorkoutHistory] = useState<
    WorkoutEntry[]
  >([]);
  const [lowerWorkoutHistory, setLowerWorkoutHistory] = useState<
    WorkoutEntry[]
  >([]);
  const [otherWorkoutHistory, setOtherWorkoutHistory] = useState<
    WorkoutEntry[]
  >([]);

  useEffect(() => {
    // Load workout history from localStorage
    const storedUpper = localStorage.getItem("upperWorkoutHistory");
    const storedLower = localStorage.getItem("lowerWorkoutHistory");
    const storedOther = localStorage.getItem("otherWorkoutHistory");

    if (storedUpper) {
      const parsedUpper = JSON.parse(storedUpper) as WorkoutEntry[];
      setUpperWorkoutHistory(sortWorkouts(parsedUpper));
    }
    if (storedLower) {
      const parsedLower = JSON.parse(storedLower) as WorkoutEntry[];
      setLowerWorkoutHistory(sortWorkouts(parsedLower));
    }
    if (storedOther) {
      const parsedOther = JSON.parse(storedOther) as WorkoutEntry[];
      setOtherWorkoutHistory(sortWorkouts(parsedOther));
    }
  }, []);

  const sortWorkouts = (workoutHistory: WorkoutEntry[]): WorkoutEntry[] => {
    return [...workoutHistory].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  };

  const clearHistory = (type: "upper" | "lower" | "other") => {
    if (type === "upper") {
      localStorage.removeItem("upperWorkoutHistory");
      setUpperWorkoutHistory([]);
    } else if (type === "lower") {
      localStorage.removeItem("lowerWorkoutHistory");
      setLowerWorkoutHistory([]);
    }
    if (type === "other") {
      localStorage.removeItem("otherWorkoutHistory");
      setOtherWorkoutHistory([]);
    }
  };

  const renderWorkout = (
    workoutHistory: WorkoutEntry[],
    title: string,
    type: "upper" | "lower" | "other"
  ) => (
    <Card className="mb-4">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        <Button onClick={() => clearHistory(type)}>Clear History</Button>
      </CardHeader>
      <CardContent>
        {workoutHistory.length > 0 ? (
          workoutHistory.map((entry: WorkoutEntry, index: number) => (
            <div key={index} className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700">
                {new Date(entry.date).toLocaleDateString()}
              </h3>
              {entry.exercises.map(
                (exercise: Exercise, exerciseIndex: number) => (
                  <div key={exerciseIndex} className="mb-4">
                    <h2 className="text-lg font-semibold">{exercise.name}</h2>
                    {exercise.sets.map((set: Set, setIndex: number) => (
                      <div
                        key={setIndex}
                        className="flex items-center space-x-4"
                      >
                        <span>Set {setIndex + 1}:</span>
                        <span>{set.weight} lbs |</span>
                        <span>{set.reps} reps</span>
                      </div>
                    ))}
                  </div>
                )
              )}
            </div>
          ))
        ) : (
          <p>No data available</p>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <Link href={"/workouts"}>
          <ArrowLeft className="mr-2" />
        </Link>
        Workout History
      </h1>
      {renderWorkout(upperWorkoutHistory, "Upper Workout History", "upper")}
      {renderWorkout(lowerWorkoutHistory, "Lower Workout History", "lower")}
      {renderWorkout(otherWorkoutHistory, "Other Workout History", "other")}
    </div>
  );
}
