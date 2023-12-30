import numericFunction from "./NumericFunction";
import utilsFunction from "./utilsFunction";

const commaSeparator = (input: number | string): string => {
    if (typeof input === "string" && input[0] === "(" && input[input.length - 1] === ")") {
        input = input.substring(1, input.length - 1);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        input = +input.replaceAll(",", "");
        return "(" + Number(input).toLocaleString() + ")";
    }

    if (isNaN(+input)) {
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        if (isNaN(Number(numericFunction.p2e(input + "")))) {
            return input as string;
        } else {
            // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
            input = numericFunction.p2e(input + "");
            return Number(input).toLocaleString();
        }
    }

    return Number(input).toLocaleString();
};

export default commaSeparator;

export const parseToEnRemoveComma = (inputWithCommaAndPersianNumber: string | number): string => {

    const t = numericFunction.p2e(utilsFunction.removeComma(inputWithCommaAndPersianNumber));
    return t;
};

export const formatToPersianAddComma = (number: string | number): string => {
    const t =   numericFunction.e2p(commaSeparator(number) + "");
    return t as string;
};

