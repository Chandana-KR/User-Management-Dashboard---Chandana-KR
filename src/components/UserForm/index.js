// UserForm.js
import React, { Component } from 'react';
import "./index.css"

class UserForm extends Component {
  state = {
    errors: {
      firstName: '',
      lastName: '',
      email: '',
    },
  };

  handleInputChange = (event) => {
    const { id, value } = event.target;
    this.props.onInputChange(id, value);
    this.validateField(id, value);
  };

  validateField = (field, value) => {
    let error = '';
    
    if (field === 'firstName' || field === 'lastName') {
      if (!value.trim()) {
        error = `${field === 'firstName' ? 'First Name' : 'Last Name'} is required.`;
      }
    }
    
    if (field === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value.trim()) {
        error = 'Email is required.';
      } else if (!emailRegex.test(value)) {
        error = 'Invalid email format.';
      }
    }
    
    this.setState(prevState => ({
      errors: {
        ...prevState.errors,
        [field]: error,
      }
    }));
  };

  validateForm = () => {
    const { formData } = this.props;
    const { firstName, lastName, email } = formData;
    
    let formIsValid = true;
    
    if (!firstName.trim()) {
      this.validateField('firstName', firstName);
      formIsValid = false;
    }
    if (!lastName.trim()) {
      this.validateField('lastName', lastName);
      formIsValid = false;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      this.validateField('email', email);
      formIsValid = false;
    }

    return formIsValid;
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    if (this.validateForm()) {
      this.props.onFormSubmit();
    }
  };

  render() {
    const { formData, isEditing } = this.props;
    const { errors } = this.state;

    return (
      <form className='user-form' onSubmit={this.handleFormSubmit}>
        <div className="user-form-field">
          <label htmlFor='firstName' className='user-form-label'>First Name</label>
          <input
            type="text"
            id="firstName"
            className='user-form-input'
            value={formData.firstName}
            onChange={this.handleInputChange}
          />
          {errors.firstName && <span className='error-message'>{errors.firstName}</span>}
        </div>
        <div className="user-form-field">
          <label htmlFor='lastName' className='user-form-label'>Last Name</label>
          <input
            type="text"
            id="lastName"
            className='user-form-input'
            value={formData.lastName}
            onChange={this.handleInputChange}
          />
          {errors.lastName && <span className='error-message'>{errors.lastName}</span>}
        </div>
        <div className="user-form-field">
          <label htmlFor='email' className='user-form-label'>E-mail</label>
          <input
            type="text"
            id="email"
            className='user-form-input'
            value={formData.email}
            onChange={this.handleInputChange}
          />
          {errors.email && <span className='error-message'>{errors.email}</span>}
        </div>
        <div className="user-form-field">
          <label htmlFor='department' className='user-form-label'>Department</label>
          <input
            type="text"
            id="department"
            className='user-form-input'
            value={formData.department}
            onChange={this.handleInputChange}
          />
        </div>
        <button type="submit" className='user-form-save-button'>
          {isEditing ? 'Update' : 'Save'}
        </button>
      </form>
    );
  }
}

export default UserForm;
