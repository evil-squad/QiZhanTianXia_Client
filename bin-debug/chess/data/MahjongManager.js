var MahjongManager = (function () {
    function MahjongManager() {
    }
    var d = __define,c=MahjongManager,p=c.prototype;
    MahjongManager.random = function (count) {
        var data = new Array();
        var info;
        var index = 1;
        while (data.length < count) {
            var mid = Math.floor(Math.random() * 58) + 10;
            while (MahjongManager.mids.indexOf(mid) == -1) {
                mid = Math.floor(Math.random() * 58) + 10;
            }
            info = new MahjongInfo();
            info.id = index;
            info.mid = mid;
            data.push(info);
            index++;
        }
        return data;
    };
    MahjongManager.mids = [11, 12, 13, 14, 15, 16, 17, 18, 19,
        21, 22, 23, 24, 25, 26, 27, 28, 29,
        ,
        31, 32, 33, 34, 35, 36, 37, 38, 39,
        ,
        41, 42, 43, 44, 45, 46, 47,
        ,
        51, 52, 53, 54, 55, 56, 57, 58];
    return MahjongManager;
}());
egret.registerClass(MahjongManager,'MahjongManager');
//# sourceMappingURL=MahjongManager.js.map