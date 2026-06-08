import { subscribeToTable, unsubscribe } from "../../lib/supabase/realtime.js";

export function subscribeToLessons(callback){
  return subscribeToTable({
    table: "lessons",
    callback,
  });
}

export { unsubscribe };
