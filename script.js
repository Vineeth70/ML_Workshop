class SimpleSongGenerator {
    constructor() {
        this.genres = {
            "rock": ["guitar", "drums", "bass", "power chords"],
            "pop": ["catchy", "melody", "chorus", "synth"],
            "jazz": ["saxophone", "trumpet", "piano", "improvisation"],
            "hip hop": ["beats", "rhymes", "flow", "samples"],
            "country": ["guitar", "fiddle", "storytelling", "twang"]
        };
        
        this.moods = {
            "happy": ["smile", "sun", "dance", "joy"],
            "sad": ["tears", "rain", "heartbreak", "lonely"],
            "energetic": ["jump", "run", "shout", "excitement"],
            "relaxed": ["chill", "breeze", "calm", "peaceful"],
            "angry": ["fire", "storm", "rage", "intensity"]
        };
    }

    generateLyrics(genre, mood) {
        const genreWords = this.genres[genre.toLowerCase()] || ["music", "melody", "rhythm"];
        const moodWords = this.moods[mood.toLowerCase()] || ["feeling", "emotion", "vibe"];
        
        const verses = [];
        for (let i = 0; i < 3; i++) {  // Generate 3 verses
            const verse = [];
            for (let j = 0; j < 4; j++) {  // 4 lines per verse
                const line = `${this.randomChoice(genreWords)} ${this.randomChoice(moodWords)}`;
                verse.push(line);
            }
            verses.push(verse.join("\n"));
        }
        
        const chorusLines = [
            `${this.randomChoice(genreWords)} ${this.randomChoice(moodWords)}`,
            `${this.randomChoice(genreWords)} ${this.randomChoice(moodWords)}`
        ];
        const chorus = chorusLines.join("\n") + "\n" + chorusLines.join("\n");  // Repeat chorus
        
        return `${verses[0]}\n\n${chorus}\n\n${verses[1]}\n\n${chorus}\n\n${verses[2]}\n\n${chorus}`;
    }

    randomChoice(array) {
        return array[Math.floor(Math.random() * array.length)];
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const genreInput = document.getElementById('genre');
    const moodInput = document.getElementById('mood');
    const generateButton = document.getElementById('generate-button');
    const resultDiv = document.getElementById('result');
    const lyricsDiv = document.getElementById('lyrics');

    const songGenerator = new SimpleSongGenerator();

    function generateSong() {
        const genre = genreInput.value.trim();
        const mood = moodInput.value.trim();

        if (!genre || !mood) {
            alert('Please enter both genre and mood.');
            return;
        }

        generateButton.disabled = true;
        generateButton.textContent = 'Generating...';

        try {
            const lyrics = songGenerator.generateLyrics(genre, mood);
            lyricsDiv.textContent = lyrics;
            resultDiv.style.display = 'block';
        } catch (error) {
            console.error('Error:', error);
            alert('Error: Unable to generate song.');
        } finally {
            generateButton.disabled = false;
            generateButton.textContent = 'Generate Song';
        }
    }

    generateButton.addEventListener('click', generateSong);
});