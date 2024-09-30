import { useEffect, useRef, useState } from "react";

type LengthOptionsProps = {
	setLength: React.Dispatch<React.SetStateAction<string>>;
	handleSetInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const LengthOptions: React.FC<LengthOptionsProps> = ({
	setLength,
	handleSetInput,
}) => {
	const lengthValues = [16, 32];
	const [isCustomLength, setIsCustomLength] = useState(64);

	const radioInputElement = useRef<HTMLInputElement>(null);
	const radioCustomInputElement = useRef<HTMLInputElement>(null);

	const handleClickLength = (
		e: React.MouseEvent<HTMLInputElement, MouseEvent>,
	) => {
		const { name, value } = e.currentTarget;

		if (name === "length") {
			setLength(value);
		}
	};

	useEffect(() => {
		if (radioInputElement.current) {
			radioInputElement.current.checked = true;
		}
	}, []);

	return (
		<>
			{lengthValues.map((len) => (
				<label className="label-style" key={len}>
					<input
						type="radio"
						name="length"
						className="aspect-square w-4"
						value={len}
						ref={len === 32 ? radioInputElement : null}
						onClick={handleClickLength}
					/>
					{len}
				</label>
			))}
			<label className="label-style">
				<input
					type="radio"
					name="length"
					value={isCustomLength}
					className="aspect-square w-4"
					ref={radioCustomInputElement}
					onClick={(e) => handleClickLength(e)}
				/>
				<span>
					<input
						type="number"
						value={isCustomLength}
						name="length"
						onClick={(e) => {
							if (radioCustomInputElement.current) {
								radioCustomInputElement.current.checked = true;
							}
							handleClickLength(e);
						}}
						onChange={(e) => {
							setIsCustomLength(Number(e.target.value));
							handleSetInput(e);
						}}
						className="px-2 py-1 text-center w-12 border focus:ring-blue-500 focus:outline-none rounded-lg no-spinner"
					/>
				</span>
			</label>
		</>
	);
};

export default LengthOptions;
