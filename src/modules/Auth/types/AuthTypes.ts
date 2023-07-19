export type AuthFormInputs = {
    email: string,
    password: string,
    //--for register----
    firstName?: string,
    lastName?: string,
    //------------------
    //--for validation--
    userExId?: string,
    phone?: string
    //------------------
    token?: string
}
export type AuthType = "login" | "register" | "validation" | "twoFactor" | "forgotPassword" | "validMailPasswordResore" | "restorePassword";
