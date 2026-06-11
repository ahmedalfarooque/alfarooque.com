"use client";

import { Send } from "lucide-react";
import { useState } from "react";
import type { Contacts } from "@/types/content";

export function InquiryForm({ contacts }: { contacts: Contacts }) {
  const [department, setDepartment] = useState(contacts.departments[0]?.name ?? "");

  return (
    <form className="glass card" onSubmit={(event) => event.preventDefault()}>
      <h3>{contacts.form.title}</h3>
      <div className="formGrid">
        <label className="field">
          <span>{contacts.form.fields[0]}</span>
          <input name="name" autoComplete="name" />
        </label>
        <label className="field">
          <span>{contacts.form.fields[1]}</span>
          <input name="email" type="email" autoComplete="email" />
        </label>
        <label className="field">
          <span>{contacts.form.fields[2]}</span>
          <input name="phone" autoComplete="tel" />
        </label>
        <label className="field">
          <span>{contacts.form.fields[3]}</span>
          <select value={department} onChange={(event) => setDepartment(event.target.value)}>
            {contacts.departments.map((item) => (
              <option key={item.name}>{item.name}</option>
            ))}
          </select>
        </label>
        <label className="field full">
          <span>{contacts.form.fields[4]}</span>
          <textarea rows={5} />
        </label>
      </div>
      <button className="btn primary" type="submit">
        <Send size={18} />
        {contacts.form.cta}
      </button>
    </form>
  );
}
