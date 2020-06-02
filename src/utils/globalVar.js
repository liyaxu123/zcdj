// 部署的访问网址
// const ReqIPAddr = "http://xxddns.tpddns.cn:18101"
// 测试的访问网址
const ReqIPAddr = "http://172.23.55.69:8015"
const FileRoot = "/upload/"
let baseWhere = function (curWhere) {
    baseWhere = {
        page: 1,
        rows: 10,
        total: 0,
        sidx: "CJRQ",
        sord: "desc",
    };
    return Object.assign(curWhere, baseWhere)
}
// 获取数据字典
let getDictName = function (id, pid, category) {
    // 获取数据字典
    var dictList = JSON.parse(window.sessionStorage.getItem("dict"));

    let txt = ""
    for (var i = 0; i < dictList.length; i++) {
        if (
            dictList[i].id == id &&
            dictList[i].pid == pid &&
            dictList[i].category == category
        ) {
            txt = dictList[i].name;
            break;
        }
    }
    return txt;
}

let getUserInfoByKey = function (key) {
    var userinfo = JSON.parse(window.sessionStorage.getItem("userinfo"));
    return userinfo[key];
}

export default {
    ReqIPAddr, FileRoot, baseWhere, getDictName, getUserInfoByKey
}
