import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import firebase, { provider, auth } from './firebase';

import Header from './components/Header/Header';
import Menu from './components/Menu/Menu';
import Home from './components/Home/Home';
import Items from './components/Items/Items';
import Stats from './components/Stats/Stats';
import AddItem from './components/AddItem/AddItem';
import EditItem from './components/EditItem/EditItem';
import Profile from './components/Profile/Profile';
import Content from './components/Content/Content';
import Button from './components/button';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      user: null,
      error: null
    }
    this.dbRef = firebase.firestore();
    //bindaukset konstruktorissa
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  //metodi, jota React kutsuu heti komponentin ensimmäisen
  //renderöinnin jälkeen
  componentDidMount() {
    //jos käyttäjä on jo kirjautuneena sisään
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          user: user
        });
        //viittaus kantaan tallennettuun dataan
        this.refData = this.dbRef.collection("users").doc(user.uid).collection("data");
        //siinä vaiheessa, kun dataan tulee jokin päivitys
        this.refData.orderBy("paivamaara", "desc").onSnapshot((docs) => {
          let data = [];
          //käydään dokumentti-kokoelma läpi
          docs.forEach((doc) => {
            //otetaan data talteen
            let docdata = doc.data();
            //lisätään se data-taulukkomuuttujaan
            data.push(docdata);
          });
          //päivitetään state-muuttuja
          this.setState({
            data: data
          });
        });
      }
    });
    
  }

  handleFormSubmit(newdata) {
    //lisätään tiedot firebase-kantaan
    this.refData.doc(newdata.id).set(newdata);
  }

  //tietoa poistettaessa
  handleDeleteItem(id) {
    this.refData.doc(id).delete().then().catch(error => {console.error("Virhe tietoa poistettaessa: ", error)});
  }

  //sisäänkirjautuminen
  login() {
    //jos kirjautuminen onnistuu
    auth.signInWithPopup(provider).then((result) => {
      const user = result.user;
      this.setState({
        user: user,
        error: null
      });
    //jos ei onnistu
    }).catch((error) => {
      const errorMessage = error.message;
      this.setState({
        error: errorMessage
      });
    });
  }

  //uloskirjautuminen
  logout() {
    //määritellään käyttäjä ja sen datakokoelma nulliksi 
    auth.signOut().then(() => {
      this.setState({
        user: null
      });
      this.refData = null;
    });
  }

  render() {

    //sisältö, mikäli käyttäjää ei ole määritelty
    if (!this.state.user) {
      return (
        <Router>
          <div className="App">
            <Header />
            <Content>
              <div className="login">
                <i className="fas fa-running"></i>
                <div className="login__text">
                  <h2>Pidä kirjaa<br/>urheilusuorituksistasi.</h2>
                  <h1>Helposti.</h1>
                </div>
                <Button special onClick={this.login}>KIRJAUDU SISÄÄN</Button>
                {this.state.error ? <p>{this.state.error()}</p> : null}
              </div>
            </Content>
            <Menu />
          </div>
        </Router>
      );
    }

    //mikäli käyttäjä on määritelty
    return (
      <Router>
        <div className="App">
          <Header />
          <Route path="/" exact component={Home} />
          <Route path="/suoritukset" render={() => <Items data={this.state.data} /> } />
          <Route path="/tilastot" render={() => <Stats data={this.state.data} /> } />
          <Route path="/lisaa" render={() => <AddItem onFormSubmit={this.handleFormSubmit} /> } />
          <Route path="/muokkaa/:id" render={(props) => <EditItem data={this.state.data} onFormSubmit={this.handleFormSubmit} onDeleteItem={this.handleDeleteItem} {...props} /> } />
          <Route path="/profiili" render={() => <Profile onLogout={this.logout} user={this.state.user} /> } />
          <Menu />
        </div>
      </Router>
    );
  }
}

export default App;
