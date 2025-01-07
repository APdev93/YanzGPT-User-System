import fs from "fs";
const root = process.cwd();

export class Db {
	constructor(file, uid = "") {
		if (!uid) {
			this.base_db = `${root}/database/`;
			this.db = this.base_db + file;
		} else {
			this.base_db = `${root}/database/chats/${uid}/`;
			this.db = this.base_db + file;
		}
	}

	message(status, msg, data) {
		return {
			status: status,
			message: msg,
			data: data
		};
	}

	read() {
		return JSON.parse(fs.readFileSync(this.db));
	}

	writeUser(data) {
		try {
			let writtenData = fs.writeFileSync(this.db, JSON.stringify(data));
			return this.message(true, "Registration successful", writtenData);
		} catch (error) {
			return this.message(false, "an error while registring user", error);
		}
	}

	registerUsers(user) {
		let allUser = this.read();
		let exist = false;

		for (let u of allUser) {
			if (u.whatsapp === user.whatsapp) {
				exist = true;
				return this.message(false, "user is already registered", user.id);
			}
		}
		allUser.push(user);

		let savedUser = this.writeUser(allUser);
		return savedUser;
	}

	loginUsers(user) {
		let allUser = this.read();
		let loggedin;

		for (let u of allUser) {
			if (u.username === user.username && u.password === user.password) {
				return this.message(true, "Login berhasil", {
					id: u.id,
					username: u.username,
					whatsapp: u.whatsapp,
					token: u.token
				});
			} else {
				loggedin = false;
			}
		}

		if (!loggedin) {
			return this.message(false, "Username atau password salah", null);
		}
	}

	getAccountInfo(token) {
		let allUser = this.read();
		let found;

		for (let u of allUser) {
			if (u.token === token) {
				return this.message(true, "account info obtained", {
					id: u.id,
					username: u.username,
					whatsapp: u.whatsapp,
					token: u.token
				});
			} else {
				found = false;
			}
		}

		if (!found) {
			return this.message(false, "Account not found", null);
		}
	}

	getPackageInfo(token) {}

	// chats db

	getAllChats() {
		try {
			let allChats = this.read();
			if (!allChats || !Array.isArray(allChats)) {
				return this.message(false, "No chats found or data format is invalid", []);
			}

			let filteredData = allChats.map((item) => {
				delete item.chat;
				return item;
			});

			if (filteredData) {
				return this.message(true, "Chats successfully obtained", filteredData);
			} else {
				return this.message(false, "An error occurred while obtaining chats", null);
			}
		} catch (error) {
			return this.message(false, "An error occurred while obtaining chats", {
				error: error.message
			});
		}
	}
}
