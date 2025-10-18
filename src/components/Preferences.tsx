import React, { useState } from 'react';
import { FiSettings, FiX } from 'react-icons/fi';
import Modal from './Modal';
import { NEWS_SOURCES } from '../constants/sources';
import { useArrayToggle } from '../hooks/useArrayToggle';

export interface UserPreferences {
  preferredSources: string[];
  preferredCategories: string[];
  preferredAuthors: string[];
}

interface PreferencesProps {
  preferences: UserPreferences;
  onPreferencesChange: (preferences: UserPreferences) => void;
  availableCategories: string[];
}

const Preferences: React.FC<PreferencesProps> = ({
  preferences,
  onPreferencesChange,
  availableCategories,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');

//   toggle source
  const toggleSource = useArrayToggle(
    preferences.preferredSources,
    (newSources) => onPreferencesChange({ ...preferences, preferredSources: newSources })
  );

//   toggle category
  const toggleCategory = useArrayToggle(
    preferences.preferredCategories,
    (newCategories) => onPreferencesChange({ ...preferences, preferredCategories: newCategories })
  );

//   add author to personlized filter
  const addAuthor = () => {
    if (newAuthor.trim() && !preferences.preferredAuthors.includes(newAuthor.trim())) {
      onPreferencesChange({
        ...preferences,
        preferredAuthors: [...preferences.preferredAuthors, newAuthor.trim()],
      });
      setNewAuthor('');
    }
  };

  //   remove author to personlized filter
  const removeAuthor = (author: string) => {
    onPreferencesChange({
      ...preferences,
      preferredAuthors: preferences.preferredAuthors.filter(a => a !== author),
    });
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-lg cursor-pointer transition"
        title="Preferences"
      >
        <FiSettings className="text-xl text-white" />
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Your Preferences"
        className="mb-6"
      >

            <div className="space-y-6">
              <div>
                <h3 className="text-base text-black font-semibold mb-1">Preferred Sources</h3>
                <p className="text-sm text-gray-600 mb-3">Select your favorite news sources</p>
                <div className="space-y-2">
                  {NEWS_SOURCES.map((source) => (
                    <label key={source.value} className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="checkbox"
                        checked={preferences.preferredSources.includes(source.value)}
                        onChange={() => toggleSource(source.value)}
                        className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span>{source.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {availableCategories.length > 0 && (
                <div>
                  <h3 className="text-base text-black font-semibold mb-1">Preferred Categories</h3>
                  <p className="text-sm text-gray-600 mb-3">Choose topics you're interested in</p>
                  <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                    {availableCategories.map((category) => (
                      <label key={category} className="flex items-center gap-2 p-2 border rounded cursor-pointer hover:bg-gray-50">
                        <input
                          type="checkbox"
                          checked={preferences.preferredCategories.includes(category)}
                          onChange={() => toggleCategory(category)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-base text-black font-semibold mb-1">Preferred Authors</h3>
                <p className="text-sm text-gray-600 mb-3">Add authors you want to follow</p>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addAuthor()}
                    placeholder="Enter author name"
                    className="flex-1 px-3 py-2 border rounded-lg focus:outline-none "
                  />
                  <button
                    onClick={addAuthor}
                    className="px-4 py-2 bg-black text-white rounded-lg"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {preferences.preferredAuthors.map((author) => (
                    <span
                      key={author}
                      className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {author}
                      <button onClick={() => removeAuthor(author)} className="hover:text-accent-light">
                        <FiX />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

        <button
          onClick={() => setIsOpen(false)}
          className="w-full mt-6 bg-black text-white py-3 rounded-lg  transition font-semibold"
        >
          Save Preferences
        </button>
      </Modal>
    </>
  );
};

export default Preferences;
