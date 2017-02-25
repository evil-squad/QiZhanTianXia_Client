var NotifyType = (function () {
    function NotifyType() {
    }
    var d = __define,c=NotifyType,p=c.prototype;
    NotifyType.getDesc = function (type) {
        switch (type) {
            case NotifyType.ROOM_CLOSE: return "房间关闭";
            case NotifyType.PLAYER_ENTER: return "玩家进入房间";
            case NotifyType.PLAYER_LEAVE: return "玩家离开房间";
            case NotifyType.ASK_DISMISS_ROOM: return "请求解散房间";
            case NotifyType.REPLY_DISMISS_ROOM: return "回复解散房间";
            case NotifyType.FAIL_DISMISS_ROOM: return "解散房间失败";
            case NotifyType.PLAYER_READY: return "有玩家已准备好了";
            case NotifyType.ROOM_START: return "游戏开始了";
            case NotifyType.GO_NEXT_ROUND: return "切换到下一局";
            case NotifyType.ROUND_START: return "一局开始了";
            case NotifyType.BETTING_START: return "报名结束，可以开始下注了";
            case NotifyType.PLAYER_BET: return "有玩家下注了";
            case NotifyType.PLAYING_START: return "下注结束，可以要牌了";
            case NotifyType.PLAYER_STAND: return "有玩家已经停牌/爆牌了";
            case NotifyType.ROUND_FINISH: return "一局结束了";
            case NotifyType.GAME_FINISH: return "游戏结束了";
        }
        return "";
    };
    NotifyType.NOOP = 0;
    NotifyType.ROOM_CLOSE = 1;
    NotifyType.PLAYER_ENTER = 2;
    NotifyType.PLAYER_LEAVE = 3;
    NotifyType.ASK_DISMISS_ROOM = 4;
    //public static ROOM_START:number = 5;
    NotifyType.REPLY_DISMISS_ROOM = 5;
    NotifyType.FAIL_DISMISS_ROOM = 6;
    // 玩家已准备(报名)
    NotifyType.PLAYER_READY = 7;
    // 游戏开始(意味着要扣房卡)
    NotifyType.ROOM_START = 8;
    // 切换到下一局
    NotifyType.GO_NEXT_ROUND = 9;
    // 一局开始, 开始倒计时, 接受其他参加者发起PLAYER_READY(报名)
    NotifyType.ROUND_START = 10;
    // 报名结束(倒计时结束或全部房间中的玩家已报名), 开始下注倒计时
    NotifyType.BETTING_START = 11;
    // 玩家下注
    NotifyType.PLAYER_BET = 12;
    // 下注结束, 开始要牌
    NotifyType.PLAYING_START = 13;
    // 玩家已经停牌
    NotifyType.PLAYER_STAND = 14;
    // 当所有人都停牌或倒计时结束, 一局结束(通知胜负和分数结算)
    NotifyType.ROUND_FINISH = 15;
    // 房卡用完, 最终结束(游戏过程被存储, 房间会被回收)
    NotifyType.GAME_FINISH = 16;
    return NotifyType;
}());
egret.registerClass(NotifyType,'NotifyType');
//# sourceMappingURL=NotifyType.js.map