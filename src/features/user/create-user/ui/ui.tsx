import { useActionState } from 'react';
import { createUserAction } from '@/pages/users/actions';

export const CreateUserForm = ({ refetchUsers }: { refetchUsers: () => void }) => {
	// transition в реакте это функция перехода, это какие-то долгие обновления.
	// таким образом, есть быстрые обновления, например, мы захотим очистить кнопку и поле email, input и т.д. Контролируемые input это не transition.
	// transition - это что-то долгое, например, мы запрашиваем новые данные или переход между страницами, открытие какой-то штуки модалки. Пользователю не так важно, чтобы это было супер быстро. Он ожидает, что это будет долго.

	// таким образом, реакт приоритезирует с помощью transition вещи так, что transition отображаются чуть позже, чем всякие важные обновления, которые вводит пользователь
	const [state, dispatch, isPending] = useActionState(
		createUserAction({ refetchUsers }),
		{ email: '' },
	);

	return (
		<form className="flex gap-2" action={dispatch}>
			<input
				name="email"
				type="email"
				className="border p-2 rounded"
				defaultValue={state.email}
				disabled={isPending}
			/>
			<button
				className="bg-blue-500 hover: bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400"
				type="submit"
				disabled={isPending}
			>
				Add
			</button>
			{state.error && <div className="text-red-500">{state.error}</div>}
		</form>
	);
};
