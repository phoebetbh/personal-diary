import EntryCard from "./EntryCard.jsx";

function EntryList({ entries, onCardClick, onEdit, onDelete }) {
  if (entries.length === 0) {
    return (
      <p className="col-span-full text-center text-[#4B0082]">
        No entries yet.
      </p>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 w-full max-w-4xl">
      {entries.map((entry, index) => (
        <EntryCard
          key={entry.id || index} // use unique id if available
          entry={entry}
          onClick={() => onCardClick(entry)}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default EntryList;
