var Cmd = (function () {
    function Cmd() {
    }
    var d = __define,c=Cmd,p=c.prototype;
    Cmd.LOGIN = 1;
    Cmd.ROOM_CREATE = 101;
    Cmd.ROOM_DISMISS = 102;
    Cmd.ROOM_ENTER = 103;
    Cmd.ROOM_LEAVE = 104;
    Cmd.ROOM_PLAYER_INFO_GET = 105;
    Cmd.ROOM_NOTIFY = 106;
    return Cmd;
}());
egret.registerClass(Cmd,'Cmd');
