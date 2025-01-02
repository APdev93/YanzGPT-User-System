import express from "express";

const chat = express.Router();

chat.get("/:id", (req, res) => {
	let id = req.params.id;

	res.send(id);
});

export default chat;
