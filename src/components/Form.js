import React from 'react';
import PropTypes from 'prop-types';
import '../components/Form.scss';
import { connect } from 'react-redux';
import { getFoodData, addFoodInAPI, updateOrderFood, cleanOrderFood } from '../redux/foodRedux';

class Component extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      food: {
        id: 1,
        dishName: '',
        dishType: '',
        noOfSlices: 1,
        diameter: '',
        preparationTime: '00:00:00',
        spicinesScale: 0,
        slicesOfBread: 1,
      },
    };
  }

  updateTextField = (e) => {
    const { food } = this.state;
    this.setState({ food: { ...food, [e.target.name]: e.target.value } });
  };

  updateNumberField = (e) => {
    const { food } = this.state;
    this.setState({ food: { ...food, [e.target.name]: parseInt(e.target.value) } });
  };

  // handleChangeDishName = (e) => {
  //   e.preventDefault();
  //   this.setState({ dishName: e.target.value });
  // };

  // handleChangeNoOfSlices = (e) => {
  //   e.preventDefault();
  //   this.setState({ noOfSlices: parseInt(e.target.value) });
  // };

  // handleChangeDiameter = (e) => {
  //   e.preventDefault();
  //   this.setState({ diameter: e.target.value });
  // };

  // handleChangePrepareTime = (e) => {
  //   e.preventDefault();
  //   this.setState({ prepareTime: e.target.value });
  // };

  // handleChangeSpicinesScale = (e) => {
  //   e.preventDefault();
  //   this.setState({ spicinesScale: parseInt(e.target.value) });
  // };

  // handleChangeSlicesOfBread = (e) => {
  //   e.preventDefault();
  //   this.setState({ slicesOfBread: parseInt(e.target.value) });
  // };

  changeId = (e) => {
    const { food } = this.state;
    this.setState({ food: { ...food, id: food.id + 1} });
  };

  submitForm = async (e) => {
    const { food } = this.state;
    const { addFood } = this.props;
    e.preventDefault();

    if (food.dishName && food.dishType) {
      await addFood(food);
      alert('Your food sent successfully!');

      this.setState({
        food: {
          id: 1,
          dishName: '',
          dishType: '',
          noOfSlices: 1,
          diameter: '',
          preparationTime: '00:00:00',
          spicinesScale: 0,
          slicesOfBread: 1,
        },
      });
    } else {
      await this.setState({ isError: true });
      alert('Please fill all fields correctly');
    }
  };


  render() {
    console.log(this.state);
    const { updateTextField, updateNumberField, submitForm, changeId } = this;
    const { food } = this.state;

    return (
      <section className='formBox'>
        <form noValidate autoComplete="off" onSubmit={submitForm}>
          <h1>Make your favourite dish</h1>
          <div className="field-wrap">
            <input name="dishName" id="dishName" value={food.dishName} placeholder="Dish name *" required type="text" onChange={updateTextField}></input>
          </div>
          <fieldset onChange={updateTextField}>
            <div>
              <input className="typeRadio" type="radio" name="dishType" id="dishType" value="pizza" />
              <span>Pizza</span>
            </div>

            <div>
              <input className="typeRadio" type="radio" name="dishType" id="dishType" value="soup" />
              <span>Soup</span>
            </div>
            <div>
              <input className="typeRadio" type="radio" name="dishType" id="dishType" value="sandwich" />
              <span>Sandwich</span>
            </div>
          </fieldset>
          <div className="field-wrap">
            <input name="preparationTime" placeholder="Preparation time *" id="preparationTime" required type="time" step="2" value={food.preparationTime} onChange={updateTextField} />
          </div>
          {food.dishType === 'pizza' ?
            <fieldset>
              <div className="field-wrap">
                <input name="noOfSlices" id="noOfSlices" placeholder="No of slices *" required type="number" min="1" max="12" value={food.numberOfSlices} onChange={updateNumberField} />
              </div>
              <div className="field-wrap">
                <input name="diameter" id="diameter" placeholder="Diameter *" required type="number" min="16" max="46" step="1.5" value={food.diameter} onChange={updateTextField} />
              </div>
            </fieldset> : ''
          }
          {food.dishType === 'soup' ?
            <div className="field-wrap rangeDiv">
              <label htmlFor="spicines_scale">Choose level of spicy</label>
              <input name="spicinesScale" id="spicinesScale" placeholder="Spicines scale *" required type="range" min="0" max="10" value={food.spicinesScale} onChange={updateNumberField} />
              <output>{food.spicinesScale}</output>
            </div>
            : ''
          }
          {food.dishType === 'sandwich' ?
            <div className="field-wrap">
              <input name="slicesOfBread" id="slicesOfBread" placeholder="Slices of bread *" required type="number" min="1" max="10" value={food.slicesOfBread} onChange={updateNumberField} />
            </div>
            : ''
          }
          <button onClick={changeId} className="button button-block" type="submit">Send</button>
        </form>
      </section >
    );
  }
}

Component.propTypes = {
  foodData: PropTypes.object,
  addFoodInAPI: PropTypes.func,
  updateOrderFood: PropTypes.func,
  addFood: PropTypes.func,
  cleanOrderFood: PropTypes.func,
};

const mapStateToProps = state => ({
  foodData: getFoodData(state),
});

const mapDispatchToProps = dispatch => ({
  addFood: arg => dispatch(addFoodInAPI(arg)),
  updateOrderFood: arg => dispatch(updateOrderFood(arg)),
  cleanOrderFood: arg => dispatch(cleanOrderFood(arg)),
});

const FormContainer = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  FormContainer as Form,
  Component as FormComponent,
};
