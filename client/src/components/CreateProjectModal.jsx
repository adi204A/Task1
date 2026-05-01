import { useState } from "react";

import toast from "react-hot-toast";

import API from "../api/axios";

const CreateProjectModal = ({
  closeModal,
  fetchProjects,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await API.post("/projects", formData);

      toast.success("Project created");

      fetchProjects();

      closeModal();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to create project"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <div className="bg-white p-6 rounded-lg w-[450px]">

        <div className="flex justify-between items-center mb-5">

          <h2 className="text-2xl font-bold">
            Create Project
          </h2>

          <button
            onClick={closeModal}
            className="text-xl"
          >
            ×
          </button>

        </div>


        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="title"
            placeholder="Project Title"
            className="w-full border p-3 mb-4 rounded"
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Project Description"
            rows="4"
            className="w-full border p-3 mb-4 rounded"
            onChange={handleChange}
          />

          <button
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded"
          >
            {
              loading
                ? "Creating..."
                : "Create Project"
            }
          </button>

        </form>

      </div>
    </div>
  );
};

export default CreateProjectModal;