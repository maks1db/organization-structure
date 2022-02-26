export const makeArtTitle = (title: string, isModify: boolean) =>
  `${title} ${isModify ? '*' : ''}`.trim();
