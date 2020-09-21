import React from 'react';
import './page.css';
//import { Form, Input, Button, Radio } from 'antd';

class CalculatorPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      text: '',
      language: '',
      comment: '',
      total: "0,00",
    };
  }

  onSubmit = (event) => {
    console.log(this.state);
    event.preventDefault();
  }

  onChangeEmail = (e) => {
    this.setState({email: e.target.value});
  }

  onChangeName = (e) => {
    this.setState({name: e.target.value});
  }

  onChangeText = (e) => {
    this.setState({text: e.target.value});
  }

  onChooseLanguage = (e) => {
    this.setState({language: e.target.value});
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
          <textarea type="text" name="text" value={this.state.text} placeholder="Уведіть текст"
              onChange={this.onChangeText}/>
          <p>МОВА</p>
          <label>
            <input type="radio" name="language" value="ukr"  onChange={this.onChooseLanguage} />
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
          <input type="text" name="comment" value={this.state.comment} placeholder="Стислий коментар або покликання" onChange={this.onChangeComment} /> 
        </form>
      </div>
      <div className="sum-btn-block">
        <p>{this.state.total} грн</p>
        <button type="submit" form="text-form" >ЗАМОВИТИ</button>
      </div>
    </div>
    )
  }
}

export default CalculatorPage;