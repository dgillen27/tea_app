import React from 'react';

const LoginForm = (props) => {
  const { email, password } = props.loginFormData
  const { currentUser, toggle, handleLoginToggle } = props
  const showLogin = !currentUser && toggle
  return (
    showLogin &&
    (<div className="user-form-container">
      <div className="inner-form-container">
      <form onSubmit={props.handleSubmit}>
        <h2>Login</h2>
        <input onChange={props.handleChange} type="text" name="email" placeholder="Email" value={email} />
        <input onChange={props.handleChange} type="password" name="password" placeholder="Password" value={password} />
        <button type="submit">Login</button>
      </form>
      <div className="login-bottom">
        <div id="hover" type="submit">
          Not a member? <u onClick={handleLoginToggle}>Sign Up!</u>
        </div>
      </div>
      </div>
    </div>)
  )
}

export default LoginForm;
