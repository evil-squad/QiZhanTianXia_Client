/**
 * roompb.PleyerInfo
 */
var PlayerInfo = (function () {
    function PlayerInfo(pbObj) {
        if (pbObj == null)
            return;
        this._onlineId = pbObj.role_time;
        this._uid = pbObj.uid;
        this._nick = pbObj.nick;
        this._seatId = pbObj.seatid;
        this._obId = pbObj.obid;
        this._ob = pbObj.ob;
        this._icon = pbObj.icon;
        this._ip = pbObj.ip;
        this._inRoom = pbObj.in_room;
    }
    var d = __define,c=PlayerInfo,p=c.prototype;
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
    d(p, "seatId"
        ,function () {
            return this._seatId;
        }
    );
    d(p, "obId"
        ,function () {
            return this._obId;
        }
    );
    d(p, "isOb"
        ,function () {
            return this._ob;
        }
    );
    d(p, "inRoom"
        ,function () {
            return this._inRoom;
        }
    );
    return PlayerInfo;
}());
egret.registerClass(PlayerInfo,'PlayerInfo');
