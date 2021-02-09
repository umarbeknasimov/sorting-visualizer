import bubbleSort from '../../algorithms/bubbleSort';
import selectionSort from '../../algorithms/selectionSort';

import classes from './ControlBar.module.css';

const controlBar = props => {
    return (
        <div className={ classes.ControlBar }>
            <div className={ classes.Control }>
                <h3>Number of Bars</h3>
                <input 
                    disabled={ props.isSorting }
                    type="range" 
                    min={ props.minNumberOfBars } 
                    max={ props.maxNumberOfBars } 
                    onChange={ props.barsChange }
                    value={ props.numBars }/>
                    <p>{ props.numBars }</p>
            </div>
            <div className={ classes.Control }>
                <h3>Animations per second</h3>
                <input 
                    disabled={ props.isSorting }
                    type="range" 
                    min={ 1000 / props.maxAnimationSpeedMs } 
                    max={ 1000 / props.minAnimationSpeedMs } 
                    onChange={ props.animationSpeedChange }
                    value={ props.animationSpeedPerSec }/>
                    <p>{ props.animationSpeedPerSec }</p>
            </div>
            <div>
                <button 
                    onClick={ () => props.sort(bubbleSort) } 
                    disabled={ props.isSorting }>
                        Bubble sort</button>
                <button 
                    onClick={ () => props.sort(selectionSort) } 
                    disabled={ props.isSorting }>
                        Selection sort</button>
            </div>
            <div>
                <button
                    onClick={ props.reset }
                    disabled={ props.isSorting }>
                        Reset</button>
            </div>
        </div>
    )
}

export default controlBar;