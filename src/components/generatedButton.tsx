type GeneratedButtonProps = {
	handleGeneratePassword: () => void;
};

const GeneratedButton: React.FC<GeneratedButtonProps> = ({
	handleGeneratePassword,
}) => {
	return (
		<div className="grid place-items-center">
			<button
				type="button"
				onClick={handleGeneratePassword}
				text="white sm"
				bg="blue-700 hover:blue-800"
				p="x-5 y-2.5"
				mt="5"
				className="font-medium rounded-lg focus:outline-none"
			>
				パスワードを生成
			</button>
		</div>
	);
};

export default GeneratedButton;
