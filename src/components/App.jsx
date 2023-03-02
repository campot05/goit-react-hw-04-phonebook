import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';

function App() {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const submitFormData = ({ name, number }) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    for (const contact of contacts) {
      if (contact.name === name) {
        return Notify.failure(`${name} is already in contacts.`);
      }
    }

    setContacts(prev => [newContact, ...prev]);
  };

  const filtered = e => {
    setFilter(e.currentTarget.value);
  };

  const visibleContact = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const deleteContact = id => {
    setContacts(contacts.filter(el => el.id !== id));
  };

  return (
    <div className="thumb">
      <h1>Phonebook</h1>
      <ContactForm onSubmit={submitFormData} data={contacts} />
      <h2>Contacts</h2>
      <Filter value={filter} filter={filtered} />
      <ContactList contacts={visibleContact()} deleteContact={deleteContact} />
    </div>
  );
}

export default App;
