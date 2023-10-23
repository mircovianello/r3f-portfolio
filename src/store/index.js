import {create} from 'zustand';

export const useStore = create((set, get) => ({
  actionNames: ['Idle', 'Sitting Down', 'Standing Up', 'Waving', 'Arm Gesture', 'Clapping', 'Surprised'],
  actionName: 'Sitting Down',
  actionNameIndex: 0,
  actionNamesLength: 7,
  prevActionName: undefined,
  playNext: () => {
    const prevActionName = get().actionName;
    const actionNameIndex = Math.floor(Math.random() * (6 - 5 + 1) + 5);
    const actionName = get().actionNames[actionNameIndex];
    set({ actionName, actionNameIndex, prevActionName });
    setTimeout(() => { get().idle(); }, 3000);
  },
  play: (actionNameIndex) => {
    const prevActionName = get().actionName;
    const actionName = get().actionNames[actionNameIndex];
    set({ actionName, actionNameIndex, prevActionName });
  },
  idle: () => {
    const prevActionName = get().actionName;
    const actionNameIndex = 0;
    const actionName = "Idle";
    set({ actionName, actionNameIndex, prevActionName });
    const interval = setInterval(() => {
      get().playNext();
    }, 60000);
    return () => clearInterval(interval);
  }
}))