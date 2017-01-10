/**
 * storepb.Player
 */
var UserInfo = (function () {
    function UserInfo(pbObj) {
        if (pbObj == null)
            return;
        this._uid = pbObj.uid;
        this._nick = pbObj.nick;
        this._icon = pbObj.icon;
        this._lastLoginTime = pbObj.last_login_time;
        this._roomCard = pbObj.room_card;
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
