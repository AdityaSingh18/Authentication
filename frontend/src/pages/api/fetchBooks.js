// api/fetchBooks.js
const fetchBooks = async () => {
  try {
    const response = await fetch('http://localhost:3001/api/books'); // Update the URL based on your actual backend API endpoint
    if (!response.ok) {
      throw new Error('Failed to fetch books');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching books:', error.message);
    return [];
  }
};

export default fetchBooks;
