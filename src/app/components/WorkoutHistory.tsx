"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function WorkoutHistory() {
  const [upperWorkoutHistory, setUpperWorkoutHistory] = useState([]);
  const [lowerWorkoutHistory, setLowerWorkoutHistory] = useState([]);

  useEffect(() => {
    // Load workout history from localStorage
    const storedUpper = localStorage.getItem("upperWorkoutHistory");
    const storedLower = localStorage.getItem("lowerWorkoutHistory");

    if (storedUpper) setUpperWorkoutHistory(JSON.parse(storedUpper));
    if (storedLower) setLowerWorkoutHistory(JSON.parse(storedLower));
  }, []);

  const renderWorkout = (workoutHistory: any, title: string) => (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {workoutHistory.length > 0 ? (
          workoutHistory.map((entry: any, index: number) => (
            <div key={index} className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700">
                {new Date(entry.date).toLocaleDateString()}{" "}
                {/* Convert ISO to readable format */}
              </h3>
              {entry.exercises.map((exercise: any, exerciseIndex: number) => (
                <div key={exerciseIndex} className="mb-4">
                  <h2 className="text-lg font-semibold">{exercise.name}</h2>
                  {exercise.sets.map((set: any, setIndex: number) => (
                    <div key={setIndex} className="flex items-center space-x-4">
                      <span>Set {setIndex + 1}:</span>
                      <span>{set.weight} lbs |</span>
                      <span>{set.reps} reps</span>
                    </div>
                  ))}
                </div>
              ))}
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
      <h1 className="text-3xl font-bold mb-6">Workout History</h1>
      {renderWorkout(upperWorkoutHistory, "Upper Workout History")}
      {renderWorkout(lowerWorkoutHistory, "Lower Workout History")}
    </div>
  );
}
