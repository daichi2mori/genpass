import { useState } from "react";

type LengthOptionsProps = {
	radioInputElement: React.RefObject<HTMLInputElement>;
	radioCustomInputElement: React.RefObject<HTMLInputElement>;
	handleSetInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleClickLength: (
		e: React.MouseEvent<HTMLInputElement, MouseEvent>,
	) => void;
};

const LengthOptions: React.FC<LengthOptionsProps> = ({
	radioInputElement,
	radioCustomInputElement,
	handleSetInput,
	handleClickLength,
}) => {
	const [variableLength, setVariableLength] = useState(64);

	const lengthValues = [16, 32];

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
					value={variableLength}
					className="aspect-square w-4"
					ref={radioCustomInputElement}
					onClick={(e) => handleClickLength(e)}
				/>
				<span>
					<input
						type="number"
						value={variableLength}
						name="length"
						onClick={(e) => {
							if (radioCustomInputElement.current) {
								radioCustomInputElement.current.checked = true;
							}
							handleClickLength(e);
						}}
						onChange={(e) => {
							setVariableLength(Number(e.target.value));
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
