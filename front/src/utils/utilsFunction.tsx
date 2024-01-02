import numeric from "./NumericFunction.tsx";

const stringToArray = (str: string): string[] => {
    return str.split("------");
};

const removeComma = (str: string | number): string => {
    if (!str) {
        return "";
    }

    if (typeof str === "string") {
        if (typeof str.replaceAll === "function") {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-call
            return str.replaceAll(",", "");
        } else {
            return str.replace(/,/g, "");
        }
    } else {
        return str.toString().replace(/,/g, "");
    }

};

const randomNumberGenerator = (): number => Math.random() * 10000000000;

const utilsFunction = {

    stringToArray,
    removeComma,
    randomNumberGenerator,
};

export default utilsFunction;

export const addRowIdtoTable = (t) => {

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const table = [...t]
    const newTable = table?.map((v, index) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const row = {...v}
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        row.RowId = index + 1

        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return row
    })

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return newTable

}

const encodeToAscii = (str) => {
    let newStr = '';
    for (let i = 0; i < str.length; i++) {
        let code = str.charCodeAt(i) + " ";
        newStr += code
    }

    return newStr;
}

const stringifyObjectsOfArrayAndJoin = (data) => {

    const temp = data.map(v => {
        if (typeof (v) === 'object') return JSON.stringify(v);
        return v;
    })
    return temp.join(mySpecialString);
    // return data.toString();
}

const downloadBlob = (content, filename, contentType) => {
    // Create a blob
    let blob = new Blob([content], {type: contentType});
    let url = URL.createObjectURL(blob);

    // Create a link to download it
    let pom = document.createElement('a');
    pom.href = url;
    pom.setAttribute('download', filename);
    pom.click();
}


export const makeReadyToDownloadFile = (arrayObjects, fileName, suffix = "") => {
    let str = '';
    arrayObjects.forEach(row => {

        const {
            firstName,
            lastName,
            phoneNumber,
            email
        } = row

        str = str + `
BEGIN:VCARD
VERSION:3.0
N:${lastName};${firstName};;;
FN:${lastName}  
TEL;TYPE=HOME,VOICE:${phoneNumber}
EMAIL;TYPE=PREF,INTERNET:${email}
END:VCARD
        `;
        //str = str + '\n';

    })


    suffix && (fileName += "." + suffix)
    downloadBlob(str, fileName, 'text/csv;charset=utf-8;')
}

export const getCurrentDate = () => {
    const currentDate = new Date();
    const formatter = new Intl.DateTimeFormat('fa-IR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
        // The 'calendar' option is not included here as it's not standard in all environments
    });

    let formattedDate = formatter.format(currentDate);

    formattedDate = formattedDate.replaceAll('/', '-');
    // Assuming numeric.p2e is a function to convert Persian numbers to English
    formattedDate = numeric.p2e(formattedDate);

    return formattedDate || '';
};


