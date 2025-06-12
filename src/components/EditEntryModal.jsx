import { useState, useEffect } from "react";

function EditEntryModal({ entry, onClose, onUpdate }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [content, setContent] = useState("");

  // Prefill form when entry changes
  useEffect(() => {
    if (entry) {
      setTitle(entry.title);
      setDate(entry.date);
      setImageUrl(entry.imageUrl);
      setContent(entry.content);
    }
  }, [entry]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Use placeholder if imageUrl is empty
    const finalImageUrl =
      imageUrl.trim() === "" ? "/placeholder.jpg" : imageUrl;

    if (!title || !date || !content) {
      alert("Please fill in all fields.");
      return;
    }

    // Pass the updated entry, including its id
    onUpdate({ ...entry, title, date, imageUrl: finalImageUrl, content });
  };

  return (
    <div className="modal-backdrop fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 text-purple-500">
      <div className="bg-white p-6 rounded-lg max-w-md w-full shadow-lg relative">
        <h2 className="text-xl font-semibold mb-4">Edit Entry</h2>
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
            <button type="submit" className="btn btn-primary">
              Update
            </button>
            <button
              type="button"
              className="btn btn-secondary"
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

export default EditEntryModal;
