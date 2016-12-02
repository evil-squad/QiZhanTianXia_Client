var Log = (function () {
    function Log() {
    }
    var d = __define,c=Log,p=c.prototype;
    /**
     * Debug_Log
     * @param messsage 内容
     * @constructor
     */
    Log.trace = function () {
        var optionalParams = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            optionalParams[_i - 0] = arguments[_i];
        }
        if (App.DebugUtils.isDebug) {
            optionalParams[0] = "[Log]" + optionalParams[0];
            console.log.apply(console, optionalParams);
        }
    };
    Log.error = function () {
        var optionalParams = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            optionalParams[_i - 0] = arguments[_i];
        }
        if (App.DebugUtils.isDebug) {
            optionalParams[0] = "[Error]" + optionalParams[0];
            console.log.apply(console, optionalParams);
        }
    };
    return Log;
}());
egret.registerClass(Log,'Log');
//# sourceMappingURL=Log.js.map