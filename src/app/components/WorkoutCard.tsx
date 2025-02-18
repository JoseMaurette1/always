// components/WorkoutCard.tsx
"use client";

import React from "react";
import { House } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import WorkoutExercises from "./WorkoutExercises"; // Create this component

type WorkoutType = "upper" | "lower" | "other";

interface WorkoutCardProps {
  workoutType: WorkoutType;
  upperWorkout: any[]; // Replace any with your Workout type
  lowerWorkout: any[];
  otherWorkout: any[];
  setUpperWorkout: React.Dispatch<React.SetStateAction<any[]>>; // Replace any with your Workout type
  setLowerWorkout: React.Dispatch<React.SetStateAction<any[]>>;
  setOtherWorkout: React.Dispatch<React.SetStateAction<any[]>>;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({
  workoutType,
  upperWorkout,
  lowerWorkout,
  otherWorkout,
  setUpperWorkout,
  setLowerWorkout,
  setOtherWorkout,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center justify-between">
          {workoutType === "upper"
            ? "Upper Workout"
            : workoutType === "lower"
            ? "Lower Workout"
            : "Other Workout"}
          <Link href={"/"} className="flex items-center pr-2">
            <House />
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {workoutType === "upper" && (
          <WorkoutExercises
            workout={upperWorkout}
            setWorkout={setUpperWorkout}
            type="upper"
          />
        )}
        {workoutType === "lower" && (
          <WorkoutExercises
            workout={lowerWorkout}
            setWorkout={setLowerWorkout}
            type="lower"
          />
        )}
        {workoutType === "other" && (
          <WorkoutExercises
            workout={otherWorkout}
            setWorkout={setOtherWorkout}
            type="other"
          />
        )}
      </CardContent>
    </Card>
  );
};

export default WorkoutCard;
