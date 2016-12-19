var PlayerInfo = (function () {
    function PlayerInfo(pbObj) {
        if (pbObj == null)
            return;
        this._uid = pbObj.uid;
        this._nick = pbObj.nick;
        this._onlineId = pbObj.role_time;
        this._roomId = pbObj.roomid;
        this._seatId = pbObj.seatid;
        this._obId = pbObj.obid;
        this._ob = pbObj.ob;
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
    d(p, "roomId"
        ,function () {
            return this._roomId;
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
    return PlayerInfo;
}());
egret.registerClass(PlayerInfo,'PlayerInfo');
//# sourceMappingURL=PlayerInfo.js.map