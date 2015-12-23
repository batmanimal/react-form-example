import LinkedStateMixin from 'react-addons-linked-state-mixin';
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
      github: github || ''
    };
  },

  _updateUser: function() {
    var {firstName, lastName, email, github} = this.state;

    var updatedUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      github: github
    };
    // in a real app, you'd send this user obj to an action handler to update store
    console.log('updated user:', updatedUser);
  },

  handleSaveClick: function() {
    var {firstName, lastName, email, github} = this.state;
    this._updateUser();
  },

  handleCancelClick: function() {
    // with real data, this would be something like this.props.user
    var {first_name, last_name, email, github} = user;

    this.setState({
      firstName: first_name,
      lastName: last_name,
      email: email,
      github: github || ''
    });
  },
  
  render: function() { 

    return (
      <div styleName='content-container'>
        <div className='main'>
          <h2>Basic Information</h2>

          <div>
            <input type='text'
                   valueLink={this.linkState('firstName')}
                   placeholder='First Name'/>
          </div>
          <div>
            <input type='text'
                   valueLink={this.linkState('lastName')}
                   placeholder='Last Name'/>
          </div>
          <div>
            <input type='text'
                   valueLink={this.linkState('email')}
                   placeholder='Email'/>
          </div>
          <div>
          <input type='text'
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
