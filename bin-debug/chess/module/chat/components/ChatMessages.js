var ChatMessages = (function (_super) {
    __extends(ChatMessages, _super);
    function ChatMessages() {
        _super.call(this);
        this.init();
    }
    var d = __define,c=ChatMessages,p=c.prototype;
    p.init = function () {
        this._container = new eui.Group();
        this.addChild(this._container);
        this._scroller = new eui.Scroller();
        this._scroller.width = 200;
        this._scroller.height = ChatMessages.ITEM_HEIGHT * 5;
        this._scroller.viewport = this._container;
        this.addChild(this._scroller);
        this._items = [];
        var data = [];
        data.push("快点啊，等得我花都谢了");
        data.push("怎么又断线了啊，网络怎么这么差啊");
        data.push("不要走，决战到天亮");
        data.push("你的牌打得太好啦");
        data.push("你个xxx");
        data.push("你个渣渣");
        var item;
        for (var i = 0; i < data.length; i++) {
            item = new MessageItem(data[i]);
            this._items.push(item);
            this._container.addChild(item);
            item.x = 0;
            item.y = i * ChatMessages.ITEM_HEIGHT;
            item.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickItem, this);
        }
    };
    p.onClickItem = function (event) {
        App.MessageCenter.dispatch(ChatConst.MESSAGE_ITEM_CLICK, event.target.text);
    };
    ChatMessages.ITEM_HEIGHT = 30;
    return ChatMessages;
}(eui.Group));
egret.registerClass(ChatMessages,'ChatMessages');
var MessageItem = (function (_super) {
    __extends(MessageItem, _super);
    function MessageItem(text) {
        _super.call(this);
        this._label = new eui.Label;
        this.addChild(this._label);
        this._label.size = 12;
        this.text = text;
    }
    var d = __define,c=MessageItem,p=c.prototype;
    d(p, "text"
        ,function () {
            return this._label.text;
        }
        ,function (value) {
            this._label.text = value;
        }
    );
    return MessageItem;
}(eui.Group));
egret.registerClass(MessageItem,'MessageItem');
//# sourceMappingURL=ChatMessages.js.map