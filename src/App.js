import './App.css';

function App() {
  return (
    <div className="App">
      <section className='formBox'>
    <form>
        <h1>Choose your favourite dish</h1>
        <div class="top-row">
            <div class="field-wrap">
                <input name="firstName" placeholder="First name *" required type="text"></input>
            </div>
            <div class="field-wrap">
                <input name="lastName" placeholder="Last name *" required type="text"></input>
            </div>
        </div>
        <div class="field-wrap">
            <input name="email" placeholder="Email address *" required type="email"></input>
        </div>
        <div class="field-wrap">
            <input placeholder="Password *" required type="password"></input>
        </div>
        <button class="button button-block" type="submit">Get Started</button>
    </form>
</section>
    </div>
  );
}

export default App;
