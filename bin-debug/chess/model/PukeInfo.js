var PukeInfo = (function () {
    function PukeInfo(pid) {
        this._pid = pid;
    }
    var d = __define,c=PukeInfo,p=c.prototype;
    d(p, "id"
        ,function () {
            return this._id;
        }
        ,function (value) {
            this._id = value;
        }
    );
    d(p, "pid"
        ,function () {
            return this._pid;
        }
        ,function (value) {
            this._pid = value;
        }
    );
    d(p, "points"
        ,function () {
            return this._points;
        }
        ,function (value) {
            this._points = value;
        }
    );
    return PukeInfo;
}());
egret.registerClass(PukeInfo,'PukeInfo');
//# sourceMappingURL=PukeInfo.js.map