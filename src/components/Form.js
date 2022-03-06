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
        id: 1,
        dishName: '',
        dishType: '',
        noOfSlices: 0,
        preparationTime: '00:00:00',
        diameter: '',
        spicinesScale: 0,
        slicesOfBread: 0,
      },
      orderFood: {

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
      food: { ...food, [e.target.name]: parseInt(e.target.value) },
      orderFood: { ...orderFood, [e.target.name]: e.target.value },
    });
  };

  changeId = (e) => {
    const { food, orderFood } = this.state;
    this.setState({ orderFood: { ...orderFood, id: food.id + 1 } });
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

    if (food.dishName !== '' && food.dishType && food.preparationTime !== '00:00:00') {
      // await this.setState({ isError: true });
      // alert('Please fill all fields correctly');
      // tu jest git
      if (food.dishType === 'pizza') {
        if (!food.noOfSlices || !food.diameter) {
          console.log('uzupełnij slices lub diameter');
          await this.setState({ isError: true });
          alert('Please fill all fields correctly');
        }
        else {
          console.log('wyślij food do bazy');
          await addFood(orderFood);
          alert('Your food sent successfully!');
          this.refreshPage();
        }
        // await this.setState({ isError: true });
        // alert('Please fill all fields correctly');
      }
      if (food.dishType === 'soup') {
        console.log('wypełnij soup');
        if (!food.spicinesScale) {
          await this.setState({ isError: true });
          alert('Please fill all fields correctly');
        }
        else {
          console.log('wyślij food do bazy');
          await addFood(orderFood);
          alert('Your food sent successfully!');
          this.refreshPage();
        }
      }
      if (food.dishType === 'sandwich') {
        if (!food.slicesOfBread) {
          await this.setState({ isError: true });
          alert('Please fill all fields correctly');
        }
        else {
          console.log('wyślij food do bazy');
          await addFood(orderFood);
          alert('Your food sent successfully!');
          this.refreshPage();
        }
      }
    }
    else {
      console.log('wypełnij dishName, dishType, preparationTime');
      await this.setState({ isError: true });
      alert('Please fill all fields correctly');
      // await addFood(food);
      // alert('Your food sent successfully!');
      // this.refreshPage();
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
                <input name="noOfSlices" id="noOfSlices" placeholder="No of slices *" required type="number" min="0" max="12" value={food.nomberOfSlices} onChange={updateNumberField} />
              </div>
              <div className="field-wrap">
                {/* <label htmlFor="diameter">Diameter</label> */}
                <input name="diameter" id="diameter" placeholder="Diameter *" required type="number" min="16" max="46" step="1.5" value={food.diameter} onChange={updateTextField} />
              </div>
            </fieldset> : ''
          }
          {food.dishType === 'soup' ?
            <div className="field-wrap rangeDiv">
              <label htmlFor="spicines_scale">Choose level of spicy</label>
              <input name="spicinesScale" id="spicinesScale" placeholder="Spicines scale *" required type="range" min="1" max="10" value={food.spicinesScale} onChange={updateNumberField} />
              <output>{food.spicinesScale}</output>
            </div>
            : ''
          }
          {food.dishType === 'sandwich' ?
            <div className="field-wrap rangeDiv">
              <label htmlFor="slicesOfBread">Choose slices of bread</label>
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
