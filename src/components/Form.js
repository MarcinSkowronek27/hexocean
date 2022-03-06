import React from 'react';
import PropTypes from 'prop-types';
import '../components/Form.scss';
import { connect } from 'react-redux';
import { getFoodData, addFoodInAPI } from '../redux/foodRedux';

class Component extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      food: {
        name: '',
        type: '',
        no_of_slices: 0,
        preparation_time: '00:00:00',
        diameter: '',
        spiciness_scale: 0,
        slices_of_bread: 0,
      },
      orderFood: {
        id: 1,
      },
    };
  }

  updateTextField = (e) => {
    const { food, orderFood } = this.state;
    this.setState({
      food: { ...food, [e.target.name]: e.target.value },
      orderFood: { ...orderFood, [e.target.name]: e.target.value },
    });
  };

  updateNumberField = (e) => {
    const { food, orderFood } = this.state;
    this.setState({
      food: { ...food, [e.target.name]: e.target.value * 1 },
      orderFood: { ...orderFood, [e.target.name]: e.target.value * 1 },
    });
  };

  refreshPage = () => {
    setTimeout(function () {
      window.location.reload();
    }, 400);
  };

  submitForm = async (e) => {
    const { food, orderFood } = this.state;
    const { addFood } = this.props;
    e.preventDefault();

    if (food.name !== '' && food.type && food.preparation_time !== '00:00:00') {
      if (food.type === 'pizza') {
        if (!food.no_of_slices || !food.diameter) {
          await this.setState({ isError: true });
          alert('Please fill all fields correctly');
        }
        else {
          await addFood(orderFood);
          alert('Your food sent successfully!');
          this.refreshPage();
        }
      }
      if (food.type === 'soup') {
        if (!food.spiciness_scale) {
          await this.setState({ isError: true });
          alert('Please fill all fields correctly');
        }
        else {
          await addFood(orderFood);
          alert('Your food sent successfully!');
          this.refreshPage();
        }
      }
      if (food.type === 'sandwich') {
        if (!food.slices_of_bread) {
          await this.setState({ isError: true });
          alert('Please fill all fields correctly');
        }
        else {
          await addFood(orderFood);
          alert('Your food sent successfully!');
          this.refreshPage();
        }
      }
    }
    else {
      await this.setState({ isError: true });
      alert('Please fill all fields correctly');
    }
  };

  render() {
    console.log(this.state);
    const { updateTextField, updateNumberField, submitForm } = this;
    const { food } = this.state;

    return (
      <section className='formBox'>
        <form noValidate autoComplete="off" onSubmit={submitForm}>
          <h1>Make your favourite dish</h1>
          <div className="field-wrap">
            <input name="name" id="name" value={food.name} placeholder="Dish name *" required type="text" onChange={updateTextField}></input>
          </div>
          <fieldset onChange={updateTextField}>
            <div>
              <input className="typeRadio" type="radio" name="type" id="type" value="pizza" />
              <span>Pizza</span>
            </div>

            <div>
              <input className="typeRadio" type="radio" name="type" id="type" value="soup" />
              <span>Soup</span>
            </div>
            <div>
              <input className="typeRadio" type="radio" name="type" id="type" value="sandwich" />
              <span>Sandwich</span>
            </div>
          </fieldset>
          <div className="field-wrap">
            <input name="preparation_time" placeholder="Preparation time *" id="preparation_time" required type="time" step="2" value={food.preparation_time} onChange={updateTextField} />
          </div>
          {food.type === 'pizza' ?
            <fieldset>
              <div className="field-wrap">
                <input name="no_of_slices" id="no_of_slices" placeholder="No of slices *" required type="number" min="0" max="12" value={food.nomberOfSlices} onChange={updateNumberField} />
              </div>
              <div className="field-wrap">
                <input name="diameter" id="diameter" placeholder="Diameter *" required type="number" min="16" max="46" step="1.5" value={food.diameter} onChange={updateNumberField} />
              </div>
            </fieldset> : ''
          }
          {food.type === 'soup' ?
            <div className="field-wrap rangeDiv">
              <label htmlFor="spicines_scale">Choose level of spicy</label>
              <input name="spiciness_scale" id="spiciness_scale" placeholder="Spicines scale *" required type="range" min="1" max="10" value={food.spiciness_scale} onChange={updateNumberField} />
              <output>{food.spiciness_scale}</output>
            </div>
            : ''
          }
          {food.type === 'sandwich' ?
            <div className="field-wrap rangeDiv">
              <label htmlFor="slices_of_bread">Choose slices of bread</label>
              <input name="slices_of_bread" id="slices_of_bread" placeholder="Slices of bread *" required type="number" min="1" max="10" value={food.slices_of_bread} onChange={updateNumberField} />
            </div>
            : ''
          }
          <button className="button button-block" type="submit">Send</button>
        </form>
      </section >
    );
  }
}

Component.propTypes = {
  foodData: PropTypes.array,
  addFoodInAPI: PropTypes.func,
  addFood: PropTypes.func,
};

const mapStateToProps = state => ({
  foodData: getFoodData(state),
});

const mapDispatchToProps = dispatch => ({
  addFood: arg => dispatch(addFoodInAPI(arg)),
});

const FormContainer = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  FormContainer as Form,
  Component as FormComponent,
};
