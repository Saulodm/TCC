export class Util {

    MaskCpfCnpj(num) {
        if (num) {
            num = num.toString();
            num = num.replace(/\D/g, "");
            if (num.length > 11)
                num = num.slice(0, 11);
            switch (num.length) {
                case 4:
                    num = num.replace(/(\d+)(\d{3})/, " $1.$2");
                    break;
                case 5:
                    num = num.replace(/(\d+)(\d{3})/, " $1.$2");
                    break;
                case 6:
                    num = num.replace(/(\d+)(\d{3})/, " $1.$2");
                    break;
                case 7:
                    num = num.replace(/(\d+)(\d{3})(\d{3})/, " $1.$2.$3");
                    break;
                case 8:
                    num = num.replace(/(\d+)(\d{3})(\d{3})/, " $1.$2.$3");
                    break;
                case 9:
                    num = num.replace(/(\d+)(\d{3})(\d{3})/, " $1.$2.$3");
                    break;
                case 10:
                    num = num.replace(/(\d+)(\d{3})(\d{3})(\d{1})/, " $1.$2.$3-$4");
                    break;
                case 11:
                    num = num.replace(/(\d+)(\d{3})(\d{3})(\d{2})/, " $1.$2.$3-$4");
                    break;
                default:
                    num = num.replace(/(\d+)(\d{3})(\d{3})(\d{2})/, " $1.$2.$3-$4");
                    break;
            }
        }
        return num;
    }

    MaskTelefone(num) {
        if (num) {
            num = num.toString();
            num = num.replace(/\D/g, "");

            switch (num.length) {
                case 1:
                    num = num.replace(/(\d+)/, " ($1)");
                    break;
                case 2:
                    num = num.replace(/(\d{2})/, " ($1)");
                    break;
                case 3:
                    num = num.replace(/(\d{2})(\d+)/, " ($1) $2");

                    break;
                case 4:
                    num = num.replace(/(\d{2})(\d+)/, " ($1) $2");

                    break;
                case 5:
                    num = num.replace(/(\d{2})(\d+)/, " ($1) $2");

                    break;
                case 6:
                    num = num.replace(/(\d{2})(\d+)/, " ($1) $2");

                    break;
                case 7:
                    num = num.replace(/(\d{2})(\d{5})/, " ($1) $2");

                    break;
                case 8:
                    num = num.replace(/(\d{2})(\d{5})(\d+)/, " ($1) $2-$3");

                    break;
                case 9:
                    num = num.replace(/(\d{2})(\d{5})(\d+)/, " ($1) $2-$3");

                    break;
                case 10:
                    num = num.replace(/(\d{2})(\d{5})(\d+)/, " ($1) $2-$3");

                    break;
                case 11:
                    num = num.replace(/(\d{2})(\d{5})(\d{4})/, " ($1) $2-$3");

                    break;
                default:
                    num = num.replace(/(\d{2})(\d{5})(\d{4})/, " ($1) $2-$3");
                    break;
            }
        }
        return num;
    }
    //valida telefone
    ValidaTelefone(tel) {
        var exp = /\(\d{2}\)\ \d{4}\-\d{4}/
        if (!exp.test(tel.value))
            alert('Numero de Telefone Invalido!');
    }

    //valida CEP
    ValidaCep(cep) {
        var exp = /\d{2}\.\d{3}\-\d{3}/
        if (!exp.test(cep.value))
            alert('Numero de Cep Invalido!');
    }

    //valida data
    ValidaData(data) {
        var exp = /\d{2}\/\d{2}\/\d{4}/
        if (!exp.test(data.value))
            alert('Data Invalida!');
    }

    //valida o CPF digitado
    ValidarCPF(Objcpf) {
        var cpf = Objcpf.value;
        var exp = /\.|\-/g
        cpf = cpf.toString().replace(exp, "");
        var digitoDigitado = eval(cpf.charAt(9) + cpf.charAt(10));
        var soma1 = 0, soma2 = 0;
        var vlr = 11;

        for (let i = 0; i < 9; i++) {
            soma1 += (cpf.charAt(i) * (vlr - 1));
            soma2 += (cpf.charAt(i) * vlr);
            vlr--;
        }
        soma1 = (((soma1 * 10) % 11) == 10 ? 0 : ((soma1 * 10) % 11));
        soma2 = (((soma2 + (2 * soma1)) * 10) % 11);

        var digitoGerado = (soma1 * 10) + soma2;
        if (digitoGerado != digitoDigitado)
            alert('CPF Invalido!');
    }

    //valida o CNPJ digitado
    ValidarCNPJ(ObjCnpj) {
        var cnpj = ObjCnpj.value;
        var valida = new Array(6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2);
        var dig1 = 0;
        var dig2 = 0;

        var exp = /\.|\-|\//g
        cnpj = cnpj.toString().replace(exp, "");
        var digito = new Number(eval(cnpj.charAt(12) + cnpj.charAt(13)));

        for (let i = 0; i < valida.length; i++) {
            dig1 += (i > 0 ? (cnpj.charAt(i - 1) * valida[i]) : 0);
            dig2 += cnpj.charAt(i) * valida[i];
        }
        dig1 = (((dig1 % 11) < 2) ? 0 : (11 - (dig1 % 11)));
        dig2 = (((dig2 % 11) < 2) ? 0 : (11 - (dig2 % 11)));

        if (((dig1 * 10) + dig2) != digito)
            alert('CNPJ Invalido!');

    }


}