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
    var {first_name, last_name, email, github} = user;
    return {
      firstName: first_name || '',
      lastName: last_name || '',
      email: email || '',
      github: github || ''
    };
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
            <button>Cancel</button>
            <button>Save</button>
          </div>
        </div>
      </div> 
    );
  }
});
