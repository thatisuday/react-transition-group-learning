import React from 'react';
import ReactDOM from 'react-dom';
import { TransitionGroup, Transition } from 'react-transition-group';
import anime from 'animejs';

import './style.scss';

class ListItem extends React.Component {
    constructor() {
        super();

        // create li DOM reference
        this.liRef = React.createRef();
    }

    componentDidUpdate(){
        this.animeRef = anime({
            targets: this.liRef.current,
            translateX: () => {
                if( this.props.status == 'entering' ) {
                    return ['-100%', '0%'];
                } else if( this.props.status == 'exiting' ) {
                    return ['0%', '100%'];
                }
            },
            elasticity: () => {
                if( this.props.status == 'entering' ) {
                    return 300;
                } else if( this.props.status == 'exiting' ) {
                    return 0;
                }
            },
            duration: 500
        });
    }

    render() {
        return (
            <li className="list-item" ref={ this.liRef }>
                Hey, I am item number <b>{ this.props.num }</b>
            </li>
        );
    }
}

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            data: [1,2,3]
        };
    }

    add() {
        this.setState({
            ...this.state,
            data: this.state.data.concat([ this.state.data.length + 1 ])
        });
    }

    remove() {
        this.setState({
            ...this.state,
            data: this.state.data.slice(0, -1)
        });
    }

    render() {
        return (
            <div className="app-container">
                <div className="buttons">
                    <button onClick={ this.add.bind(this) }>Add one</button>
                    <button onClick={ this.remove.bind(this) }>Remove one</button>
                </div>

                <TransitionGroup 
                component="ul"
                className="list"
                >
                    {
                        this.state.data.map( num => (
                            <Transition 
                            key={ num }
                            timeout={ 500 }
                            mountOnEnter
                            unmountOnExit
                            >
                                {
                                    ( status ) => {
                                        return <ListItem status={ status } num={ num }/>;
                                    }
                                }
                            </Transition>
                        ) )
                    }
                </TransitionGroup>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));