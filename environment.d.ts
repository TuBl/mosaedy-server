declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: "development" | "production";
			PORT?: string;
			PWD?: string;
			OPENAI_API_KEY: string;
			SUPABASE_URL: string;
			SUPABASE_ANON_KEY: string;
		}
	}
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
