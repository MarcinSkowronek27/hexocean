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
        <div className="field-wrap">
          <input name="name" placeholder="Dish name *" required type="text"></input>
        </div>
        <fieldset>
          <div>
            <input type="radio" name="type" value="pizza" />
            <span>Pizza</span>
          </div>
          <div>
            <input type="radio" name="type" value="soup" />
            <span>Soup</span>
          </div>
          <div>
            <input type="radio" name="type" value="sandwich" />
            <span>Sandwich</span>
          </div>
        </fieldset>
        <div className="field-wrap">
          <input name="preparation_time" placeholder="Preparation time *" id="appt-time" type="time" step="2" value="12:50:10" />
        </div>
        <div className="field-wrap">
          <input placeholder="Password *" required type="password"></input>
        </div>
        <button className="button button-block" type="submit">Send</button>
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
