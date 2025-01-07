import express from "express";

import { Db, randomBytes, generateToken, logger } from "../utils/index.js";

const auth = express.Router();
const db = new Db("user.json");

auth.post("/register", async (req, res) => {
	try {
		let { username, whatsapp, password } = req.body;
		if (!username || !whatsapp || !password) {
			return res.status(403).json({ status: false, message: "Data harus di isi" });
		}
		let data = {
			id: randomBytes(16),
			username: username,
			whatsapp: whatsapp,
			password: password,
			token: generateToken(),
			config: {
				system_prompt: ""
			}
		};

		let registeredUsers = await db.registerUsers(data);
		if (registeredUsers.status) {
			res.status(200).json(registeredUsers);
		} else {
			res.status(409).json(registeredUsers);
		}
	} catch (err) {
		logger.error(`Error: ${err}`);
		res.status(500).json({ status: false, message: "Internal Server Error" });
	}
});

auth.post("/get_info", async (req, res) => {
	let { token } = req.body;
	if (!token) {
		return res.status(403).json({ status: false, message: "Data harus di isi" });
	}
	try {
		let info = await db.getAccountInfo(token);

		if (loggedin.status) {
			res.status(200).json(info);
		} else {
			res.status(404).json(info);
		}
	} catch (err) {
		logger.error(`Error: ${err}`);
		res.status(500).json({ status: false, message: "Internal Server Error" });
	}
});

auth.post("/login", async (req, res) => {
	let { username, password } = req.body;
	if (!username || !password) {
		return res.status(403).json({ status: false, message: "Data harus di isi" });
	}
	try {
		let loggedin = await db.loginUsers({ username, password });

		if (loggedin.status) {
			res.status(200).json(loggedin);
		} else {
			res.status(404).json(loggedin);
		}
	} catch (err) {
		logger.error(`Error: ${err}`);
		res.status(500).json({ status: false, message: "Internal Server Error" });
	}
});

export default auth;
