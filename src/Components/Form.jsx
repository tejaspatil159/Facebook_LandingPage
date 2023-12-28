import React, { useState, useEffect } from "react";

const Form = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [formEntries, setFormEntries] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    try {
      const existingEntries =
        JSON.parse(localStorage.getItem("formEntries")) || [];
      const updatedEntries = [...existingEntries, formData];
      localStorage.setItem("formEntries", JSON.stringify(updatedEntries));
      setFormEntries(updatedEntries);
      console.log(`Form submitted`);
    } catch (error) {
      console.error(`Error`, error.message);
    }
  };

  useEffect(() => {
    // Load existing entries on component mount
    const existingEntries =
      JSON.parse(localStorage.getItem("formEntries")) || [];
    setFormEntries(existingEntries);
  }, []);

  return (
    <div>
      <form className="" onSubmit={submitHandler}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Login</button>
      </form>

      <div>
        <h2>Form Entries:</h2>
        <ul>
          {formEntries.map((entry, index) => (
            <li key={index}>{JSON.stringify(entry)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Form;
