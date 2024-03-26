import { useEffect, useState } from 'react';

function App() {
    const [board, setBoard] = useState([]);
    const [guessesRemaining, setGuessesRemaining] = useState(11);
    const [game, setGame] = useState({category: '', solution: ''});
    const { solution, category } = game;
    useEffect(() => {
        const fetchGame = async () => {
            try {
                const response = await fetch(process.env.REACT_APP_API_URL, {
                    method: 'GET'
                });

                const data = await response.json();

                setGame(data);
                setBoard(data.solution.split('').map((c) => '_'));
            } catch (error) {
                console.error('Error fetching game', error.message);
            }
        }
        fetchGame();
    }, []);

    const onChange = (e) => {
        const guess = e.target.value.toLowerCase().split('').slice(-1)[0];
        const letters = solution.toLowerCase().split('');
        const lettersIndexes = [];

        var i = -1;
        while ((i = letters.indexOf(guess, i+1)) !== -1) {
            lettersIndexes.push(i);
        }

        console.log(lettersIndexes);

        if (lettersIndexes.length > 0) {
            console.log('success');
            setBoard(board.map((c, i) => lettersIndexes.includes(i) ? guess : c));
        } else {
            console.log('failure');
            setGuessesRemaining(guessesRemaining - 1);
        }
    }
    return (
        <div className="App">
            <h1>Hangman</h1>
            Category: { category }
            <br />
            Guess a letter:
            <br />
            <input type="text" onChange={onChange} />
            <br />
            Guesses Remaining: { guessesRemaining }
            <br />
            Solution: { board.join(' ') }
        </div>
    );
}

export default App;
