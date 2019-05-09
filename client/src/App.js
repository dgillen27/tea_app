import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm'
import { registerUser, loginUser } from './services/usersApi';
const jwt = require('jsonwebtoken');

class App extends Component {
  constructor() {
    super();

    this.state = {
      registerFormData: {
        username: "",
        email: "",
        allergy: "",
        image_url: "",
        password: ""
      },
      currentUser: null,
      userData: {},
      loginFormData: {
        email: "",
        password: ""
      },
      toggleLogin: true,
}

    this.handleRegisterChange = this.handleRegisterChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleLoginChange = this.handleLoginChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleLoginToggle = this.handleLoginToggle.bind(this);
  }

  handleRegisterChange(e) {
  e.preventDefault();
  const { name, value } = e.target;
  this.setState(prevState => ({
    registerFormData: {
      ...prevState.registerFormData,
      [name]: value
      }
    }))
  }

async handleRegister(e) {
  e.preventDefault();
  const { registerFormData } = this.state;
  const resp = await registerUser(registerFormData);
  this.setState({
    currentUser: jwt.decode(resp.token),
    // currentUser: {
    //   id: userData.id,
    //   username: userData.username,
    //   email: userData.email,
    // },
  });
  localStorage.setItem("authToken", resp.token);
  // this.props.history.push(
  //   `/user/${userData.id}/username/${userData.username}`
  // );
}

handleLoginChange(e) {
  e.preventDefault();
  const { name, value } = e.target;
  this.setState(prevState => ({
    loginFormData: {
      ...prevState.loginFormData,
      [name]: value
    }
  }))
}

async handleLogin(ev) {
  ev.preventDefault();
  const { loginFormData } = this.state
  try {
    const resp = await loginUser(loginFormData);
    this.setState({
      currentUser: jwt.decode(resp.token),
      token: resp.token,
      loginFormData: {
        email: '',
        password: ''
      }
    });
    // this.props.history.push(`/users`);
  } catch (e) {
    console.log(e);
  }
}

handleLogout() {
  localStorage.removeItem("authToken");
  console.log('LOGGED OUT');
  this.setState({
    currentUser: null
  })
}

handleLoginToggle(e) {
  e.preventDefault();
  this.setState((prevState, newState) => ({
    toggleLogin: !prevState.toggleLogin
  }));
}

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>TEA APP</h1>
          <h2>khjbasdlhbasfl</h2>
          <button onClick={this.handleLogout} type="button">Log Out</button>
          <img src={logo} className="App-logo" alt="logo" />
          <Link to ="/login">Login</Link>
          <Route
            exact
            path="/login"
            render={props => (
              <>
              <RegisterForm
                handleChange={this.handleRegisterChange}
                handleSubmit={this.handleRegister}
                registerFormData={this.state.registerFormData}
                currentUser={this.state.currentUser}
                toggle={this.state.toggleLogin}
                handleLoginToggle={this.handleLoginToggle}/>
              <LoginForm
                loginFormData={this.state.loginFormData}
                handleChange={this.handleLoginChange}
                handleSubmit={this.handleLogin}
                currentUser={this.state.currentUser}
                toggle={this.state.toggleLogin}
                handleLoginToggle={this.handleLoginToggle}/>
                </>
            )} />
        </header>
      </div>
    );
  }
}

export default App;
