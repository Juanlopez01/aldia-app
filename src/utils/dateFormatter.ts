const monthsDays = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
const monthsNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May','Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export const dateFormatter = async (expire : string) => {
    const month : number = Date.prototype.getMonth();
    const day = Date.prototype.getDate();
    const year = Date.prototype.getFullYear();
    console.log(month, day, year)
    switch (expire) {
        case 'a week':
            if(month !== 11){
                if(day + 7 > monthsDays[month]){
                    return `${(day + 7) - monthsDays[month]}/${monthsNames[month + 1]}/${year}`;
                }
            }
            break;
    }
}