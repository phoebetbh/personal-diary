function EntryDetailsModal({ entry, onClose }) {
  return (
    <div className="modal-backdrop fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-2xl w-full shadow-lg relative overflow-y-auto max-h-[80%]">
        <h2 className="text-2xl font-semibold mb-2">{entry.title}</h2>
        <p className="text-sm text-gray-600 mb-4">{entry.date}</p>
        <img
          src={entry.imageUrl}
          alt={entry.title}
          className="w-full h-64 object-cover mb-4 rounded"
        />
        <p className="mb-4">{entry.content}</p>
        <button
          className="btn btn-secondary absolute top-2 right-2"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default EntryDetailsModal;
