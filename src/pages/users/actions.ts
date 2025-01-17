import { createUser } from '@/shared/api';
import { nanoid } from 'nanoid';

type CreateActionState = { error?: string };

// это функция для transition
export const createUserAction =
	({
		refetchUsers,
		setEmail,
	}: {
		refetchUsers: () => void;
		setEmail: (email: string) => void;
	}) =>
	async (
		prevState: CreateActionState,
		formData: { email: string },
	): Promise<CreateActionState> => {
		try {
			await createUser({ id: nanoid(), email: formData.email });

			await refetchUsers();
			setEmail('');

			return {};
		} catch {
			return {
				error: 'Что то пошло не так при создании пользователя',
			};
		}
	};
