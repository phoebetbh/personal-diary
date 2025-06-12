function EntryCard({ entry, onClick, onEdit, onDelete }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div
      className="card card-bordered bg-white shadow-lg cursor-pointer hover:scale-105 transition-transform duration-200"
      onClick={onClick}
    >
      <img
        src={entry.imageUrl}
        className="card-img-top object-cover h-48 w-full rounded-lg"
        alt={entry.title}
      />
      <div className="p-4">
        <h5 className="card-title mb-2 font-semibold">{entry.title}</h5>
        <p className="text-sm text-gray-600">
          {entry.content.substring(0, 100)}...
        </p>
        <p className="text-xs text-gray-400 mt-2">
          <small>{formatDate(entry.date)}</small>
        </p>
        {/* Buttons container */}
        <div className="mt-4 flex space-x-2">
          {/* Edit Button */}
          <button
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-1 px-3 rounded"
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering card click
              onEdit(entry);
            }}
          >
            Edit
          </button>
          {/* Delete Button */}
          <button
            className="bg-purple-900 hover:bg-purple-800 text-white font-semibold py-1 px-3 rounded"
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering card click
              onDelete(entry);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default EntryCard;
