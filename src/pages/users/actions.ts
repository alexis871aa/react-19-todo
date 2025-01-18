import { User } from '@/entities/user';
import { createUser, deleteUser } from '@/shared/api';
import { nanoid } from 'nanoid';

type CreateActionState = { error?: string; email: string };

export type CreateUserAction = (
	state: CreateActionState,
	formData: FormData,
) => Promise<CreateActionState>;

export const createUserAction = ({
	refetchUsers,
	optimisticCreate,
}: {
	refetchUsers: () => void;
	optimisticCreate: (user: User) => void;
}): CreateUserAction => {
	return async (_, formData) => {
		const email = formData.get('email') as string;

		if (email === 'admin@gmail.com') {
			return {
				email,
				error: 'Аккаунт админа уже существует',
			};
		}

		try {
			const user = {
				id: nanoid(),
				email,
			};
			optimisticCreate(user);
			await createUser(user);

			await refetchUsers();

			return {
				email: '',
			};
		} catch {
			return {
				email: '',
				error: 'Что то пошло не так при создании пользователя',
			};
		}
	};
};

type DeleteActionState = { error?: string };

export type DeleteUserAction = (
	state: DeleteActionState,
	formData: FormData,
) => Promise<DeleteActionState>;

export const deleteUserAction = ({
	refetchUsers,
	optimisticDelete,
}: {
	refetchUsers: () => void;
	optimisticDelete: (id: string) => void;
}): DeleteUserAction => {
	return async (_, formData) => {
		const id = formData.get('id') as string;
		try {
			optimisticDelete(id);
			await deleteUser(id);
			refetchUsers();

			return {};
		} catch {
			return {
				error: 'Что то пошло не так при удалении пользователя',
			};
		}
	};
};
