var ChatExpressions = (function (_super) {
    __extends(ChatExpressions, _super);
    function ChatExpressions() {
        _super.call(this);
        this.init();
    }
    var d = __define,c=ChatExpressions,p=c.prototype;
    p.init = function () {
        this._container = new eui.Group();
        this.addChild(this._container);
        this._scroller = new eui.Scroller();
        this._scroller.width = ChatExpressions.ITEM_WIDTH * 4;
        this._scroller.height = ChatExpressions.ITEM_WIDTH * 3;
        this._scroller.viewport = this._container;
        this.addChild(this._scroller);
        this._items = [];
        var item;
        for (var i = 0; i <= 23; i++) {
            if (i < 10) {
                item = new ExpressionItem("0" + i);
            }
            else {
                item = new ExpressionItem("" + i);
            }
            this._items.push(item);
            this._container.addChild(item);
            item.x = i % 4 * ChatExpressions.ITEM_WIDTH;
            item.y = Math.floor(i / 4) * ChatExpressions.ITEM_WIDTH;
            item.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickItem, this);
        }
    };
    p.onClickItem = function (event) {
        App.MessageCenter.dispatch(ChatConst.EXPRESSION_ITEM_CLICK, event.target.id);
    };
    ChatExpressions.ITEM_WIDTH = 50;
    return ChatExpressions;
}(eui.Group));
egret.registerClass(ChatExpressions,'ChatExpressions');
//# sourceMappingURL=ChatExpressions.js.map