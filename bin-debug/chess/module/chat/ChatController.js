var ChatController = (function (_super) {
    __extends(ChatController, _super);
    function ChatController() {
        _super.call(this);
        this.proxy = new HomeProxy(this);
        this.popView = new BaseModelView(this, LayerManager.UI_Popup);
        this.view = new ChatPopView();
        this.popView.view = this.view;
        App.ViewManager.register(ViewConst.Chat, this.popView);
        App.MessageCenter.addListener(ChatConst.EXPRESSION_ITEM_CLICK, this.onClickExpression, this);
        App.MessageCenter.addListener(ChatConst.MESSAGE_ITEM_CLICK, this.onClickMessage, this);
    }
    var d = __define,c=ChatController,p=c.prototype;
    p.onClickExpression = function (id) {
        App.ViewManager.closeView(this.popView);
        Log.trace(id);
    };
    p.onClickMessage = function (text) {
        App.ViewManager.closeView(this.popView);
        Log.trace(text);
    };
    return ChatController;
}(BaseController));
egret.registerClass(ChatController,'ChatController');
//# sourceMappingURL=ChatController.js.map