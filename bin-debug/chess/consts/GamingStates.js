var GamingStates = (function () {
    function GamingStates() {
    }
    var d = __define,c=GamingStates,p=c.prototype;
    /**
     * 不在牌局/观看
     */
    GamingStates.NONE = 0;
    /**
     * 等待中
     */
    GamingStates.WAITING = 1;
    /**
     * 已准备
     */
    GamingStates.READY_GET = 2;
    /**
     * 已下注
     */
    GamingStates.BETTING = 3;
    /**
     * 要牌中
     */
    GamingStates.GETTING = 4;
    /**
     * 游戏中/他人要牌中
     */
    GamingStates.GAMING = 5;
    /**
     * 已停牌
     */
    GamingStates.STOP = 6;
    /**
     * 已爆牌
     */
    GamingStates.BOOM = 7;
    /**
     * 结算中
     */
    GamingStates.SETTLEMENT = 8;
    /**
     * 牌局结束
     */
    GamingStates.END = 9;
    return GamingStates;
}());
egret.registerClass(GamingStates,'GamingStates');
//# sourceMappingURL=GamingStates.js.map