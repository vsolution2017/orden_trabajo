$(function () {
    
    $(":input").inputmask();
    $("#btn_hora").click(function(){
        var dateFechaInicio = $("#fechaInicio").val();
        var dateFechaCierre = $("#fechaCierre").val();
        var dateI = moment(dateFechaInicio,"DD/MM/YYYY");
        var dateC = moment(dateFechaCierre,"DD/MM/YYYY");

        var date1 = new Date(dateI);
        var date2 = new Date(dateC);
        var delta = date2 - date1;
        var diffDays = (Number(delta) / 86400000) +1; 
        for (var i = 0; i < diffDays; i++) {
             
            var date = new Date(dateI);
            var newdate = new Date(date);                
            newdate.setDate(newdate.getDate() + i);
            var fecha = newdate.getDate() + "-" + (newdate.getMonth() + 1) + "-" + newdate.getFullYear()
            op_clone = $("#opcionD").clone();
            $(op_clone).find("input[type='text']").val(fecha);
            $(op_clone).removeClass("hidden");
            $("#contenedor").append(op_clone);                
        } 
    });
    
    
    $("#btn_add_maq").click(function () {
        maquina_nombre = $("#cbo_maq :selected").text();
        op_clone = $("#op_add_maq").clone();
        $(op_clone).find("span").html(maquina_nombre);
        $(op_clone).find("input").val(1);
        $(op_clone).removeClass("hidden");
        $("#maquinaria_select").append(op_clone);
    });

    $("#btn_add_mano_obra").click(function () {
        mano_obra = $("#cbo_mano_obra :selected").text();
        op_clone = $("#op_add_mano_obra").clone();
        $(op_clone).find("span").html(mano_obra);
        $(op_clone).find("input").val(1);
        $(op_clone).removeClass("hidden");
        $("#mano_obra_select").append(op_clone);
    });


    /* Carlos */
    $("button[name='btn_area']").click(function () {
        //alert($(this).closest(".actividad_sample").html());

        op_area = $(this).closest(".actividad_sample").find(".op_add_area").clone();
        $(op_area).removeClass("hidden");
        $(op_area).removeClass("op_add_area");

        $(this).closest(".actividad_sample").find(".content").append(op_area);

    });

    $("#tab_actividades").on("click", ".delete", function () {
        $(this).closest(".row").remove();
    });
    $("#tab_actividades").on("click", ".edit", function () {
        $(this).removeClass("btn-info");
        $(this).addClass("btn-success");
        $(this).find("i").removeClass("fa-pencil");
        $(this).find("i").addClass("fa-floppy-o");
        $(this).closest(".input-group").find("input").removeAttr('readonly');
        $(this).removeClass("edit");
        $(this).addClass("save");
    });
    $("#tab_actividades").on("click", ".save", function () {
        $(this).addClass("btn-info");
        $(this).removeClass("btn-success");
        $(this).find("i").addClass("fa-pencil");
        $(this).find("i").removeClass("fa-floppy-o");
        $(this).closest(".input-group").find("input").attr('readonly', 'readonly');
        $(this).addClass("edit");
        $(this).removeClass("save");
    });

});
