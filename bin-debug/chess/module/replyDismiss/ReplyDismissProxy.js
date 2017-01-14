var ReplyDismissProxy = (function (_super) {
    __extends(ReplyDismissProxy, _super);
    function ReplyDismissProxy($controller) {
        _super.call(this, $controller);
        //注册从服务器返回消息的监听
        this.receiveServerMsg(Cmd.ROOM_REPLY_DISMISS, this.replyDismissRoomSuccess, this);
    }
    var d = __define,c=ReplyDismissProxy,p=c.prototype;
    p.replyDismiss = function (agree) {
        var body = {
            "head": App.Head,
            "agree": agree
        };
        this.writeAndFlush(Cmd.ROOM_REPLY_DISMISS, body);
    };
    p.replyDismissRoomSuccess = function (obj) {
        this.applyFunc(RoomConst.ROOM_REPLY_DISMISS_RESP, obj);
    };
    return ReplyDismissProxy;
}(BaseProxy));
egret.registerClass(ReplyDismissProxy,'ReplyDismissProxy');
//# sourceMappingURL=ReplyDismissProxy.js.map