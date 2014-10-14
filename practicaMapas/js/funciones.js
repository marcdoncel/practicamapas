var usuario;
var url = "http://alummnos-mcsd2014.azure-mobile.net/tablas/mapas";

function cambiarCapaVisible() {
    $("#registro").toggle();
    $("#datos").toggle();
}

function manejarUsuarios(usuario) {
    if (localStorage["usuario"]) {
        usuario = eval("(" + localStorage["usuario"] + ")");
        cambiarCapaVisible();
        cargarDatos();
    }
}

function guardarUsuario() {
    usuario = new Usuario($("#txtNombre").val());
    localStorage["usuario"] = JSON.stringify(usuario);
    cambiarCapaVisible();
}

function dibujarObjeto(obj) {
    var canvas = document.querySelector("#disposicion");
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "red";
    ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
}

function pintarCanvas(datos) {
    $.each(datos, function (i, obj) {
        dibujarObjeto(obj);

    });
}

function cargarDatos() {
    var urlf = url + "?$filter=nombre eq '" + usuario.nombre + "'";

    $.getJSON(urlf, null, function(res) {
        pintarCanvas(res);
    });

}

function addElemento() {
    var x = $("#txtX").val();
    var y = $("#txtY").val();
    var h = $("#txtH").val();
    var w = $("#txtW").val();

    var dato = new Posicion(x, y, w, h, Usuario);
    var dat = JSON.stringify(dato);
    $.ajax(url, {
        method: "POST",
        contentType: "application/json",
        data: dat,
        type: "json",
        success: function(res) {
            if (res.id != undefined) {
                dibujarObjeto(res);
            }
        }

    });

}

(function() {
    $("#btnGuardarNombre").click(guardarUsuario);
    $("#btnGuardarCoordenadas").click(addElemento);
    $(document).ready(manejarUsuarios);

})();