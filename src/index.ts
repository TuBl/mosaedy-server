import app from "./app";
import http from "http";

const port = process.env.PORT || 5001;

http.createServer(app).listen(port, () => {
	/* eslint-disable no-console */
	console.log(`Listening: http://localhost:${port}`);
	/* eslint-enable no-console */
});
