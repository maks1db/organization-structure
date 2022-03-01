export const makeTitle = (title: string, isModify: boolean) =>
  `${title} ${isModify ? '*' : ''}`.trim();
