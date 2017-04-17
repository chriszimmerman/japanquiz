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

class App extends Component {
  render() {

    var shuffled = _.shuffle(data);
    var answers = _.first(shuffled, 4);
    
    var question = answers[Math.floor(Math.random() * answers.length)];

    return (
      <div className="App">
        <Question question={question} answers={answers} />
      </div>
    );
  }
}

class Question extends Component {
  render() {
    var answers = this.props.answers.map((answer) =>
      <div key={answer.english} className="Answer">
        {answer.english}
      </div>
    );
    return (
      <div className="Quiz-header">
        <div className="Question">
          {this.props.question.kanji}
        </div>
        <ul>
          {answers}
        </ul>
      </div>
    );
  }
}

export default App;
