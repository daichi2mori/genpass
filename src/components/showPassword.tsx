type ShowPasswordProps = {
	generatedPassword: string;
	passwordElement: React.RefObject<HTMLInputElement>;
	handleCopyPassword: () => void;
};

const ShowPassword: React.FC<ShowPasswordProps> = ({
	generatedPassword,
	passwordElement,
	handleCopyPassword,
}) => {
	return (
		<div className="mt-5 mr-2 flex items-center gap-3">
			<input
				type="text"
				value={generatedPassword || ""}
				ref={passwordElement}
				onFocus={(e) => e.currentTarget.select()}
				border="slate-300 disabled:slate-200 focus:blue-500"
				className="grow border rounded-lg focus:ring-blue-500 focus:outline-none p-2.5"
				readOnly
			/>
			<button
				type="button"
				className="i-mdi-content-copy"
				onClick={handleCopyPassword}
			/>
		</div>
	);
};

export default ShowPassword;
