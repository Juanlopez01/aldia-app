const monthsNames : any = {
    'Jan': 'Enero',
    'Feb' : 'Febrero',
    'Mar' : 'Marzo',
    'Apr': 'Abril',
    'May': 'Mayo',
    'Jun': 'Junio',
    'Jul' : 'Julio',
    'Aug' : 'Agosto',
    'Sep': 'Septiembre',
    'Oct': 'Octubre',
    'Nov': 'Noviembre',
    'Dec' : 'Diciembre'
}
const monthsNamesNumber : any = {
    'Enero': '01',
    'Febrero' : '02',
    'Marzo' : '03',
    'Abril': '04',
    'Mayo': '05',
    'Junio': '06',
    'Julio' : '07',
    'Agosto' : '08',
    'Septiembre': '09',
    'Octubre': '10',
    'Noviembre': '11',
    'Diciembre' : '12'
}
const dayNames : any = {
    'Mon': 'Lunes',
    'Tue': 'Martes',
    'Wed': 'Miercoles',
    'Thu': 'Jueves',
    'Fri': 'Viernes',
    'Sat': 'Sabado',
    'Sun': 'Domingo'
}

export const traductDate = (date: Date) => {
    const dateString = date.toString();
    const dateArray = dateString.split(' ').slice(0, 4)
    const dayDate : string = dateArray[0]
    const monthDate : string = dateArray[1]
    const day = dayNames[dayDate]
    const month = monthsNames[monthDate]

    return `${day} ${dateArray[2]} ${month} ${dateArray[3]}`
}
export const traductDateForm = (date: string) => {
    const dateString = date.toString();
    const dateArray = dateString.split(' ').slice(0, 4)
    const monthDate : string = dateArray[2]
    const month = monthsNamesNumber[monthDate]

    return `${dateArray[1]}/${month}/${dateArray[3]}`
}