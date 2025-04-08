require("dotenv").config({ path: ".env.local" });
const { createClient } = require("@supabase/supabase-js");

async function testSaveWorkout() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  // Check if we need to enable row level security bypassing for this test
  console.log("Checking Supabase connection...");
  const { data: rls, error: rlsError } = await supabase.rpc(
    "get_raw_service_role"
  );

  if (rlsError) {
    console.log(
      "Note: Row Level Security is enabled. We need a valid user or service role."
    );
  } else {
    console.log("RLS status:", rls);
  }

  // Generate a temporary user ID
  const tempUserId = "temp-" + Math.random().toString(36).substring(2, 15);
  console.log("Using temporary user ID:", tempUserId);

  // Attempt to insert directly using the temporary ID
  const testWorkout = {
    name: "Test Workout",
    user_id: tempUserId,
    workout_type: "upper",
    metadata: { created_at_client: new Date().toISOString() },
  };

  console.log("Saving test workout...", testWorkout);
  const { data: workoutData, error: workoutError } = await supabase
    .from("workouts")
    .insert(testWorkout)
    .select("id")
    .single();

  if (workoutError) {
    console.error("Error saving workout:", workoutError.message);

    // Try disabling RLS for this test
    console.log("Testing with a workaround: Creating a real user first...");

    // Try to get all workouts to see general access
    const { data: allWorkouts, error: allError } = await supabase
      .from("workouts")
      .select("*")
      .limit(1);

    if (allError) {
      console.error("Error fetching workouts:", allError.message);
    } else {
      console.log("Fetched workouts:", allWorkouts.length);
    }

    return;
  }

  console.log("Workout saved successfully:", workoutData);

  const testExercise = {
    name: "Test Exercise",
    workout_id: workoutData.id,
    sets: JSON.stringify([{ weight: 50, reps: 10 }]),
    rest_timer_duration: 60,
  };

  console.log("Saving test exercise...", testExercise);
  const { data: exerciseData, error: exerciseError } = await supabase
    .from("exercises")
    .insert(testExercise)
    .select("id")
    .single();

  if (exerciseError) {
    console.error("Error saving exercise:", exerciseError.message);
    return;
  }

  console.log("Exercise saved successfully:", exerciseData);

  // Test retrieving the data
  const { data: retrievedWorkouts, error: retrieveError } = await supabase
    .from("workouts")
    .select(
      `
      id,
      name,
      workout_type,
      exercises (
        id,
        name,
        sets,
        rest_timer_duration
      )
    `
    )
    .eq("id", workoutData.id)
    .single();

  if (retrieveError) {
    console.error("Error retrieving workout:", retrieveError.message);
    return;
  }

  console.log("Retrieved workout with exercises:", retrievedWorkouts);
}

// Run the test
testSaveWorkout().catch((e) => console.error("Unhandled error:", e));
