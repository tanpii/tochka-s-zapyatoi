import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/app/store';

type BooksFilterState = {
  bookTitle?: string;
  authorName?: string;
  genres?: number[];  // Теперь genres это массив чисел (идентификаторов)
};

const initialState: BooksFilterState = {
  bookTitle: undefined,
  authorName: undefined,
  genres: [],
};

export const booksFilterSlice = createSlice({
  name: 'booksFilter',
  initialState,
  reducers: {
    setBookTitle: (state, action: PayloadAction<string | undefined>) => {
      state.bookTitle = action.payload;
    },
    setAuthorName: (state, action: PayloadAction<string | undefined>) => {
      state.authorName = action.payload;
    },
    setGenres: (state, action: PayloadAction<number[] | undefined>) => {
      state.genres = action.payload;
    },
    resetFilters: (state) => {
      state.bookTitle = undefined;
      state.authorName = undefined;
      state.genres = [];
    },
  },
});

export const getBookTitleFilter = (state: RootState) => state.booksFilter.bookTitle;

export const getAuthorNameFilter = (state: RootState) => state.booksFilter.authorName;

export const getGenresFilter = (state: RootState) => state.booksFilter.genres;

export const { setBookTitle, setAuthorName, setGenres, resetFilters } = booksFilterSlice.actions;

export default booksFilterSlice.reducer;
