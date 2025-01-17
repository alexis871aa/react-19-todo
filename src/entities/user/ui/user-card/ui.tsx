import { FC, useTransition } from 'react';
import { User } from '../../model/types';
import { deleteUser } from '@/shared/api';

interface UserCardProps {
	user: User;
	refetchUsers: () => void;
}

export const UserCard: FC<UserCardProps> = ({ user, refetchUsers }) => {
	const [isPending, startTransition] = useTransition();

	const handleDelete = (id: string) => {
		startTransition(async () => {
			await deleteUser(id);
			refetchUsers();
		});
	};

	return (
		<div className="border p-2 m-2 rounded bg-gray-100 flex gap-2">
			{user.email}
			<button
				type="button"
				className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-auto disabled:bg-gray-400"
				onClick={() => handleDelete(user.id)}
				disabled={isPending}
			>
				Delete
			</button>
		</div>
	);
};
