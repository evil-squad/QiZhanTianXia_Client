var MainManager = (function () {
    function MainManager() {
    }
    var d = __define,c=MainManager,p=c.prototype;
    MainManager.setUserInfo = function (player) {
        this._userInfo = new UserInfo(player);
        this._userId = this._userInfo.uid;
        App.Head.uid = this._userId;
    };
    d(MainManager, "userId"
        ,function () {
            return this._userId;
        }
    );
    d(MainManager, "userInfo"
        ,function () {
            return this._userInfo;
        }
    );
    return MainManager;
}());
egret.registerClass(MainManager,'MainManager');
