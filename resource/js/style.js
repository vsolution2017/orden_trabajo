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
        ValidationMaquinaria("#cbo_maq :selected", "#maquinaria_select", "#op_add_maq", true);        
    });
    
    $("#btn_add_mano_obra").click(function () {
        ValidationMaquinaria("#cbo_mano_obra :selected", "#mano_obra_select", "#op_add_mano_obra", false);        
    });
    
    $("#btn_save_hr").click(function () {
        hr_ini = $(".modal_horas").find("input.time_ini").toArray();
        hr_fin = $(".modal_horas").find("input.time_fin").toArray();
        c = hr_ini.length -1;
        totalhora = 0;
        totalmin = 0;
        for (var i = 0; i < c; i++) {
            hora_inicio = hr_ini[i].value;
            hora_final = hr_fin[i].value;
            var startTime=moment(hora_inicio, "HH:mm");
            var endTime=moment(hora_final, "HH:mm");            
            var totalHours = (endTime.diff(startTime, 'hours'));
            var totalMinutes = endTime.diff(startTime, 'minutes');
            var clearMinutes = totalMinutes % 60;
            totalhora += totalHours;
            totalmin += clearMinutes;
        }
        if(totalmin >= 60){
            hora = totalhora + (totalmin/60);
            minuto = totalmin % 60;
        }
        
    });

    //tab_maquinaria
    $("#tab_maquinaria").on("click", ".delete", function () {
        $(this).closest(".input-group").remove();
        OcultarPanelActividadCosto("#maquinaria_select",".maq_costo", ".maq_panel");
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

function ValidationMaquinaria (param1, param2, param3, param4) {
    maquina_nombre = $(param1).text();
    op2_clone = $(param2).find("button.disabled").toArray();
    for (var i = 0; i < op2_clone.length; i++) {
        op3_clone = op2_clone[i].innerHTML;
        if (maquina_nombre != op3_clone) {
            band = true;
        } else {
            band = false;
            break;
        }
    }
    if (band) {
        op_clone = $(param3).clone();
        $(op_clone).find("button.disabled").html(maquina_nombre);
        $(op_clone).removeClass("hidden");
        $(param2).append(op_clone);
    }
    if(param4){
        MostrarPanelActividadCosto(param2,".maq_costo", ".maq_panel");
    }
}

function MostrarPanelActividadCosto(param1, param2, param3) {
    op2_clone = $(param1).find("button.disabled").toArray();
    for (var i = 0; i < op2_clone.length; i++) {
        op3_clone = op2_clone[i].innerHTML;
        if ((op3_clone == "Retroexcavadora") || (op3_clone == "Martillo Neumatico")) {
            band = true; break;
        } else {
            band = false;
        }
    }
    if(band){
        $(param2).removeClass("hidden");
        $(param3).removeClass("hidden");
    }
}

function OcultarPanelActividadCosto(param1, param2, param3) {
    op2_clone = $(param1).find("button.disabled").toArray();
    for (var i = 0; i < op2_clone.length; i++) {
        op3_clone = op2_clone[i].innerHTML;
        if ((op3_clone == "Retroexcavadora") || (op3_clone == "Martillo Neumatico")) {
            band = true; 
        } else {
            band = false;
        }
    }
    if(!band){
        $(param2).addClass("hidden");
        $(param3).addClass("hidden");
    }
}
