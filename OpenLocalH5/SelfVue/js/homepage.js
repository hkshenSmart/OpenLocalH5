
var isnearbyLine = true;
$(function () {

    var hpVM = new Vue({
        el: "#carContent_div",
        data: {
            hpModel: [{
                carclass: "暂未发车"
            }, {
                carclass: "已发车"
            }, {
                carclass: "已发车"
            }, {
                carclass: "已发车"
            }, {
                carclass: "还有3班"
            }, {
                carclass: "还有很多班次"
            }, {
                carclass: "已发车"
            }, {
                carclass: "暂未发车"
            }, {
                carclass: "已发车"
            }]
        }
    })

    $(".left_select_div").on("click", function () {
        $(".left_select_p").css({"color": "#61C67D"});
        $(".right_select_p").css({"color": "#5B5B5B"});
        isnearbyLine = true;

        // $(".carList_div ul").empty();
        // $(".carList_div ul").empty();
        // hpVM.hpModel = [];
        hpVM.hpModel = [{
            carclass: "还有很多班车"
        }, {
            carclass: "暂未发车"
        }];
    });
    $(".right_select_div").on("click", function () {
        $(".left_select_p").css({"color": "#5B5B5B"});
        $(".right_select_p").css({"color": "#61C67D"});
        isnearbyLine = false;

        // $(".carList_div ul").empty();
        // hpVM.hpModel = [];
        hpVM.hpModel = [{
            carclass: "已经发车"
        }, {
            carclass: "暂未发车"
        }, {
            carclass: "还有很多班车"
        }];
    });

    // 物品类型重量减
    $(".jianjian_btn").on("click", function () {
        var zlInput = $(".num_input");
        var num = parseFloat(zlInput.val());
        if (num <= 0) {
            return;
        }
        else {
            zlInput.val((num-1).toFixed(2));
        }
    });
    // 物品类型重量加
    $(".jiajia_btn").on("click", function () {
        var zlInput = $(".num_input");
        var num = parseFloat(zlInput.val());
        zlInput.val((num+1).toFixed(2));
    });
    // 呼叫记录
    $(".right_btn").on("click", function () {
        $(location).attr('href', 'callrecord.html');
    });
    // 上车位置
    $(".rightsa_top_div").on("click", function () {
        localStorage.rideplace = "upride";
        $(location).attr('href', 'chooseplace.html');
    });
    // 下车位置
    $(".rightsa_bottom_div").on("click", function () {
        localStorage.rideplace = "downride";
        $(location).attr('href', 'chooseplace.html');
    });
    // 查询按钮点击
    $(".search_btn").on("click", function () {
        $.alert({
            title: '提示',
            text: "请输入上车位置",
            onOK: function () {
                //点击确认
            }
        });
    })
    // 时间选择
    $("#lgnow_input").datetimePicker({
        min: "2019-03-03"
    });

})

// 查看地图
function lookmap(i) {
    $(location).attr('href', 'lookmap.html');
}
// 我要购票
function buyPiao(i) {
    console.log("i:"+i);
    $(location).attr('href', 'buyticket.html');
}
// 呼叫车辆
function callCar(i) {
    console.log("i:"+i);
    $(location).attr('href', 'callche.html');
}