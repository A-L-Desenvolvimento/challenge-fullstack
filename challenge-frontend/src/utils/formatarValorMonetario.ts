export const formatarValorMonetario = (valor: string | number) => {
    if (typeof valor === 'string') {
        valor = valor.trim();

        if (/,/.test(valor) && !/\.\d{2}$/.test(valor)) {
            valor = valor.replace(/\./g, '').replace(',', '.');
        } else {
            valor = valor.replace(/,/g, '');
        }
    }

    let numero: number;

    if (typeof valor === 'string') {
        numero = parseFloat(valor);
    } else {
        numero = valor;
    }

    if (isNaN(numero)) {
        throw new Error('Valor inválido para formatação monetária.');
    }

    return numero
}