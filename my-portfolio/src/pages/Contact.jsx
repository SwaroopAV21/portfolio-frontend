import { useState } from 'react';
import { sendContact } from '../api/contactApi';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendContact(form);
      setStatus('Message sent!');
    } catch {
      setStatus('Something went wrong.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Name" />
      <input value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="Email" />
      <textarea value={form.message} onChange={e => setForm({...form, message: e.target.value})} />
      <button type="submit">Send</button>
      {status && <p>{status}</p>}
    </form>
  );
}