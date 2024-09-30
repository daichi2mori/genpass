type CharacterOptionsProps = {
	options: {
		uppercase: boolean;
		lowercase: boolean;
		number: boolean;
		symbol: boolean;
	};
	handleSetInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const CharacterOptions: React.FC<CharacterOptionsProps> = ({
	options,
	handleSetInput,
}) => {
	const characters = [
		{ name: "lowercase", label: "英字（小文字）", checked: options.lowercase },
		{ name: "uppercase", label: "英字（大文字）", checked: options.uppercase },
		{ name: "number", label: "数字", checked: options.number },
		{ name: "symbol", label: "記号", checked: options.symbol },
	];

	return (
		<>
			{characters.map(({ name, label, checked }) => (
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
