$(function () {
    $(".back_btn").on("click", function () {
        window.history.back(-1);
    });

    //初始化地图时，若center属性缺省，地图默认定位到用户所在城市的中心
    var map = new AMap.Map('map_div', {
        resizeEnable: true,
        zoom: 17
    });
    console.log("定位到的center:"+map.getCenter());

    var cpVM = new Vue({
        el: "#listContent_div",
        data : {
            AddressPointModel: [{
                name: "天恒大厦",
                info: "贵州贵阳师大"
            }, {
                name: "天恒大厦",
                info: "贵州贵阳富水北路3号"
            }, {
                name: "天恒大厦",
                info: "贵州贵阳贵阳路"
            }, {
                name: "天恒大厦",
                info: "贵州贵阳富水天路"
            }, {
                name: "天恒大厦",
                info: "贵州贵阳富水大厦"
            }, {
                name: "天恒大厦",
                info: "贵州贵阳大路"
            }, {
                name: "天恒大厦",
                info: "贵州贵阳大营坡"
            }, {
                name: "天恒大厦",
                info: "贵州贵阳富水北路新天道"
            }, {
                name: "天恒大厦",
                info: "贵州贵阳富水北路风卷"
            }, {
                name: "天恒大厦",
                info: "贵州贵阳富水北路23号"
            }]
        },
        methods: {
            selectli: function (index) {
                console.log("点击了第"+index+"个");
            }
        }
    })
})

function getAroundAddress() {
    // var token = getToken();
    var pullData;
    $.ajax({
        url: "https://restapi.amap.com/v3/place/around?key=4777b6221424cd867ba8dbb0997b4767&location=116.473168,39.993015&radius=10000&types=011100",
        // url: "https://restapi.amap.com/v3/place/text?4777b6221424cd867ba8dbb0997b4767&酒店",
        type: 'post',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        headers: {
            // appcode: "app",
            // procid: "3456789",
            // imei: '1234567',
            // timestamp: '1234567',
            // randomnum: '1234567',
            // ciphertext: 'a2640450ca24c8c17d564a45ad90bbdf',
        },
        // data: JSON.stringify({
        //     "comprehenRequest": {
        //         "uid": "2c95801f668ba656016699d753ae0179",
        //         "page": "1",
        //         "rows": "5",
        //         "param": ""
        //     },
        //     "procid": "3456789",
        //     "tokenStr": "56789",
        //     "userId": "123456789",
        //     "X-AUTH-TOKEN": token
        // }),
        success: function(data) {
            console.log("搜索地点获取成功!")
            pullData = data.result;
        },
        error: function() {
            console.log("搜索地点获取失败!")
        }
    })
    return pullData;
}

var testIP = "http://192.168.3.56:8089";
// 获取登录token
function getToken() {
    var token;
    $.ajax({
        url: testIP + "/zhqnInterfaceServer/domprehenBigData/getLoginToken",
        type: 'post',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {
            appcode: "app",
            procid: "3456789",
            imei: '1234567',
            timestamp: '1234567',
            randomnum: '1234567',
            ciphertext: 'a2640450ca24c8c17d564a45ad90bbdf'
        },
        async: false,
        data: JSON.stringify({
            "comprehenRequest": {
                "userName": "admin1",
                "password": "123456",
                "mark": "12345"
            },
            "procid": "3456789",
            "tokenStr": "56789",
            "userId": "123456789"
        }),
        success: function(data) {
            console.log("登录成功了获取到了数据")
            if (data.success) {
                token = data.result.token;
            }
        },
        error: function() {
            console.log("登录失败了没得数据")
        }
    })
    // console.log(token)
    return token;
}