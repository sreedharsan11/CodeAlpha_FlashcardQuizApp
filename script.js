document.addEventListener("DOMContentLoaded", () => {
  let cards = JSON.parse(localStorage.getItem("cards")) || [
    { question: "What is HTML?", answer: "HyperText Markup Language" },
    { question: "What is 5 + 3?", answer: "8" }
  ];

  let currentIndex = 0;
  let showingQuestion = true;

  const flashcard = document.getElementById("flashcard");
  const cardText = document.getElementById("cardText");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const addBtn = document.getElementById("addBtn");
  const clearBtn = document.getElementById("clearBtn");

  function updateCard() {
    if (cards.length === 0) {
      cardText.textContent = "No cards found.";
      return;
    }
    showingQuestion = true;
    cardText.textContent = cards[currentIndex].question;
  }

  flashcard.addEventListener("click", () => {
    if (cards.length === 0) return;
    showingQuestion = !showingQuestion;
    cardText.textContent = showingQuestion
      ? cards[currentIndex].question
      : cards[currentIndex].answer;
  });

  nextBtn.addEventListener("click", () => {
    if (cards.length === 0) return;
    currentIndex = (currentIndex + 1) % cards.length;
    updateCard();
  });

  prevBtn.addEventListener("click", () => {
    if (cards.length === 0) return;
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    updateCard();
  });

  addBtn.addEventListener("click", () => {
    const q = document.getElementById("newQuestion").value.trim();
    const a = document.getElementById("newAnswer").value.trim();
    if (!q || !a) {
      alert("Both question and answer are required!");
      return;
    }
    cards.push({ question: q, answer: a });
    localStorage.setItem("cards", JSON.stringify(cards));
    document.getElementById("newQuestion").value = "";
    document.getElementById("newAnswer").value = "";
    currentIndex = cards.length - 1;
    updateCard();
  });

  clearBtn.addEventListener("click", () => {
    if (confirm("Are you sure to delete all flashcards?")) {
      cards = [];
      localStorage.removeItem("cards");
      updateCard();
    }
  });

  updateCard();
});
