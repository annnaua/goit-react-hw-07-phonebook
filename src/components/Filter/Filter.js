import { useSelector, useDispatch } from 'react-redux';
import { selectFilteredContacts } from 'redux/selectors';
import { filteredContacts } from 'redux/phonebookSlice';

import { FilterFormLable, FilterFormInput } from './Filter.styled';

export const Filter = () => {
  const dispatch = useDispatch();
  const value = useSelector(selectFilteredContacts);

  const onFilterContacts = e => {
    dispatch(filteredContacts(e.currentTarget.value));
  };

  return (
    <FilterFormLable htmlFor="filterName">
      Find contacts by name
      <FilterFormInput
        type="text"
        id="filterName"
        value={value}
        onChange={onFilterContacts}
      />
    </FilterFormLable>
  );
};
