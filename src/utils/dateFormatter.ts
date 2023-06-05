const monthsDays = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
const monthsNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May','Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export const dateFormatter = async (expire : string) => {
    const date = new Date()
    const month : number = date.getMonth();
    const day : number= date.getDate();
    const year : number = date.getFullYear();
    switch (expire) {
        case 'Una semana':
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
        case 'Dos semanas':
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
        case 'Un mes':
            if(month !== 11){
                return `${day}/${monthsNames[month + 1]}/${year}`;
            } else {
                return `${day}/${monthsNames[0]}/${year + 1}`;
            }
        case 'Dos meses':
            if(month + 2 <= 11){
                return `${day}/${monthsNames[month + 2]}/${year}`;
            } else {
                return `${day}/${monthsNames[(month + 2)- 12 ]}/${year + 1}`;
            }
        case 'Tres meses':
            if(month + 3 <= 11){
                return `${day}/${monthsNames[month + 3]}/${year}`;
            } else {
                return `${day}/${monthsNames[(month + 3)- 12 ]}/${year + 1}`;
            }
        case 'Seis meses':
            if(month + 6 <= 11){
                return `${day}/${monthsNames[month + 6]}/${year}`;
            } else {
                return `${day}/${monthsNames[(month + 6)- 12 ]}/${year + 1}`;
            }
        case 'Nueve meses':
            if(month + 9 <= 11){
                return `${day}/${monthsNames[month + 2]}/${year}`;
            } else {
                return `${day}/${monthsNames[(month + 9)- 12 ]}/${year + 1}`;
            }
        case 'Un año':
            return `${day}/${monthsNames[month]}/${year + 1}`;
        case 'Dos años':
            return `${day}/${monthsNames[month]}/${year + 2}`;
        case 'Tres años':
            return `${day}/${monthsNames[month]}/${year + 3}`;
        case 'Indefinido':
            return `Indefinido`;
    }
}