import React, { useState } from "react";
import "./CreateAdForm.css";

const CreateAdForm: React.FC = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    country: "",
    state: "",
    city: "",
    instagramPostUrl: "",
    keywords: ["", "", "", ""], // Allow up to 4 keywords
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleKeywordChange = (index: number, value: string) => {
    const updatedKeywords = [...formData.keywords];
    updatedKeywords[index] = value;
    setFormData({ ...formData, keywords: updatedKeywords });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/ads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Ad created successfully!");
      } else {
        alert("Failed to create ad.");
      }
    } catch (error) {
      console.error("Error creating ad:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      />
      <input
        name="country"
        placeholder="Country"
        value={formData.country}
        onChange={handleChange}
      />
      <input
        name="state"
        placeholder="State"
        value={formData.state}
        onChange={handleChange}
      />
      <input
        name="city"
        placeholder="City"
        value={formData.city}
        onChange={handleChange}
      />
      <input
        name="instagramPostUrl"
        placeholder="Instagram Post URL"
        value={formData.instagramPostUrl}
        onChange={handleChange}
      />
      {formData.keywords.map((keyword, index) => (
        <input
          key={index}
          placeholder={`Keyword ${index + 1}`}
          value={keyword}
          onChange={(e) => handleKeywordChange(index, e.target.value)}
        />
      ))}
      <button type="submit">Create Ad</button>
    </form>
  );
};

export default CreateAdForm;
