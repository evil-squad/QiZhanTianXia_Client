var PukeManager = (function () {
    function PukeManager() {
    }
    var d = __define,c=PukeManager,p=c.prototype;
    PukeManager.random = function (count) {
        var data = new Array();
        var info;
        var index = 1;
        while (data.length < count) {
            var pid = Math.floor(Math.random() * PukeManager.PID_MAX) + PukeManager.PID_MIN;
            while (PukeManager.pids.indexOf(pid) == -1) {
                pid = Math.floor(Math.random() * PukeManager.PID_MAX) + PukeManager.PID_MIN;
            }
            info = new PukeInfo();
            info.id = index;
            info.pid = pid;
            data.push(info);
            index++;
        }
        return data;
    };
    PukeManager.pids = [101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113,
        201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213,
        ,
        301, 302, 303, 304, 305, 306, 307, 308, 309, 310, 311, 312, 313,
        ,
        401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413,
        ,
        501, 502];
    PukeManager.PID_MIN = 101;
    PukeManager.PID_MAX = 502;
    return PukeManager;
}());
egret.registerClass(PukeManager,'PukeManager');
//# sourceMappingURL=PukeManager.js.map