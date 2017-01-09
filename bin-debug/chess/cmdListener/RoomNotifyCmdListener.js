var RoomNotifyCmdListener = (function (_super) {
    __extends(RoomNotifyCmdListener, _super);
    function RoomNotifyCmdListener($controller) {
        _super.call(this, $controller);
        this.receiveServerMsg(Cmd.ROOM_NOTIFY, this.onRoomNotify, this);
    }
    var d = __define,c=RoomNotifyCmdListener,p=c.prototype;
    p.onRoomNotify = function (obj) {
        switch (obj.type) {
            case NotifyType.NOOP:
                break;
            case NotifyType.ROOM_CLOSE:
                this.closeRoom(obj);
                break;
            case NotifyType.PLAYER_ENTER:
                this.playerEnter(obj);
                break;
            case NotifyType.PLAYER_LEAVE:
                this.playerLeave(obj);
                break;
            case NotifyType.ROOM_DISMISS_REQ:
                this.reqDismissRoom(obj);
                break;
            case NotifyType.ROOM_START:
                this.startRoom(obj);
                break;
        }
    };
    p.closeRoom = function (obj) {
        var roomCloseInfo = obj.room_close;
        if (RoomManager.hasRoomInfo && roomCloseInfo.roomid == RoomManager.roomId) {
            switch (roomCloseInfo.reason) {
                case RoomCloseReqson.EMPTY:
                    App.TipsUtils.showCenter("房间无人");
                    break;
                case RoomCloseReqson.DISMISS:
                    App.TipsUtils.showCenter("房间已解散");
                    break;
                case RoomCloseReqson.ROOMSRV_CLOSE:
                    App.TipsUtils.showCenter("服务器停服");
                    break;
            }
            if (App.SceneManager.getCurrScene != SceneConsts.Home.valueOf) {
                App.SceneManager.runScene(SceneConsts.Home); //返回主页
            }
            App.SceneManager.runScene(SceneConsts.Home); //返回Home页
        }
        else {
            App.TipsUtils.showCenter("房间关闭数据有误" + roomCloseInfo.roomid);
        }
    };
    p.playerEnter = function (obj) {
        var playerEnterInfo = obj.player_enter;
        RoomManager.addPlayer(playerEnterInfo);
        if (App.SceneManager.getCurrScene != SceneConsts.Room.valueOf) {
            App.SceneManager.runScene(SceneConsts.Room); //进入房间
        }
        else {
            App.MessageCenter.dispatch(NotifyConst.PLAYER_ENTER);
        }
    };
    p.playerLeave = function (obj) {
        var playerLeaveInfo = obj.player_leave;
        var leaver = playerLeaveInfo.leaver;
        if (leaver != undefined && leaver != null) {
            //移除相应玩家
            RoomManager.removePlayer(leaver.uid); //bool ob,int 32 idx
            //刷新房间
            App.MessageCenter.dispatch(NotifyConst.PLAYER_LEAVE);
        }
    };
    p.reqDismissRoom = function (obj) {
        var roomDismissInfo = obj.room_dismiss;
        var dismisser = roomDismissInfo.dismisser;
        if (dismisser != undefined && dismisser != null) {
            var info = RoomManager.getPlayer(dismisser.uid);
            App.TipsUtils.showCenter(info.nick + "发起解散");
        }
    };
    p.startRoom = function (obj) {
        var roomStartInfo = obj.room_start;
        var roomId = roomStartInfo.roomid;
        if (RoomManager.hasRoomInfo && RoomManager.roomId == roomId) {
            //人齐了, 牌局开始
            App.MessageCenter.dispatch(NotifyConst.ROOM_START);
        }
    };
    return RoomNotifyCmdListener;
}(BaseProxy));
egret.registerClass(RoomNotifyCmdListener,'RoomNotifyCmdListener');
//# sourceMappingURL=RoomNotifyCmdListener.js.map