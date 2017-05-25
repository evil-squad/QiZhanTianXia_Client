var NotifyConst = (function () {
    function NotifyConst() {
    }
    var d = __define,c=NotifyConst,p=c.prototype;
    NotifyConst.NOOP = "NotifyType.NOOP";
    NotifyConst.ROOM_CLOSE = "NotifyType.ROOM_CLOSE";
    NotifyConst.PLAYER_ENTER = "NotifyType.PLAYER_ENTER";
    NotifyConst.PLAYER_LEAVE = "NotifyType.PLAYER_LEAVE";
    NotifyConst.ROOM_DISMISS_REQ = "NotifyType.ROOM_DISMISS_REQ";
    //public static ROOM_START:string = "NotifyType.ROOM_START";
    // 玩家已准备(报名)
    NotifyConst.PLAYER_READY = "NotifyType.PLAYER_READY";
    // 游戏开始(意味着要扣房卡)
    NotifyConst.ROOM_START = "NotifyType.ROOM_START";
    // 切换到下一局
    NotifyConst.GO_NEXT_ROUND = "NotifyType.GO_NEXT_ROUND";
    // 一局开始, 开始倒计时, 接受其他参加者发起PLAYER_READY(报名)
    NotifyConst.ROUND_START = "NotifyType.ROUND_START";
    // 报名结束(倒计时结束或全部房间中的玩家已报名), 开始下注倒计时
    NotifyConst.BETTING_START = "NotifyType.BETTING_START";
    // 玩家下注
    NotifyConst.PLAYER_BET = "NotifyType.PLAYER_BET";
    // 下注结束, 开始要牌
    NotifyConst.PLAYING_START = "NotifyType.PLAYING_START";
    // 更新当前可下注玩家
    NotifyConst.UPDATE_CUR_BETTING_UID = "NotifyType.UPDATE_CUR_BETTING_UID";
    // 更新当前可要牌玩家
    NotifyConst.UPDATE_CUR_PLAYING_UID = "NotifyType.UPDATE_CUR_PLAYING_UID";
    // 玩家获得一张可见牌
    NotifyConst.PLAYER_HIT = "PLAYER_HIT";
    // 玩家已经停牌
    NotifyConst.PLAYER_STAND = "NotifyType.PLAYER_STAND";
    // 当所有人都停牌或倒计时结束, 一局结束(通知胜负和分数结算)
    NotifyConst.ROUND_FINISH = "NotifyType.ROUND_FINISH";
    // 房卡用完, 最终结束(游戏过程被存储, 房间会被回收)
    NotifyConst.GAME_FINISH = "NotifyType.GAME_FINISH";
    return NotifyConst;
}());
egret.registerClass(NotifyConst,'NotifyConst');
//# sourceMappingURL=NotifyConst.js.map