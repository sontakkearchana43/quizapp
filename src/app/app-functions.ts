export function toaster(text:string) {
    let btn = document.createElement("div");   
    btn.id = "snackbar"
    btn.classList.add("show");
    btn.innerHTML = text;                   
    document.body.appendChild(btn); 
    setTimeout(() => {
      btn.remove();
    },2500); 
}

export function questions() {
   return [
    {
      num: 1,
      question: "Which of the following is correct about TypeScript?",
      answer: "All of the above",
      options: [
        "Angular 2 is based on TypeScript.",
        "This is a superset of JavaScript.",
        "TypeScript is maintained by Microsoft.",
        "All of the above"
      ]
    },
    {
      num: 2,
      question: "Which of the following filter is used to convert input to all uppercase?",
      answer: "uppercase",
      options: [
        "uppercase",
        "upper.",
        "Both of the above.",
        "None of the above."
      ]
    },
    {
      numb: 3,
      question: "MVVM stands for?",
      answer: "Model–view–viewmodel",
      options: [
        "Model view controller",
        "Model-view",
        "Model–view–viewmodel",
        "View-Model"
      ]
    },
    {
      num: 4,
      question: "Which of the following is not built-in pipe in Angular?",
      answer: "DataPipe",
      options: [
        "DatePipe",
        "DataPipe",
        "CurrencyPipe",
        "PercentPipe"
      ]
    },
    {
      num: 5,
      question: "What does AOT stand for?",
      answer: "ahead-of-time compilation",
      options: [
        "ahead-of-time compilation",
        "Angular Object Templates",
        "Both",
        "None of above"
      ]
    },
  ];
}