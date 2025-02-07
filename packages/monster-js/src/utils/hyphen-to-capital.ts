export function hyphenToCapital(inputString: string): string {
  const capitalizeExceptFirst = (word: string, index: number): string => {
    if (index === 0) return word;
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  return inputString
    .split('-')
    .map(capitalizeExceptFirst)
    .join('');
}
