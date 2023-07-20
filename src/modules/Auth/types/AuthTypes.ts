export type AuthFormInputs = {
    userExId?: string,
    email: string,
    password: string,
    phone?: string
    token?: string
    firstName?: string,
    lastName?: string,
    refreshToken?: string
}
export type AuthType = "login" | "register" | "validation" | "twoFactor" | "forgotPassword" | "validPasswordRestore" | "restorePassword" | "accessToken";
