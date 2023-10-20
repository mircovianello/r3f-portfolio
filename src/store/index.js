import {create} from 'zustand';

export const useStore = create((set, get) => ({
  actionNames: ['Idle', 'Sitting Down', 'Standing Up', 'Waving', 'Arm Gesture', 'Clapping', 'Surprised'],
  actionName: 'Sitting Down',
  actionNameIndex: 0,
  actionNamesLength: 7,
  prevActionName: undefined,
  playNext: () => {
    const prevActionName = get().actionName;
    const actionNameIndex = (get().actionNameIndex + 1) % get().actionNamesLength;
    const actionName = get().actionNames[actionNameIndex];
    set({ actionName, actionNameIndex, prevActionName });
  },
  play: (actionNameIndex) => {
    const prevActionName = get().actionName;
    const actionName = get().actionNames[actionNameIndex];
    set({ actionName, actionNameIndex, prevActionName });
  }
}))