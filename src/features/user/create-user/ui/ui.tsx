export const CreateUserForm = () => {
	return (
		<form className="flex gap-2">
			<input
				type="email"
				className="border p-2 rounded"
				placeholder="New user email"
			/>
			<button
				className="bg-blue-500 hover: bg-blue-700 text-white font-bold py-2 px-4 rounded"
				type="submit"
			>
				Add
			</button>
		</form>
	);
};
