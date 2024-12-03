let currentLevel = 0;
let timeLeft = 60;
let timerInterval;
let timerRunning = false;

// Domande e risposte
const questions = [
    {
        question: "Cosa fa un router in una rete?",
        story: "Immagina di essere in una grande città. Ogni edificio ha un indirizzo, ma come arrivarci? Un router è come il postino che sa dove consegnare ogni pacco.",
        answer: "dirige i pacchetti",
        nextLevel: "Congratulazioni! Hai superato il primo livello."
    },
    {
        question: "Cos'è un gateway predefinito?",
        story: "In un grande ufficio, il gateway è la porta principale attraverso cui tutti i pacchetti devono passare per entrare o uscire. Qual è quella porta?",
        answer: "indirizzo ip del router",
        nextLevel: "Preparati per il protocollo IP!"
    },
    {
        question: "Cos'è il protocollo IP?",
        story: "Immagina di voler inviare una lettera a un amico lontano. Il protocollo IP è il sistema che decide quale strada deve percorrere la lettera per arrivare correttamente al destinatario.",
        answer: "indirizzamento pacchetti",
        nextLevel: "Ottimo! Sei pronto per il prossimo livello!"
    },
    {
        question: "¿Qué es un 'gateway' en una red?",
        story: "Estás en una isla. El 'gateway' es el barco que conecta la isla con el continente, permitiendo que la información se desplace hacia fuera y hacia dentro.",
        answer: "puerta de enlace",
        nextLevel: "¡Bien hecho! Prepárate para el siguiente nivel."
    },
    {
        question: "What does a router do?",
        story: "Think of a router as a traffic manager, directing packets to their correct destination across a network.",
        answer: "directs packets",
        nextLevel: "Great! Next challenge ahead."
    },
    {
        question: "¿Cuál es la dirección IP de un dispositivo?",
        story: "Imagina que cada dispositivo tiene una dirección única, como una dirección postal. La IP es esa dirección.",
        answer: "dirección única",
        nextLevel: "¡Excelente! Siguiente pregunta."
    },
    {
        question: "How does the network protocol work?",
        story: "The network protocol is like the rules of a game that everyone must follow to communicate effectively.",
        answer: "communication rules",
        nextLevel: "Congrats! You've completed all the challenges."
    }, 
];

// Funzione per avviare il gioco
function startGame() {
    document.getElementById("start-page").classList.add("hidden");
    document.getElementById("game-container").classList.remove("hidden");
    showLevel();
    startTimer();
}

// Funzione per mostrare la domanda e la storia
function showLevel() {
    const levelInfo = document.getElementById("level-name");
    const questionElement = document.getElementById("puzzle-question");
    const storyElement = document.getElementById("puzzle-story");

    levelInfo.innerText = `Livello ${currentLevel + 1}`;
    questionElement.innerText = questions[currentLevel].question;
    storyElement.innerText = questions[currentLevel].story;
}

// Funzione per avviare il timer
function startTimer() {
    const timeDisplay = document.getElementById("time");

    if (timerRunning) return;
    timerRunning = true;

    timerInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert("Tempo scaduto! Hai perso.");
        } else {
            timeDisplay.innerText = formatTime(timeLeft);
            timeLeft--;
        }
    }, 1000);
}

// Funzione per formattare il tempo
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

// Gestione della risposta
document.getElementById("submit-answer").addEventListener("click", function() {
    const userAnswer = document.getElementById("answer").value.trim().toLowerCase();
    const correctAnswer = questions[currentLevel].answer.toLowerCase();

    if (userAnswer === correctAnswer) {
        showMessage("Corretto! Hai superato il livello.");
        document.getElementById("next-level").classList.remove("hidden");
    } else {
        showMessage("Risposta errata. Riprova!");
    }
});

// Funzione per mostrare il messaggio
function showMessage(message) {
    const messageElement = document.getElementById("message");
    messageElement.innerText = message;
    messageElement.classList.add('fade-in');
}

// Passaggio al livello successivo
document.getElementById("next-level").addEventListener("click", function() {
    currentLevel++;

    if (currentLevel < questions.length) {
        showLevel();
        timeLeft = 60; // Reset del timer
        document.getElementById("next-level").classList.add("hidden");
    } else {
        alert("Congratulazioni! Hai completato tutti i livelli!");
        
        const formLinkContainer = document.createElement("div");
        formLinkContainer.innerHTML = `
            <p>Hai completato il gioco! Clicca qui per compilare il nostro form:</p>
            <a href="https://forms.gle/QrxcNhFt1zKGCjx7A" target="_blank" class="form-link">Compila il form</a>`;
            document.getElementById("game-container").appendChild(formLinkContainer);

    }
});


// Inizializza il gioco quando il bottone "Inizia il gioco" viene premuto
document.getElementById("start-game").addEventListener("click", startGame);