import { Component } from 'react';

import Bar from './components/Bar/Bar';
import ControlBar from './components/ControlBar/ControlBar';

import classes from './App.module.css';

const MIN_HEIGHT = 15;
const MAX_HEIGHT = 400;

const MIN_NUMBER_OF_BARS = 5;
const MAX_NUMBER_OF_BARS = 30;

const MIN_ANIMATION_MS = 20;
const MAX_ANIMATION_MS = 200;

const TOTAL_BAR_WIDTH = 800;

class App extends Component {
  constructor(props) {
    super(props);
    const newBars = this.getNewBars(MIN_NUMBER_OF_BARS);
    this.state = {
      bars: newBars,
      numBars: MIN_NUMBER_OF_BARS,
      widthPerBar: Math.floor((TOTAL_BAR_WIDTH - 10 * (MIN_NUMBER_OF_BARS - 2))/ MIN_NUMBER_OF_BARS),
      animations: [],
      animationIndex: 0,
      animationIndexState: 0,
      isSorting: false,
      animationSpeedPerSec: 1000 / MAX_ANIMATION_MS
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.isSorting === true) {
      const animation = this.state.animations[this.state.animationIndex];
      let index1, index2, changed;
      [index1, index2, changed] = animation[0];
      switch (this.state.animationIndexState) {
        case 0:
          setTimeout(() => {
            let newBars = [...this.state.bars];
            newBars[index1].selected = true;
            newBars[index2].selected = true;
            this.setState({
              bars: newBars,
              animationIndexState: (this.state.animationIndexState + 1) % 3
            })
          }, 1000 / this.state.animationSpeedPerSec);
          break;
        case 1:
          setTimeout(() => {
            let newBars = [...this.state.bars];
            newBars[index1].selected = false;
            newBars[index2].selected = false;
            this.setState({
              bars: newBars,
              animationIndexState: (this.state.animationIndexState + 1) % 3
            })
          }, 1000 / this.state.animationSpeedPerSec)
          break;
        case 2:
          setTimeout(() => {
            let newAnimationIndex = this.state.animationIndex + 1;
            let newIsSorting = newAnimationIndex !== this.state.animations.length;

            let newBars = [...this.state.bars];

            if (changed) {
              let newIndex1, newHeight1;
              [newIndex1, newHeight1] = animation[1];


              let newIndex2, newHeight2;
              [newIndex2, newHeight2] = animation[2];

              newBars[newIndex1].height = newHeight1;
              newBars[newIndex2].height = newHeight2;
            }
            this.setState({
              animationIndex: newAnimationIndex,
              isSorting: newIsSorting,
              bars: newBars,
              animationIndexState: (this.state.animationIndexState + 1) % 3
            })
          }, 1000 / this.state.animationSpeedPerSec);
          break;
        default:
          return
      }
    }
  }


  getNewBars = numBars => {
    const newBars = [];
    for(let i = 0; i < numBars; i++) {
      newBars.push({
        id: i,
        height:  MIN_HEIGHT + Math.floor(Math.random() * (MAX_HEIGHT - MIN_HEIGHT)),
        selected: false
      })
    }
    return newBars;
  }


  barsChangeHandler = (e) => {
    const numberOfBars = +e.target.value;
    const newBars = this.getNewBars(numberOfBars);
    const newWidthPerBar = Math.floor((TOTAL_BAR_WIDTH - 10 * (numberOfBars - 2))/ numberOfBars);
    this.setState({
      bars: newBars,
      numBars: numberOfBars,
      widthPerBar: newWidthPerBar
    })
  }

  animationSpeedChangeHandler = (e) => {
    const newAnimationSpeed = +e.target.value;
    this.setState({
      animationSpeedPerSec: newAnimationSpeed
    });
  }

  resetHandler = () => {
    const newBars = this.getNewBars(this.state.numBars);
    console.log(newBars);
    this.setState({
      bars: newBars
    })
  }

  sortHandler = (func) => {
    const barHeightValues = this.state.bars.map(bar => bar.height);
    const animations = func(barHeightValues);
    this.setState({
      animations: animations,
      isSorting: true,
      animationIndex: 0
    })
  }
  
  render() {
    return (
      <div className={ classes.App }>
        <h1>Sorting Visualizer</h1>
        <ControlBar 
          sort={ this.sortHandler }
          isSorting={ this.state.isSorting }
          minNumberOfBars={ MIN_NUMBER_OF_BARS }
          maxNumberOfBars={ MAX_NUMBER_OF_BARS }
          barsChange={ this.barsChangeHandler }
          numBars={ this.state.numBars }
          maxAnimationSpeedMs={ MAX_ANIMATION_MS }
          minAnimationSpeedMs={ MIN_ANIMATION_MS }
          animationSpeedChange={ this.animationSpeedChangeHandler }
          animationSpeedPerSec={ this.state.animationSpeedPerSec }
          reset={ this.resetHandler } />
        <div className={ classes.BarsContainer }>
          {
            this.state.bars.map(bar => 
              <Bar
                key={ bar.id } 
                height={ bar.height } 
                width={ this.state.widthPerBar }
                selected={ bar.selected }/>)
          }
        </div>
      </div>
    );
  }
}

export default App;
