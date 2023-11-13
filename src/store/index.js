import {create} from 'zustand';

export const useStore = create((set, get) => ({
  actionNames: ['Idle', 'Sitting Down', 'Standing Up', 'Waving', 'Arm Gesture', 'Clapping', 'Surprised'],
  actionName: 'Sitting Down',
  actionNameIndex: 0,
  actionNamesLength: 7,
  prevActionName: undefined,
  playNext: async () => {
    const prevActionName = get().actionName;
    const actionNameIndex = (prevActionName == "Idle") ? Math.floor(Math.random() * (6 - 5 + 1) + 5) : ( prevActionName == "Sitting Down" ) ? 1 : 0;
    const actionName = get().actionNames[actionNameIndex];
    set({ actionName, actionNameIndex, prevActionName });
  },

  play: async (actionNameIndex) => {
    const prevActionName = get().actionName;
    const actionName = get().actionNames[actionNameIndex];
    set({ actionName, actionNameIndex, prevActionName });
  },
  idle: async () => {
    const prevActionName = get().actionName;
    const actionNameIndex = 0;
    const actionName = "Idle";
    set({ actionName, actionNameIndex, prevActionName });
  }
}))