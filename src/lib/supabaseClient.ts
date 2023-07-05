import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://qzxrmyqrscgihctyzzba.supabase.co";
const SUPABASE_ANON_KEY =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6eHJteXFyc2NnaWhjdHl6emJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzkwMDY3ODMsImV4cCI6MTk5NDU4Mjc4M30.Zl28R1xg5rGIQo83RMlQoDG5pt9KFwEypPW26hM-hks";

// supabase
const supabase = createClient(
	process.env.SUPABASE_URL ? process.env.SUPABASE_URL : SUPABASE_URL,
	process.env.SUPABASE_ANON_KEY
		? process.env.SUPABASE_ANON_KEY
		: SUPABASE_ANON_KEY
);

export default supabase;
