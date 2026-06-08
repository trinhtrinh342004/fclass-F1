import { subscribeToTable, unsubscribe } from "../../lib/supabase/realtime.js";

export function subscribeToStudents(callback){
  return subscribeToTable({
    table: "profiles",
    callback,
  });
}

export { unsubscribe };
