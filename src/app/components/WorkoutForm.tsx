"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  Download,
  History,
  BicepsFlexed,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { upperWorkoutTemplate } from "./Upper";
import { lowerWorkoutTemplate } from "./Lower";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function WorkoutForm() {
  const [workoutType, setWorkoutType] = useState<"upper" | "lower" | null>(
    null
  );

  const loadWorkout = (type: "upper" | "lower") => {
    const storedWorkout = localStorage.getItem(`${type}Workout`);
    return storedWorkout
      ? JSON.parse(storedWorkout)
      : type === "upper"
      ? upperWorkoutTemplate
      : lowerWorkoutTemplate;
  };

  const [upperWorkout, setUpperWorkout] = useState(loadWorkout("upper"));
  const [lowerWorkout, setLowerWorkout] = useState(loadWorkout("lower"));

  const saveWorkout = (type: "upper" | "lower", data: any) => {
    const savedWorkouts = JSON.parse(
      localStorage.getItem(`${type}WorkoutHistory`) || "[]"
    );

    const workoutWithDate = {
      date: new Date().toISOString(), // Store the current date in ISO format
      exercises: data,
    };

    savedWorkouts.push(workoutWithDate);
    localStorage.setItem(
      `${type}WorkoutHistory`,
      JSON.stringify(savedWorkouts)
    );
  };

  const handleUpdateSet = (
    workout: typeof upperWorkout | typeof lowerWorkout,
    setWorkout: React.Dispatch<React.SetStateAction<typeof workout>>,
    type: "upper" | "lower",
    exerciseIndex: number,
    setIndex: number,
    key: "weight" | "reps",
    value: number
  ) => {
    setWorkout((prevWorkout: any) => {
      const updatedWorkout = prevWorkout.map((exercise: any, i: any) =>
        i === exerciseIndex
          ? {
              ...exercise,
              sets: exercise.sets.map((set: any, j: any) =>
                j === setIndex ? { ...set, [key]: value } : set
              ),
            }
          : exercise
      );

      saveWorkout(type, updatedWorkout);
      return updatedWorkout;
    });
  };

  const renderWorkout = (
    workout: typeof upperWorkout,
    setWorkout: typeof setUpperWorkout,
    type: "upper" | "lower"
  ) =>
    workout.map((exercise: any, exerciseIndex: any) => (
      <Card key={exercise.name} className="mb-4">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            {exercise.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {exercise.sets.map((set: any, setIndex: any) => (
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
                  value={set.weight ?? ""}
                  onChange={(e) => {
                    const newValue = e.target.value
                      ? parseFloat(e.target.value)
                      : 0; // Ensure a valid number
                    handleUpdateSet(
                      workout,
                      setWorkout,
                      "upper", // or "lower" dynamically
                      exerciseIndex,
                      setIndex,
                      "weight",
                      newValue
                    );
                  }}
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
                  value={set.reps ?? ""}
                  onChange={(e) => {
                    const newValue = e.target.value
                      ? parseInt(e.target.value, 10)
                      : 0; // Ensure a valid number
                    handleUpdateSet(
                      workout,
                      setWorkout,
                      "upper", // or "lower" dynamically
                      exerciseIndex,
                      setIndex,
                      "reps",
                      newValue
                    );
                  }}
                  className="w-20"
                  placeholder="Reps"
                />
              </div>

              <span className="text-sm text-gray-500">Set {setIndex + 1}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    ));

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
              renderWorkout(upperWorkout, setUpperWorkout, "upper")}
            {workoutType === "lower" &&
              renderWorkout(lowerWorkout, setLowerWorkout, "lower")}
            <div className="flex space-x-4 justify-center mt-6">
              <Button
                className="w-24"
                onClick={() => {
                  toast.success("Workout Has Been Saved", {
                    action: {
                      label: "Undo",
                      onClick: () => {
                        toast("Workout Has Been Deleted", {
                          duration: 2000,
                        });
                      },
                    },
                  });
                }}
              >
                Save <Download />
              </Button>
              <Link href={"/History"}>
                <Button>
                  Workout History <History />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
