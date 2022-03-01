import React from 'react';
import PropTypes from 'prop-types';
import '../components/Form.scss';
import { connect } from 'react-redux';

const Component = () => {

  return (
    <div className="App">
      <section className='formBox'>
        <form>
          <h1>Choose your favourite dish</h1>
          <div className="top-row">
            <div className="field-wrap">
              <input name="firstName" placeholder="First name *" required type="text"></input>
            </div>
            <div className="field-wrap">
              <input name="lastName" placeholder="Last name *" required type="text"></input>
            </div>
          </div>
          <div className="field-wrap">
            <input name="email" placeholder="Email address *" required type="email"></input>
          </div>
          <div className="field-wrap">
            <input placeholder="Password *" required type="password"></input>
          </div>
          <button className="button button-block" type="submit">Get Started</button>
        </form>
      </section>
    </div>
  );
};

const FormContainer = connect(Component);

export {
  FormContainer as Form,
  Component as FormComponent,
};
