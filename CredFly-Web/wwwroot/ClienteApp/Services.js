'use strict';

AppCredFly.service('Validate', function () {

    this.InvalidData = function (dato) {
        if(dato == "" || dato == undefined){
			return false;
		}		
		return true;
    }

    this.InvalidDataLg = function (dato, len) {
        if (dato == "" || dato == undefined) {
            return false;
        }
        if (dato.length < len) {
            return false;
        }
        return true;
    }

    this.InvalidSelec = function (dato) {
        if (dato == "" || dato == undefined) {
            return false;
        }
        if (dato == 0) {
            return false;
        }
        return true;
    }

    this.InvalidPrice = function (pValue) {
        if (!isNumeric(pValue)) {
            return false;
        }

        return true;
    }

    this.InvalidNumber = function (pValue) {
        
        if (!isNumeric(pValue)) {
            return false;
        }
        
        return true;
    }

    this.OnlyNumber =  function (pValue) {
        var valid = false;

        /*if (!isNam(pValue) && !isNaN(parseInt(pValue))) {
            valid = true;
        }*/
        if (/^\d+\.\d+$|^\d+$/.test('458')) {
            valid = true;
        }

        return valid;
    }

    this.OnlyLetter = function (pValue) {
        var valid = false;

        if (/^[A-Za-z]+$/.test(pValue)){
            valid = true;
        }

        return valid;
    }

});

AppCredFly.service('Moment', function () {

    this.TodayF = function () {
        var fecha = moment();
        return fecha;
    }

    this.Today = function () {
        var fecha = moment();
        return fecha.format('DD/MM/YYYY');
    }

    this.TodayFormat = function (pFormato) {
        var fecha = moment();
        return fecha.format(pFormato);
    }

    this.FirstDayYear = function () {
        var fecha = moment(moment().year() + '-01-01');
        return fecha.format('DD/MM/YYYY');
    }

    this.Valid = function (strFecha) {
        if (strFecha == "" || strFecha == undefined){
            return false;
        }
        var m = moment(strFecha, 'DD/MM/YYYY', true);
        console.log(m);
        console.log(m.isValid());
        return m.isValid();
    }

    this.ValidFull = function (strFecha) {
        if (strFecha == "" || strFecha == undefined) {
            return false;
        }
        var m = moment(strFecha, 'DD/MM/YYYY HH:mm:ss');
        return m.isValid();
    }

    this.formatASP_DDMMYYYY = function (value) {
        if (value == "" || value == undefined) {
            return "";
        } else {
            var fecha = moment(value);
            var strFecha = fecha.format('DD/MM/YYYY');
            if (fecha.isValid()) {
                return strFecha;
            } else {
                return "";
            }
        }
    }

    this.formatToDate = function (value, format) {
        if (value == "" || value == undefined || format == "" || format == undefined) {
            return null;
        } else {
            var fecha = moment(value, format);
            //var strFecha = fecha.format(format);
            if (fecha.isValid()) {
                console.log("Fecha Válida")
                console.log(fecha);
                return fecha;
            } else {
                return null;
            }
        }
    }

    this.format = function (value, format) {
        if (value == "" || value == undefined || format == "" || format == undefined) {
            return null;
        } else {
            var fecha = moment(value, format);
            var strFecha = fecha.format(format);
            if (fecha.isValid()) {
                
                return strFecha;
            } else {
                return null;
            }
        }       

    }

    this.formatASP = function (value) {
        if (value == "" || value == undefined) {            
            return "";
        } else {
            var fecha = moment(value);
            var strFecha = fecha.format('DD/MM/YYYY HH:mm:ss');
            if (fecha.isValid()) {
                return strFecha;  
            } else {
                return "";
            }
        }
    }

    this.Diff = function (pFechaIni, pFechaFin, Intervalo, pformat) {

        var response = { st: 0, msg: "Fecha incorrecta", dato: "0" };
        var format = pformat == "" ? "DD/MM/YYYY" : pformat;
        var mIni = moment(pFechaIni, format);
        var mFin = moment(pFechaFin, format);       

        if (!mIni.isValid()) {
            response.st = 0;
            response.msg = "Fecha inicial incorrecta";
            return response;
        }
        if (!mFin.isValid()) {
            response.st = 0;
            response.msg = "Fecha final incorrecta";
            return response;
        }

        //intervaloes  days - years months

        var diferencia = mFin.diff(mIni, Intervalo);
        response.st = 1;
        response.msg = "Existe diferencia";
        response.dato = diferencia;

        return response;
    }

    this.formatASP_Date = function (value) {
        if (value == "" || value == undefined) {
            return "";
        } else {
            var fecha = moment(value);
            return fecha;
        }
    }

    this.FirstDayYear = function () {
        var fecha = moment(moment().year() + '-01-01');
        return fecha.format('DD/MM/YYYY');
    }

    this.EndDayMonth = function (intAnio, intMes) {
        //var fecha = moment({ year: intAnio, month: intMes, day: 1 });//.endOf('month');
        var fecha = moment('01/' + intMes + '/' + intAnio, 'DD/MM/YYYY').endOf('month').format('DD/MM/YYYY');
        return fecha;
    }
});

AppCredFly.service('Message', function () {
    
    this.Alert = function (title, msg) {
        //bootbox.alert(msg);
    }

    this.AlertSuccess = function (title, msg) {
        //var toastr = $('.toast').toast();
        //toastr.toast("show");
        toastr.options = {
            closeButton: true,
            debug: false,
            newestOnTop: true,
            progressBar: true,
            rtl: true,
            positionClass: 'toast-top-right',
            preventDuplicates: true,
            onclick: null
        };
        var $toast = toastr["success"](msg, title);
    }

    this.AlertError = function (title, msg) {
        //var toastr = $('.toast').toast();
        //toastr.toast("show");
        toastr.options = {
            closeButton: true,
            debug: false,
            newestOnTop: true,
            progressBar: true,
            rtl: true,
            positionClass: 'toast-top-right',
            preventDuplicates: true,
            onclick: null
        };
        var $toast = toastr["error"](msg, title);
    }

    this.AlertInfo = function (title, msg) {
        //var toastr = $('.toast').toast();
        //toastr.toast("show");
        toastr.options = {
            closeButton: true,
            debug: false,
            newestOnTop: true,
            progressBar: true,
            rtl: true,
            positionClass: 'toast-top-right',
            preventDuplicates: true,
            onclick: null
        };
        var $toast = toastr["info"](msg, title);
    }

    this.AlertWarning = function (title, msg) {
        //var toastr = $('.toast').toast();
        toastr.options = {
            closeButton: true,
            debug: false,
            newestOnTop: true,
            progressBar: true,
            rtl: true,
            positionClass: 'toast-top-right',
            preventDuplicates: true,
            onclick: null
        };
        //toastr.toast("show");
        var $toast = toastr["warning"](msg, title);

    }

    this.Confirm = function (title, msg, fcAceptar, fcCancelar, pParamAceptar) {
        bootbox.dialog({
            message: msg,
            title: title,
            buttons: {
                danger: {
                    label: "Aceptar",
                    className: "btn-danger",
                    callback: function () {
                        fcAceptar(pParamAceptar);
                    }
                },
                main: {
                    label: "Cancelar",
                    className: "btn-primary",
                    callback: function () {
                        if (fcCancelar != null) {
                            fcCancelar();
                        }
                    }
                }
            }
        });
    }

    this.Prompt = function (title, msg, fcAceptar, fcCancelar) {
        bootbox.prompt({
            title: title,
            message: msg,
            inputType: 'textarea',
            callback: function (result) {
                fcAceptar(result);
            }
        });
    }

    this.ConfirmDelete = function (title, msg, fcDelete, fcCancel) {
        bootbox.dialog({
            message: msg,
            title: title,
            buttons: {
                danger: {
                    label: "Eliminar",
                    className: "btn-danger",
                    callback: function () {
                        fcDelete();
                    }
                },
                main: {
                    label: "Cancelar",
                    className: "btn-primary",
                    callback: function () {
                        if (fcCancel != null) {
                            fcCancel();
                        }
                    }
                }
            }
        });
    }


});

AppCredFly.service('Call', ['$http', 'MsgData', 'Message', function ($http, MsgData, Message) {
    
    this.Get = function (url, parametros, nFunction) {
        var config = {
            params: parametros,
            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': 'https://localhost:44334'
            }
        };
        $http.get(AppGURL + url, config)
		.success( function (data, status, headers, config){
			nFunction(data);
		})
		.error(function (data, status, headers, config){
            Message.AlertError("Error al consultar servicio");
		});
	}
	
	this.Post = function (url, parametros, nFunction, nFunctionError) {
        var config = {
            headers: { 'Accept': 'application/json' }
        };
	    $http.post(AppGURL + url, parametros, config)
		.success(function (data, status, headers, config) {
		    if (nFunction != null) {
		        nFunction(data);
		    }		    
		})
		.error(function (data, status, headers, config) {
		    if (nFunctionError != null) {
		        nFunctionError(data);
		    }
            Message.AlertError(MsgData.ServiceNotFound(status));
		});
    }
	
	this.Redirect = function (url){
	    document.location = AppGURL + url;
	}
	
	this.PostAjax = function (async, url, parametro, nFunction, nFunctionError) {
	    $.ajax({
	        type: "POST",
	        async: async,
	        url: url,
            data: JSON.stringify(parametro),
	        contentType: "application/json; charset=utf-8",
	        dataType: "json",
	        success: function (response) {
	            nFunction(response);
	        },
	        error: function (jqXHR, textStatus, errorThrown) {
	            Message.AlertError(errorThrown);
	            if (nFunctionError != null) {
	                nFunctionError(errorThrown);
	            }
	        }
	    });
    }

    this.PostApiPipe = function (url, pDataJson, nFunction, nFunctionError) {
        var vURL = url + "?api_token=" + vgPipeApiToken;
        $.ajax({
            type: "POST",
            async: false,
            url: vURL,
            data: JSON.stringify(pDataJson),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                nFunction(response);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                Message.AlertError(errorThrown);
                if (nFunctionError != null) {
                    nFunctionError(errorThrown);
                }
            }
        });
    }

    this.PutApiPipe = function (url, pDataJson, nFunction, nFunctionError) {
        var vURL = url + "?api_token=" + vgPipeApiToken;
        $.ajax({
            type: "PUT",
            async: false,
            url: vURL,
            data: JSON.stringify(pDataJson),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                nFunction(response);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                Message.AlertError(errorThrown);
                if (nFunctionError != null) {
                    nFunctionError(errorThrown);
                }
            }
        });
    }

    this.GetApiPipe = function (url, parametros, nFunction) {
        var vURL = url + "?api_token=" + vgPipeApiToken;
        var config = {
            params: parametros,
            headers: { 'Accept': 'application/json' }
        };
        $http.get(vURL, config)
            .success(function (data, status, headers, config) {
                nFunction(data);
            })
            .error(function (data, status, headers, config) {
                Message.AlertError(MsgData.ServiceNotFound(status));
            });
    }

    this.PostAjaxFiles = function (async, url, parametros, nFunction, nFunctionError) {
        $.ajax({
            type: "POST",
            async: async,
            url: url,
            data: parametros,
            contentType: false, // Not to set any content header  
            processData: false, // Not to process data  
            success: function (response) {
                nFunction(response);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                Message.AlertError(errorThrown);
                if (nFunctionError != null) {
                    nFunctionError(errorThrown);
                }
            }
        });
    }

	this.GetAjax = function (async, url, parametros, nFunction, nFunctionError) {
	    $.ajax({
	        type: "GET",
	        async: async,
            url: AppGURL + url,
	        data: parametros,
	        contentType: "application/json; charset=utf-8",
	        dataType: "json",
	        success: function (response) {
	            nFunction(response);
	        },
	        error: function (jqXHR, textStatus, errorThrown) {
	            Message.AlertError(errorThrown);
	            if (nFunctionError != null) {
	                nFunctionError(errorThrown);
	            }
	        }
	    });
	}
	
	this.Exportar = function (url, parametros, pTipoArchivo, nFunction, nFunctionError) {
	    var config = {
	        headers: { 'Accept': 'application/json' }
	    };
	    $http.post(url, parametros, config)
		.success(function (data, status, headers, config) {		    
		    if (nFunction != null) {
		        nFunction(data, pTipoArchivo);
		    }
		})
		.error(function (data, status, headers, config) {
		    if (nFunctionError != null) {
		        nFunctionError(data);
		    }
		    Message.AlertError(MsgData.ErrorAlExportar);
		});

	}

	this.ExportarTxt = function (url, nombreArchivo) {
	    $http.get(url)
        .success(function (response) {
            var file = new Blob([response], { type: "application/txt" });
            var isChrome = !!window.chrome && !!window.chrome.webstore;
            var isEdge = !isIE && !!window.StyleMedia;
            var isIE = /*@cc_on!@*/false || !!document.documentMode;

            if (isChrome) {
                var url = window.URL || window.webkitURL;
                var downloadLink = angular.element('<a></a>');
                downloadLink.attr('href', url.createObjectURL(file));
                downloadLink.attr('target', '_self');
                downloadLink.attr('download', nombreArchivo);
                downloadLink[0].click();
            }
            else if (isEdge || isIE) {
                window.navigator.msSaveOrOpenBlob(file, nombreArchivo);
            }
            else {
                var fileURL = URL.createObjectURL(file);
                window.open(fileURL);
            }
        })
        .error(function (response) {
            Message.AlertError(MsgData.ErrorAlExportar);
        });
	}

	this.ExportarExcel = function (url, nombreArchivo) {
	    $http({
	        url: url,
	        method: 'GET',
	        responseType: 'arraybuffer',
	        headers: {
	            'Content-type': 'application/json',
	            'Accept': "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
	        }
	    })
        .success(function (response) {
            var file = new Blob([response], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
            var isChrome = !!window.chrome && !!window.chrome.webstore;
            var isEdge = !isIE && !!window.StyleMedia;
            var isIE = /*@cc_on!@*/false || !!document.documentMode;
            if (isChrome) {
                var url = window.URL || window.webkitURL;
                var downloadLink = angular.element('<a></a>');
                downloadLink.attr('href', url.createObjectURL(file));
                downloadLink.attr('target', '_self');
                downloadLink.attr('download', nombreArchivo);
                downloadLink[0].click();
            }
            else if (isEdge || isIE) {
                window.navigator.msSaveOrOpenBlob(file, nombreArchivo);
            }
            else {
                var fileURL = URL.createObjectURL(file);
                window.open(fileURL);
            }
        })
        .error(function (response) {
            Message.AlertError(MsgData.ErrorAlExportar);
        });
	}

}]);

var msgDataEmpty = "No existen datos";
var iconFirst = "<span class='glyphicon glyphicon-fast-backward'></span>";
var iconLast = "<span class='glyphicon glyphicon-fast-forward'></span>";
var iconPrevious = "<span class='glyphicon glyphicon-backward'></span>";
var iconNext = "<span class='glyphicon glyphicon-forward'></span>";


AppCredFly.service('Loading', ['$http', function ($http) {
    /*
      Nombre: LoadingShow
      Descripción: Método para mostrar el loading en la pantalla
      Autor: Wilder Ever Villavicencio Meza
      Fecha: 2017-02-04
    */
    this.LoadingShow = function (message) {
        $.loader({
            className: "blue-with-image-2",
            content: message
        });
        //$('#pnlDatos').loading();
        //$('#pnlDatos').loading('toggle');
    }

    /*
      Nombre: LoadingClose
      Descripción: metodo para ocultar el loading
      Autor: Wilder Ever Villavicencio Meza
      Fecha: 2017-02-04
    */
    this.LoadingClose = function () {
        $.loader('close');
    }

}]);

