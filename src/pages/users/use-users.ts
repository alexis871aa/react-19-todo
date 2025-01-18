import { startTransition, useState } from 'react';
import { fetchUsers } from '@/shared/api';

// как только наше приложение загрузится, он сразу же отправит запрос к серверу
const defaultUsersPromise = fetchUsers();

export const useUsers = () => {
	const [usersPromise, setUsersPromise] = useState(defaultUsersPromise);
	const refetchUsers = () => startTransition(() => setUsersPromise(fetchUsers()));

	return {
		usersPromise,
		refetchUsers,
	};
};
