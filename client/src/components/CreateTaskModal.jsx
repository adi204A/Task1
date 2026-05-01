import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import API from "../api/axios";

const CreateTaskModal = ({
  closeModal,
  fetchTasks,
}) => {
  const [projects, setProjects] = useState([]);
  const [members, setMembers] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
    assignedTo: "",
    project: "",
  });

  const fetchProjects = async () => {
    try {
      const { data } = await API.get("/projects");
      setProjects(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMembers = async () => {
    try {
      const { data } = await API.get("/users/members");
      setMembers(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchMembers();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/tasks", formData);

      toast.success("Task created");

      fetchTasks();

      closeModal();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to create task"
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <div className="bg-white p-6 rounded-lg w-[500px] max-h-[90vh] overflow-y-auto">

        <div className="flex justify-between items-center mb-5">

          <h2 className="text-2xl font-bold">
            Create Task
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
            placeholder="Task Title"
            className="w-full border p-3 mb-4 rounded"
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            rows="4"
            className="w-full border p-3 mb-4 rounded"
            onChange={handleChange}
            required
          />

          <input
            type="date"
            name="dueDate"
            className="w-full border p-3 mb-4 rounded"
            onChange={handleChange}
            required
          />

          <select
            name="priority"
            className="w-full border p-3 mb-4 rounded"
            onChange={handleChange}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          {/* Assign To member dropdown */}
          <select
            name="assignedTo"
            className="w-full border p-3 mb-4 rounded"
            onChange={handleChange}
          >
            <option value="">Assign To (optional)</option>
            {members.map((member) => (
              <option key={member._id} value={member._id}>
                {member.name} — {member.email}
              </option>
            ))}
          </select>

          <select
            name="project"
            className="w-full border p-3 mb-4 rounded"
            onChange={handleChange}
            required
          >
            <option value="">Select Project</option>

            {
              projects.map((project) => (
                <option
                  key={project._id}
                  value={project._id}
                >
                  {project.title}
                </option>
              ))
            }

          </select>

          <button className="w-full bg-black text-white py-3 rounded">
            Create Task
          </button>

        </form>

      </div>
    </div>
  );
};

export default CreateTaskModal;