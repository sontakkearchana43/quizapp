import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { questions, toaster } from '../app-functions';
import { AppService } from '../app.service';

function shuffleArray(array: Array<any>) {
  for (var i = array.length - 1; i > 0; i--) {
    if (array[i].options) {
      array[i].options = shuffleArray(array[i].options);
    }
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  @ViewChildren("optionRef")
  optionRef!: QueryList<ElementRef>;
  currentQstnJson: any = {};
  currentQuestionIndex = 0;
  scoreUpdate = 0;
  questionsList = questions();

  constructor(private router:Router,private appService:AppService) { }

  ngOnInit(): void {
    this.restartQuiz();
  }

  onAnswerClick(index:number){
    const correctAnsrIndex = this.currentQstnJson?.options.indexOf(this.currentQstnJson?.answer);
    if(correctAnsrIndex == index){
      this.optionRef.toArray()[index].nativeElement.classList.add('correct');
      this.scoreUpdate = this.scoreUpdate + 2;
    }else{
      this.optionRef.toArray()[correctAnsrIndex].nativeElement.classList.add('correct');
      this.optionRef.toArray()[index].nativeElement.classList.add('incorrect');
    } 
    setTimeout(() => {
      this.currentQuestionIndex = this.currentQuestionIndex + 1
      this.currentQstnJson = this.questionsList[this.currentQuestionIndex];
      if(!this.currentQstnJson){
         const user = JSON.parse(localStorage.getItem('user') || "{}");
         if(user?.email){
           user.score = this.scoreUpdate;
         }
         this.appService.updateScore(user).subscribe(() => {});
      }
    },500)
  }

  restartQuiz() {
    this.questionsList = [...shuffleArray(this.questionsList)];
    this.currentQstnJson = this.questionsList[this.currentQuestionIndex];
  }

  logout(){
    localStorage.removeItem("user");
    this.router.navigate(['/login']);
    toaster(`You have been successfully logged out....`);
  }
  navigate(){
    this.router.navigate(['/leader-board']);
  }
  restart(){
    window.location.reload();
  }
}
