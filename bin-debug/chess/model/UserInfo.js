var UserInfo = (function () {
    function UserInfo(pbObj) {
        if (pbObj == null)
            return;
        this._id = pbObj.id;
        this._uid = pbObj.uid;
        this._nick = pbObj.nick;
        this._roleTime = pbObj.role_time;
        this._coins = pbObj.coins;
        this._lastLoginTime = pbObj.last_login_time;
    }
    var d = __define,c=UserInfo,p=c.prototype;
    d(p, "id"
        ,function () {
            return this._id;
        }
    );
    d(p, "uid"
        ,function () {
            return this._uid;
        }
    );
    d(p, "nick"
        ,function () {
            return this._nick;
        }
    );
    d(p, "coins"
        ,function () {
            return this._coins;
        }
    );
    return UserInfo;
}());
egret.registerClass(UserInfo,'UserInfo');
//# sourceMappingURL=UserInfo.js.map