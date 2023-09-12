import { FormEvent } from 'react';
import { UtilsTypes } from './Types/index';

export function convertFileNameToDisplayName({
  fileName,
}: UtilsTypes.convertFileNameToDisplayNameProps): string {
  const splitFileName = fileName.split('/');
  const displayName = splitFileName[splitFileName.length - 1]
    .split('.')[0]
    .replace(/-/g, ' ')
    .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));

  return displayName.replace(/0([1-9]+)/g, '$1');
}

export function convertDisplayNameToFileName({
  displayName,
  extension = '.tex',
}: UtilsTypes.convertDisplayNameToFileNameProps): string {
  return (
    displayName
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/(\d+)/g, (_, number) => {
        const paddedNumber = number.length === 1 ? `0${number}` : number;
        return paddedNumber;
      }) + extension
  );
}

export function handleInputChange(event: FormEvent<HTMLInputElement>): void {
  const target = event.target as HTMLInputElement;
  target.style.width = `${(target.value.length + 1) * 8}px`;
}
