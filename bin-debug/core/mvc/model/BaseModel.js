var BaseModel = (function () {
    /**
     * 构造函数
     * @param $controller 所属模块
     */
    function BaseModel($controller) {
        this._controller = $controller;
        this._controller.setModel(this);
    }
    var d = __define,c=BaseModel,p=c.prototype;
    return BaseModel;
}());
egret.registerClass(BaseModel,'BaseModel');
//# sourceMappingURL=BaseModel.js.map