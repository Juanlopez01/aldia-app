const monthsDays = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
const monthsNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May','Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export const dateFormatter = async (expire : string) => {
    const date = new Date()
    const month : number = date.getMonth();
    const day : number= date.getDate();
    const year : number = date.getFullYear();
    switch (expire) {
        case 'a week':
            if(month !== 11){
                if(day + 7 > monthsDays[month]){
                    return `${(day + 7) - monthsDays[month]}/${monthsNames[month + 1]}/${year}`;
                } else {
                    return `${day + 7}/${monthsNames[month]}/${year}`
                }
            } else {
                if(day + 7 > monthsDays[month]){
                    return `${(day + 7) - monthsDays[month]}/${monthsNames[0]}/${year + 1}`;
                } else {
                    return `${day + 7}/${monthsNames[month]}/${year}`
                }
            }
        case 'two weeks':
            if(month !== 11){
                if(day + 14 > monthsDays[month]){
                    return `${(day + 14) - monthsDays[month]}/${monthsNames[month + 1]}/${year}`;
                } else {
                    return `${day + 14}/${monthsNames[month]}/${year}`
                }
            } else {
                if(day + 14 > monthsDays[month]){
                    return `${(day + 14) - monthsDays[month]}/${monthsNames[0]}/${year + 1}`;
                } else {
                    return `${day + 14}/${monthsNames[month]}/${year}`
                }
            }
        case 'a month':
            if(month !== 11){
                return `${day}/${monthsNames[month + 1]}/${year}`;
            } else {
                return `${day}/${monthsNames[0]}/${year + 1}`;
            }
        case 'two months':
            if(month + 2 <= 11){
                return `${day}/${monthsNames[month + 2]}/${year}`;
            } else {
                return `${day}/${monthsNames[(month + 2)- 12 ]}/${year + 1}`;
            }
        case 'three months':
            if(month + 3 <= 11){
                return `${day}/${monthsNames[month + 3]}/${year}`;
            } else {
                return `${day}/${monthsNames[(month + 3)- 12 ]}/${year + 1}`;
            }
        case 'six months':
            if(month + 6 <= 11){
                return `${day}/${monthsNames[month + 6]}/${year}`;
            } else {
                return `${day}/${monthsNames[(month + 6)- 12 ]}/${year + 1}`;
            }
        case 'nine months':
            if(month + 9 <= 11){
                return `${day}/${monthsNames[month + 2]}/${year}`;
            } else {
                return `${day}/${monthsNames[(month + 9)- 12 ]}/${year + 1}`;
            }
        case 'a year':
            return `${day}/${monthsNames[month]}/${year + 1}`;
    }
}