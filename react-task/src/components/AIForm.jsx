import { useState } from "react";
import axios from "axios";

export default function AIForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:5000/validate-form", form);

      if (!response.data.isValid) {
        setErrors(response.data.errors || {});
      } else {
        setErrors({});
        alert("Form submitted successfully");
        setForm({
        name: "",
        email: "",
        phone: "",
        address: "",
      });
      }
    } catch (err) {
      console.error("Error during validation:", err);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 p-4 bg-white shadow-lg rounded-xl border border-gray-200"> 
      <h2 className="text-lg font-semibold text-center mb-4">AI Form Validation</h2>

      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className={`w-full p-2 rounded-md text-sm border ${errors.name ? "border-red-600" : "border-gray-300"} shadow-sm focus:ring-1 focus:ring-blue-400`}
        />
        {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
      </div>

     
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className={`w-full p-2 rounded-md text-sm border ${errors.email ? "border-red-600" : "border-gray-300"} shadow-sm focus:ring-1 focus:ring-blue-400`}
        />
        {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
      </div>

      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Phone</label>
        <input
          type="text"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          className={`w-full p-2 rounded-md text-sm border ${errors.phone ? "border-red-600" : "border-gray-300"} shadow-sm focus:ring-1 focus:ring-blue-400`}
        />
        {errors.phone && <p className="text-red-600 text-xs mt-1">{errors.phone}</p>}
      </div>

      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Address</label>
        <textarea
          name="address"
          value={form.address}
          onChange={handleChange}
          className={`w-full p-2 rounded-md text-sm border ${errors.address ? "border-red-600" : "border-gray-300"} shadow-sm focus:ring-1 focus:ring-blue-400`}
        />
        {errors.address && <p className="text-red-600 text-xs mt-1">{errors.address}</p>}
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm shadow-md transition"
      >
        Submit
      </button>
    </div>
  );
}