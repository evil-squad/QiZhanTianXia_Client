var ErrorConst = (function () {
    function ErrorConst() {
    }
    var d = __define,c=ErrorConst,p=c.prototype;
    ErrorConst.getDetail = function (code) {
        for (var info in ErrorConst.list) {
            if ((ErrorConst.list[info]).code == code) {
                return ErrorConst.list[info].detail;
            }
        }
        return "未知错误";
    };
    ErrorConst.RELOAD_CODE = 1002; //NOFOUND_PLAYER = 1002;
    ErrorConst.NOT_IN_ROOM = 2008;
    ErrorConst.NOFOUND_ROOM = 2010;
    ErrorConst.list = [
        new ErrorInfo(1, "FAILED_DECODE"),
        new ErrorInfo(2, "FAILED_ENCODE"),
        new ErrorInfo(3, "INTERNAL_SRV"),
        new ErrorInfo(4, "NOFOUND_METADATA"),
        new ErrorInfo(5, "NOFOUND_UID"),
        new ErrorInfo(6, "INVALID_UID"),
        new ErrorInfo(7, "NOFOUND_SESSION"),
        new ErrorInfo(8, "INVALID_SESSION"),
        new ErrorInfo(9, "FORBID_ENTERGAME"),
        new ErrorInfo(10, "NET_RECV"),
        new ErrorInfo(11, "NET_SEND"),
        new ErrorInfo(12, "FAILED_RPC"),
        new ErrorInfo(13, "ROOMSRV_RST"),
        new ErrorInfo(14, "IMPOSSIBLE_HERE"),
        new ErrorInfo(1001, "重复登录"),
        new ErrorInfo(1002, "找不到这个玩家"),
        new ErrorInfo(1003, "还没有登录(不能做相关操作)"),
        new ErrorInfo(1004, "创建房间失败"),
        new ErrorInfo(2000, "找不到对应的 online session"),
        new ErrorInfo(2001, "玩家已经在房间服务器了"),
        new ErrorInfo(2002, "房间满座"),
        new ErrorInfo(2003, "房间观察者满座"),
        new ErrorInfo(2004, "房间已存在, 不能再创建相同ID的房间"),
        new ErrorInfo(2005, "房间不存在, 不能加入"),
        new ErrorInfo(2006, "房间服务器里根据online_id没有找到online(获取session失败)"),
        new ErrorInfo(2007, "重复注册 online"),
        new ErrorInfo(2008, "玩家不在任何房间"),
        new ErrorInfo(2009, "玩家不在当前打牌/离开的房间"),
        new ErrorInfo(2010, "找不到房间"),
        new ErrorInfo(2011, "玩家记录的座位号在 p.room 里面对应座位上的人不是 p"),
        new ErrorInfo(2012, "玩家记录的ob号在 p.room 里面对应ob位上的人不是 p"),
        new ErrorInfo(2013, "玩家记录了 p.room, 但没有记录 p.seat 也没有记录 p.ob"),
        new ErrorInfo(2014, "ob 不能发起解散房间的请求"),
        new ErrorInfo(2015, "玩家已经绑定了房间, 不能再创建/加入别的房间了"),
        new ErrorInfo(2016, "房间已经关闭"),
        new ErrorInfo(2017, "无法申请 roomid (因为room_idgen获取不到"),
        new ErrorInfo(2018, "无效的 roomid"),
        new ErrorInfo(2019, "不能进入房间(被房间服拒绝)"),
        new ErrorInfo(2020, "找不到 UID 绑定的房间"),
        new ErrorInfo(2021, "不是创建者不能直接解散房间"),
        new ErrorInfo(2022, "不能直接解散开始的房间, 必须投票(ask dismiss)"),
        new ErrorInfo(2023, "不能离开已经开始的房间"),
        new ErrorInfo(2024, "无效的 debug 登陆请求(空请求或空openid)"),
        new ErrorInfo(2025, "不支持的登陆方式"),
        new ErrorInfo(2026, "获取UserInfo失败(NotFound错误除外)"),
        new ErrorInfo(2027, "获取新Uid失败"),
        new ErrorInfo(2028, "存储新 UserInfo 失败"),
        new ErrorInfo(2029, "获取玩家信息失败(NotFound错误除外)"),
        new ErrorInfo(2030, "存储玩家信息失败"),
        new ErrorInfo(2031, "进入房间返回0个玩家(至少应该包括房主)"),
        new ErrorInfo(2032, "房间ID用光了"),
        new ErrorInfo(2033, "绑定 roomid 和 roomsrvid"),
        new ErrorInfo(2034, "找不到可用的房间服务器(严重错误)"),
        new ErrorInfo(2035, "没有开始的房间不能申请解散(只有房主能解散)"),
        new ErrorInfo(2036, "已经有人申请了解散房间, 此时不能重复申请解散"),
        new ErrorInfo(2037, "不能应答没有开始的解散房间(BUG?)"),
        new ErrorInfo(2038, "不能应答没有发起解散决议的房间(BUG?)"),
        new ErrorInfo(2039, "房间记录了玩家, 但玩家记录的座位是空(RoomServer BUG)"),
        new ErrorInfo(2040, "对 room 请求多次都不成功(目前尝试100次, 每次间隔10ms) "),
        new ErrorInfo(2041, "房间服正忙, 请稍后再试"),
        new ErrorInfo(2042, "房间服内部逻辑错误, 重复关闭房间"),
        new ErrorInfo(2043, "房间(服)未知错误"),
        new ErrorInfo(2044, "无效的下注(金额<=0)"),
        new ErrorInfo(2045, "房间牌局(状态)拒绝报名(报名已结束)"),
        new ErrorInfo(2046, "不能在没开始的房间下注"),
        new ErrorInfo(2047, "当前局不在下注状态"),
        new ErrorInfo(2048, "当前局不在玩牌状态"),
        new ErrorInfo(2049, "(达到持牌上限) 不能再要牌了"),
        new ErrorInfo(2050, "已停牌的玩家不能再要牌了"),
        new ErrorInfo(2051, "玩家没有参加本局游戏"),
        new ErrorInfo(2052, "不能在没开始的房间玩牌(要牌/停牌)"),
        new ErrorInfo(2053, "存储房间信息失败"),
        new ErrorInfo(2054, "不能获得没开始房间的牌局信息"),
        new ErrorInfo(2055, "不是当前可以要牌的玩家"),
        new ErrorInfo(2056, "不是当前可以下注的玩家"),
        new ErrorInfo(2057, "庄家不能下注"),
        new ErrorInfo(2058, "下注金额太少"),
        new ErrorInfo(2059, "下注金额太多"),
        new ErrorInfo(2060, "不能重复应答房间解散提议")
    ];
    return ErrorConst;
}());
egret.registerClass(ErrorConst,'ErrorConst');
//# sourceMappingURL=ErrorConst.js.map