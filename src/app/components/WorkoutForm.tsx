"use client";
import { useState } from "react";
import { upperWorkoutTemplate } from "./Upper";
import { lowerWorkoutTemplate } from "./Lower";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function WorkoutForm() {
  const [workoutType, setWorkoutType] = useState<"upper" | "lower" | null>(
    null
  );
  const [upperWorkout, setUpperWorkout] = useState(upperWorkoutTemplate);
  const [lowerWorkout, setLowerWorkout] = useState(lowerWorkoutTemplate);
  // const [isDone, setIsDone] = useState(false);
  // const [color, setColor] = useState("gray");

  const handleUpdateSet = (
    workout: typeof upperWorkout | typeof lowerWorkout,
    setWorkout: typeof setUpperWorkout | typeof setLowerWorkout,
    exerciseIndex: number,
    setIndex: number,
    key: "weight" | "reps",
    value: number
  ) => {
    const updatedWorkout = [...workout];
    updatedWorkout[exerciseIndex].sets[setIndex][key] = value;
    setWorkout(updatedWorkout);
  };
  const renderWorkout = (
    workout: typeof upperWorkout,
    setWorkout: typeof setUpperWorkout
  ) =>
    workout.map((exercise, exerciseIndex) => (
      <Card key={exercise.name} className="mb-4">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            {exercise.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {exercise.sets.map((set, setIndex) => (
            <div key={setIndex} className="flex items-center space-x-2 mb-2">
              <div className="flex flex-col">
                <label
                  htmlFor={`weight-${exerciseIndex}-${setIndex}`}
                  className="text-sm text-gray-600"
                >
                  Lbs
                </label>
                <Input
                  id={`weight-${exerciseIndex}-${setIndex}`}
                  type="number"
                  value={set.weight}
                  onChange={(e) =>
                    handleUpdateSet(
                      workout,
                      setWorkout,
                      exerciseIndex,
                      setIndex,
                      "weight",
                      parseFloat(e.target.value)
                    )
                  }
                  className="w-20"
                  placeholder="Weight"
                />
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor={`reps-${exerciseIndex}-${setIndex}`}
                  className="text-sm text-gray-600"
                >
                  Reps
                </label>
                <Input
                  id={`reps-${exerciseIndex}-${setIndex}`}
                  type="number"
                  value={set.reps}
                  onChange={(e) =>
                    handleUpdateSet(
                      workout,
                      setWorkout,
                      exerciseIndex,
                      setIndex,
                      "reps",
                      parseFloat(e.target.value)
                    )
                  }
                  className="w-20"
                  placeholder="Reps"
                />
              </div>

              <span className="text-sm text-gray-500">Set {setIndex + 1}</span>
              <div></div>
            </div>
          ))}
        </CardContent>
      </Card>
    ));

  const handleSaveWorkout = async () => {
    if (!workoutType) return;

    // Transform the nested exercise/sets structure to include exercise names
    const workoutData = {
      userId: 1, // Replace with actual user ID
      workoutType,
      date: new Date().toISOString(),
      sets:
        workoutType === "upper"
          ? upperWorkout.flatMap((exercise) =>
              exercise.sets.map((set) => ({
                ...set,
                exercise: exercise.name,
              }))
            )
          : lowerWorkout.flatMap((exercise) =>
              exercise.sets.map((set) => ({
                ...set,
                exercise: exercise.name,
              }))
            ),
    };

    try {
      const response = await fetch("/api/workout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(workoutData),
      });

      if (!response.ok) {
        throw new Error("Failed to save workout");
      }

      const result = await response.json();
      console.log("Workout saved successfully!", result);
      // You could add success notification here
      // Or reset the form
      // Or redirect to a workout summary page
    } catch (error) {
      console.error("Error saving workout:", error);
      // You could add error notification here
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-center space-x-4 mb-8">
        <Button
          onClick={() => setWorkoutType("upper")}
          variant={workoutType === "upper" ? "default" : "outline"}
        >
          Upper Workout
        </Button>
        <Button
          onClick={() => setWorkoutType("lower")}
          variant={workoutType === "lower" ? "default" : "outline"}
        >
          Lower Workout
        </Button>
      </div>

      {workoutType && (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              {workoutType === "upper" ? "Upper Workout" : "Lower Workout"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {workoutType === "upper" &&
              renderWorkout(upperWorkout, setUpperWorkout)}
            {workoutType === "lower" &&
              renderWorkout(lowerWorkout, setLowerWorkout)}
            <div className="flex justify-center mt-6">
              <Button onClick={handleSaveWorkout}>Save Workout</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
