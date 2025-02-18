// components/SaveWorkoutButton.tsx
"use client";

import React from "react";
import { Download, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type WorkoutType = "upper" | "lower" | "other";

interface SaveWorkoutButtonProps {
  workoutType: WorkoutType | null;
  upperWorkout: any[]; // Replace any with your Workout type
  lowerWorkout: any[];
  otherWorkout: any[];
}

const SaveWorkoutButton: React.FC<SaveWorkoutButtonProps> = ({
  workoutType,
  upperWorkout,
  lowerWorkout,
  otherWorkout,
}) => {
  const router = useRouter();

  const saveWorkout = (data: any[]) => {
    // Replace any[] with your Workout type
    const savedWorkouts: { date: string; exercises: any[] }[] = JSON.parse(
      // Replace any[] with your Workout type
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

  return (
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
  );
};

export default SaveWorkoutButton;
