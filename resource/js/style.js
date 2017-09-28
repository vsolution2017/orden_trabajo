$(function () {
    /* Style Tab Actividades */
    $("#tab_actividades").on("change", ".input-area", function () {
        producto = 1;
        $(this).closest('.contenedor-area').find(".input-area").each(function (i, value) {
            num = parseFloat($(value).val());
            if (num > 0) {
                producto *= num;
            }
        });
        $(this).closest('.contenedor-area').find(".total-area").val(producto.toFixed(2)).change();
    });
    $("#tab_actividades").on("change", ".total-area", function () {
        sum = 0;
        $(this).closest(".actividad_sample").find(".content .row:not(.hidden) .total-area").each(function (i, v_ta) {
            sum += parseFloat($(v_ta).val());
        });
        $(this).closest(".actividad_sample").find(".v_total-area").val(sum.toFixed(2));
    });
    /* Style Tab Actividades */


    $("#fechaInicio , #fechaCierre").change(function () {
        if ($("#fechaInicio").inputmask("isComplete") && $("#fechaCierre").inputmask("isComplete")) {
            var dateFechaInicio = $("#fechaInicio").val();
            var dateFechaCierre = $("#fechaCierre").val();
            var dateI = moment(dateFechaInicio, "DD/MM/YYYY");
            var dateC = moment(dateFechaCierre, "DD/MM/YYYY");

            var date1 = new Date(dateI);
            var date2 = new Date(dateC);
            var delta = date2 - date1;
            var diffDays = (Number(delta) / 86400000) + 1;
            $("#contenedor").html("");
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
        } else {
            $("#contenedor").html("");
        }
    });

    $(":input").inputmask();

    $("#btn_add_maq").click(function () {
        maquina_nombre = $("#cbo_maq :selected").text();
        op_clone = $("#op_add_maq").clone();
        $(op_clone).find("button.disabled").html(maquina_nombre);
        //$(op_clone).find("input").val(1);
        $(op_clone).removeClass("hidden");
        $("#maquinaria_select").append(op_clone);
    });

    $("#btn_add_mano_obra").click(function () {
        mano_obra = $("#cbo_mano_obra :selected").text();
        op_clone = $("#op_add_mano_obra").clone();
        $(op_clone).find("button.disabled").html(mano_obra);
        //$(op_clone).find("input").val(1);
        $(op_clone).removeClass("hidden");
        $("#mano_obra_select").append(op_clone);
    });

//tab_maquinaria
    $("#tab_maquinaria").on("click", ".delete", function () {
        $(this).closest(".input-group").remove();
    });

    /* Carlos */
    $("button[name='btn_area']").click(function () {
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
