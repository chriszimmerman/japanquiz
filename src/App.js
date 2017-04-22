import React, { Component } from 'react';
import './App.css';
import _ from 'underscore';

var data = require('../data/level5.json');

function newQuestion(){
    const NUMBER_OF_ANSWERS = 4;
    var shuffled = _.shuffle(data);
    var answers = _.first(shuffled, NUMBER_OF_ANSWERS);
    
    var question = answers[Math.floor(Math.random() * answers.length)];

    return {
      answers: answers,
      question: question
    };
}

class App extends Component {
  constructor(props) {
    super(props);
    this.handleNextQuestion = this.handleNextQuestion.bind(this);
    this.state = newQuestion();
  }

  handleNextQuestion() {
    this.setState(newQuestion());
  }

  render() {
    return (
      <Question onNextQuestion={this.handleNextQuestion} question={this.state.question} answers={this.state.answers} />
    );
  }
}

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = { questionClass: 'Neutral' , showNext: false };
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
    this.setState({questionClass: 'Neutral', showNext: false });
    this.props.onNextQuestion();
  }

  render() {
    function getQuestionDisplayText(question) {
      return question.kanji !== "" ? question.kanji : question.kana 
    }

    var answers = this.props.answers.map((answer, i) =>
      <Answer onAnswerSelected={this.handleAnswerSelected} key={i} answer={answer} />
    );
    return (
      <div className="App">
        <div className={"Quiz-header " + this.state.questionClass}>
          <div className="Question">
            {getQuestionDisplayText(this.props.question)}
          </div>
        </div>
          {answers}
      { this.state.showNext ? (
          <div>
            <div onClick={this.handleNextQuestion} className="Answer">
              <span className="AnswerText">Next Question</span>
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
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onAnswerSelected(this.props.answer.english);
  }

  render() {
    return (
      <div onClick={this.handleClick} className="Answer">
        <span className="AnswerText">{this.props.answer.english}</span>
      </div>
    );
  }
}

export default App;
