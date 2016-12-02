var ServerItemRenderer = (function (_super) {
    __extends(ServerItemRenderer, _super);
    function ServerItemRenderer() {
        _super.call(this);
        this.skinName = "resource/skins/ServerItemRendererSkin.exml";
        this.touchChildren = true;
    }
    var d = __define,c=ServerItemRenderer,p=c.prototype;
    p.dataChanged = function () {
        this.nameLbl.text = this.data.label;
        this.ipLbl.text = this.data.ip;
        this.portLbl.text = this.data.port;
    };
    return ServerItemRenderer;
}(eui.ItemRenderer));
egret.registerClass(ServerItemRenderer,'ServerItemRenderer');
//# sourceMappingURL=ServerItemRenderer.js.map