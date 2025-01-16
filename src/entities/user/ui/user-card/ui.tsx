import { FC } from 'react';
import { User } from '../../model/types';

interface UserCardProps {
	user: User;
}

export const UserCard: FC<UserCardProps> = ({ user }) => {
	return (
		<div className="border p-2 m-2 rounded bg-gray-100 flex gap-2">
			{user.email}
			<button
				type="button"
				className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-auto"
			>
				Delete
			</button>
		</div>
	);
};
