import React from 'react';
// import PropTypes from 'prop-types';
import '../components/Form.scss';
// import { connect } from 'react-redux';
// import {reduxSelector, reduxActionCreator} from '../redux';

const Component = () => {

  return (
    <section className='formBox'>
      <form>
        <h1>Choose your favourite dish</h1>
        <div className="top-row">
          <div className="field-wrap">
            <input name="name" placeholder="Dish name *" required type="text"></input>
          </div>
          <div className="field-wrap">
            <input name="preparation_time" placeholder="Preparation time *" required type="text"></input>
          </div>
        </div>
        <div className="field-wrap">
          <input id="appt-time" type="time" name="appt-time" step="2" value="12:50:10"/>
        </div>
        <div className="field-wrap">
          <input placeholder="Password *" required type="password"></input>
        </div>
        <button className="button button-block" type="submit">Get Started</button>
      </form>
    </section>
  );
};

// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const FormContainer = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // FormContainer as Form,
  Component as FormComponent,
};
