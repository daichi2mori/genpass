import { useState } from "react";
import { generatePassword } from "./passwordGenerator";

function App() {
	const [length, setLength] = useState(16);
	const [includeUppercase, setIncludeUppercase] = useState(true);
	const [includeLowercase, setIncludeLowercase] = useState(true);
	const [includeNumbers, setIncludeNumbers] = useState(true);
	const [includeSymbols, setIncludeSymbols] = useState(true);
	const [generatedPassword, setGeneratedPassword] = useState("");
	const [lengthError, setLengthError] = useState(false);
	const [inputError, setInputError] = useState(false);

	const handleGeneratePassword = () => {
		if (
			includeUppercase === false &&
			includeLowercase === false &&
			includeNumbers === false &&
			includeSymbols === false
		) {
			setInputError(true);
		} else {
			setInputError(false);
		}

		if (!lengthError && !inputError) {
			const password = generatePassword(
				length,
				includeUppercase,
				includeLowercase,
				includeNumbers,
				includeSymbols,
			);
			setGeneratedPassword(password);
		}
	};

	const handleSetInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		switch (e.target.name) {
			case "length":
				if (Number(e.target.value) < 4) {
					setLengthError(true);
					return;
				}
				setLengthError(false);
				setLength(Number(e.target.value));
				break;
			case "uppercase":
				setIncludeUppercase(e.target.checked);
				break;
			case "lowercase":
				setIncludeLowercase(e.target.checked);
				break;
			case "number":
				setIncludeNumbers(e.target.checked);
				break;
			case "symbol":
				setIncludeSymbols(e.target.checked);
				break;
		}
	};

	return (
		<>
			<h1>パスワード生成ツール</h1>
			<div>
				<label>
					パスワードの長さ:
					<input
						type="number"
						value={length}
						name="length"
						onChange={(e) => handleSetInput(e)}
						min="4"
						max="100"
					/>
				</label>
			</div>
			<div>
				<label>
					<input
						type="checkbox"
						checked={includeUppercase}
						name="uppercase"
						onChange={(e) => handleSetInput(e)}
					/>
					大文字を含める
				</label>
			</div>
			<div>
				<label>
					<input
						type="checkbox"
						checked={includeLowercase}
						name="lowercase"
						onChange={(e) => handleSetInput(e)}
					/>
					小文字を含める
				</label>
			</div>
			<div>
				<label>
					<input
						type="checkbox"
						checked={includeNumbers}
						name="number"
						onChange={(e) => handleSetInput(e)}
					/>
					数字を含める
				</label>
			</div>
			<div>
				<label>
					<input
						type="checkbox"
						checked={includeSymbols}
						name="symbol"
						onChange={(e) => handleSetInput(e)}
					/>
					記号を含める
				</label>
			</div>
			<div>
				{lengthError && <p>パスワードの長さは4文字以上指定してください</p>}
				{inputError && <p>少なくとも1つの文字タイプを選択してください</p>}
			</div>
			<button type="button" onClick={handleGeneratePassword}>
				パスワードを生成
			</button>
			{generatedPassword && (
				<div>
					<h2>生成されたパスワード:</h2>
					<p>{generatedPassword}</p>
				</div>
			)}
		</>
	);
}

export default App;
