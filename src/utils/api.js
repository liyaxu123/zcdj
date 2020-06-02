import axios from 'axios'
// 查询
const QueryService = function (where, method, url, callback) {
    axios({
        method: method,
        url: url,
        data: where,
        transformRequest: [
            function (data) {
                //在请求之前对data传参进行格式转换
                let formatData = [];
                for (var it in data) {
                    formatData.push(it + "=" + data[it]);
                }
                return formatData.join("&");
            }
        ]
    }).then(response => {
        callback(response.data);
    }).catch(err => {
        console.log(err);
    });
}
// 添加/编辑/删除
const UpdateService = function (params, method, url, callback) {
    axios({
        method: method,
        url: url,
        data: params
    }).then(response => {
        callback(response.data);
    }).catch(err => {
        console.log(err);
    });
}

export { QueryService, UpdateService }