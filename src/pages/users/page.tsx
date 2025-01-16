import { useState } from 'react';
import { CreateUserForm } from '@/features/user/create-user';
import { UsersList } from '@/widgets/user-list';
import { nanoid } from 'nanoid';

interface User {
	id: string;
	email: string;
}

export const UsersPage = () => {
	const [users, setUsers] = useState<User[]>([]);
	const [email, setEmail] = useState('');

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setUsers([...users, { id: nanoid(), email }]);
		setEmail('');
	};

	const handleDelete = (id: string) => {
		setUsers((lastUsers) => lastUsers.filter((user) => user.id !== id));
	};

	return (
		<main className="container mx-auto p-4 pt-10 flex flex-col gap-4">
			<h1 className="text-3xl font-bold underline">Users</h1>
			<CreateUserForm />
			<UsersList
				users={[
					{ id: '1', email: 'Oc9Ct@example.com' },
					{ id: '2', email: '4i0w5@example.com' },
				]}
			/>
		</main>
	);
};
