import {create} from 'zustand';

let timeout = null;

export const useStore = create((set, get) => ({
  actionNames: ['Idle', 'Sitting Down', 'Standing Up', 'Waving', 'Arm Gesture', 'Clapping', 'Surprised'],
  actionName: 'Sitting Down',
  actionNameIndex: 0,
  actionNamesLength: 7,
  prevActionName: undefined,
  playNext: () => {
    const prevActionName = get().actionName;
    const actionNameIndex = (prevActionName == "Idle") ? Math.floor(Math.random() * (6 - 5 + 1) + 5) : 0;
    const actionName = get().actionNames[actionNameIndex];
    set({ actionName, actionNameIndex, prevActionName });
    timeout = setTimeout(() => { get().idle(); }, 4000);
  },

  play: (actionNameIndex) => {
    const prevActionName = get().actionName;
    const actionName = get().actionNames[actionNameIndex];
    set({ actionName, actionNameIndex, prevActionName });
    return () => clearTimeout(timeout);
  },
  idle: () => {
    const prevActionName = get().actionName;
    const actionNameIndex = 0;
    const actionName = "Idle";
    set({ actionName, actionNameIndex, prevActionName });
    timeout = setTimeout(() => {
      get().playNext();
    }, 50000);
  }
}))