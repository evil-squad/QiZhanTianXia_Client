var Msg = (function () {
    function Msg() {
    }
    var d = __define,c=Msg,p=c.prototype;
    Msg.ERR = "errpb.ERR";
    Msg.Head = "cspb.Head";
    Msg.User = "storepb.User";
    Msg.Player = "storepb.Player";
    Msg.RegInfo = "storepb.User.RegInfo";
    Msg.DEBUG = "cspb.LoginReq.Debug";
    Msg.WECHAT = "cspb.LoginReq.Wechat";
    Msg.LoginReq = "cspb.LoginReq";
    Msg.LoginResp = "cspb.LoginResp";
    Msg.CreateRoomReq = "cspb.CreateRoomReq";
    Msg.CreateRoomResp = "cspb.CreateRoomResp";
    Msg.DismissRoomReq = "cspb.DismissRoomReq";
    Msg.DismissRoomResp = "cspb.DismissRoomResp";
    Msg.EnterRoomReq = "cspb.EnterRoomReq";
    Msg.EnterRoomResp = "cspb.EnterRoomResp";
    Msg.LeaveRoomReq = "cspb.LeaveRoomReq";
    Msg.LeaveRoomResp = "cspb.LeaveRoomResp";
    Msg.GetRoomPlayerInfoReq = "cspb.GetRoomPlayerInfoReq";
    Msg.GetRoomPlayerInfoResp = "cspb.GetRoomPlayerInfoResp";
    Msg.RoomNotify = "cspb.RoomNotify";
    Msg.TextMsg = "talkpb.TextMsg";
    return Msg;
}());
egret.registerClass(Msg,'Msg');
