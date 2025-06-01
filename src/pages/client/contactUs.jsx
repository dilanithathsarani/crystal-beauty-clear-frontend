import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.name && form.email && form.message) {
      toast.success('Your message has been sent!');
      setForm({ name: '', email: '', message: '' });
    } else {
      toast.error('Please fill in all fields.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F6F4] flex flex-col items-center px-4 py-12">
      <h2 className="text-4xl font-bold text-center text-black mb-8">Contact Us</h2>

      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-xl">
        <h3 className="text-2xl font-semibold text-[#86003C] mb-4">Send a Message</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-[#E41F7B] "
          />
          <input
            type="email"
            name="email"
            placeholder="Your email"
            value={form.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-[#E41F7B]"
          />
          <textarea
            name="message"
            placeholder="Your message"
            value={form.message}
            onChange={handleChange}
            rows="4"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-[#E41F7B] resize-none"
          />
          <button
            type="submit"
            className="bg-[#E41F7B] hover:bg-[#FF8BA0] text-white font-semibold py-2 px-6 rounded-md transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}