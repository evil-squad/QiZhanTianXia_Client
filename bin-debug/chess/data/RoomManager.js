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
    RoomManager.setRoomInfo = function (roomId, seatId) {
        this._roomId = roomId;
        this._seatId = seatId;
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
            return this._roomId != null;
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