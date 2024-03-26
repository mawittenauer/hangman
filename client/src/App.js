import { useEffect, useState } from 'react';

function App() {
    const [board, setBoard] = useState([]);
    const [gameOver, setGameOver] = useState(false);
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

    let winner = board.filter(c => c !== '_').length === solution.length;

    const onChange = (e) => {
        const guess = e.target.value.toLowerCase().split('').slice(-1)[0];
        const letters = solution.toLowerCase().split('');
        const lettersIndexes = [];

        var i = -1;
        while ((i = letters.indexOf(guess, i+1)) !== -1) {
            lettersIndexes.push(i);
        }

        if (lettersIndexes.length > 0 && guessesRemaining > 0) {
            setBoard(board.map((c, i) => lettersIndexes.includes(i) ? guess : c));
        } else {
            if (guessesRemaining === 0) {
                setGameOver(true);
            } else {
                setGuessesRemaining(guessesRemaining - 1);
            }
        }
    }

    return (
        <div className="App">
            <h1>Hangman</h1>
            Category: { category }
            <br />
            Guess a letter:
            <br />
            <input disabled={gameOver || winner} type="text" onChange={onChange} />
            <br />
            Guesses Remaining: { guessesRemaining }
            <br />
            Solution: { board.join(' ') }

            { gameOver && <h1>Game Over!</h1> }
            { winner && <h1>You Win!</h1> }
        </div>
    );
}

export default App;
