interface IListNumber {
    'Un' : number;
    'Dos' : number;
    'Tres' : number;
    'Seis' : number;
    'Doce' : number;
    'Dieciocho' : number;
}

export const creditList = ['No', 'Un pago', 'Dos pagos', 'Tres pagos', 'Seis pagos', 'Doce pagos', 'Dieciocho pagos', 'Más pagos']
export const numberCreditList : IListNumber = {
    'Un' : 1,
    'Dos' : 2,
    'Tres' : 3,
    'Seis' : 6,
    'Doce' : 12,
    'Dieciocho' : 18,
}

export const getNumberCredit = (data: string): number | string => {
    const dataNumber : any = data.split(' ')[0]

    switch (dataNumber) {
        case 'Un': 
            return numberCreditList.Un;
        case 'Dos': 
            return numberCreditList.Dos;
        case 'Tres': 
            return numberCreditList.Tres;
        case 'Seis': 
            return numberCreditList.Seis;
        case 'Doce': 
            return numberCreditList.Doce;
        case 'Dieciocho': 
            return numberCreditList.Dieciocho;
        default: return 100
    }
}