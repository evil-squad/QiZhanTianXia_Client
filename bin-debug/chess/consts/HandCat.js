var HandCat = (function () {
    function HandCat() {
    }
    var d = __define,c=HandCat,p=c.prototype;
    HandCat.getName = function (handcat) {
        switch (handcat) {
            case HandCat.Init: return "";
            case HandCat.Burst: return "爆牌";
            case HandCat.Flat: return "平牌";
            case HandCat.TenHalf: return "十点半";
            case HandCat.FiveXiao: return "五小";
            case HandCat.RFiveXiao: return "人五小";
            case HandCat.TianWang: return "天王";
            case HandCat.SixXiao: return "6小";
            case HandCat.SevenXiao: return "7小";
        }
        return "";
    };
    HandCat.Init = 0;
    HandCat.Burst = 1;
    HandCat.Flat = 2;
    HandCat.TenHalf = 3;
    HandCat.FiveXiao = 4;
    HandCat.RFiveXiao = 5;
    HandCat.TianWang = 6;
    HandCat.SixXiao = 7;
    HandCat.SevenXiao = 8;
    HandCat.EightXiao = 9;
    HandCat.NineXiao = 10;
    HandCat.DaTianWang = 11;
    return HandCat;
}());
egret.registerClass(HandCat,'HandCat');
//# sourceMappingURL=HandCat.js.map