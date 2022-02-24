import { FC, useRef } from 'react';
import { useStore } from 'effector-react';
import cn from 'classnames';
import { Colors } from './Colors';
import { Button } from './Button';
import {
  $isSelectBackgroundColorOpened,
  $isSelectFontColorOpened,
  setSelectBackgroundColorVisibility,
  setSelectFontColorVisibility,
  toggleBold,
  toggleItalic,
  toggleUnderline,
  $isBold,
  $isItalic,
  $isUnderline,
  setBackgroundColor,
  setTextColor,
  $backgroundColor,
  $textColor,
} from './model';

interface MainButtonProps {
  className?: string;
}

export const Bold: FC<MainButtonProps> = ({ className }) => {
  const isActive = useStore($isBold);
  return (
    <Button className={className} onClick={toggleBold} isActive={isActive}>
      <span className="text-2xl font-bold">B</span>
    </Button>
  );
};

export const Italic: FC<MainButtonProps> = ({ className }) => {
  const isActive = useStore($isItalic);
  return (
    <Button className={className} onClick={toggleItalic} isActive={isActive}>
      <span className="text-2xl italic">I</span>
    </Button>
  );
};

export const Underline: FC<MainButtonProps> = ({ className }) => {
  const isActive = useStore($isUnderline);
  return (
    <Button className={className} onClick={toggleUnderline} isActive={isActive}>
      <span className="text-2xl underline">U</span>
    </Button>
  );
};

export const Color: FC<MainButtonProps> = ({ className }) => {
  const ref = useRef(null);

  const isOpened = useStore($isSelectBackgroundColorOpened);
  const color = useStore($backgroundColor);

  return (
    <>
      <Button
        className={cn(className, color && `bg-${color}`)}
        elevation={3}
        onClick={() => setSelectBackgroundColorVisibility(true)}
        ref={ref}
      />
      <Colors
        refAnchorEl={ref}
        onClose={() => setSelectBackgroundColorVisibility(false)}
        isOpened={isOpened}
        onColorSelect={setBackgroundColor}
      />
    </>
  );
};

export const TextColor: FC<MainButtonProps> = ({ className }) => {
  const ref = useRef(null);

  const isOpened = useStore($isSelectFontColorOpened);
  const color = useStore($textColor);

  return (
    <>
      <Button
        className={cn(
          className,
          color && `text-${color}`,
          color === 'white' && 'bg-black'
        )}
        elevation={3}
        ref={ref}
        onClick={() => setSelectFontColorVisibility(true)}
      >
        <span className="text-2xl">T</span>
      </Button>
      <Colors
        refAnchorEl={ref}
        onClose={() => setSelectFontColorVisibility(false)}
        isOpened={isOpened}
        onColorSelect={setTextColor}
      />
    </>
  );
};
