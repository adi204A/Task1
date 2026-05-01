import { useEffect, useState } from "react";
import Layout from "../../components/Layout.jsx";
import API from "../../api/axios";
import toast from "react-hot-toast";

const RegisterMember = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [members, setMembers] = useState([]);
  const [fetchingMembers, setFetchingMembers] = useState(true);

  // ── fetch existing members ──────────────────────────────────────────────
  const fetchMembers = async () => {
    try {
      const { data } = await API.get("/users/members");
      setMembers(data);
    } catch (error) {
      console.error(error);
    } finally {
      setFetchingMembers(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  // ── form handlers ───────────────────────────────────────────────────────
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post("/auth/admin/register-member", formData);
      toast.success("Member registered successfully!");
      setFormData({ name: "", email: "", password: "" });
      fetchMembers();           // refresh the list
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to register member"
      );
    } finally {
      setLoading(false);
    }
  };

  // ── render ──────────────────────────────────────────────────────────────
  return (
    <Layout>

      <div className="max-w-2xl mx-auto">

        {/* Page heading */}
        <h1 className="text-4xl font-bold mb-8">Register Member</h1>

        {/* ── Registration form ─────────────────────────────────────── */}
        <div className="bg-white p-8 rounded-xl shadow mb-10">

          <h2 className="text-xl font-semibold mb-6 text-gray-700">
            Add a new team member
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                placeholder="e.g. John Doe"
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                placeholder="e.g. john@example.com"
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Temporary Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                placeholder="Min. 6 characters"
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                onChange={handleChange}
                required
                minLength={6}
              />
            </div>

            <div className="pt-2">
              <span className="inline-block bg-gray-100 text-gray-500 text-xs px-3 py-1 rounded-full mb-4">
                Role: Member (fixed)
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition disabled:opacity-50"
            >
              {loading ? "Registering..." : "Register Member"}
            </button>

          </form>
        </div>

        {/* ── Existing Members list ──────────────────────────────────── */}
        <div className="bg-white p-8 rounded-xl shadow">

          <h2 className="text-xl font-semibold mb-6 text-gray-700">
            Registered Members
          </h2>

          {fetchingMembers ? (
            <p className="text-gray-400">Loading members...</p>
          ) : members.length === 0 ? (
            <p className="text-gray-400">No members registered yet.</p>
          ) : (
            <div className="divide-y">
              {members.map((member) => (
                <div
                  key={member._id}
                  className="flex items-center justify-between py-3"
                >
                  <div>
                    <p className="font-semibold text-gray-800">{member.name}</p>
                    <p className="text-sm text-gray-500">{member.email}</p>
                  </div>
                  <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-medium">
                    Member
                  </span>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>

    </Layout>
  );
};

export default RegisterMember;
