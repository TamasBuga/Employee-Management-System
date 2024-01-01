

import uuid from "react-uuid";


export default function CalendarSheet({ currentDate }) {
    
    let firstWeekday = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay() === 0 ? 7 : (new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay());
    let monthLength = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    let prevMonthLength = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
    let prevMonthDays = prevMonthLength - (firstWeekday - 2); // 1 === -1
    let nextMonthDays = 1
    let calendar = [];
    let currentDay = 1;

    for (let i = 0; i < 6; i++) {

        let array = [];

        for (let j = 1; j < 8; j++) {

            const dayObject = {
                dateString() { return [this.year, this.month, this.date].join("-") }
            }

            if (i < 1) {
                if (firstWeekday <= (i + j) && firstWeekday !== 0) {
                    dayObject.date = currentDay;
                    dayObject.month = currentDate.getMonth() + 1;
                    dayObject.year = currentDate.getFullYear();
                    dayObject.isCurrent = true;

                    currentDay++;
                } else {

                    //**** PREV MONTH DAYS *********
                    dayObject.date = prevMonthDays;
                    dayObject.month = currentDate.getMonth();
                    dayObject.year = currentDate.getFullYear();
                    dayObject.isCurrent = false;

                    prevMonthDays++;
                }
            } else {
                if (currentDay <= monthLength) {

                    // **** CURRENT DAYS *******
                    dayObject.date = currentDay;
                    dayObject.month = currentDate.getMonth() + 1;
                    dayObject.year = currentDate.getFullYear();
                    dayObject.isCurrent = true;

                    currentDay++;
                } else {

                    // **** NEXT MONTH DAYS *******
                    dayObject.date = nextMonthDays;
                    dayObject.month = currentDate.getMonth() + 2;
                    dayObject.year = currentDate.getFullYear();
                    dayObject.isCurrent = false;

                    nextMonthDays++;
                }
            }
            
            dayObject.id = uuid();
            array.push(dayObject);
        }

        if (array.find(val => val.isCurrent)) {
            calendar.push(array);
        }
    }
    return calendar;
}