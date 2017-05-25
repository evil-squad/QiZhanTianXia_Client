var ChatProxy = (function (_super) {
    __extends(ChatProxy, _super);
    function ChatProxy($controller) {
        _super.call(this, $controller);
        //this.receiveServerMsg(Cmd.ROOM_CREATE, this.createRoomSuccess, this);
        //this.receiveServerMsg(Cmd.ROOM_ENTER, this.enterRoomSuccess, this);
    }
    var d = __define,c=ChatProxy,p=c.prototype;
    return ChatProxy;
}(BaseProxy));
egret.registerClass(ChatProxy,'ChatProxy');
//# sourceMappingURL=ChatProxy.js.map