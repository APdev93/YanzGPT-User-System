import express from "express";
import { Db } from "../utils/index.js";
const chat = express.Router();

const userDb = new Db("user.json");
const chatDb = (uid) => {
	let data = new Db("chat.json", uid);
	return data;
};

chat.post("/all", async (req, res) => {
	try {
		let { uid, token } = req.body;

		if (!uid || !token) {
			return res.status(404).json({ status: false, message: "Required Token and uid" });
		}

		let accountInfo = await userDb.getAccountInfo(token);

		if (accountInfo.status) {
			let chats = await chatDb(uid);
			if (chats) {
				let allData = await chats.getAllChats();

				if (allData.status) {
					return res.status(200).json(allData);
				} else {
					return res.status(404).json(allData);
				}
			} else {
				return res.status(500).json({ status: false, message: "Internal Server Error" });
			}
		} else {
			return res.status(404).json(accountInfo);
		}
	} catch (e) {
		console.error(e);
		res.status(500).json({ status: false, message: "Internal Server Error" });
	}
});

export default chat;
