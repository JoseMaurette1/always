import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma"; // Assuming your Prisma client is located here

interface Set {
  weight: number;
  reps: number;
  exercise: string;
}

interface WorkoutRequest {
  userId: number; // You can set this based on the logged-in user
  workoutType: "upper" | "lower"; // Upper or lower workout type
  date: string; // You can generate or accept a date here
  sets: Set[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { userId, workoutType, date, sets }: WorkoutRequest = req.body;

    try {
      // Make sure to structure the sets correctly when creating the workout
      const workout = await prisma.workout.create({
        data: {
          userId,
          date,
          workoutType, // Add this if it's in your schema
          sets: {
            create: sets.map((set) => ({
              weight: set.weight,
              reps: set.reps,
            })),
          },
        },
        include: {
          sets: {
            create: sets.map((set) => ({
              weight: set.weight,
              reps: set.reps,
              exercise: set.exercise,
            })),
          },
        },
      });

      return res.status(201).json(workout);
    } catch (error) {
      console.error("Error saving workout:", error);
      return res.status(500).json({ error: "Failed to save workout" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
