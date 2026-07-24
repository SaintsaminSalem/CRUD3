import { useState } from "react";
import Input from "./Input";

export default function UserForm({ onSubmit, selectedUser }) {
  const [form, setForm] = useState({
    name: selectedUser?.name || "",
    email: selectedUser?.email || "",
    address: selectedUser?.address || ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const submit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={submit}>
      <Input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
      <Input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
      <Input name="address" value={form.address} onChange={handleChange} placeholder="Address" />
      <button>Save User</button>
    </form>
  );
}