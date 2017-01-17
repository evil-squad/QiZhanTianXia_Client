var GamingManager = (function () {
    function GamingManager() {
    }
    var d = __define,c=GamingManager,p=c.prototype;
    d(GamingManager, "state"
        ,function () {
            return this._state;
        }
        ,function (value) {
            this._state = value;
        }
    );
    GamingManager._state = GamingStates.NONE;
    return GamingManager;
}());
egret.registerClass(GamingManager,'GamingManager');
//# sourceMappingURL=GamingManager.js.map