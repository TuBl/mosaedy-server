import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import ServerlessHttp from "serverless-http";

import * as middlewares from "./middlewares";
import api from "./api";
import MessageResponse from "./interfaces/MessageResponse";

if (process.env.NODE_ENV !== "production") {
	console.log("here");
	dotenv.config({ path: ".env.local" });
}

// require("dotenv").config();

// initialize app
const app = express();
// plugins
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get<{}, MessageResponse>("/", (req, res) => {
	res.json({
		message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄",
	});
});

app.use("/api/v1", api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);
console.log(process.env.NODE_ENV);

// export default app;

export default process.env.NODE_ENV === "production"
	? (module.exports.server = ServerlessHttp(app))
	: app;
