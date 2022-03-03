import React from 'react';
// import PropTypes from 'prop-types';
import '../components/Form.scss';
// import { useState } from 'react';
// import { connect } from 'react-redux';
// import {reduxSelector, reduxActionCreator} from '../redux';

class Component extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: 1,
      dishName: '',
      dishType: '',
      noOfSlices: 1,
      diameter: '',
      prepareTime: '00:00:00',
      spicinesScale: 0,
      slicesOfBread: 1,
    };
  }

  handleChangeDishName = (e) => {
    e.preventDefault();
    this.setState({ dishName: e.target.value });
  };

  handleChangeNoOfSlices = (e) => {
    e.preventDefault();
    this.setState({ noOfSlices: parseInt(e.target.value)});
  };

  handleChangeDiameter = (e) => {
    e.preventDefault();
    this.setState({ diameter: e.target.value });
  };

  handleChangePrepareTime = (e) => {
    e.preventDefault();
    this.setState({ prepareTime: e.target.value });
  };

  handleChangeSpicinesScale = (e) => {
    e.preventDefault();
    this.setState({ spicinesScale: parseInt(e.target.value) });
  };

  handleChangeSlicesOfBread = (e) => {
    e.preventDefault();
    this.setState({ slicesOfBread: parseInt(e.target.value) });
  };


  render() {
    console.log(this.state);
    return (
      <section className='formBox'>
        <form>
          <h1>Choose your favourite dish</h1>
          <div className="field-wrap">
            <input name="dish_name" value={this.state.dishName} placeholder="Dish name *" required type="text" onChange={e => this.handleChangeDishName(e)}></input>
          </div>
          <fieldset onChange={e => this.setState({ dishType: e.target.value })}>
            <div>
              <input className="typeRadio" type="radio" name="dish_type" value="pizza" />
              <span>Pizza</span>
            </div>
            <div>
              <input className="typeRadio" type="radio" name="dish_type" value="soup" />
              <span>Soup</span>
            </div>
            <div>
              <input className="typeRadio" type="radio" name="dish_type" value="sandwich" />
              <span>Sandwich</span>
            </div>
          </fieldset>
          <div className="field-wrap">
            <input name="preparation_time" placeholder="Preparation time *" id="appt-time" required type="time" step="2" value={this.state.prepareTime} onChange={e => this.handleChangePrepareTime(e)} />
          </div>
          {this.state.dishType === 'pizza' ?
            <fieldset>
              <div className="field-wrap">
                <input name="no_of_slices" id="no_of_slices" placeholder="No of slices *"  required type="number" min="1" max="12" value={this.state.numberOfSlices} onChange={e => this.handleChangeNoOfSlices(e)} />
              </div>
              <div className="field-wrap">
                <input name="diameter" placeholder="Diameter *"  required type="number" min="16" max="46" step="1.5" value={this.state.diameter} onChange={e => this.handleChangeDiameter(e)} />
              </div>
            </fieldset> : ''
          }
          {this.state.dishType === 'soup' ?
            <div className="field-wrap rangeDiv">
              <label htmlFor="spicines_scale">Choose level of spicy</label>
              <input name="spicines_scale" id="spicines_scale" placeholder="Spicines scale *"  required type="range" min="0" max="10" value={this.state.spicinesScale} onChange={e => this.handleChangeSpicinesScale(e)} />
              <output>{this.state.spicinesScale}</output>
            </div>
            : ''
          }
          {this.state.dishType === 'sandwich' ?
            <div className="field-wrap">
              <input name="slices_of_bread" placeholder="Slices of bread *"  required type="number" min="1" max="10" value={this.state.slicesOfBread} onChange={e => this.handleChangeSlicesOfBread(e)} />
            </div>
            : ''
          }
          <button className="button button-block" type="submit">Send</button>
        </form>
      </section>
    );
  }
}

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
