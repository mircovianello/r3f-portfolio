// zustand
import {create} from 'zustand';

// state for animation playback
export const useStore = create((set, get) => ({
  actionNames: ['Idle', 'Clapping', 'Surprised'],
  actionName: 'Idle',
  actionNameIndex: 0,
  actionNamesLength: 3,
  prevActionName: undefined,
  playNext: () => {
    const prevActionName = get().actionName;
    const actionNameIndex = (get().actionNameIndex + 1) % get().actionNamesLength;
    const actionName = get().actionNames[actionNameIndex];
    set({ actionName, actionNameIndex, prevActionName });
  }
}))
