var LoadingView = (function (_super) {
    __extends(LoadingView, _super);
    function LoadingView($controller, $parent) {
        _super.call(this, $controller, $parent);
        this.skinName = "resource/skins/LoadingUISkin.exml";
    }
    var d = __define,c=LoadingView,p=c.prototype;
    p.setProgress = function (current, total) {
        this.txtMsg.text = "资源加载中..." + current + "/" + total;
    };
    return LoadingView;
}(BaseEuiView));
egret.registerClass(LoadingView,'LoadingView');
//# sourceMappingURL=LoadingView.js.map