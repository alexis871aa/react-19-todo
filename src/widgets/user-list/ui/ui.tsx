import { FC, use } from 'react';
import { User, UserCard } from '@/entities/user';

interface UsersListProps {
	usersPromise: Promise<User[]>;
}

export const UsersList: FC<UsersListProps> = ({ usersPromise }) => {
	// основная задача нового хука use - прямо в рендере превратить наш промис юзеров в массив
	const users = use(usersPromise);
	return (
		<div className="flex flex-col">
			{users.map((user) => (
				<UserCard key={user.id} user={user} />
			))}
		</div>
	);
};
