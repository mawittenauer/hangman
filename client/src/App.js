import { useEffect, useState } from 'react';

function App() {
    const [game, setGame] = useState({category: '', solution: ''});
    useEffect(() => {
        const fetchGame = async () => {
            try {
                const response = await fetch(process.env.REACT_APP_API_URL, {
                    method: 'GET'
                });

                const data = await response.json();

                setGame(data);
            } catch (error) {
                console.error('Error fetching game', error.message);
            }
        }
        fetchGame();
    }, []);
    return (
        <div className="App">
            <h1>Hangman</h1>
        </div>
    );
}

export default App;
