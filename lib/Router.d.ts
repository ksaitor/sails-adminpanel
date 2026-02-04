export default class Router {
    static onlyOnce: boolean;
    private static bindTimeout;
    private static bindCalled;
    /**
     * The idea is that all methods within the first 3 seconds after start call this method, and as soon as all have been loaded, the loading will be blocked
     * Debounced with 5 second delay
     */
    static bind(): void;
    private static _executeBind;
}
