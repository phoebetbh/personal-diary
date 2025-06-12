import { useState, useEffect } from "react";
import EntryList from "./components/EntryList.jsx";
import AddEntryModal from "./components/AddEntryModal.jsx";
import EntryDetailsModal from "./components/EntryDetailsModal.jsx";
import EditEntryModal from "./components/EditEntryModal.jsx";
import { BrowserRouter, Link, Outlet, Route, Routes } from "react-router";

function App() {
  const [entries, setEntries] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false); // New state for edit modal
  const [entryToEdit, setEntryToEdit] = useState(null); // Store the entry being edited

  // Load from localStorage on startup
  useEffect(() => {
    const storedEntries = localStorage.getItem("diaryEntries");
    if (storedEntries) {
      setEntries(JSON.parse(storedEntries));
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem("diaryEntries", JSON.stringify(entries));
  }, [entries]);

  const addEntry = (newEntry) => {
    const exists = entries.some((entry) => entry.date === newEntry.date);
    if (exists) {
      alert(
        "An entry for this date already exists. Please choose another date."
      );
      return;
    }
    const entryWithId = { ...newEntry, id: Date.now() };
    setEntries([entryWithId, ...entries]);
    setShowAddModal(false);
  };

  // Handle editing an entry
  const handleEditEntry = (editedEntry) => {
    setEntries((prevEntries) =>
      prevEntries.map((entry) =>
        entry.id === editedEntry.id ? editedEntry : entry
      )
    );
  };

  const handleEditClick = (entry) => {
    setEntryToEdit(entry);
    setShowEditModal(true);
  };

  // Handle deleting an entry
  const handleDeleteEntry = (entryToDelete) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      setEntries((prevEntries) =>
        prevEntries.filter((entry) => entry.id !== entryToDelete.id)
      );
    }
  };

  const handleCardClick = (entry) => {
    setSelectedEntry(entry);
    setShowDetailModal(true);
  };

  return (
    <div
      className="min-h-screen flex flex-col relative bg-svg"
      style={{
        fontFamily: "'Pacifico', cursive",
        backgroundColor: "#E6E6FA",
        color: "#4B0082",
      }}
    >
      {/* Google Font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap"
        rel="stylesheet"
      />

      {/* Navigation */}
      <nav className="flex justify-center py-4 mb-4">
        <ul className="flex space-x-8 font-semibold text-lg text-[#9370DB]">
          <li>
            <a className="hover:text-purple-600 cursor-pointer" href="#travel">
              Travel Diary
            </a>
          </li>
          <li>
            <a className="hover:text-purple-600 cursor-pointer" href="#food">
              Food Diary
            </a>
          </li>
          <li>
            <a
              className="hover:text-purple-600 cursor-pointer"
              href="#personal"
            >
              Personal Diary
            </a>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="flex-1 container mx-auto p-4 flex flex-col items-center border-4 border-white rounded">
        <h1 className="text-3xl font-bold mb-6 text-center text-[#9370DB]">
          My Personal Diary
        </h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn btn-primary mb-4"
        >
          Add Entry
        </button>

        {/* Entries List */}
        <EntryList
          entries={entries}
          onCardClick={handleCardClick}
          onEdit={handleEditClick}
          onDelete={handleDeleteEntry}
        />

        {/* Modals */}
        {showAddModal && (
          <AddEntryModal
            onClose={() => setShowAddModal(false)}
            onSave={addEntry}
          />
        )}

        {showDetailModal && selectedEntry && (
          <EntryDetailsModal
            entry={selectedEntry}
            onClose={() => {
              setShowDetailModal(false);
              setSelectedEntry(null);
            }}
          />
        )}

        {showEditModal && entryToEdit && (
          <EditEntryModal
            entry={entryToEdit}
            onClose={() => setShowEditModal(false)}
            onUpdate={(updatedEntry) => {
              handleEditEntry(updatedEntry);
              setShowEditModal(false);
            }}
          />
        )}
      </div>

      {/* Footer */}
      <footer
        className="flex items-center justify-center #E6E6FA text-center p-4 mt-auto"
        style={{ fontFamily: "'Dancing Script', cursive" }}
      >
        <p className="flex items-center text-sm space-x-2 text-[#9370DB">
          <span className="text-xl">©</span>
          <span>2025 My Diary App. All Rights Reserved</span>
        </p>
      </footer>
    </div>
  );
}

export default App;
