import { createUser, deleteUser } from '@/shared/api';
import { nanoid } from 'nanoid';

type CreateActionState = { error?: string; email: string };

type DeleteActionState = { error?: string };

export const createUserAction =
	({ refetchUsers }: { refetchUsers: () => void }) =>
	async (_: CreateActionState, formData: FormData): Promise<CreateActionState> => {
		const email = formData.get('email') as string;

		if (email === 'admin@gmail.com') {
			return {
				email,
				error: 'Аккаунт админа уже существует',
			};
		}

		try {
			await createUser({ id: nanoid(), email });

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

export const deleteUserAction =
	({ id, refetchUsers }: { id: string; refetchUsers: () => void }) =>
	async (_: DeleteActionState): Promise<{ error?: string }> => {
		try {
			await deleteUser(id);
			refetchUsers();

			return {};
		} catch {
			return {
				error: 'Что то пошло не так при удалении пользователя',
			};
		}
	};
