import React from 'react';

const RegisterForm = (props) => {
  const { username, email, password } = props.registerFormData
  const { currentUser, toggle, handleLoginToggle } = props
  const showLogin = !currentUser && !toggle
  return (
    showLogin &&
    (<div className="user-form-container">
      <div className="inner-form-container">
        <form onSubmit={props.handleSubmit}>
          <h2>Register</h2>
          <input onChange={props.handleChange} type="text" name="username" placeholder="Username" value={username} />
          <input onChange={props.handleChange} type="text" name="email" placeholder="Email" value={email} />
          {/*<input onChange={props.handleChange} type="text" name="image_url" placeholder="Image" value={image_url} />*/}
          <input onChange={props.handleChange} type="password" name="password" placeholder="Password" value={password} />
          <button type="submit">Register</button>
        </form>
        <div className="login-bottom">
          <div id="hover">
            Already have an account? <u onClick={handleLoginToggle}>Sign in!</u>
          </div>
        </div>
      </div>
    </div>)
  )
}

export default RegisterForm;
