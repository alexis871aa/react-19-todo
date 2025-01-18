import { useActionState } from 'react';
import { User } from '../../model/types';
import { DeleteUserAction } from '@/pages/users/actions';

export const UserCard = ({
	user,
	deleteUserAction,
}: {
	user: User;
	deleteUserAction: DeleteUserAction;
}) => {
	const [state, handleDelete] = useActionState(deleteUserAction, {});

	return (
		<div className="border p-2 m-2 rounded bg-gray-100 flex gap-2">
			{user.email}
			<form className="ml-auto">
				<input type="hidden" name="id" value={user.id}></input>
				<button
					className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-auto disabled:bg-gray-400"
					formAction={handleDelete}
				>
					Delete
					{state.error && <div className="text-red-500">{state.error}</div>}
				</button>
			</form>
		</div>
	);
};
