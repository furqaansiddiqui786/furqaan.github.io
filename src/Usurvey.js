import React, { Component } from 'react';
var firebase = require('firebase');
var uuid = require('uuid');

var firebaseConfig = {
    apiKey: "AIzaSyC8nBXUtm97khWaTHfln536JPIwo32pzH8",
    authDomain: "usurvey-b02ba.firebaseapp.com",
    databaseURL: "https://usurvey-b02ba.firebaseio.com",
    projectId: "usurvey-b02ba",
    storageBucket: "",
    messagingSenderId: "152980519021",
    appId: "1:152980519021:web:f288d1263bd30998ce2764"
  };

  firebase.initializeApp(firebaseConfig);

class Usurvey extends Component{

NameSubmit(event){
    var StudentName = this.refs.name.value;
    this.setState({StudentName : StudentName}, ()=>{
        console.log(this.state)
    })
}

AnswerSubmitted(event){
    var answers = this.state.Answers;
    if(event.target.name === 'answer1'){
        answers.answer1 = event.target.value;
    }else if(event.target.name === 'answer2'){
        answers.answer2 = event.target.value;
    }else if(event.target.name === 'answer3'){
        answers.answer3 = event.target.value;
    }else if(event.target.name === 'answer4'){
        answers.answer4 = event.target.value;
    }
    this.setState({Answers : answers}, ()=>{
        console.log(this.state)
    })
}

questionSubmitted(){
    firebase.database().ref('Usurvey/' + this.state.uuid).set({
        StudentName : this.state.StudentName,
        Answers : this.state.Answers
    });
    this.setState({isSubmitted : true})
}


    constructor(props){
        super(props);
        this.state = {
            uuid : uuid.v1(),
            StudentName : '',
            StudentMail : '',
            Answers : {
                answer1 : '', answer2 : '', answer3 : '', answer4 : ''
            },
            isSubmitted : false,
        }
        this.NameSubmit = this.NameSubmit.bind(this);
        this.AnswerSubmitted = this.AnswerSubmitted.bind(this);
        this.questionSubmitted = this.questionSubmitted.bind(this);
    }
    render(){
        var StudentName;
        var Questions;

        if(this.state.StudentName === '' && this.state.isSubmitted === false){
            StudentName = <div>
                <h1>Please Let us Know Your Details</h1>
                <form onSubmit = {this.NameSubmit}>
                    <input className='namely' type='text' placeholder='enter your name' ref='name' />
                </form>
            </div>
        }else if(this.state.StudentName !== '' && this.state.isSubmitted === false){
            StudentName = <h1>Hello And Welcome {this.state.StudentName}</h1>
            Questions = <div>
                <h2>Here Are Some Questions for the Survey :</h2>
                <form onSubmit = {this.questionSubmitted}>
                    <div className = 'card'>
                        <label>What kind Of courses would you like to take</label> <hr /> <br />
                        <input type = 'radio' name = 'answer1' value = 'Technology' onchange = {this.AnswerSubmitted} />Technology
                        <input type = 'radio' name = 'answer1' value = 'Marketing' onchange = {this.AnswerSubmitted} />Marketing
                        <input type = 'radio' name = 'answer1' value = 'Designing' onchange = {this.AnswerSubmitted} />Designing
                    </div>

                    <div className = 'card'>
                        <label>Are you a :</label> <hr /> <br />
                        <input type = 'radio' name = 'answer2' value = 'Student' onchange = {this.AnswerSubmitted} />Student
                        <input type = 'radio' name = 'answer2' value = 'working' onchange = {this.AnswerSubmitted} />Employee
                        <input type = 'radio' name = 'answer2' value = 'looking for job' onchange = {this.AnswerSubmitted} />Retired
                    </div>

                    <div className = 'card'>
                        <label>Do you Like Online Courses :</label> <hr /> <br />
                        <input type = 'radio' name = 'answer3' value = 'Student' onchange = {this.AnswerSubmitted} />Yes
                        <input type = 'radio' name = 'answer3' value = 'working' onchange = {this.AnswerSubmitted} />No
                        <input type = 'radio' name = 'answer3' value = 'looking for job' onchange = {this.AnswerSubmitted} />Maybe
                    </div>

                    <div className = 'card'>
                        <label>How much time can you spend on online Studying :</label> <hr /> <br />
                        <input type = 'radio' name = 'answer4' value = 'Student' onchange = {this.AnswerSubmitted} />1-2 hrs
                        <input type = 'radio' name = 'answer4' value = 'working' onchange = {this.AnswerSubmitted} />2-4 hrs
                        <input type = 'radio' name = 'answer4' value = 'looking for job' onchange = {this.AnswerSubmitted} />4-6 hrs
                    </div>

                    <input className = 'formbutton' type = "submit" value = 'submit' />
                </form>
            </div>
    }else if(this.state.isSubmitted === true && this.state.StudentName !== ''){
        StudentName = <h1>Thankyou {this.state.StudentName} For Taking this simple Survey</h1>
    }


        return(
            <div>
                {StudentName}
                ---------------------------------
                {Questions}
            </div>
        )
    }
}
export default Usurvey;