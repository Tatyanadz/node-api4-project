let users = [
	{ id: "1", name: "Jane Doe", bio: "Some bio" },
	{ id: "2", name: "John Doe", bio: "Some bio2" },
	{ id: "3", name: "Jack Doe", bio: "Some bio3" },
]

function getUsers() {
	return users
}

function getUserById(id) {
	return new Promise (resolve => {
		resolve(users.find(u => u.id === id))})
		
}

function createUser(data) {
	const payload = {
		id: String(users.length + 1),
		...data,
	}

	users.push(payload)
	return payload
}

function updateUser(id, data) {
	const index = users.findIndex(u => u.id === id)
	users[index] = {
		...users[index],
		...data,
	}
	
	return users[index]
}

function deleteUser(id) {
	return new Promise(resolve => {
		resolve(users.filter(u => u.id != id))
	})
	
}

module.exports = {
	getUsers,
	getUserById,
	createUser,
	updateUser,
	deleteUser,
}