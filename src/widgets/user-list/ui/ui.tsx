import { FC } from 'react';
import { User, UserCard } from '@/entities/user';

interface UsersListProps {
	users: User[];
}

export const UsersList: FC<UsersListProps> = ({ users }) => {
	return (
		<div className="flex flex-col">
			{users.map((user) => (
				<UserCard key={user.id} user={user} />
			))}
		</div>
	);
};
