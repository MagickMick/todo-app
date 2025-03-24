import React, { useState, useEffect } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

function DarkModeToggle() {
  // Haal de opgeslagen voorkeur uit localStorage (indien aanwezig)
  const storedMode = localStorage.getItem('theme') || 'light';
  const [isDarkMode, setIsDarkMode] = useState(storedMode === 'dark');

  // Effect om de body-klasse te wijzigen op basis van de dark mode
  useEffect(() => {
    const body = document.body;
    if (isDarkMode) {
      body.classList.add('dark');
      localStorage.setItem('theme', 'dark'); // Bewaar de voorkeur in localStorage
    } else {
      body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  return (
    <button
      onClick={() => setIsDarkMode(prevMode => !prevMode)} // Toggle dark mode
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-800">
      {isDarkMode ? (
        <MoonIcon className="w-6 h-6 text-gray-600 dark:text-white" />
      ) : (
        <SunIcon className="w-6 h-6 text-yellow-500 dark:text-gray-300" />
      )}
    </button>
  );
}

export default DarkModeToggle;
