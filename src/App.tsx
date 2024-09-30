import { useRef, useState } from "react";
import CharacterOptions from "./components/characterOptions";
import GeneratedButton from "./components/generatedButton";
import LengthOptions from "./components/lengthOptions";
import ShowPassword from "./components/showPassword";
import { generatePassword } from "./passwordGenerator";

function App() {
	const [lengthError, setLengthError] = useState(false);
	const [inputError, setInputError] = useState(false);

	const [length, setLength] = useState("32");
	const [options, setOptions] = useState({
		uppercase: true,
		lowercase: true,
		number: true,
		symbol: true,
	});
	const [generatedPassword, setGeneratedPassword] = useState("");
	const [showToast, setShowToast] = useState(false);

	const passwordElement = useRef<HTMLInputElement>(null);

	const handleSetInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, checked } = e.target;

		if (name === "length") {
			setLength(value);
		} else {
			setOptions((prev) => ({
				...prev,
				[name]: checked,
			}));
		}
	};

	const validateInputs = () => {
		const isLengthValid = Number(length) >= 4;
		const isInputValid =
			options.uppercase ||
			options.lowercase ||
			options.number ||
			options.symbol;

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
			options.uppercase,
			options.lowercase,
			options.number,
			options.symbol,
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
					<CharacterOptions options={options} handleSetInput={handleSetInput} />
					{inputError && (
						<p className="text-red text-xs md:text-base break-words">
							少なくとも1つの文字タイプを選択してください
						</p>
					)}
				</div>
			</div>

			<GeneratedButton handleGeneratePassword={handleGeneratePassword} />

			{generatedPassword && (
				<ShowPassword
					generatedPassword={generatedPassword}
					passwordElement={passwordElement}
					handleCopyPassword={handleCopyPassword}
				/>
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
