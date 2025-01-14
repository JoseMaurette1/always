import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface Set {
  reps: number;
  weight: number;
}

interface WorkoutRequest {
  userId: number;
  date: string;
  sets: Set[];
}

export async function POST(req: NextRequest) {
  const { userId, date, sets }: WorkoutRequest = await req.json();

  try {
    const workout = await prisma.workout.create({
      data: {
        userId,
        date,
        sets: {
          create: sets.map((set) => ({
            weight: set.weight,
            reps: set.reps,
          })),
        },
      },
    });

    return NextResponse.json(workout, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to log workout" },
      { status: 500 }
    );
  }
}
