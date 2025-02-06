import React, { useState } from 'react';

const NewsGenreSelection = () => {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const genres = [
    "Technology", "Sports", "Politics", "Entertainment", 
    "Health", "Science", "Business", "Travel", "Lifestyle", 
    "Education", "Food", "Environment"
  ];

  const toggleSelection = (genre) => {
    setSelectedGenres((prevGenres) => {
      if (prevGenres.includes(genre)) {
        console.log(`Deselected: ${genre}`); // Log deselection
        return prevGenres.filter(item => item !== genre); // Remove genre
      } else {
        console.log(`Selected: ${genre}`); // Log selection
        return [...prevGenres, genre]; // Add genre
      }
    });
  };

  const handleDone = () => {
    if (selectedGenres.length > 0) {
      alert("You selected the following genres: " + selectedGenres.join(", "));
      // Redirect to homepage (adjust the URL to your home page)
      window.location.href = "/home"; // Adjust the URL as needed
    } else {
      alert("Please select at least one genre before proceeding.");
    }
  };

  return (
    <div style={styles.container}>
      <h1>Choose Your Preferred News Genre</h1>
      <div style={styles.buttonsContainer}>
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => toggleSelection(genre)}
            style={{
              ...styles.genreButton,
              background: selectedGenres.includes(genre)
                ? 'linear-gradient(45deg, #1d976c, #93f9b9)' 
                : 'linear-gradient(45deg, #ff416c, #ff4b2b)',
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            {genre}
          </button>
        ))}
      </div>
      <button onClick={handleDone} style={styles.doneButton}>Done</button>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#121212',
    color: 'white',
    textAlign: 'center',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  buttonsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '15px',
  },
  genreButton: {
    border: 'none',
    padding: '15px 30px',
    fontSize: '18px',
    color: 'white',
    cursor: 'pointer',
    borderRadius: '25px',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  doneButton: {
    marginTop: '20px',
    background: 'linear-gradient(45deg, #2193b0, #6dd5ed)',
    border: 'none',
    padding: '15px 30px',
    fontSize: '18px',
    color: 'white',
    cursor: 'pointer',
    borderRadius: '25px',
    transition: 'transform 0.2s, box-shadow 0.2s',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
  },
};

export default NewsGenreSelection;