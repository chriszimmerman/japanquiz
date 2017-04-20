import React, { Component } from 'react';
import './App.css';
import _ from 'underscore';

var data = [
  {
    kanji: '花',
    hiragana: 'はな',
    romaji: 'hana',
    english: 'flower'
  },
  {
    kanji: '本',
    hiragana: 'ほん',
    romaji: 'hon',
    english: 'book'
  },
  {
    kanji: '日',
    hiragana: 'にち',
    romaji: 'nichi',
    english: 'day'
  },
  {
    kanji: '歌',
    hiragana: 'うた',
    romaji: 'uta',
    english: 'song'
  }
];

function newQuestion(){
    var shuffled = _.shuffle(data);
    var answers = _.first(shuffled, 4);
    
    var question = answers[Math.floor(Math.random() * answers.length)];

    return {
      answers: answers,
      question: question
    };
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = newQuestion();
  }

  render() {
    return (
      <div className="App">
        <Question question={this.state.question} answers={this.state.answers} />
      </div>
    );
  }
}

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: true, questionClass: 'Neutral' , showNext: false };
    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
    this.handleNextQuestion = this.handleNextQuestion.bind(this);
  }

  handleAnswerSelected(answer) {
    if(answer === this.props.question.english){
      this.setState({ questionClass: 'Correct', showNext: true })
    }
    else {
      this.setState({ questionClass: 'Incorrect', showNext: false })
    }
  }

  handleNextQuestion() {
    console.log('going to next question');
  }

  render() {
    var answers = this.props.answers.map((answer, i) =>
      <Answer onAnswerSelected={this.handleAnswerSelected} key={i} answer={answer} />
    );
    return (
      <div className={"Quiz-header " + this.state.questionClass}>
        <div className="Question">
          {this.props.question.kanji}
        </div>
          {answers}
      { this.state.showNext ? (
          <div>
            <div onClick={this.handleNextQuestion} className="Answer">
              Next Question
            </div>
          </div>
          ) : <span/>
      }
      </div>
    );
  }
}

class Answer extends Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: true };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onAnswerSelected(this.props.answer.english);
  }

  render() {
    return (
      <div onClick={this.handleClick} className="Answer">
        {this.props.answer.english}
      </div>
    );
  }
}

export default App;
