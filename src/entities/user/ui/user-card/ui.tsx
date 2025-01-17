import { FC, useActionState } from 'react';
import { User } from '../../model/types';
import { deleteUserAction } from '@/pages/users/actions';

interface UserCardProps {
	user: User;
	refetchUsers: () => void;
}

export const UserCard: FC<UserCardProps> = ({ user, refetchUsers }) => {
	const [state, handleDelete, isPending] = useActionState(
		deleteUserAction({ id: user.id, refetchUsers }),
		{},
	);

	return (
		<div className="border p-2 m-2 rounded bg-gray-100 flex gap-2">
			{user.email}
			<form className="ml-auto">
				<button
					className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-auto disabled:bg-gray-400"
					disabled={isPending}
					formAction={handleDelete}
				>
					Delete
					{state.error && <div className="text-red-500">{state.error}</div>}
				</button>
			</form>
		</div>
	);
};
