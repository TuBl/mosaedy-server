import { Configuration, OpenAIApi } from "openai";

import express from "express";

import supabase from "@/lib/supabaseClient";

import { User } from "@supabase/supabase-js";

const router = express.Router();

const OPENAI_API_KEY = "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";
const config = new Configuration({
	apiKey: process.env.OPENAI_API_KEY
		? process.env.OPENAI_API_KEY
		: OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

interface CreateCompletionResponseData {
	id: string;
	object: string;
	created: number;
	model: string;
	choices: any[];
}

type SupabaseSession = {
	access_token: string;
	expires_at: number;
	expires_in: number;
	refresh_token: string;
	token_type: string;
	user: User;
};

router.post("/", async (req, res) => {
	const { prompt, session }: { prompt: string; session: SupabaseSession } =
		req.body;

	if (!prompt) {
		res.status(422).send("A prompt was not provided! request aborted");
	}

	if (!session) {
		res.status(403).send("No session found, user must be authenticated!");
	}

	const user = await supabase.auth.getUser(session.access_token);

	if (!user) {
		res.status(403).send("Unauthorized! User not found.");
	}

	try {
		const response = await openai.createCompletion({
			model: "text-davinci-003",
			prompt,
			max_tokens: 2048,
			temperature: 0,
		});

		if (response.data) {
			const data = response.data;
			const responseData: CreateCompletionResponseData = {
				id: data.id,
				object: data.object,
				created: data.created,
				model: data.model,
				choices: data.choices,
			};
			res.status(200).json(responseData);
		} else {
			// If the response didn't contain any data, send a 500 status and a message.
			res.status(500).send("Error: No data received from OpenAI API.");
		}
	} catch (error) {
		console.error(error);
		res.status(500).send(
			"Server error: Failed to fetch data from OpenAI API."
		);
	}
});

export default router;
