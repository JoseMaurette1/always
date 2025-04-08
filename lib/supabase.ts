import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      workouts: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          user_id: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          name: string;
          user_id: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          name?: string;
          user_id?: string;
        };
      };
      exercises: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          sets: number;
          reps: number;
          weight: number;
          workout_id: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          name: string;
          sets: number;
          reps: number;
          weight: number;
          workout_id: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          name?: string;
          sets?: number;
          reps?: number;
          weight?: number;
          workout_id?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
