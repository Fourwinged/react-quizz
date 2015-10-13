
/* Quizz
**
** The main quizz page, about conifers
*/

import React from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import {fetchData, shuffleData} from '../shared/Actions';
import Title from '../shared/components/Title';

// We create a React component class
class Quizz extends React.Component {

    // The constructor method
    constructor(props) {
        super(props);
        // Bind 'this' keyword in class methods
        this.makeItem = this.makeItem.bind(this);
        this.nextQuestion = this.nextQuestion.bind(this);
        // Set the initial component state
        this.state = {
            answered: null,
            selected: null,
            points: 0
        };
    }

    // Data fetch on client side
    componentDidMount() {
        this.props.dispatch(fetchData({
            'name': 'coniferes',
            'type': 'quizz'
        }, {
            coniferes: {
                intitule: this.props.intitule,
                data: this.props.data
            }
        }));
    }

    // This function checks if a selected item is the correct answer
    checkAnswer(item, answer) {
        // Set state using the appropriate function
        this.setState({
            answered: item === answer ? 'correct' : 'incorrect',
            selected: item
        });
    }

    // This function goes to the next question
    nextQuestion() {
        // If the selected answer is correct, increment points
        if(this.state.answered === 'correct') {
            this.setState({
                points: this.state.points + 1
            });
        }

        // Reset these parts of the state
        this.setState({
            answered: null,
            selected: null
        });
        // Dispatch an action that will shuffle new answers and a new question.
        // It will also mark the current question as completed
        this.props.dispatch(shuffleData('coniferes', this.props.data, this.props.intitule, this.props.data.answer.NOM_FR));
    }

    // Function that takes an array item and creates an answer list item with its own checkAnswer function call
    makeItem(item, answer) {
        // Prepare the anwser check call
        var click = this.checkAnswer.bind(this, item.NOM_FR, answer.NOM_FR);

        // Create the item
        return (
            <li className="quizz-answers-card" key={ item.NOM_FR }>
                <button className={ 'quizz-answers-card-button' + (this.state.selected === item.NOM_FR ? ' selected' : '') + (this.state.answered === 'correct' ? ' correct' : '') } onClick={ click } >
                    { item.NOM_FR }
                </button>
            </li>
        );
    }

    // Render function
    render() {
        // If loading, render a specific view
        if(this.props.loading || !this.props.data) {
            return (
                <div>
                    <Helmet
                        title={ this.props.title }
                        titleTemplate="Quizz - %s"
                        meta={ [
                            {name: 'description', content: 'Un quizz basique, construit avec HapiJS, React et Redux.'}
                        ] } />
                    <Title text={ this.props.title } />
                    <article className="card">
                        <h2 className="card-header">{ this.props.intitule }</h2>
                        <p className="quizz-loading">
                            Chargement...
                        </p>
                    </article>
                </div>
            );
        }

        // Prepare variables
        var message = null;
        var card;
        // Turn the questions array into components using makeItem()
        var choices = this.props.data.questions.map((item) => this.makeItem(item, this.props.data.answer));
        
        // If an answer was selected, set the appropriate message
        if(this.state.answered === 'correct') {
            message = <p className="quizz-message">Bien joué ! C'était la bonne réponse !</p>;
        }
        else if(this.state.answered === 'incorrect') {
            message = <p className="quizz-message">Dommage, essaie encore.</p>;
        }

        // If there are not enough questions, show the ending card
        if(this.props.data.questions.length < 3) {
            card = (
                <article className="card card-end">
                    <h2 className="card-header">Bravo à toi !</h2>
                    <p className="quizz-congrats">
                        Tu as fait :
                    </p>
                    <p className="quizz-points">
                        { this.state.points } point{ this.state.points > 1 ? 's' : null }
                    </p>
                </article>
            );
        }
        // If not, show the quizz card
        else {
            card = (
                <article className="card">
                    <h2 className="card-header">{ this.props.intitule }</h2>
                    <p className="quizz-points">
                        { this.state.points } point{ this.state.points > 1 ? 's' : null }
                    </p>
                    <p className="quizz-indication">
                        { this.props.data.answer.DOCUMENTATION }
                    </p>
                    <ul className="quizz-answers">
                        { choices }
                    </ul>
                    { this.state.answered
                        ? message
                        : null }
                    { this.state.answered === 'correct'
                        ? <button className="quizz-next" onClick={ this.nextQuestion }>Question suivante</button>
                        : null }
                </article>
            );
        }

        // Return the div with its correct card
        return (
            <div>
                <Helmet
                    title={ this.props.title }
                    titleTemplate="Quizz - %s"
                    meta={ [
                        {name: 'description', content: 'Un quizz basique, construit avec HapiJS, React et Redux.'}
                    ] } />
                <Title text={ this.props.title } />
                { card }
            </div>
        );
    }
    
}

// In dev mode, checks if the passed properties are of the correct type
Quizz.propTypes = {
    store: React.PropTypes.object,
    dispatch: React.PropTypes.func,
    config: React.PropTypes.object,
    data: React.PropTypes.object,
    loading: React.PropTypes.bool,
    title: React.PropTypes.string,
    intitule: React.PropTypes.string
};

// Inject props from the global state tree
function select(state) {
    if(!state.dataSources.coniferes) {
        return {
            title: state.title,
            data: null
        };
    }
    return {
        title: state.title,
        intitule: state.dataSources.coniferes.intitule,
        data: state.dataSources.coniferes.data,
        loading: state.dataSources.coniferes.isFetching
    };
}

// Wrap the component to inject state and dispatch()
export default connect(select)(Quizz);
