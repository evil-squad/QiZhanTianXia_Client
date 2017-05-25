/**
 * storepb.Player
 */
var UserInfo = (function () {
    function UserInfo(pbObj) {
        this._roomCard = 0;
        if (pbObj == null)
            return;
        this._uid = pbObj.uid;
        this._nick = pbObj.nick;
        this._icon = pbObj.icon;
        this._lastLoginTime = pbObj.lastLoginTime;
        this._roomCard = pbObj.roomCard;
    }
    var d = __define,c=UserInfo,p=c.prototype;
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
    d(p, "roomCard"
        ,function () {
            return this._roomCard;
        }
    );
    return UserInfo;
}());
egret.registerClass(UserInfo,'UserInfo');
//# sourceMappingURL=UserInfo.js.map