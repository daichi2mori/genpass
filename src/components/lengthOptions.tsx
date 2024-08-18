const LengthOptions = ({
	length,
	radioInputElement,
	radioCustomInputElement,
	setLength,
	handleSetInput,
}: {
	length: string;
	radioInputElement: React.RefObject<HTMLInputElement>;
	radioCustomInputElement: React.RefObject<HTMLInputElement>;
	setLength: React.Dispatch<React.SetStateAction<string>>;
	handleSetInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
						onClick={(e) => setLength(e.currentTarget.value)}
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
						value={length}
						name="length"
						onClick={() => {
							if (radioCustomInputElement.current) {
								radioCustomInputElement.current.checked = true;
							}
						}}
						onChange={handleSetInput}
						border="slate-300 disabled:slate-200 focus:blue-500"
						className="px-2 py-1 text-center w-12 border focus:ring-blue-500 focus:outline-none rounded-lg no-spinner"
					/>
				</span>
			</label>
		</>
	);
};

export default LengthOptions;
