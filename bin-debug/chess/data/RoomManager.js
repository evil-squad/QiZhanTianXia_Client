var RoomManager = (function () {
    function RoomManager() {
    }
    var d = __define,c=RoomManager,p=c.prototype;
    d(RoomManager, "playerIds"
        ,function () {
            var uids = new Array();
            for (var i = 0; i < RoomManager.playerCount; i++) {
                uids.push(this._players[i].uid);
            }
            return uids;
        }
    );
    RoomManager.addPlayer = function (player) {
        if (this._players.length > RoomManager.MAX_PLAYER_CNT) {
            return -1;
        }
        return this._players.push(player);
    };
    RoomManager.removePlayer = function (uid) {
        var count = RoomManager.playerCount;
        for (var i = 0; i < count; i++) {
            if (this._players[i].uid == uid) {
                this._players.splice(i, 1);
                return true;
            }
        }
        return false;
    };
    RoomManager.getPlayer = function (uid) {
        var count = RoomManager.playerCount;
        for (var i = 0; i < count; i++) {
            if (this._players[i].uid == uid) {
                return this._players[i];
            }
        }
        return null;
    };
    RoomManager.parsePlayers = function (players, source) {
        Log.trace("parse", source);
        RoomManager.clearPlayers();
        for (var i = 0; i < players.length; i++) {
            RoomManager.addPlayer(players[i]);
        }
    };
    RoomManager.setRoomInfo = function (roomId) {
        this._roomId = roomId;
    };
    RoomManager.clearPlayers = function () {
        this._players = [];
    };
    d(RoomManager, "playerCount"
        ,function () {
            return this._players.length;
        }
    );
    d(RoomManager, "players"
        ,function () {
            return this._players;
        }
    );
    d(RoomManager, "isOb"
        ,function () {
            return this._isOb;
        }
        ,function (value) {
            this._isOb = value;
        }
    );
    d(RoomManager, "roomId"
        ,function () {
            return this._roomId;
        }
        ,function (value) {
            this._roomId = value;
        }
    );
    d(RoomManager, "seatId"
        ,function () {
            return this._seatId;
        }
        ,function (value) {
            this._seatId = value;
        }
    );
    d(RoomManager, "hasRoomInfo"
        ,function () {
            return this._roomId != null && this._roomId != "";
        }
    );
    RoomManager.clearRoomInfo = function () {
        this._roomId = null;
        this._seatId = 0;
    };
    RoomManager.MAX_PLAYER_CNT = 4;
    RoomManager._players = new Array();
    RoomManager._isOb = false;
    return RoomManager;
}());
egret.registerClass(RoomManager,'RoomManager');
//# sourceMappingURL=RoomManager.js.map