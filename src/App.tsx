import { useState } from "react";
import { generatePassword } from "./passwordGenerator";

function App() {
  const [length, setLength] = useState(8);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [generatedPassword, setGeneratedPassword] = useState('');

  const handleGeneratePassword = () => {
    const password = generatePassword(length, includeUppercase, includeLowercase, includeNumbers, includeSymbols);
    setGeneratedPassword(password);
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
            onChange={(e) => setLength(Number(e.target.value))}
            min="4"
            max="32"
          />
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={includeUppercase}
            onChange={(e) => setIncludeUppercase(e.target.checked)}
          />
          大文字を含める
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={includeLowercase}
            onChange={(e) => setIncludeLowercase(e.target.checked)}
          />
          小文字を含める
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={(e) => setIncludeNumbers(e.target.checked)}
          />
          数字を含める
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={includeSymbols}
            onChange={(e) => setIncludeSymbols(e.target.checked)}
          />
          記号を含める
        </label>
      </div>
      <button onClick={handleGeneratePassword}>パスワードを生成</button>
      {generatedPassword && (
        <div>
          <h2>生成されたパスワード:</h2>
          <p>{generatedPassword}</p>
        </div>
      )}
    </>
  )
}

export default App
