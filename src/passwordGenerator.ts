const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";

function getRandomChar(characters: string): string {
	const array = new Uint32Array(1);
	window.crypto.getRandomValues(array);
	return characters[array[0] % characters.length];
}

function shuffleArray(array: string[]): string[] {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(
			(crypto.getRandomValues(new Uint32Array(1))[0] / 0xffffffff) * (i + 1),
		);
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

export function generatePassword(
	length: string,
	includeUppercase: boolean,
	includeLowercase: boolean,
	includeNumbers: boolean,
	includeSymbols: boolean,
): string {
	let chars = "";
	const requiredChars: string[] = [];

	if (includeUppercase) {
		chars += uppercaseChars;
		requiredChars.push(getRandomChar(uppercaseChars));
	}
	if (includeLowercase) {
		chars += lowercaseChars;
		requiredChars.push(getRandomChar(lowercaseChars));
	}
	if (includeNumbers) {
		chars += numberChars;
		requiredChars.push(getRandomChar(numberChars));
	}
	if (includeSymbols) {
		chars += symbolChars;
		requiredChars.push(getRandomChar(symbolChars));
	}

	const passwordArray: string[] = requiredChars.slice();

	for (let i = requiredChars.length; i < Number(length); i++) {
		passwordArray.push(getRandomChar(chars));
	}

	return shuffleArray(passwordArray).join("");
}
