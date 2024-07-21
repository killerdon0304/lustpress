/**
 * Auto space on url
 * @param str the string to be spaced
 * @returns string
 */
export declare function spacer(str: string): string;
/**
 * Error handler
 * @param success when success is false, it will return error
 * @param message error message
 * @returns object
 */
export declare function maybeError(success: boolean, message: string): {
    success: boolean;
    message: string;
};
export declare function timeAgo(input: Date): any;
