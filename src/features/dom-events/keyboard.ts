import { createBaseStore } from 'shared/lib/effector';

const [$ctrlKeyEnabled, setCtrlKeyEnabled] = createBaseStore(false);

window.addEventListener('keydown', e => {
  if (e.ctrlKey || e.metaKey) {
    setCtrlKeyEnabled(true);
  }
});

window.addEventListener('keyup', () => {
  setCtrlKeyEnabled(false);
});

export { $ctrlKeyEnabled };
