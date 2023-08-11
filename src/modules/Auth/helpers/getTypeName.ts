import { AuthType } from "../types/AuthTypes";
import { PLACEHOLDERS } from "../config/placeholders";
export const getTypeName = (type: AuthType) => {
    for (const key in PLACEHOLDERS) {
        if (PLACEHOLDERS.hasOwnProperty(key)) {
            if (PLACEHOLDERS[key].VALUE === type) {
                return PLACEHOLDERS[key].LABEL;
            }
        }
    }
    return '';
};