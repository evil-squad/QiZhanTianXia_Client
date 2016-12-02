class Log {
    /**
     * Debug_Log
     * @param messsage 内容
     * @constructor
     */
    public static trace(...optionalParams:any[]):void {
        if (App.DebugUtils.isDebug) {
            optionalParams[0] = "[Log]" + optionalParams[0];
            console.log.apply(console, optionalParams);
        }
    }

    public static error(...optionalParams:any[]):void {
        if (App.DebugUtils.isDebug) {
            optionalParams[0] = "[Error]" + optionalParams[0];
            console.log.apply(console, optionalParams);
        }
    }
}