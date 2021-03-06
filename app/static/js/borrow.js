$(document).ready(function(){
    // 分步骤
    $("#equipmentBorrow").steps({
        headerTag: "h3",
        bodyTag: "section",
        transitionEffect: "slideLeft",
        autoFocus: true,
        onFinished: function(event,currentIndex) {
            var dataForm = $("#borrowForm").serialize();
            $.ajax({
                type: "POST",
        		cache: false,
        		headers: { "cache-control": "no-cache" },
        		dataType: "json",
        		url: "/equipment/borrow/",
        		data: dataForm,
                success:function(msg) {
                    if(msg.msg=="true"){
                        window.location.href="";
                    }
                }
            })
        }
    });
    // 第一步，搜索选择人员
    $("#grid-data-user").bootgrid({
        ajax: true,
        ajaxSettings: {
            method:"POST",
            cache: false
        },
        post: function() {
            return {
                "search_name":$("input[name=search_name]").val()
            }
        },
        url: "/staff/data/",
        selection: true,
        multiSelect:true,
        rowSelect:true,
        navigation: 2,
        padding:1,
    });
    var templete_user_id = [];
    var templete_user_name = '';
    $("#grid-data-user").bootgrid().on("selected.rs.jquery.bootgrid", function (e,row){
        if(templete_user_id.length!=0){
            $("#grid-data-user").bootgrid("deselect", templete_user_id);
        }
        templete_user_id[0] = row[0].id;
        templete_user_name = row[0].name;
        $("input[name=user_name]").val(templete_user_name);
        $("input[name=user_id]").val(templete_user_id[0]);
    });

    $("input[name=search_name]").keyup(function() {
        $("#grid-data-user").bootgrid("reload");
        templete_user_id = [];
        templete_user_name = '';
        $("input[name=user_name]").val(templete_user_name);
        $("input[name=user_id]").val(templete_user_id[0]);
    });
    // 第二步，搜索选择设备
    var equipment_ids = [];
    var equipment_names = [];
    $("#grid-data-equipment").bootgrid({
        ajax: true,
        ajaxSettings: {
            method:"POST",
            cache: false
        },
        post: function() {
            return {
                "search_equipment":$("input[name=search_equipment]").val()
            }
        },
        url: "/equipment/data/",
        selection: true,
        multiSelect:true,
        rowSelect:true,
        navigation: 2,
        padding:1,
    }).on("selected.rs.jquery.bootgrid", function(e, rows){
        for (var i = 0; i < rows.length; i++){
            equipment_ids.push(rows[i].id);
            equipment_names.push(rows[i].name);
        }
        $("input[name=equipment_name]").val(equipment_names.join(","));
        $("input[name=equipment_ids]").val(equipment_ids.join(","));
    }).on("deselected.rs.jquery.bootgrid", function(e, rows){
        for (var i = 0; i < rows.length; i++){
            for (var j = 0; j < equipment_ids.length; j++) {
                if (equipment_ids[j].id == rows[i].id) {
                    delete equipment_ids[j];
                    delete equipment_names[j];
                    break;
                }
            }
        }
        $("input[name=equipment_name]").val(equipment_names.join(","));
        $("input[name=equipment_ids]").val(equipment_ids.join(","));
    });

    $("input[name=search_equipment]").keyup(function() {
        $("#grid-data-equipment").bootgrid("reload");
        equipment_ids = [];
        equipment_names = [];
        $("input[name=equipment_name]").val("");
        $("input[name=equipment_ids]").val("");
    });

    var date = new Date();
    $("input[name=borrow_date]").val(date.getFullYear()+'-'+(((date.getMonth()+1)>9)?(date.getMonth()+1):'0'+(date.getMonth()+1))+'-'+date.getDate());
    $('input[name=borrow_date]').datepicker({
        format: "yyyy-mm-dd",
        todayBtn: "linked",
        language: "zh-CN"
    });

});
