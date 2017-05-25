var ExpressionItem = (function (_super) {
    __extends(ExpressionItem, _super);
    function ExpressionItem(id) {
        _super.call(this);
        this._img = new egret.Bitmap();
        this.addChild(this._img);
        this._img.width = ChatExpressions.ITEM_WIDTH;
        this._img.height = ChatExpressions.ITEM_WIDTH;
        this.id = id;
    }
    var d = __define,c=ExpressionItem,p=c.prototype;
    d(p, "id"
        ,function () {
            return this._id;
        }
        ,function (value) {
            this._id = value;
            this._img.texture = RES.getRes("expression" + value);
        }
    );
    return ExpressionItem;
}(eui.Group));
egret.registerClass(ExpressionItem,'ExpressionItem');
//# sourceMappingURL=ExpressionItem.js.map