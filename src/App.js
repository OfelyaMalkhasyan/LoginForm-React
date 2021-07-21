import React from "react";
import "./App.css";

const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

const formValid = ({formErrors, ...rest}) => {
  let valid = true;

  Object.values(formErrors).forEach((val) => {
    val.length > 0 && (valid = false);
  });

  Object.values(rest).forEach(val => {
    val=== null && (valid=false)
  });
  
  return valid;
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      formErrors: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      },
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();

    if (formValid(this.state)) {
      console.log(`--SUBMITTING--
      First Name: ${this.state.firstName}
      Last Name: ${this.state.lastName}
      Email: ${this.state.email}
      Password:${this.state.password}`);
    } else {
      console.error("FORM INVALID-DISPLAY ERROR MESSAGE");
    }
  };

   handleChange = e=> {
    e.preventDefault();
    const {name, value} = e.target;
    let formErrors = this.state.formErrors;
    

    switch(name) {
      case "firstName": 
      formErrors.firstName=
      value.length < 3  ? "Minimum 3 characters required" : "";
      break;
      case "lastName": 
      formErrors.lastName=
      value.length< 3  ? "Minimum 3 characters required" : "";
      break;
      case "email":
      formErrors.email=
        emailRegex.test(value) ? "": "Invalid email address";
        break;
      case "password":
        formErrors.password=
        value.length < 6 ? "Minimum 6 characters required" : "";
        break;
      default:
        break;
      
    }

    this.setState({formErrors,[name]: value}, ()=> console.log(this.state))
  }

  render() {
    const {formErrors} = this.state
    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>Create Account</h1>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="firstName">
              <label for="firstName">First Name</label> <br></br>
              <input
                type="text"
                className={formErrors.firstName.length > 0 ? "error": null}
                name="firstName"
                placeholder="First Name"
                noValidate
                onChange={this.handleChange}
              /><br></br>
              {formErrors.firstName.length > 0 && (<span className="errorMessage">{formErrors.firstName}</span>)}
            </div>
            <div className="lastName">
              <label for="lastName">Last Name</label> <br></br>
              <input
                type="text"
                className={formErrors.lastName.length >0 ? "error": null}
                name="lastName"
                placeholder="Last Name"
                noValidate
                onChange={this.handleChange}
              /> <br></br>
              {formErrors.lastName.length > 0 && (<span className="errorMessage">{formErrors.lastName}</span>)}
            </div>
            <div className="email">
              <label for="email">Email</label> <br></br>
              <input
                type="email"
                className={formErrors.email.length >0 ? "error": null}
                name="email"
                placeholder="Email"
                noValidate
                onChange={this.handleChange}
              /> <br></br>
              {formErrors.email.length > 0 && (<span className="errorMessage">{formErrors.email}</span>)}
            </div>
            <div className="password">
              <label for="password">Password</label> <br></br>
              <input
                type="password"
                className={formErrors.password.length >0 ? "error": null}
                name="password"
                placeholder="Password"
                noValidate
                onChange={this.handleChange}
              /> <br></br>
              {formErrors.password.length > 0 && (<span className="errorMessage">{formErrors.password}</span>)}
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    );
  }
}
export default App;
