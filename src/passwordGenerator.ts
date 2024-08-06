const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
const numberChars = '0123456789';
const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

function getRandomChar(characters: string): string {
  const array = new Uint32Array(1);
  window.crypto.getRandomValues(array);
  return characters[array[0] % characters.length];
}

function shuffleArray(array: string[]): string[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(crypto.getRandomValues(new Uint32Array(1))[0] / 0xFFFFFFFF * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function generatePassword(
  length: number,
  includeUppercase: boolean,
  includeLowercase: boolean,
  includeNumbers: boolean,
  includeSymbols: boolean
): string {
  if (length < 1) {
    throw new Error('パスワードの長さは1以上である必要があります。');
  }

  let chars = '';
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

  if (chars === '') {
    throw new Error('少なくとも1つの文字タイプを選択してください。');
  }

  const passwordArray: string[] = requiredChars.slice();

  console.log(passwordArray)

  for (let i = requiredChars.length; i < length; i++) {
    passwordArray.push(getRandomChar(chars));
  }

  return shuffleArray(passwordArray).join('');
}
