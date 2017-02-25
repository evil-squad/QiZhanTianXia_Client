var GamingStates = (function () {
    function GamingStates() {
    }
    var d = __define,c=GamingStates,p=c.prototype;
    GamingStates.getName = function (type) {
        switch (type) {
            case GamingStates.WAITING: return "WAITING";
            case GamingStates.PLAYER_READY: return "PLAYER_READY";
            case GamingStates.ROOM_START: return "ROOM_START";
            case GamingStates.BETTING_START: return "BETTING_START";
            case GamingStates.PLAYER_BET: return "PLAYER_BET";
            case GamingStates.PLAYING_START: return "PLAYING_START";
            //case GamingStates.GETTING:return "GETTING";
            //case GamingStates.GAMING:return "GAMING";
            case GamingStates.PLAYER_STAND: return "PLAYER_STAND";
            case GamingStates.BOOM: return "BOOM";
            case GamingStates.SETTLEMENT: return "SETTLEMENT";
            case GamingStates.ROUND_FINISH: return "END";
        }
        return "";
    };
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
    GamingStates.PLAYER_READY = 2;
    /**
     * 房间开始，意味着要扣房卡：8
     */
    GamingStates.ROOM_START = 20;
    /**
     * 一局开始, 开始倒计时, 接受其他参加者发起PLAYER_READY(报名)
     */
    GamingStates.ROUND_START = 21;
    /**
     * 已下注
     */
    //public static BETTING:number = 3;//PLAYER_BET
    /**
     * 开始下注：11
     */
    GamingStates.BETTING_START = 30;
    /**
     * 玩家下注：12
     */
    GamingStates.PLAYER_BET = 31;
    /**
     * 下注结束, 开始要牌：13
     */
    GamingStates.PLAYING_START = 32;
    /**
     * 要牌中
     */
    //public static GETTING:number = 4;
    /**
     * 游戏中/他人要牌中
     */
    //public static GAMING:number = 5;
    /**
     * 已停牌
     */
    GamingStates.PLAYER_STAND = 6;
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
    GamingStates.ROUND_FINISH = 9;
    return GamingStates;
}());
egret.registerClass(GamingStates,'GamingStates');
//# sourceMappingURL=GamingStates.js.map