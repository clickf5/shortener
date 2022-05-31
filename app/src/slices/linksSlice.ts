import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';

export interface Link {
  id: string;
  url: string;
};

export const linksSlice = createSlice({
  name: 'links',
  initialState: [] as Link[],
  reducers: {
    addLink: {
      reducer: (state, action: PayloadAction<Link>) => {
        state.unshift(action.payload);
      },
      prepare: (url: string) => {
        const id = nanoid();
        return { payload: { id, url } };
      },
    },
    removeLink: (state, action: PayloadAction<string>) => {
      return state.filter(({ id }) => id !== action.payload);
    },
  },
});

export const { addLink, removeLink } = linksSlice.actions;

export default linksSlice.reducer;
