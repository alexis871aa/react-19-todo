import { useState } from 'react';
import { createUser } from '@/shared/api';
import { nanoid } from 'nanoid';

export const CreateUserForm = ({ refetchUsers }: { refetchUsers: () => void }) => {
	const [email, setEmail] = useState('');

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		await createUser({ id: nanoid(), email });
		refetchUsers();
		setEmail('');
	};

	return (
		<form className="flex gap-2" onSubmit={handleSubmit}>
			<input
				type="email"
				className="border p-2 rounded"
				placeholder="New user email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<button
				className="bg-blue-500 hover: bg-blue-700 text-white font-bold py-2 px-4 rounded"
				type="submit"
			>
				Add
			</button>
		</form>
	);
};
