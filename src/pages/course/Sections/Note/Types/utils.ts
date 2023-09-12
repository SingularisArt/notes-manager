export type convertFileNameToDisplayNameProps = {
  fileName: string;
};

export type convertDisplayNameToFileNameProps = {
  displayName: string;
  extension: string;
};

export type handleInputChangeProps = {
  event: React.ChangeEvent<HTMLInputElement>;
};
