var NotifyType = (function () {
    function NotifyType() {
    }
    var d = __define,c=NotifyType,p=c.prototype;
    NotifyType.NOOP = 0;
    NotifyType.ROOM_CLOSE = 1;
    NotifyType.PLAYER_ENTER = 2;
    NotifyType.PLAYER_LEAVE = 3;
    NotifyType.ROOM_DISMISS_REQ = 4;
    NotifyType.ROOM_START = 5;
    return NotifyType;
}());
egret.registerClass(NotifyType,'NotifyType');
