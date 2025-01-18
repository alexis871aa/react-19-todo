import { useState, startTransition, useOptimistic, use } from 'react';
import { fetchUsers } from '@/shared/api';
import { createUserAction, deleteUserAction } from './actions';
import { User } from '@/entities/user';

// как только наше приложение загрузится, он сразу же отправит запрос к серверу
const defaultUsersPromise = fetchUsers();

export const useUsers = () => {
	const [usersPromise, setUsersPromise] = useState(defaultUsersPromise);
	const refetchUsers = () => startTransition(() => setUsersPromise(fetchUsers()));

	const [createdUsers, optimisticCreate] = useOptimistic(
		[] as User[],
		(createdUsers, user: User) => [...createdUsers, user],
	);
	const [deletedUsersIds, optimisticDelete] = useOptimistic(
		[] as string[],
		(deletedUsers, id: string) => deletedUsers.concat(id),
	);

	const useUsersList = () => {
		const users = use(usersPromise);

		return users
			.concat(createdUsers)
			.filter((user) => !deletedUsersIds.includes(user.id));
	};

	return {
		createUserAction: createUserAction({ refetchUsers, optimisticCreate }),
		deleteUserAction: deleteUserAction({ refetchUsers, optimisticDelete }),
		useUsersList,
	};
};
