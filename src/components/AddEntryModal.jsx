import { useState } from "react";

function AddEntryModal({ onClose, onSave }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Use placeholder if imageUrl is empty
    const finalImageUrl =
      imageUrl.trim() === "" ? "/placeholder.jpg" : imageUrl;
    if (!title || !date || !content) {
      alert("Please fill in all fields.");
      return;
    }

    onSave({ title, date, imageUrl: finalImageUrl, content });
  };

  return (
    <div className="modal-backdrop fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 text-purple-500">
      <div className="bg-white p-6 rounded-lg max-w-md w-full shadow-lg relative">
        <h2 className="text-xl font-semibold mb-4">Add New Entry</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block mb-1 font-medium">Title</label>
            <input
              className="w-full border border-gray-300 rounded p-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Date</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded p-2"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Image URL</label>
            <input
              className="w-full border border-gray-300 rounded p-2"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Content</label>
            <textarea
              className="w-full border border-gray-300 rounded p-2"
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-1 px-3 rounded"
            >
              Save
            </button>
            <button
              type="button"
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-1 px-3 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEntryModal;
