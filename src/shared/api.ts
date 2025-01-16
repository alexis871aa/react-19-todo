import { User } from '@/entities/user';

export const fetchUsers = async () => {
	return await fetch('http://localhost:3000/users').then(
		(res) => res.json() as Promise<User[]>,
	);
};

export const createUser = (user: User) => {
	return fetch('http://localhost:3000/users', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(user),
	}).then((res) => res.json());
};

export const deleteUser = (id: string) => {
	return fetch(`http://localhost:3000/users/${id}`, { method: 'DELETE' }).then((res) =>
		res.json(),
	);
};
