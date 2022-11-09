import { useSelector, useDispatch } from 'react-redux';

import {
  selectContacts,
  selectIsLoading,
  selectError,
  selectFilteredContacts,
} from 'redux/selectors';
import { deleteContact } from 'redux/operations';

import { List, ContactListItem, ContactListButton } from './ContactList.styled';

export const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const filterContacts = useSelector(selectFilteredContacts);
  const normalized = filterContacts.toLocaleLowerCase();

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLocaleLowerCase().includes(normalized)
  );

  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  return (
    <>
      {error && (
        <p style={{ fontSize: 24, fontWeight: 600, color: 'red' }}>
          Что-то пошло не так...
        </p>
      )}

      {isLoading && !error && (
        <p style={{ fontSize: 24, fontWeight: 600 }}>Загрузка...</p>
      )}

      <List>
        {filteredContacts.map(({ id, name, phone }) => {
          return (
            <ContactListItem key={id}>
              <span>{name} :</span>
              <span>{phone} </span>
              <ContactListButton
                type="button"
                onClick={() => dispatch(deleteContact(id))}
              >
                Delete
              </ContactListButton>
            </ContactListItem>
          );
        })}
      </List>
    </>
  );
};
