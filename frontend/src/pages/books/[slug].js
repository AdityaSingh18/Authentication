
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';


const BookDetail = () => {
 
  const router = useRouter();

  const { id } = router.query;


  const token = useSelector(state => state.auth.token);

 
  const [bookDetails, setBookDetails] = useState(null);
  const [likedByUser, setLikedByUser] = useState(false);
  const [dislikedByUser, setDislikedByUser] = useState(false);

 
  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        
        const response = await axios.get(`http://localhost:3001/api/books/${id}`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        
        setBookDetails(response.data);
       
        setLikedByUser(response.data.likedByUser);
        setDislikedByUser(response.data.dislikedByUser);
      } catch (error) {
        console.error('Error fetching book details:', error.message);
      }
    };

    
    if (id && token) {
      fetchBookDetails();
    }
  }, [id, token]);

 
  const handleLike = async () => {
    try {
     
      await axios.post(
        `http://localhost:3001/api/books/${id}/like`,
        null,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
    
      const updatedBookDetails = await axios.get(`http://localhost:3001/api/books/${id}`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      
      setBookDetails(updatedBookDetails.data);
    
      setLikedByUser(true);
    
      if (dislikedByUser) {
        setDislikedByUser(false);
      }
    } catch (error) {
      console.error('Error liking the book:', error.message);
    }
  };

  
  const handleDislike = async () => {
    try {
      
      await axios.post(
        `http://localhost:3001/api/books/${id}/dislike`,
        null,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
     
      const updatedBookDetails = await axios.get(`http://localhost:3001/api/books/${id}`, {
        headers: {
          Authorization: `${token}`,
        },
      });
    
      setBookDetails(updatedBookDetails.data);
     
      setDislikedByUser(true);
    
      if (likedByUser) {
        setLikedByUser(false);
      }
    } catch (error) {
      console.error('Error disliking the book:', error.message);
    }
  };


  return (
    <div style={styles.container}>
      {bookDetails ? (
        <>
          <img src={bookDetails.imgLink} alt="Book Cover" style={styles.bookImage} />
          <h1 style={styles.heading}>{bookDetails.title}</h1>
          <div style={styles.detailsContainer}>
            <p>Like Count: {bookDetails.likeCount}</p>
            <p>Dislike Count: {bookDetails.dislikeCount}</p>
            <button onClick={handleLike} style={styles.button}>
              {likedByUser ? 'Liked' : 'Like'}
            </button>
            <button onClick={handleDislike} style={styles.button}>
              {dislikedByUser ? 'Disliked' : 'Dislike'}
            </button>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    marginTop: '50px',
    textAlign: 'center',
  },
  heading: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  detailsContainer: {
    fontSize: '18px',
  },
  bookImage: {
    maxWidth: '100%',
    height: 'auto',
    marginBottom: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },
  button: {
    padding: '10px',
    margin: '0 10px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};


export default BookDetail;
