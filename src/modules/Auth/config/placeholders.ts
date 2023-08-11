
type FormPlaceholderType = {
    [key: string]: {
        VALUE: string;
        LABEL: string;
    };
};

export const PLACEHOLDERS: FormPlaceholderType = {
    LOGIN: {
        VALUE:'login',
        LABEL:'כניסה'
    },
    REGISTER: {
        VALUE:'register',
        LABEL: 'הרשמה'
    },
    VALIDATION: {
        VALUE:'validation',
        LABEL:'אימות משתמש'
    },
    TWO_FACTOR: {
        VALUE: "twoFactor",
        LABEL: "אימות"
    },
    VALID_PASSWORD_RESTORE: {
        VALUE:"validPasswordRestore",
        LABEL:"אימות"
    },
    FORGOT_PASSWORD: {
        VALUE:'forgotPassword',
        LABEL: 'שכחת סיסמה?'
    },
    BACK_TO_LOGIN: {
        VALUE:'backToLogin',
        LABEL:'חזרה לכניסה למערכת'
    },
    DONT_GET_TOKEN: {
        VALUE:'dontGetToken',
        LABEL: 'לא קיבלת סמס?'
    },
    RESTORE_PASSWORD: {
        VALUE:'restorePassword',
        LABEL: 'שחזר סיסמא'
    }
}


 
export const FORM_PLACEHOLDER = {
    EMAIL: {
        VALUE:'email',
        LABEL:'מייל',
        ERROR:'מייל שדה חובה'
    },
    PASSWORD: {
        VALUE:'password',
        LABEL:'סיסמא',
        ERROR:'סיסמא שדה חובה'
    },
    FIRSTNAME: {
        VALUE:'lastName',
        LABEL:'שם',
        ERROR:'שם שדה חובה'
    },
    LASTNAME: {
        VALUE:'lastName',
        LABEL:'שם משפחה',
        ERROR:'שם משפחה שדה חובה'
    },
    PHONE: {
        VALUE:'phone',
        LABEL:'טלפון',
        ERROR:'טלפון שדה חובה'
    },
    USER_EXT_ID: {
        VALUE:'userExId',
        LABEL:'קוד לקוח',
        ERROR:'קוד לקוח שדה חובה'
    },
    TOKEN: {
        VALUE:'token',
        LABEL:'קוד סודי',
        ERROR:'קוד סודי שדה חובה'
    },


}