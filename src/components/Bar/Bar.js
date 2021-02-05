import classes from './Bar.module.css';

const bar = props => {
    const style = { 
        height: props.height + 'px',
        width: props.width + 'px',
        backgroundColor: props.selected ? 'blue' : 'black'
    }
    return (
        <div
            style={ style }
            className={ classes.Bar }>

        </div>
    )
}

export default bar;