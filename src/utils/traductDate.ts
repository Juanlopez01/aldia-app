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