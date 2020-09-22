import React from 'react';
import './page.css';

const oneDayMilliseconds = 86400000;
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
      this.changePrice(e.target.value.length, this.state.language);
      this.changeDeadline(e.target.value.length, this.state.language);
    }  
  }

  onChooseLanguage = (e) => {
    this.setState({language: e.target.value});
    this.changePrice(this.state.text.length, e.target.value);
    this.changeDeadline(this.state.text.length, e.target.value);
  }

  changePrice = (lettersCount, language) => {
    const engLetterCost = 0.12;
    const cyrillicLetterCost = 0.05;
    const letterCost = language === "eng" ? engLetterCost : cyrillicLetterCost;
    const currentPrice = lettersCount < 1000 && lettersCount !== 0 ? 1000 * letterCost : lettersCount * letterCost;
    this.setState({price: currentPrice})
  }


  changeDeadline = (lettersCount, language) => {
    const currentDate = new Date(new Date().getTime());
    const engLettersPerHour = 333;
    const cyrillicLettersPerHour = 1333;
    const lettersPerHour = language === "eng" ? engLettersPerHour : cyrillicLettersPerHour;
    const hoursForLetters = +((Math.ceil((lettersCount / lettersPerHour) * 2) / 2).toFixed(1));
    let requiredTime = (0.5 + hoursForLetters) < 1 ? 1 : (0.5 + hoursForLetters);
    if (lettersCount === 0) {
      requiredTime = 0;
    }
    if (currentDate.getDay() > 0 && currentDate.getDay() < 6) {
      const toRoundHours = currentDate.getMinutes() < 30 ? 0.5 : 1;
      const remainingWorkingHours = (currentDate.getHours() + toRoundHours) < 19 ? 19 - (currentDate.getHours() + toRoundHours) : 0;
      if (remainingWorkingHours >= requiredTime) {
        switch(requiredTime) {
          case 0: 
            this.setState({deadline: ''})
            break;
          case 1: 
            this.setState({deadline: 'Здамо за: одну годину'})
            break;
          case 1.5:
          case 2: 
            this.setState({deadline: 'Здамо за: дві години'})
            break;
          case 2.5: 
          case 3:
            this.setState({deadline: 'Здамо за: три години'})
            break;
          case 3.5: 
          case 4: 
            this.setState({deadline: 'Здамо за: чотири години'})
            break;
          case 4.5: 
          case 5: 
            this.setState({deadline: 'Здамо за: п\'ять годин'})
            break;
          case 5.5: 
          case 6: 
            this.setState({deadline: 'Здамо за: шість годин'})
            break;
          case 6.5: 
          case 7: 
            this.setState({deadline: 'Здамо за: сім годин'})
            break;
          case 7.5: 
          case 8: 
            this.setState({deadline: 'Здамо за: вісім годин'})
            break;
          case 8.5: 
          case 9: 
            this.setState({deadline: 'Здамо за: дев\'ять годин'})
            break;
        } 
      } else {
        const remainingTime = requiredTime - remainingWorkingHours;
        const deadline = this.determineDeadline(remainingTime, currentDate.getTime() + oneDayMilliseconds);
        this.setState({deadline: deadline});
      }
    } else {
      const deadline = this.determineDeadline(requiredTime, currentDate.getTime() + oneDayMilliseconds);
      this.setState({deadline: deadline});
    }
  }

  determineDeadline = (hours, date) => {
    if (new Date(date).getDay() !== 0 && new Date(date).getDay() !== 6 && hours <= 9) {
      const deadlineDate = new Date(date).toLocaleDateString();
      const deadlineHour = hours%1 ? 10 + Math.floor(hours) + ':30' : 10 + hours + ':00';
      return `Термін виконання: ${deadlineDate} o ${deadlineHour}`;
    } else if (new Date(date).getDay() == 0 && hours <= 9) {
      const deadlineDate = new Date(date + oneDayMilliseconds).toLocaleDateString();
      const deadlineHour = hours%1 ? 10 + Math.floor(hours) + ':30' : 10 + hours + ':00';
      return `Термін виконання: ${deadlineDate} o ${deadlineHour}`;
    } else if (new Date(date).getDay() == 6 && hours <= 9) {
      const deadlineDate = new Date(date + 2 * oneDayMilliseconds).toLocaleDateString();
      const deadlineHour = hours%1 ? 10 + Math.floor(hours) + ':30' : 10 + hours + ':00';
      return `Термін виконання: ${deadlineDate} o ${deadlineHour}`;
    } else if (new Date(date).getDay() !== 5 && new Date(date).getDay() !== 6) {
      return this.determineDeadline(hours - 9, date + oneDayMilliseconds);
    } else if (new Date(date).getDay() == 5) {
      return this.determineDeadline(hours - 9, date + 3 * oneDayMilliseconds);
    } else if (new Date(date).getDay() == 6) {
      return this.determineDeadline(hours - 9, date + 2 * oneDayMilliseconds);
    }
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
          <p>МОВА</p>
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
          <input type="text" name="comment" value={this.state.comment} placeholder="Стислий коментар або покликання" onChange={this.onChangeComment} /> 
        </form>
      </div>
      <div className="sum-btn-block">
        <p className="current-price">{this.state.price} грн</p>
        <p className="deadline">{this.state.deadline}</p>
        <button type="submit" form="text-form" >ЗАМОВИТИ</button>
      </div>
    </div>
    )
  }
}

export default CalculatorPage;