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
					className="aspect-square w-4"
					ref={radioCustomInputElement}
				/>
				<span>
					<input
						type="number"
						defaultValue={64}
						name="length"
						onClick={(e) => {
							if (radioCustomInputElement.current) {
								radioCustomInputElement.current.checked = true;
							}
							handleClickLength(e);
						}}
						onChange={handleSetInput}
						className="px-2 py-1 text-center w-12 border focus:ring-blue-500 focus:outline-none rounded-lg no-spinner"
					/>
				</span>
			</label>
		</>
	);
};

export default LengthOptions;
