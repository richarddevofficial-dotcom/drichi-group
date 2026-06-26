"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, X, Save, FolderOpen, Search } from "lucide-react";

export default function AdminPortfolio() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    client: "",
    category: "",
    tags: "",
    image: "",
    url: "",
  });

  // Load items
  const loadItems = async () => {
    try {
      const res = await fetch("/api/portfolio");
      const data = await res.json();
      if (data.success) {
        setItems(data.data);
        setFilteredItems(data.data);
      }
    } catch (error) {
      console.error("Failed to load:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  // Search filter
  useEffect(() => {
    if (searchTerm) {
      const filtered = items.filter(
        (item) =>
          item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.client?.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredItems(filtered);
    } else {
      setFilteredItems(items);
    }
  }, [searchTerm, items]);

  // Reset form
  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      client: "",
      category: "",
      tags: "",
      image: "",
      url: "",
    });
    setEditingItem(null);
    setShowForm(false);
  };

  // Open edit form
  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title || "",
      description: item.description || "",
      client: item.client || "",
      category: item.category || "",
      tags: item.tags?.join(", ") || "",
      image: item.image || "",
      url: item.url || "",
    });
    setShowForm(true);
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      tags: formData.tags
        ? formData.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean)
        : [],
    };

    try {
      if (editingItem) {
        await fetch("/api/portfolio", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingItem.id, ...payload }),
        });
        setSuccessMsg("Project updated successfully!");
      } else {
        await fetch("/api/portfolio", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        setSuccessMsg("Project added successfully!");
      }

      resetForm();
      loadItems();

      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (error) {
      console.error("Failed to save:", error);
    }
  };

  // Delete item
  const handleDelete = async (id) => {
    try {
      await fetch(`/api/portfolio?id=${id}`, { method: "DELETE" });
      setDeleteConfirm(null);
      setSuccessMsg("Project deleted successfully!");
      loadItems();
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-brand-orange border-t-transparent" />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-brand-gray-600">
            Portfolio Management
          </h1>
          <p className="text-brand-gray-400 mt-1">{items.length} projects</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="flex items-center justify-center gap-2 rounded-lg bg-brand-orange px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-orange-600 transition-all"
        >
          <Plus size={18} />
          Add Project
        </button>
      </div>

      {/* Success Message */}
      {successMsg && (
        <div className="mb-6 rounded-lg bg-green-50 border border-green-200 p-4 text-sm text-green-700 flex items-center justify-between">
          <span>✅ {successMsg}</span>
          <button
            onClick={() => setSuccessMsg("")}
            className="text-green-500 hover:text-green-700"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-gray-400"
            size={18}
          />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search projects..."
            className="w-full rounded-lg border border-brand-gray-200 pl-10 pr-4 py-2.5 text-sm focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/20"
          />
        </div>
      </div>

      {/* Portfolio List */}
      {filteredItems.length > 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-brand-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-brand-gray-100 bg-brand-gray-50">
                  <th className="text-left px-6 py-4 text-xs font-semibold text-brand-gray-500 uppercase">
                    Project
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-brand-gray-500 uppercase hidden md:table-cell">
                    Category
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-brand-gray-500 uppercase hidden lg:table-cell">
                    Client
                  </th>
                  <th className="text-right px-6 py-4 text-xs font-semibold text-brand-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-gray-100">
                {filteredItems.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-brand-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-brand-orange/10 flex items-center justify-center flex-shrink-0">
                          <FolderOpen size={18} className="text-brand-orange" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-brand-gray-600 truncate">
                            {item.title}
                          </p>
                          <p className="text-xs text-brand-gray-400 truncate">
                            {item.tags?.join(", ")}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <span className="inline-block rounded-full bg-brand-orange/10 px-2.5 py-1 text-xs font-medium text-brand-orange">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-brand-gray-500 hidden lg:table-cell">
                      {item.client}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-2 text-brand-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(item.id)}
                          className="p-2 text-brand-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-brand-gray-100 p-12 text-center">
          <FolderOpen size={48} className="mx-auto text-brand-gray-300 mb-4" />
          <h3 className="text-lg font-bold text-brand-gray-600 mb-2">
            No Projects Found
          </h3>
          <p className="text-brand-gray-400 mb-6">
            {searchTerm
              ? "No projects match your search."
              : "Start by adding your first portfolio project."}
          </p>
          {!searchTerm && (
            <button
              onClick={() => {
                resetForm();
                setShowForm(true);
              }}
              className="inline-flex items-center gap-2 rounded-lg bg-brand-orange px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-orange-600 transition-all"
            >
              <Plus size={18} />
              Add Project
            </button>
          )}
        </div>
      )}

      {/* Add/Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white rounded-t-2xl">
              <h2 className="text-lg font-bold text-brand-gray-600">
                {editingItem ? "Edit Project" : "Add New Project"}
              </h2>
              <button
                onClick={resetForm}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-brand-gray-600 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                  className="w-full rounded-lg border border-brand-gray-200 px-4 py-2.5 text-sm focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/20"
                  placeholder="e.g., PharmaCare Dashboard"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-brand-gray-600 mb-1">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                  rows={3}
                  className="w-full rounded-lg border border-brand-gray-200 px-4 py-2.5 text-sm focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/20 resize-none"
                  placeholder="Describe the project..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-brand-gray-600 mb-1">
                    Client *
                  </label>
                  <input
                    type="text"
                    value={formData.client}
                    onChange={(e) =>
                      setFormData({ ...formData, client: e.target.value })
                    }
                    required
                    className="w-full rounded-lg border border-brand-gray-200 px-4 py-2.5 text-sm focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/20"
                    placeholder="Client name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-brand-gray-600 mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    required
                    className="w-full rounded-lg border border-brand-gray-200 px-4 py-2.5 text-sm focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/20"
                  >
                    <option value="">Select</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Education">Education</option>
                    <option value="E-Commerce">E-Commerce</option>
                    <option value="Real Estate">Real Estate</option>
                    <option value="Non-Profit">Non-Profit</option>
                    <option value="Business">Business</option>
                    <option value="Technology">Technology</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-brand-gray-600 mb-1">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) =>
                    setFormData({ ...formData, tags: e.target.value })
                  }
                  className="w-full rounded-lg border border-brand-gray-200 px-4 py-2.5 text-sm focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/20"
                  placeholder="e.g., Web Development, UI/UX, React"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-brand-gray-600 mb-1">
                  Image Path
                </label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                  className="w-full rounded-lg border border-brand-gray-200 px-4 py-2.5 text-sm focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/20"
                  placeholder="/images/portfolio/project.jpg"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-brand-gray-600 mb-1">
                  Project URL (optional)
                </label>
                <input
                  type="url"
                  value={formData.url}
                  onChange={(e) =>
                    setFormData({ ...formData, url: e.target.value })
                  }
                  className="w-full rounded-lg border border-brand-gray-200 px-4 py-2.5 text-sm focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/20"
                  placeholder="https://example.com"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-brand-orange px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-orange-600 transition-all"
                >
                  <Save size={18} />
                  {editingItem ? "Update Project" : "Add Project"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2.5 text-sm font-semibold text-brand-gray-500 hover:text-brand-gray-600 border border-brand-gray-200 rounded-lg hover:bg-brand-gray-50 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                <Trash2 size={24} className="text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-brand-gray-600 mb-2">
                Delete Project?
              </h3>
              <p className="text-sm text-brand-gray-400 mb-6">
                This action cannot be undone. Are you sure you want to delete
                this project?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 px-4 py-2.5 text-sm font-semibold text-brand-gray-500 border border-brand-gray-200 rounded-lg hover:bg-brand-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirm)}
                  className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-all"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
