var Cmd = (function () {
    function Cmd() {
    }
    var d = __define,c=Cmd,p=c.prototype;
    Cmd.GM = 901;
    Cmd.LOGIN = 1;
    Cmd.ROOM_CREATE = 101;
    Cmd.ROOM_DISMISS = 102;
    Cmd.ROOM_ENTER = 103;
    Cmd.ROOM_LEAVE = 104;
    Cmd.ROOM_PLAYER_INFO_GET = 105;
    Cmd.ROOM_NOTIFY = 106;
    Cmd.ROOM_ASK_DISMISS = 107;
    Cmd.ROOM_REPLY_DISMISS = 108;
    // game
    // 玩家点开始按钮, 表示准备好开局
    Cmd.READY_FOR_START = 201;
    // 下注
    Cmd.BET = 202;
    // 要牌
    Cmd.HIT = 203;
    // 请求停牌
    Cmd.STAND = 204;
    // 请求牌局数据(可能由于掉线需要重新拉取)
    Cmd.GET_GAME_DATA = 205;
    return Cmd;
}());
egret.registerClass(Cmd,'Cmd');
//# sourceMappingURL=Cmd.js.map