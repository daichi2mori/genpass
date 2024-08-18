import { useEffect, useRef, useState } from "react";
import CharacterOptions from "./components/characterOptions";
import LengthOptions from "./components/lengthOptions";
import { generatePassword } from "./passwordGenerator";

function App() {
	const [length, setLength] = useState("64");
	const [includeUppercase, setIncludeUppercase] = useState(true);
	const [includeLowercase, setIncludeLowercase] = useState(true);
	const [includeNumbers, setIncludeNumbers] = useState(true);
	const [includeSymbols, setIncludeSymbols] = useState(true);
	const [generatedPassword, setGeneratedPassword] = useState("");
	const [lengthError, setLengthError] = useState(false);
	const [inputError, setInputError] = useState(false);
	const [showToast, setShowToast] = useState(false);

	const radioInputElement = useRef<HTMLInputElement>(null);
	const radioCustomInputElement = useRef<HTMLInputElement>(null);
	const passwordElement = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (radioInputElement.current) {
			radioInputElement.current.checked = true;
		}
	}, []);

	const handleSetInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, checked } = e.target;

		switch (name) {
			case "length":
				setLength(value);
				break;
			case "uppercase":
				setIncludeUppercase(checked);
				break;
			case "lowercase":
				setIncludeLowercase(checked);
				break;
			case "number":
				setIncludeNumbers(checked);
				break;
			case "symbol":
				setIncludeSymbols(checked);
				break;
		}
	};

	const validateInputs = () => {
		const isLengthValid = Number(length) >= 4;
		const isInputValid =
			includeUppercase || includeLowercase || includeNumbers || includeSymbols;

		setLengthError(!isLengthValid);
		setInputError(!isInputValid);

		return isLengthValid && isInputValid;
	};

	const handleGeneratePassword = () => {
		if (!validateInputs()) {
			setGeneratedPassword("");
			return;
		}

		setShowToast(false);

		const password = generatePassword(
			length,
			includeUppercase,
			includeLowercase,
			includeNumbers,
			includeSymbols,
		);
		setGeneratedPassword(password);
	};

	const handleCopyPassword = () => {
		if (!passwordElement.current) return;

		const word = passwordElement.current.value;
		navigator.clipboard.writeText(word);

		setShowToast(true);
		setTimeout(() => {
			setShowToast(false);
		}, 2000);
	};

	return (
		<div className="max-w-[780px] mx-auto mt-5 md:mt-10 px-3">
			<h1 className="text-center text-3xl font-bold">パスワード生成ツール</h1>

			<div className="grid grid-cols-[100px_1fr] md:grid-cols-[200px_1fr] gap-y-1 mt-5 md:mt-10">
				<div className="bg-gray-200 font-bold grid place-items-center">
					文字数
				</div>
				<div className="bg-gray-50 flex flex-col gap-2 p-3">
					<LengthOptions
						length={length}
						radioInputElement={radioInputElement}
						radioCustomInputElement={radioCustomInputElement}
						setLength={setLength}
						handleSetInput={handleSetInput}
					/>
					{lengthError && (
						<p className="text-red text-xs md:text-base break-words">
							パスワードの長さは4文字以上指定してください
						</p>
					)}
				</div>

				<div className="bg-gray-200 font-bold grid place-items-center">
					文字種
				</div>
				<div className="bg-gray-50 flex flex-col gap-2 p-3">
					<CharacterOptions
						includeLowercase={includeLowercase}
						includeUppercase={includeUppercase}
						includeNumbers={includeNumbers}
						includeSymbols={includeSymbols}
						handleSetInput={handleSetInput}
					/>
					{inputError && (
						<p className="text-red text-xs md:text-base break-words">
							少なくとも1つの文字タイプを選択してください
						</p>
					)}
				</div>
			</div>

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

			{generatedPassword && (
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
			)}

			{showToast && (
				<div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-gray-800 text-white rounded shadow-lg">
					Copied!
				</div>
			)}
		</div>
	);
}

export default App;
