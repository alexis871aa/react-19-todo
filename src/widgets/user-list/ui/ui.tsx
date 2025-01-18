import { User, UserCard } from '@/entities/user';
import { DeleteUserAction } from '@/pages/users/actions';

export const UsersList = ({
	useUsersList,
	deleteUserAction,
}: {
	useUsersList: () => User[];
	deleteUserAction: DeleteUserAction;
}) => {
	// основная задача нового хука use - прямо в рендере превратить наш промис юзеров в массив
	const users = useUsersList();
	return (
		<div className="flex flex-col">
			{users.map((user) => (
				<UserCard key={user.id} user={user} deleteUserAction={deleteUserAction} />
			))}
		</div>
	);
};
