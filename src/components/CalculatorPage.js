import React from 'react';
import { changePrice, changeDeadline } from './countingFunctions';
import './page.css';


class CalculatorPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      text: '',
      lettersCount: '',
      language: '',
      comment: '',
      price: '0,00',
      deadline: '',
    };
  }

  onSubmit = (event) => {
    console.log(this.state);
    this.setState({
      email: '',
      name: '',
      text: '',
      lettersCount: '',
      language: '',
      comment: '',
      price: "0,00",
      deadline: '',
    })
    event.target.reset();
    event.preventDefault();
  }

  onChangeEmail = (e) => {
    this.setState({email: e.target.value});
  }

  onChangeName = (e) => {
    this.setState({name: e.target.value});
  }

  onChangeText = (e) => {
    this.setState({text: e.target.value, lettersCount: e.target.value.length});
    if (this.state.language) {
      this.setState({price: changePrice(e.target.value.length, this.state.language)});
      const currentDate = new Date().getTime();
      this.setState({deadline: changeDeadline(e.target.value.length, this.state.language, currentDate)});
    }  
  }

  onChooseLanguage = (e) => {
    this.setState({language: e.target.value});
    this.setState({price: changePrice(this.state.text.length, e.target.value)})
    const currentDate = new Date().getTime();
    this.setState({deadline: changeDeadline(this.state.text.length, e.target.value, currentDate)});
  }

  onChangeComment = (e) => {
    this.setState({comment: e.target.value});
  }
  render() {
    return (
    <div className="page-container">  
      <div className="description-form-container">
        <h1>ЗАМОВИТИ РЕДАГУВАННЯ</h1>
        <p>Виправимо всі помилки, приберемо всі дурниці, перефразуємо невдалі місця, але сильно текст не переписуватимемо. Зайвих виправлень не буде. <a href="https://correctarium.com/ua/price/proofreading">Детальніше про редагування</a></p>

        <form id="text-form" onSubmit={this.onSubmit}>
          <input type="text" name="email" value={this.state.email} placeholder="Ваша ел. пошта" required={true} onChange={this.onChangeEmail} />
          <input type="text" name="name" value={this.state.name} placeholder="Ваше ім'я" onChange={this.onChangeName} />
          <textarea className="textarea" type="text" name="text" value={this.state.text} placeholder="Уведіть текст" onChange={this.onChangeText} />
          <p className="letters-count">{this.state.lettersCount ? this.state.lettersCount : ""}</p>
          <p className="language-word">МОВА</p>
          <label>
            <input type="radio" name="language" value="ukr" onChange={this.onChooseLanguage} required />
            Українська
          </label>
          <label>
            <input type="radio" name="language" value="ru" onChange={this.onChooseLanguage} />
            Російська
          </label>
          <label>
            <input type="radio" name="language" value="eng" onChange={this.onChooseLanguage} />
            Англійська
          </label>
          <input type="text" className="comment-input" name="comment" value={this.state.comment} placeholder="Стислий коментар або покликання" onChange={this.onChangeComment} /> 
        </form>
      </div>
      <div className="sum-btn-block">
        <p className="current-price">{this.state.price} грн</p>
        <p className="deadline">{this.state.deadline}</p>
        <button className="submit-btn" type="submit" form="text-form" >ЗАМОВИТИ</button>
      </div>
    </div>
    )
  }
}

export default CalculatorPage;