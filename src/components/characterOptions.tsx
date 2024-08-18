const CharacterOptions = ({
	includeLowercase,
	includeUppercase,
	includeNumbers,
	includeSymbols,
	handleSetInput,
}: {
	includeLowercase: boolean;
	includeUppercase: boolean;
	includeNumbers: boolean;
	includeSymbols: boolean;
	handleSetInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
	return (
		<>
			{[
				{
					name: "lowercase",
					label: "英字（小文字）",
					checked: includeLowercase,
				},
				{
					name: "uppercase",
					label: "英字（大文字）",
					checked: includeUppercase,
				},
				{ name: "number", label: "数字", checked: includeNumbers },
				{ name: "symbol", label: "記号", checked: includeSymbols },
			].map(({ name, label, checked }) => (
				<label className="label-style" key={name}>
					<input
						type="checkbox"
						name={name}
						checked={checked}
						onChange={handleSetInput}
						className="aspect-square w-4"
					/>
					{label}
				</label>
			))}
		</>
	);
};

export default CharacterOptions;
