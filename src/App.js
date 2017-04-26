import React, { Component } from 'react';
import './App.css';
import _ from 'underscore';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {takingQuiz: false};
    this.startQuiz = this.startQuiz.bind(this);
  }

  startQuiz(level) {
    this.setState({takingQuiz: true, level: level})
  }

  render() {
    return (
       this.state.takingQuiz ? <Quiz level={this.state.level} /> : <LevelSelector startQuiz={this.startQuiz} />
    );
  }
}

class LevelSelector extends Component {
  constructor(props) {
    super(props);
    this.onLevelSelected = this.onLevelSelected.bind(this);
  }

  onLevelSelected(level) {
    this.props.startQuiz(level);
  }

  render() {
    return (
      <div className="App">
        <h1>Welcome to the Japanese quiz! Select your level:</h1>
        <Level onLevelSelected={this.onLevelSelected} level={5} />
        <Level onLevelSelected={this.onLevelSelected} level={4} />
        <Level onLevelSelected={this.onLevelSelected} level={3} />
        <Level onLevelSelected={this.onLevelSelected} level={2} />
        <Level onLevelSelected={this.onLevelSelected} level={1} />
      </div>
    );
  }
}

class Level extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onLevelSelected(this.props.level);
  }

  render() {
    return (
      <div onClick={this.handleClick} className="Answer">
        <span className="AnswerText">N{this.props.level}</span>
      </div>
    );
  }
}

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.handleNextQuestion = this.handleNextQuestion.bind(this);
    this.newQuestion = this.newQuestion.bind(this);
    this.state = this.newQuestion();
  }

  newQuestion() {
    const NUMBER_OF_ANSWERS = 4;
    var data = require('../data/level' + this.props.level + '.json');
    var shuffled = _.shuffle(data);
    var answers = _.first(shuffled, NUMBER_OF_ANSWERS);
    
    var question = answers[Math.floor(Math.random() * answers.length)];

    return {
      answers: answers,
      question: question
    };
  }

  handleNextQuestion() {
    this.setState(this.newQuestion());
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
