
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import fetchBooks from '../api/fetchBooks';

const Books = ({ books }) => {

  const authState = useSelector(state => state.auth);
  const { token, isLoggedIn } = authState;

  
  const [loading, setLoading] = useState(true);
  
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 10;


  useEffect(() => {
    if (!token || !isLoggedIn) {
     
      window.location.href = '/Login';
    } else {
      
      const timeout = setTimeout(() => {
        setLoading(false);
      }, 500); 
      return () => clearTimeout(timeout);
    }
  }, [token, isLoggedIn]);

  // Logic to paginate books
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  
  return (
    <div>
      <h1 className='h1' style={{ textAlign: 'center' }}>Book Listings</h1>
      {books.length === 0 ? (
        <p>No books available.</p>
      ) : (
        <>
          <div style={styles.booksContainer}>
            {currentBooks.map((book) => (
              <div key={book.id} style={styles.bookItem}>
                <Link href={{
                  pathname: `/books/${encodeURIComponent(book.id)}`,
                  query: { 
                    id: book.id, 
                    bookTitle: book.title || 'Unknown Title',
                    likeCount: book.likeCount || 0,
                    dislikeCount: book.dislikeCount || 0,
                    imgLink: book.imgLink || 'https://via.placeholder.com/150',
                  },
                }}>
                  <div>
                    <img src={book.imgLink || 'https://via.placeholder.com/150'} alt={`${book.title || 'Unknown Title'} Cover`} style={styles.image} />
                    <p>{book.title || 'Unknown Title'}</p>
                  </div>
                </Link>
                <div>
                  <p>Likes: {book.likeCount || 0}</p>
                  <p>Dislikes: {book.dislikeCount || 0}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            {Array.from({ length: Math.ceil(books.length / booksPerPage) }).map((_, index) => (
              <button key={index} onClick={() => paginate(index + 1)} style={styles.button}>
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export const getStaticProps = async () => {
  const books = await fetchBooks();
  console.log('books in static', books);

  return {
    props: {
      books,
    },
  };
};

export default Books;

const styles = {
  booksContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  bookItem: {
    width: '45%', 
    margin: '10px',
    textAlign: 'center',
    border: '1px solid #ccc',
    padding: '10px',
  },
  image: {
    maxWidth: '100%',
    height: 'auto',
  },
  button: {
    marginRight: '5px',
  },
};
