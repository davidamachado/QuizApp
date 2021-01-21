import React, { Component } from 'react';

let currentId = 0;

export default class Math extends Component {
    state = {
        score: '',
        problems: [
            {id: 1, problem: "3 + 10 / 2", ans: "8", input: '', class: '', disabled: false}, 
            {id: 2, problem: "10 * 2 - 5", ans: "15", input: '', class: '', disabled: false},
            {id: 3, problem: "6 - 3 * 20", ans: "-54", input: '', class: '', disabled: false},
            {id: 4, problem: "2 * 12 - 10", ans: "14", input: '', class: '', disabled: false},
            {id: 5, problem: "2 * 10 + 5", ans: "25", input: '', class: '', disabled: false},
            {id: 6, problem: "9 - 2 * 10", ans: "-11", input: '', class: '', disabled: false}
        ]
    };

    constructor() {
        super();

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.calculateScore = this.calculateScore.bind(this);
    }

    handleChange(event) {
        //update currentId value to the problem id changed
        currentId = event.target.id;

        //use the currentId value to calculate the current array element (this.state.problems)
        let element = currentId - 1;

        //create copy of the array
        let newProblems = [...this.state.problems];

        //change the specified array element within the copy
        newProblems[element].input = event.target.value;

        //assign the original array to the new one's value
        this.setState({problems: newProblems});
    }

    handleSubmit(id) {
        //update currentId value to the problem id selected
        currentId = id;

        //use the currentId value to calculate the current array element (this.state.problems)
        let element = currentId - 1;

        //create copy of the array
        let newProblems = [...this.state.problems];

        //check if value entered by user is equal to the stored answer
        if (this.state.problems[element].input === this.state.problems[element].ans) {
            //updates the class to display green
            newProblems[element].class = 'text-success';
        } else {
            //updates the class to display red
            newProblems[element].class = 'text-danger';
        }

        //marks the 'disabled' property of the copied array element 'true' (disables text input)
        newProblems[element].disabled = true;

        //assign the original array to the new one's value
        this.setState({problems: newProblems});

        //call calculateScore() method
        this.calculateScore();
    }

    calculateScore() {
        let percent = 0;
        let allProblemsAnswered = true;
        let count = 0;
        var i;

        //iterate though each 'problems' array element
        for (i = 0; i < this.state.problems.length; i++) {
            //checks if any problems have not been answered yet
            if (this.state.problems[i].disabled === false) {
                allProblemsAnswered = false;
            }
            //count each "text-success" found
            if (this.state.problems[i].class === 'text-success') {
                count = count + 1;
            }
        }
        //checks if all problems have been answered
        if (allProblemsAnswered === true) {

            //calculate percent
            percent = (count / this.state.problems.length) * 100;

            //convert percent value to string and update score state
            this.setState({score: percent.toFixed(1).toString() + '%'});
        }
    }

    render() {
        return (
        <div className='col'>
            <div>
                <p className='display-4'>Math Quiz</p>
                <table>
                    {this.state.problems.map(prob =>
                    <div>
                        <tr>
                            <td className='font-weight-bold'>{prob.problem}</td>
                        </tr>
                        <tr>
                            <td>
                                <input type='text'
                                className={this.state.problems[prob.id - 1].class}
                                placeholder='your answer'
                                id={prob.id}
                                onChange={this.handleChange}
                                disabled={this.state.problems[prob.id - 1].disabled}/>
                            </td>
                            <td></td>
                            <td><button onClick={() => {this.handleSubmit(prob.id)}} 
                            className='btn btn-outline-primary'>Done</button></td>
                        </tr>
                    </div> 
                    )} 
                    <div>
                        <tr>
                            <td className='display-4'>Score:{this.state.score}</td>
                            <td></td>
                            <td></td>
                        </tr>
                    </div> 
                </table>
            </div>
        </div>
        );
    }
}