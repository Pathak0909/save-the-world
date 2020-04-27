import React,{Component} from 'react';
import {Switch, BrowserRouter, Route} from 'react-router-dom'
import './App.css';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import Main from './components/Main/Main';
import BrowseTalent from './components/Talent/BrowseTalent';
import BrowseRoles from './components/Roles/BrowseRoles';
import Navbar from './components/ui/Navbar';
import ReactPaginate from 'react-paginate';

const options = {
  // you can also just use 'bottom center'
  position: positions.TOP_CENTER,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}

export default class App extends Component{
  

  render(){
  return (
    <div className="App">
    <AlertProvider template={AlertTemplate} {...options}>
                  <BrowserRouter>

              <Navbar></Navbar>
                <Switch>
                  <Route exact="true" path="/" component={Main}></Route>
                  <Route exact="true" path="/talent" component={BrowseTalent}></Route>
                  <Route exact="true" path="/roles" component={BrowseRoles}></Route>
                </Switch>
              </BrowserRouter>
  </AlertProvider>
        
    </div>
  );
  }
}


