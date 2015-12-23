import LinkedStateMixin from 'react-addons-linked-state-mixin';
import validator from 'validator';
import {user} from './_mock-data';

module.exports = React.createClass({
  displayName: 'user',

  mixins: [LinkedStateMixin],

  propTypes: {
    user: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      user: {}
    };
  },

  getInitialState: function() {
    // with real data, this would be something like this.props.user
    var {first_name, last_name, email, github} = user;
    return {
      firstName: first_name || '',
      lastName: last_name || '',
      email: email || '',
      github: github || '',
      isValid: {
        firstName: true,
        lastName: true,
        email: true,
        github: true
      }
    };
  },

  _getInputStyleName: function(isValid) {
    return isValid ? 'valid' : 'invalid';
  },

  _updateUser: function() {
    var {firstName, lastName, email, github} = this.state;

    if (this._areValid(firstName, lastName, email, github)) {
      var updatedUser = {
        firstName: this._sanitizeValue(firstName),
        lastName: this._sanitizeValue(lastName),
        email: this._sanitizeValue(email),
        github: this._sanitizeValue(github)
      };
    // in a real app, you'd send this user obj to an action handler to update store
    console.log('updated user:', updatedUser);
    }
  },

  _validateEmail: function(value) {
    return validator.isEmail(value);
  },

  _validateName: function(value) {
    return (validator.isLength(value.trim(), 1, 50));
  },

  _validate: function(firstName, lastName, email, github) {
    this.setState({
      isValid: {
        firstName: this._validateName(firstName),
        lastName: this._validateName(lastName),
        email: this._validateEmail(email),
        github: this._validateName(github)
      }
    });
  },

  _areValid: function(firstName, lastName, email, github) {
    var result = false;
    if (this._validateName(firstName)
      && this._validateName(lastName) 
      && this._validateEmail(email) 
      && this._validateName(github)) {
      
      result = true;
    }
    return result;
  },

  _sanitizeValue: function(value) {
    return value.trim();
  },

  _clearErrors: function() {
    this.setState({
      isValid: {
        firstName: true,
        lastName: true,
        email: true,
        github: true
      }
    });
  },

  handleSaveClick: function() {
    var {firstName, lastName, email, github} = this.state;
    this._validate(firstName, lastName, email, github);
    this._updateUser();
  },

  handleCancelClick: function() {
    // with real data, this would be something like this.props.user
    var {first_name, last_name, email, github, isValid} = user;

    this.setState({
      firstName: first_name,
      lastName: last_name,
      email: email,
      github: github || ''
    });
    this._clearErrors();
  },
  
  render: function() { 

    var {isValid} = this.state;

    return (
      <div styleName='content-container'>
        <div className='main'>
          <h2>Basic Information</h2>

          <div>
            <input type='text'
                   className={this._getInputStyleName(isValid.firstName)}
                   valueLink={this.linkState('firstName')}
                   placeholder='First Name'/>
          </div>
          <div>
            <input type='text'
                   className={this._getInputStyleName(isValid.lastName)}
                   valueLink={this.linkState('lastName')}
                   placeholder='Last Name'/>
          </div>
          <div>
            <input type='text'
                   className={this._getInputStyleName(isValid.email)}
                   valueLink={this.linkState('email')}
                   placeholder='Email'/>
          </div>
          <div>
            <input type='text'
                   className={this._getInputStyleName(isValid.github)}
                   valueLink={this.linkState('github')}
                   placeholder='Github'/>
          </div>

          <div className='button-container'>
            <button onClick={this.handleCancelClick}>Cancel</button>
            <button onClick={this.handleSaveClick}>Save</button>
          </div>
        </div>
      </div> 
    );
  }
});
