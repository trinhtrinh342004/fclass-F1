#!/usr/bin/env node
import { assertSupabaseClientEnv, loadLocalEnv } from "./env-utils.mjs";

loadLocalEnv();
assertSupabaseClientEnv();
console.log("Supabase env hợp lệ cho Vite client.");
