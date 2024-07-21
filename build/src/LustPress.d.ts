/// <reference types="node" />
declare class LustPress {
    url: string;
    useragent: string;
    constructor();
    /**
       * Fetch body from url and check if it's cached
       * @param url url to fetch
       * @returns Buffer
       */
    fetchBody(url: string): Promise<Buffer>;
    /**
     * remove html tag and bunch of space
     * @param str string to remove html tag
     * @returns string
     */
    removeHtmlTag(str: string): string;
    /**
     * remove html tag without space
     * @param str string to remove html tag
     * @returns string
     */
    removeHtmlTagWithoutSpace(str: string): string;
    /**
     * remove all single quote on array
     * @param arr array to remove single quote
     * @returns string[]
     */
    removeAllSingleQuoteOnArray(arr: string[]): string[];
    /**
     * time ago converter
     * @param input date to convert
     * @returns string
     */
    timeAgo(input: Date): any;
    /**
     * convert seconds to minute
     * @param seconds seconds to convert
     * @returns string
     */
    secondToMinute(seconds: number): string;
    /**
     * get current process memory usage
     * @returns object
     */
    currentProccess(): {
        rss: string;
        heap: string;
    };
    /**
     * fetch this server location
     * @returns <Promise<string>>
     */
    getServer(): Promise<string>;
}
export default LustPress;
