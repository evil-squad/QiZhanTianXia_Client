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
    ErrorConst.list = [
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
        new ErrorInfo(2033, "绑定 roomid 和 roomsrvid")
    ];
    return ErrorConst;
}());
egret.registerClass(ErrorConst,'ErrorConst');
