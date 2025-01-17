import { startTransition, Suspense, useState } from 'react';
import { CreateUserForm } from '@/features/user/create-user';
import { UsersList } from '@/widgets/user-list';
import { fetchUsers } from '@/shared/api';
import { ErrorBoundary } from 'react-error-boundary';

// как только наше приложение загрузится, он сразу же отправит запрос к серверу
const defaultUsersPromise = fetchUsers();

export const UsersPage = () => {
	const [usersPromise, setUsersPromise] = useState(defaultUsersPromise);
	const refetchUsers = () => startTransition(() => setUsersPromise(fetchUsers()));

	return (
		<main className="container mx-auto p-4 pt-10 flex flex-col gap-4">
			<h1 className="text-3xl font-bold underline">Users</h1>
			<CreateUserForm refetchUsers={refetchUsers} />
			<ErrorBoundary
				fallbackRender={(e) => (
					<div className="text-red-500">
						Что то пошло не так:{JSON.stringify(e)}
					</div>
				)}
			>
				<Suspense fallback={<div>Loading...</div>}>
					<UsersList usersPromise={usersPromise} refetchUsers={refetchUsers} />
				</Suspense>
			</ErrorBoundary>
		</main>
	);
};
