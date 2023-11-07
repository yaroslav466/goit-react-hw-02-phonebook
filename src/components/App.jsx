import { nanoid } from 'nanoid';
import { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      { id: 'id-5', name: 'John Doe', number: '123-45-67' },
      { id: 'id-6', name: 'Alice Johnson', number: '987-65-43' },
      { id: 'id-7', name: 'Bob Smith', number: '555-55-55' },
      { id: 'id-8', name: 'Emma Brown', number: '888-88-88' },
      { id: 'id-9', name: 'James Wilson', number: '999-99-99' },
    ],
    filter: '',
  };

  handleAddContact = (name, number, resetForm) => {
    const { contacts } = this.state;

    if (
      contacts.some(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert(`A contact with the name "${name}" already exists.`);
      return;
    }

    const newContact = {
      name: name,
      number: number,
      id: nanoid(),
    };

    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
    resetForm(); //передав з ContactForm.jsx щоб скинути форму тільки за умови якщо контакт додався, якщо вибило алерт на 32стрічці -  то щоб не сикдалось.
  };

  handleDeleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  handleFilterChange = evt => {
    this.setState({ filter: evt.target.value.toLowerCase() });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter)
    );
  };

  render() {
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm handleAddContact={this.handleAddContact} />

        <h2>Contacts</h2>
        <Filter
          filter={this.state.filter}
          handleFilterChange={this.handleFilterChange}
        />
        <ContactList
          contacts={this.getFilteredContacts()}
          handleDeleteContact={this.handleDeleteContact}
        />
      </div>
    );
  }
}