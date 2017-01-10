var ErrorInfo = (function () {
    function ErrorInfo(code, detail) {
        this.code = 0;
        this.detail = "";
        this.code = code;
        this.detail = detail;
    }
    var d = __define,c=ErrorInfo,p=c.prototype;
    return ErrorInfo;
}());
egret.registerClass(ErrorInfo,'ErrorInfo');
