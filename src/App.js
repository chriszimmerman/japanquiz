import React, { Component } from 'react';
import './App.css';

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
    var question = data[Math.floor(Math.random() * data.length)];

    return (
      <div className="App">
        <Question data={question} />
      </div>
    );
  }
}

class Question extends Component {
  render() {
    return (
      <div className="Quiz-header">
        <div className="Question">
          {this.props.data.kanji}
        </div>
      </div>
    );
  }
}

export default App;
