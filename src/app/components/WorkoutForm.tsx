"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Download, History, CheckCircle, Timer } from "lucide-react";
import { upperWorkoutTemplate } from "./Upper";
import { lowerWorkoutTemplate } from "./Lower";
import { OtherWorkoutTemplate } from "./Other";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type WorkoutType = "upper" | "lower" | "other";

type Set = {
  weight: number;
  reps: number;
  completed?: boolean;
};

type Exercise = {
  name: string;
  sets: Set[];
  restTimerDuration?: number; // Duration in seconds
  restTimerRunning?: boolean;
  restTimerStartTime?: number | null;
  restTimerElapsedTime?: number;
};

type Workout = Exercise[];

const restOptions = [30, 60, 90, 120, 150, 180];

export default function WorkoutForm() {
  const [workoutType, setWorkoutType] = useState<WorkoutType | null>(null);
  const [upperWorkout, setUpperWorkout] = useState<Workout>([]);
  const [lowerWorkout, setLowerWorkout] = useState<Workout>([]);
  const [otherWorkout, setOtherWorkout] = useState<Workout>([]);
  const router = useRouter();

  useEffect(() => {
    const loadWorkout = (type: WorkoutType): Workout => {
      const storedWorkout = localStorage.getItem(`${type}Workout`);
      const parsedWorkout = storedWorkout
        ? (JSON.parse(storedWorkout) as Workout)
        : type === "upper"
        ? upperWorkoutTemplate
        : type === "lower"
        ? lowerWorkoutTemplate
        : OtherWorkoutTemplate;

      // Initialize rest timer properties for each exercise
      return parsedWorkout.map((exercise) => ({
        ...exercise,
        restTimerDuration: exercise.restTimerDuration || 60, // Default to 60 seconds
        restTimerRunning: exercise.restTimerRunning || false,
        restTimerStartTime: exercise.restTimerStartTime || null,
        restTimerElapsedTime: exercise.restTimerElapsedTime || 0,
      }));
    };

    setUpperWorkout(loadWorkout("upper"));
    setLowerWorkout(loadWorkout("lower"));
    setOtherWorkout(loadWorkout("other"));
  }, []);

  useEffect(() => {
    const tick = () => {
      setUpperWorkout((prevWorkout) => updateTimers(prevWorkout, "upper"));
      setLowerWorkout((prevWorkout) => updateTimers(prevWorkout, "lower"));
      setOtherWorkout((prevWorkout) => updateTimers(prevWorkout, "other"));
    };

    const intervalId = setInterval(tick, 10); // Update every 10 ms

    return () => clearInterval(intervalId);
  }, []);

  const updateTimers = (workout: Workout, type: WorkoutType): Workout => {
    return workout.map((exercise) => {
      if (exercise.restTimerRunning && exercise.restTimerStartTime) {
        const elapsedTime = Date.now() - exercise.restTimerStartTime;
        if (elapsedTime >= (exercise.restTimerDuration || 60) * 1000) {
          // Timer finished
          return {
            ...exercise,
            restTimerRunning: false,
            restTimerElapsedTime: (exercise.restTimerDuration || 60) * 1000,
          };
        } else {
          return {
            ...exercise,
            restTimerElapsedTime: elapsedTime,
          };
        }
      }
      return exercise;
    });
  };

  const saveWorkout = (data: Workout) => {
    const savedWorkouts: { date: string; exercises: Workout }[] = JSON.parse(
      localStorage.getItem(`${workoutType}WorkoutHistory`) || "[]"
    );

    const workoutWithDate = {
      date: new Date().toISOString(),
      exercises: data,
    };

    savedWorkouts.push(workoutWithDate);
    localStorage.setItem(
      `${workoutType}WorkoutHistory`,
      JSON.stringify(savedWorkouts)
    );
  };

  const handleUpdateSet = (
    workout: Workout,
    setWorkout: React.Dispatch<React.SetStateAction<Workout>>,
    type: WorkoutType,
    exerciseIndex: number,
    setIndex: number,
    key: keyof Set,
    value: number
  ) => {
    setWorkout((prevWorkout) => {
      const updatedWorkout = prevWorkout.map((exercise, i) =>
        i === exerciseIndex
          ? {
              ...exercise,
              sets: exercise.sets.map((set, j) =>
                j === setIndex ? { ...set, [key]: value } : set
              ),
            }
          : exercise
      );

      localStorage.setItem(`${type}Workout`, JSON.stringify(updatedWorkout));
      return updatedWorkout;
    });
  };

  const handleSetCompletion = (
    workout: Workout,
    setWorkout: React.Dispatch<React.SetStateAction<Workout>>,
    type: WorkoutType,
    exerciseIndex: number
  ) => {
    setWorkout((prevWorkout) => {
      const updatedWorkout = prevWorkout.map((exercise, i) => {
        if (i === exerciseIndex) {
          // Start timer when set is completed
          const updatedExercise = {
            ...exercise,
            restTimerRunning: true,
            restTimerStartTime: Date.now(),
            restTimerElapsedTime: 0,
          };
          return updatedExercise;
        } else {
          return exercise;
        }
      });

      localStorage.setItem(`${type}Workout`, JSON.stringify(updatedWorkout));
      return updatedWorkout;
    });
  };

  const handleRestTimerSelect = (
    workout: Workout,
    setWorkout: React.Dispatch<React.SetStateAction<Workout>>,
    type: WorkoutType,
    exerciseIndex: number,
    duration: number
  ) => {
    setWorkout((prevWorkout) => {
      const updatedWorkout = prevWorkout.map((exercise, i) =>
        i === exerciseIndex
          ? {
              ...exercise,
              restTimerDuration: duration,
            }
          : exercise
      );

      localStorage.setItem(`${type}Workout`, JSON.stringify(updatedWorkout));
      return updatedWorkout;
    });
  };

  const formatTime = (ms: number) => {
    const totalSeconds = Math.ceil(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const renderWorkout = (
    workout: Workout,
    setWorkout: React.Dispatch<React.SetStateAction<Workout>>,
    type: WorkoutType
  ) =>
    workout.map((exercise, exerciseIndex) => (
      <Card key={exercise.name} className="mb-4">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">
              {exercise.name}
            </CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  Rest: {exercise.restTimerDuration}s
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                {restOptions.map((option) => (
                  <DropdownMenuItem
                    key={option}
                    onClick={() =>
                      handleRestTimerSelect(
                        workout,
                        setWorkout,
                        type,
                        exerciseIndex,
                        option
                      )
                    }
                  >
                    {option} seconds
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <div>
              <Timer
                className={
                  exercise.restTimerRunning ? "text-green-500" : "text-gray-500"
                }
              />
              <span>{formatTime(exercise.restTimerElapsedTime || 0)}</span>
            </div>
          </div>
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
                  value={set.weight ?? ""}
                  onChange={(e) => {
                    const newValue = e.target.value
                      ? parseFloat(e.target.value)
                      : 0;
                    handleUpdateSet(
                      workout,
                      setWorkout,
                      type,
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
                      : 0;
                    handleUpdateSet(
                      workout,
                      setWorkout,
                      type,
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
              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  handleSetCompletion(workout, setWorkout, type, exerciseIndex)
                }
              >
                {set.completed ? (
                  <CheckCircle className="text-green-500" />
                ) : (
                  <CheckCircle className="text-gray-300" />
                )}
              </Button>
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
        <Button
          onClick={() => setWorkoutType("other")}
          variant={workoutType === "other" ? "default" : "outline"}
        >
          Other Workout
        </Button>
      </div>

      {workoutType && (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              {workoutType === "upper"
                ? "Upper Workout"
                : workoutType === "lower"
                ? "Lower Workout"
                : "Other Workout"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {workoutType === "upper" &&
              renderWorkout(upperWorkout, setUpperWorkout, "upper")}
            {workoutType === "lower" &&
              renderWorkout(lowerWorkout, setLowerWorkout, "lower")}
            {workoutType === "other" &&
              renderWorkout(otherWorkout, setOtherWorkout, "other")}
            <div className="flex space-x-4 justify-center mt-6">
              <Button
                className="w-24"
                onClick={() => {
                  saveWorkout(
                    workoutType === "upper"
                      ? upperWorkout
                      : workoutType === "lower"
                      ? lowerWorkout
                      : otherWorkout
                  );
                  toast.success("Workout Has Been Saved", {
                    action: {
                      label: "Go",
                      onClick: () => {
                        toast("Routing to History...", { duration: 10 });
                        router.push("/History");
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
