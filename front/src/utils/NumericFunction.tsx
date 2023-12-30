const e2p = (s: string | undefined): string | undefined => {
    if (s === undefined || s === 'undefined') {
        return undefined;
    }
    s += "";
    return s.replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d, 10)]);
};

const e2a = (s: string): string => s.replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[parseInt(d, 10)]);

const p2e = (s: string): string => s.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d).toString());

const a2e = (s: string): string => s.replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d).toString());

const p2a = (s: string): string => s.replace(/[۰-۹]/g, d => '٠١٢٣٤٥٦٧٨٩'['۰۱۲۳۴۵۶۷۸۹'.indexOf(d)]);

const a2p = (s: string): string => s.replace(/[٠-٩]/g, d => '۰۱۲۳۴۵۶۷۸۹'['٠١٢٣٤٥٦٧٨٩'.indexOf(d)]);

const numeric = {
    e2p,
    e2a,
    p2e,
    a2e,
    p2a,
    a2p,
};

export default numeric;
