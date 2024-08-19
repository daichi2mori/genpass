const LengthOptions = ({
	radioInputElement,
	radioCustomInputElement,
	handleSetInput,
	handleClickLength,
}: {
	radioInputElement: React.RefObject<HTMLInputElement>;
	radioCustomInputElement: React.RefObject<HTMLInputElement>;
	handleSetInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleClickLength: (
		e: React.MouseEvent<HTMLInputElement, MouseEvent>,
	) => void;
}) => {
	return (
		<>
			{[16, 32].map((len) => (
				<label className="label-style" key={len}>
					<input
						type="radio"
						name="length"
						className="aspect-square w-4"
						value={len}
						ref={len === 32 ? radioInputElement : null}
						onClick={(e) => handleClickLength(e)}
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
						onChange={(e) => handleSetInput(e)}
						border="slate-300 disabled:slate-200 focus:blue-500"
						className="px-2 py-1 text-center w-12 border focus:ring-blue-500 focus:outline-none rounded-lg no-spinner"
					/>
				</span>
			</label>
		</>
	);
};

export default LengthOptions;
