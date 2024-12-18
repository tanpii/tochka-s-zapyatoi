import { Select } from '@gravity-ui/uikit';
import { useGetGenreListQuery } from '@/shared/api/book/api';

export interface GenreFilterProps {
  selectedGenres?: number[];
  onChange: (newGenreIds: number[]) => void;
}

export const GenreFilter = ({ selectedGenres, onChange }: GenreFilterProps) => {
  const { data } = useGetGenreListQuery(); 
  const genreFilters = data?.map(({ genreId, genreName }) => {return { value: genreId.toString(), content: genreName }})

  const handleGenreChange = (newGenreIds: string[]) => {
    onChange(newGenreIds.map((id) => Number(id)));
  };

  return (
    <Select
      placeholder={'Жанр книги'}
      multiple={true}
      options={genreFilters}
      filterable={true}
      width={200}
      value={selectedGenres?.map((id) => id.toString())}
      onUpdate={handleGenreChange}
    />
  );
};

export default GenreFilter;
