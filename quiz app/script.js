let questions = [];
let currentIndex = 0;
let score = 0;
async function fetchQuestion() {
  try {
    const res = await fetch(
      "https://opentdb.com/api.php?amount=10&type=multiple",
    );
    const data = await res.json();
    questions = data.results;
    showQuestion();
  } catch (error) {
    console.log("Something went wrong!");
  }
}
fetchQuestion();

const showQuestion = () => {
  const currentQuestion = questions[currentIndex];
  document.getElementById("question").innerText = currentQuestion.question;
  document.getElementById("questionNumber").innerText =
    `Question ${currentIndex + 1} of 10`;

  const allAnswers = [
    ...currentQuestion.incorrect_answers,
    currentQuestion.correct_answer,
  ];
  allAnswers.sort(() => Math.random() - 0.5);
  document.getElementById("answers").innerHTML = "";
  allAnswers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer;
    button.classList.add(
      "bg-violet-500",
      "text-white",
      "py-2",
      "px-6",
      "rounded-xl",
      "w-full",
    );
    button.addEventListener("click", () => {
      if (answer === currentQuestion.correct_answer) {
        console.log("correct");
        score++;
        document.getElementById("score").innerText = `Score: ${score}`;
      } else {
        console.log("incorrect");
      }
    });
    document.getElementById("answers").appendChild(button);
  });
};
document.getElementById("nextQuestion").addEventListener("click", () => {
  currentIndex++;
  if (currentIndex === 10) {
    document.getElementById("quizCard").classList.add("hidden");
    document.getElementById("finalScore").classList.remove("hidden");
    document.getElementById("finalScore").innerText =
      `You scored ${score} out of 10! 🎉`;
  } else {
    showQuestion();
  }
});
