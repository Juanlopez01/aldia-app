import moment from "moment"



const monthsNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May','Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
export const dateDifference = (finishDate : String, setGoalsExpirated : Function, goalsExpirated : Number) => {
    const dayArray = finishDate.split('/')
    const month = monthsNames.indexOf(dayArray[1]) + 1
    const date = `${dayArray[2]}-${month}-${dayArray[0]}`
    const Today = new Date()
    const todayDay = Today.getDate()
    const todayMonth = Today.getMonth()
    const todayYear = Today.getFullYear();
    const left = moment(date).diff(`${todayYear}-${todayMonth}-${todayDay}`, 'days')
    if(left < 7) setGoalsExpirated(goalsExpirated.valueOf() + 1) 
}