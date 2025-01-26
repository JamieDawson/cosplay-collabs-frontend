import { useState } from "react";
import { locationData } from "../../Data/locations";
import "./CreateAdForm.css";

const CreateAdForm: React.FC = () => {
  const [formData, setFormData] = useState({
    user_id: "", // User ID creating the ad
    title: "",
    description: "",
    country: "",
    state: "",
    city: "",
    instagramPostUrl: "",
    keywords: ["", "", "", ""],
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear dependent fields when higher-level fields change
    if (name === "country") {
      setFormData({ ...formData, country: value, state: "", city: "" });
    } else if (name === "state") {
      setFormData({ ...formData, state: value, city: "" });
    }
  };

  const handleKeywordChange = (index: number, value: string) => {
    const updatedKeywords = [...formData.keywords];
    updatedKeywords[index] = value;
    setFormData({ ...formData, keywords: updatedKeywords });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Remove the `id` field before submitting the request
    const { ...adData } = formData; // No need to remove `id` anymore, it's not in the state

    try {
      // Change URL to your backend's full address
      const response = await fetch("http://localhost:3000/api/ads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(adData),
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

  // Get dynamic options based on selections
  const countryOptions = Object.keys(locationData.countries);

  // Type guard to narrow down the type of locationData.countries
  const isCountryValid = (
    country: string | number | symbol,
    countries: (typeof locationData)["countries"]
  ): country is keyof typeof countries => {
    return typeof country === "string" && country in countries;
  };

  // Safely access state options
  const stateOptions =
    formData.country && formData.country in locationData.countries
      ? Object.keys(
          (
            locationData.countries as {
              [key: string]: { states: Record<string, string[]> };
            }
          )[formData.country].states
        )
      : [];

  const cityOptions =
    formData.state &&
    formData.country &&
    formData.country in locationData.countries &&
    formData.state in
      (
        locationData.countries as {
          [key: string]: { states: Record<string, string[]> };
        }
      )[formData.country].states
      ? (
          locationData.countries as {
            [key: string]: { states: Record<string, string[]> };
          }
        )[formData.country].states[formData.state]
      : [];

  return (
    <form onSubmit={handleSubmit}>
      {/* Removed id field as it is automatically generated */}
      <input
        name="user_id"
        placeholder="User ID"
        value={formData.user_id}
        onChange={handleChange}
        required
      />
      <input
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      />
      <select name="country" value={formData.country} onChange={handleChange}>
        <option value="">Select Country</option>
        {countryOptions.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>
      <select
        name="state"
        value={formData.state}
        onChange={handleChange}
        disabled={!formData.country}
      >
        <option value="">Select State</option>
        {stateOptions.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>
      <select
        name="city"
        value={formData.city}
        onChange={handleChange}
        disabled={!formData.state}
      >
        <option value="">Select City</option>
        {cityOptions.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
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
