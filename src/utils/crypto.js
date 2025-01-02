import crypto from "crypto";

export function randomBytes(size) {
	return crypto.randomBytes(size).toString("hex");
}

export function generateToken() {
	const bytes = crypto.randomBytes(32).toString("hex");
	const raw = "ygpt-xxx-xxxx-xxxx-xxxxx-xxxxx-xxxxx-xxxx-xx";
	const generated = raw.replace(/x/g, (match, index) => bytes[index] || "0");

	return generated;
}


