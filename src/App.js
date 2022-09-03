import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom'; 
import Detail from './detail';
// import {handleSubmit} from './listing';
import $ from 'jquery';

class App extends Component {
  constructor(props) {
        super(props)   
        this.state = {
            TxtSrchVal: '',
            data: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
  handleSubmit(e){
    alert('Form submitted:' + e.target.elements.TxtSrchVal.value);
    // let { Message, value } = e.target;
    // this.setState({ Message: value });
        const target = e.target;
        const value = target.elements.TxtSrchVal.value;
        console.log(target);
        console.log(value);
        this.setState({
            TxtSrchVal: value
        })
        e.preventDefault();
        const url = "https://hn.algolia.com/api/v1/search?query="+value;
        console.log(url);
        // componentDidMount(value);
        $.ajax({
               url: url,
               type: "GET",
               // data:{data: query},
               dataType: 'json',
               ContentType: 'application/json',
               success: function(data) {
                 console.log(data.hits);
                 this.setState({data: data.hits});
               }.bind(this),
               error: function(jqXHR) {
                 console.log(jqXHR);
               }
            })
    };

    handleChange(e){
        const target = e.target;
        const value = target.value;

        this.setState({
            TxtSrchVal: value
        });
    };
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          
          <a className="App-link" href="https://google.com" target="_blank" rel="noopener noreferrer">
            Learn React
          </a>
        </header>
        <div className="App-body">
          <div className="hero-section">
            <div className="container">
              <div className="hero-inner">
                <form name="srchFrm" id="srchFrm" onSubmit={this.handleSubmit}>
                  <input className="form-control" type="text" name="TxtSrchVal"  id="TxtSrchVal" placeholder="Search Keywords" required=""/>
                  <input type="submit" id="srchBtn" value="Submit"/>
                </form>
              </div>
            </div>
          </div>
          <div className="search-result">
            <div className="search-container">
            <h2>Search Result</h2>
              <Router>
              <Routes>   
                 <Route exact path='/detail' element={< Detail />}></Route>  
          </Routes>
          <table className="table-data">
              {this.state.data.map(function(item, key) {
             
               return (
                  <tr key = {key} id={item.points}>
                      <td><a href={item.url} target="_blank">{item.title}</a></td>
                      <td>{item.author}</td>
                      <td>{item.created_at}</td>
                      
                  </tr>
                )
             
             })}
            </table>  
              </Router> 
            </div>
          </div>
        </div>
        <footer className="App-footer">
          <p>Copyright @ Jayashree Biswas</p>
        </footer>
      </div>
    );
  }
}

export default App;
