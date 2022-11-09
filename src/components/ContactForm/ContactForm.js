import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addContact } from 'redux/operations';
import { selectContacts } from 'redux/selectors';

import {
  ContactFormList,
  ContactFormLable,
  ContactFormInput,
  ContactFormButton,
} from './ContactForm.styled';

export const ContactForm = () => {
  const dispatch = useDispatch();

  const [contactName, setContactName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const contacts = useSelector(selectContacts);

  const handleNameChange = e => setContactName(e.target.value);
  const handleNumberChange = e => setContactNumber(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();

    if (
      contacts.find(
        ({ name }) => name.toLowerCase() === contactName.toLowerCase()
      )
    ) {
      return alert(`${contactName} is already in contacts.`);
    }
    handleAddContact(contactName, contactNumber);

    resetForm();
  };

  const handleAddContact = (name, phone) => {
    dispatch(addContact({ name, phone }));
  };

  const resetForm = () => {
    setContactName('');
    setContactNumber('');
  };

  return (
    <ContactFormList autoComplete="off" onSubmit={handleSubmit}>
      <ContactFormLable htmlFor="inputName">Name</ContactFormLable>

      <ContactFormInput
        type="text"
        name="name"
        value={contactName}
        id="inputName"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        onChange={handleNameChange}
      />

      <ContactFormLable htmlFor="inputNumber">Number</ContactFormLable>

      <ContactFormInput
        type="tel"
        name="number"
        value={contactNumber}
        id="inputNumber"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        onChange={handleNumberChange}
      />

      <ContactFormButton type="submit">Add contact</ContactFormButton>
    </ContactFormList>
  );
};
