import { Suspense } from 'react';
import { CreateUserForm } from '@/features/user/create-user';
import { UsersList } from '@/widgets/user-list';
import { ErrorBoundary } from 'react-error-boundary';
import { useUsers } from './use-users';

export const UsersPage = () => {
	const { useUsersList, createUserAction, deleteUserAction } = useUsers();

	return (
		<main className="container mx-auto p-4 pt-10 flex flex-col gap-4">
			<h1 className="text-3xl font-bold underline">Users</h1>
			<CreateUserForm createUserAction={createUserAction} />
			<ErrorBoundary
				fallbackRender={(e) => (
					<div className="text-red-500">
						Что то пошло не так:{JSON.stringify(e)}
					</div>
				)}
			>
				<Suspense fallback={<div>Loading...</div>}>
					<UsersList
						useUsersList={useUsersList}
						deleteUserAction={deleteUserAction}
					/>
				</Suspense>
			</ErrorBoundary>
		</main>
	);
};
