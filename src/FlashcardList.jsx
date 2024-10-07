import React, { useState } from 'react';
import Flashcard from './Flashcard';

const FlashcardList = () => {
  const [flashcards, setFlashcards] = useState([

    { question: 'Guess the shape', answer: 'Circle',difficulty: 'Easy',
    image:'https://dictionary.cambridge.org/us/images/thumb/circle_noun_001_02738.jpg?version=6.0.33' },

    { question: 'Guess the shape', answer: 'Triangle',difficulty: 'Easy',
    image:'https://dictionary.cambridge.org/images/thumb/triang_noun_001_18172.jpg?version=6.0.33' },

    { question: 'Guess the shape', answer: 'Square',difficulty: 'Medium',
    image:'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Square_-_black_simple.svg/500px-Square_-_black_simple.svg.png?20210311042606' },

    { question: 'Guess the shape', answer: 'Pentagon',difficulty: 'Medium',
    image:'https://res.cloudinary.com/woodland/image/upload/c_limit,d_ni.png,f_auto,q_auto,w_1024/v1/craftcuts_media/media/catalog/product/d/i/dimensional_shapes_basic_pentagon.jpg' },

    { question: 'Guess the shape', answer: 'Hexagon',difficulty: 'Hard',
    image:'https://res.cloudinary.com/woodland/image/upload/c_limit,d_ni.png,f_auto,q_auto,w_1024/v1/craftcuts_media/media/catalog/product/d/i/dimensional_shapes_basic_hexagon.jpg' },

    { question: 'Guess the shape', answer: 'Octagon',difficulty: 'Hard',
    image:'https://res.cloudinary.com/woodland/image/upload/c_limit,d_ni.png,f_auto,q_auto,w_1024/v1/craftcuts_media/media/catalog/product/d/i/dimensional_shapes_basic_octogon.jpg' }

  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState('');
  const [streak, setStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [masteredCards, setMasteredCards] = useState([]);

  const currentCard = flashcards[currentIndex];

  const handleNextCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
    setFeedback('');
    setGuess('');
  };

  const handlePrevCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? flashcards.length - 1 : prevIndex - 1));
    setFeedback('');
    setGuess('');
  };

  const handleShuffle = () => {
    setFlashcards((prevCards) => [...prevCards].sort(() => Math.random() - 0.5));
    setFeedback('');
    setGuess('');
  };

  const checkAnswer = () => {
    const correctAnswer = currentCard.answer.toLowerCase().trim();
    const userAnswer = guess.toLowerCase().trim();

    if (correctAnswer === userAnswer) {
      setFeedback('Correct!');
      setStreak((prev) => prev + 1);
      if (streak + 1 > longestStreak) setLongestStreak(streak + 1);

      // Mark card as mastered if correct
      if (!masteredCards.includes(currentCard)) {
        setMasteredCards([...masteredCards, currentCard]);
      }
    } else {
      setFeedback('Incorrect');
      setStreak(0);
    }
  };

  return (
    <div>
      <h1>Shapes!</h1>
      <h3>Let's learn about shapes. Guess the shape</h3>
      <p>Total Cards: {flashcards.length}</p>
      <p>Current Streak: {streak}  Longest Streak: {longestStreak}</p>
      <Flashcard card={currentCard} feedback={feedback} />

      <input type="text" value={guess} onChange={(e) => setGuess(e.target.value)} placeholder="Enter your guess"/>
      <button onClick={checkAnswer}>Submit</button>
      <p>{feedback}</p>
      <div>
        <button onClick={handlePrevCard}>Previous Card</button>
        <button onClick={handleNextCard}>Next Card</button>
        <button onClick={handleShuffle}>Shuffle Cards</button>
      </div>

      <h3>Mastered Cards</h3>
      <ul>
        {masteredCards.map((card, index) => (
          <li key={index}>{card.question} - {card.answer}</li>
        ))}
      </ul>
    </div>
  );
};

export default FlashcardList;
