const oneDayMilliseconds = 86400000;

const changePrice = (lettersCount, language) => {
    const engLetterCost = 0.12;
    const cyrillicLetterCost = 0.05;
    const letterCost = language === "eng" ? engLetterCost : cyrillicLetterCost;
    const currentPrice = lettersCount < 1000 && lettersCount !== 0 ? 1000 * letterCost : lettersCount * letterCost;
    return currentPrice;
  }

const changeDeadline = (lettersCount, language, date) => {
    const currentDate = new Date(date);
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
      if (currentDate.getHours() >= 10 && remainingWorkingHours >= requiredTime && requiredTime <= 3) {
        switch(requiredTime) {
          case 0: 
            return '';
          case 1: 
            return 'Здамо за: одну годину';
          case 1.5:
          case 2: 
            return 'Здамо за: дві години';
          case 2.5: 
          case 3:
            return 'Здамо за: три години';
        } 
      } else if ((currentDate.getHours() < 10 && remainingWorkingHours >= requiredTime) || (currentDate.getHours() >= 10 && remainingWorkingHours >= requiredTime && requiredTime > 3)) {
        const deadline = determineDeadline(requiredTime, currentDate.getTime());
        return deadline;
      } else {
        const remainingTime = requiredTime - remainingWorkingHours;
        const deadline = determineDeadline(remainingTime, currentDate.getTime() + oneDayMilliseconds);
        return deadline;
      }
    } else {
      const deadline = determineDeadline(requiredTime, currentDate.getTime() + oneDayMilliseconds);
      return deadline;
    }
  }

const determineDeadline = (hours, date) => {
    if (new Date(date).getDay() !== 0 && new Date(date).getDay() !== 6 && hours <= 9) {
      const deadlineDate = new Date(date).toLocaleDateString();
      const deadlineHour = hours%1 ? 10 + Math.floor(hours) + ':30' : 10 + hours + ':00';
      return `Термін виконання: ${deadlineDate} o ${deadlineHour}`;
    } else if (new Date(date).getDay() === 0 && hours <= 9) {
      const deadlineDate = new Date(date + oneDayMilliseconds).toLocaleDateString();
      const deadlineHour = hours%1 ? 10 + Math.floor(hours) + ':30' : 10 + hours + ':00';
      return `Термін виконання: ${deadlineDate} o ${deadlineHour}`;
    } else if (new Date(date).getDay() === 6 && hours <= 9) {
      const deadlineDate = new Date(date + 2 * oneDayMilliseconds).toLocaleDateString();
      const deadlineHour = hours%1 ? 10 + Math.floor(hours) + ':30' : 10 + hours + ':00';
      return `Термін виконання: ${deadlineDate} o ${deadlineHour}`;
    } else if (new Date(date).getDay() !== 5 && new Date(date).getDay() !== 6 && new Date(date).getDay() !== 0 ) {
      return determineDeadline(hours - 9, date + oneDayMilliseconds);
    } else if (new Date(date).getDay() === 5) {
      return determineDeadline(hours - 9, date + 3 * oneDayMilliseconds);
    } else if (new Date(date).getDay() === 6) {
      return determineDeadline(hours - 9, date + 2 * oneDayMilliseconds);
    } else if (new Date(date).getDay() === 0) {
      return determineDeadline(hours - 9, date + 2 * oneDayMilliseconds);
    }
  }

export { changePrice, changeDeadline };