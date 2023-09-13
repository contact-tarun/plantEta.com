const questions = [
  {
    que: "Who is making the web standards?",
    a: "Mozilla",
    b: "Microsoft",
    c: "The World Wide Web Consortium",
    d: "Http",
    correct: "c",
  },
  {
    que: "In CSS, h1 can be called as?",
    a: "Selector",
    b: "Value",
    c: "Attribute",
    d: "Tag",
    correct: "A",
  },
  {
    que: "Which of the following is a JAVASCRIPTWhich HTML tag is used to define an internal style sheet?",
    a: "CSS",
    b: "Text",
    c: "Style",
    d: "Script",
    correct: "c",
  },
  {
    que: "Which of the following is correct about features of JavaScript?",
    a: "JavaScript is is complementary to and integrated with HTML.",
    b: "JavaScript is open and cross-platform.",
    c: "Both of the above.",
    d: "Script",
    correct: "c",
  },
  {
    que: "Which built-in method calls a function for each element in the array?",
    a: "while()",
    b: "forEach()",
    c: "loop()",
    d: "None of the above",
    correct: "b",
  },
  {
    que: "Among the following, which one is a ternary operator?",
    a: "?",
    b: "%",
    c: "$",
    d: "&",
    correct: "a",
  },
  {
    que: "What does the JavaScript Debugger statement",
    a: "It will debug all the errors in the program at runtime",
    b: "It acts as a breakpoint in a program",
    c: "It will debug in the current statement if any.",
    d: "All of the above",
    correct: "b",
  },
  {
    que: "We enclose HTML tags within?",
    a: "{}",
    b: "None of the above",
    c: "!!",
    d: "< >",
    correct: "d",
  },
  {
    que: "Which property is used to set border colors in HTML?",
    a: "border-color",
    b: "border",
    c: "Both a and b",
    d: "None of the above",
    correct: "b",
  },
  {
    que: "Colors are defined in HTML using?",
    a: "RGB Values",
    b: "HEX",
    c: "RGBA Values",
    d: "All of the above",
    correct: "d",
  },
];

let index = 0;
let total = questions.length;
let right = 0;
let wrong = 0;
const quesBox = document.getElementById("quesBox");
const optionInputes = document.querySelectorAll(".options");

const loadQuestions = () => {
  if (index === total) {
    return endQuiz();
  }
  reset();
  const data = questions[index];
  console.log(data);
  quesBox.innerText = `${index + 1}) ${data.que}`;
  optionInputes[0].nextElementSibling.innerText = data.a;
  optionInputes[1].nextElementSibling.innerText = data.b;
  optionInputes[2].nextElementSibling.innerText = data.c;
  optionInputes[3].nextElementSibling.innerText = data.d;
};
const submitClick = () => {
  const data = questions[index];
  const ans = getAnswer();
  if (ans == data.correct) {
    right++;
  } else {
    wrong++;
  }
  index++;
  loadQuestions();
  return;
};

const getAnswer = () => {
  let answer;
  optionInputes.forEach((input) => {
    if (input.checked) {
      answer = input.value;
    }
  });
  return answer;
};
const reset = () => {
  optionInputes.forEach((input) => {
    input.checked = false;
  });
};
let discount;
const endQuiz = () => {
  let x = Math.floor(Math.random() * 1000 + 1);
  document.getElementById("box").innerHTML = `
  <h2 class="thank">
        Thank You for Playing the quiz Game for get discount
      </h2>
      <div class="getDiscount">
        <h2 class="right">${right}/${total} are correct</h2>
        <h2 class="setDiscount">You get ${right}% discount.</h2>
      </div>
      <h2>This is your Promo Code :- <span class="promo"><b>PlantEraXYX ${x} 0 ${right}</b></span></h3></h2>
      <button class="copyCode" onclick=copydiscount()>Discount Copy</button>;
      `;
};

loadQuestions();
