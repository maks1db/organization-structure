import React, { FC } from 'react';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';
import { create } from 'jss';

const COMMENT_DATA = 'mui-inject-first';
const element = document.createComment(COMMENT_DATA);
document.head.prepend(element);

const jss = create({
  ...jssPreset(),
  insertionPoint: COMMENT_DATA,
});

export const MuiStylesProvider: FC = ({ children }) => (
  <StylesProvider jss={jss}>{children}</StylesProvider>
);
