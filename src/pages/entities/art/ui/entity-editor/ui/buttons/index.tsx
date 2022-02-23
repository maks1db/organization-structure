import { FC } from 'react';
import { Button } from './Button';

interface MainButtonProps {
  className?: string;
}

export const Bold: FC<MainButtonProps> = ({ className }) => {
  return (
    <Button className={className}>
      <span className="text-2xl font-bold">B</span>
    </Button>
  );
};

export const Italic: FC<MainButtonProps> = ({ className }) => {
  return (
    <Button className={className}>
      <span className="text-2xl italic">I</span>
    </Button>
  );
};

export const Underline: FC<MainButtonProps> = ({ className }) => {
  return (
    <Button className={className}>
      <span className="text-2xl underline">U</span>
    </Button>
  );
};

export const Color: FC<MainButtonProps> = ({ className }) => {
  return <Button className={className} elevation={3} />;
};

export const TextColor: FC<MainButtonProps> = ({ className }) => {
  return (
    <Button className={className} elevation={3}>
      <span className="text-2xl">T</span>
    </Button>
  );
};
