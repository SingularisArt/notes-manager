export function convertFileNameToDisplayName(fileName: string) {
  const splitFileName = fileName.split('/');
  const displayName = splitFileName[splitFileName.length - 1]
    .split('.')[0]
    .replace(/-/g, ' ')
    .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));

  return displayName.replace(/0([1-9])/g, '$1');
}

export function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
  event.target.style.width = `${(event.target.value.length + 1) * 8}px`;
}
