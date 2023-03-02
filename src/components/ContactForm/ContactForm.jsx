import { useState } from 'react';
import css from './ContactForm.module.css';

function ContactForm({ onSubmit }) {
  //   const [name, setName] = useState(' ');
  //   const [number, setNumber] = useState(' ');

  //   const handleChange = e => {
  //     const name = e.currentTarget.name;
  //     if (name === 'name') {
  //       setName(e.currentTarget.value);
  //     }
  //     if (name === 'number') {
  //       setNumber(e.currentTarget.value);
  //     }
  //   };

  //   const handleSubmit = e => {
  //     e.preventDefault();
  //     onSubmit(name, number);

  //     reset();
  //   };

  //   const reset = () => {
  //     setName('');
  //     setNumber('');
  //   };

  const [formData, setFormData] = useState({
    name: '',
    number: '',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(formData);

    reset();
  };

  const reset = () => {
    setFormData({
      name: '',
      number: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className={css.contactForm}>
      <label>
        Name <br />
        <input
          className={css.input}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={formData.name}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Number <br />
        <input
          className={css.input}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={formData.number}
          onChange={handleChange}
        />
      </label>
      <br />
      <button className={css.btn} type="submit">
        Add contact
      </button>
    </form>
  );
}

export default ContactForm;
