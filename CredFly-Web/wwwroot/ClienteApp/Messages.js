'use strict';

AppCredFly.service('MsgData', function () {

	this.ServiceNotFound = function (status){
		
		switch(status){
			case 200: return "Servidor disponible";
			case 404: return "Servidor no disponible";
			default: return "Serividor sin estado";
		}
	}
	
    this.IngreseUsuario = function () {
        return "Ingrese Usuario para iniciar sesión";
    }	
	
	this.IngresePassword = function () {
        return "Ingrese Password para iniciar sesión";
    }
	
	this.UserPassInvalid = function () {
        return "Usuario o Password invalidos";
    }
	
	this.ErrorLogeo = function () {
        return "Error al iniciar sesión";
    }
	
	this.NoDataFound = function () {
	    return "No existen datos!.";
	}

	this.Cargando = function () {
        return "Cargando, por favor espere!."
	}

    //VARIABLES PARA LA TABLA
	this.noDataContent = function () { return "No existen datos."; }
	//this.pagerFormat = function () { return "Pages: {first} {prev} {pages} {next} {last}    {pageIndex} of {pageCount}"; }
	this.pagePrevText = function () { return "<";/*"Prev";*/ }
	this.pageNextText = function () { return ">";/*"Next";*/ }
	this.pageFirstText = function () { return "<<";/*"First";*/ }
	this.pageLastText = function () { return ">>"; /*"Last";*/ }
	this.pageNavigatorNextText = function () { return "..."; }
	this.pageNavigatorPrevText = function () { return "..."; }

    //VARIABLES DE MENSAJES
	this.ConfirmarEliminar = function () {
	    return "¿Desea eliminar el registro?";
	}

	this.ErrorAlExportar = function () {
	    return "Error al descargar archivo.";
	}

    //=========================================================================================================================
    //Mensajes En java Scripts
    this.RegistroConforme = function() { return "Registrado correctamente"; }
    
    this.RegistroError = function () {
        return "Error al registrar";
    }
    this.ModificacionConforme = function () {
        return "Modificado correctamente";
    }
    this.ModificacionError = function () {
        return "Error al modificar";
    }
    //=========================================================================================================================
});