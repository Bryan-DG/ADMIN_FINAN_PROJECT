function Limpiar(){
    document.getElementById('formulario').reset();
}


//Función que calcula la liquidez corriente

function liquidez(){
    var activos = (document.getElementById('act-cor').value);
    var pasivos = (document.getElementById('pas-cor').value);
    liquidez = activos/pasivos;

    document.getElementById('resultado-liquidez-corriente').innerHTML = liquidez;

    if (liquidez > 1){
        document.getElementById('tipo-liquidez').innerHTML = "Tiene una buena liquidez corriente";
    }
    else
        document.getElementById('tipo-liquidez').innerHTML = "Tiene una mala liquidez corriente";
}

//Función que calcula la razón rápida

function razon_rapida(){
    var activos = parseInt(document.getElementById('act-cor-ra').value);
    var pasivos = parseInt(document.getElementById('pas-cor-ra').value);
    var inventario = parseInt(document.getElementById('inv-cor-ra').value);
    razon_rapida = (activos-inventario)/pasivos;

    document.getElementById('resultado-razon-rapida').innerHTML = razon_rapida;

    if (razon_rapida > 0.5){
        document.getElementById('tipo-razon-rapida').innerHTML = "Tiene una buena razón rápida";
    }
    else
        document.getElementById('tipo-razon-rapida').innerHTML = "Tiene una mala razón rápida";
}

//Función que calcula la rotación de inventario

function rotacion_inventario(){
    var cos_bie_ven = parseInt(document.getElementById('cos-bie-ven').value);
    var inventario = parseInt(document.getElementById('inventario').value);
    var rotacion_compe = (document.getElementById('rotacion_compe').value);

    rotacion_inventario = cos_bie_ven/inventario;

    document.getElementById('resultado-rotacion-inventario').innerHTML = rotacion_inventario;

    if (rotacion_inventario > rotacion_compe ){
        document.getElementById('tipo-rotacion-inventario').innerHTML = "Tiene una buena rotación de inventario";
    }
    else
        document.getElementById('tipo-rotacion-inventario').innerHTML = "Tiene una mala rotación de inventario";
}

//Función que calcula el periodo promedio de cobro

function per_prom_cobro(){
    var cos_bie_ven = (document.getElementById('cue-cob').value);
    var ventas_anuales = (document.getElementById('ventas-anuales').value);
    var cond_cred = parseInt(document.getElementById('cond-cred').value);

    per_prom_cobro = cos_bie_ven/(ventas_anuales/365);

    document.getElementById('resultado-per-prom-cobro').innerHTML = per_prom_cobro;

    if (per_prom_cobro > cond_cred ){
        document.getElementById('tipo_per_prom_cobro').innerHTML = "malo";
    }
    else
        document.getElementById('tipo_per_prom_cobro').innerHTML = "bueno";
}

//Función que calcula el periodo promedio de pago

function per_prom_pago(){
    var cue_pag = (document.getElementById('cue-pag').value);
    var com_anu = (document.getElementById('comp-anuales').value);

    per_prom_pago = (cue_pag/(com_anu/365));

    document.getElementById('resultado-per-prom-pago').innerHTML = per_prom_pago + " días";
}

//Función que calcula la rotación de activos totales

function rot_act_tot(){
    var ventas = (document.getElementById('ventas-rat').value);
    var total_act_at = (document.getElementById('total-act-at').value);

    rot_act_tot = ventas/total_act_at;

    document.getElementById('resultado-rot-act-tot').innerHTML = rot_act_tot;

    document.getElementById('rotacionacttot').innerHTML = "Esto significa que la empresa sustituye sus activos " + rot_act_tot + " veces al año";
}

//Función que calcula el nivel de endeudamiento

function nivel_ende(){
    var total_activos = (document.getElementById('total-activos').value);
    var total_pasivos = (document.getElementById('total-pasivos').value);

    nivel_ende = total_pasivos/total_activos;

    document.getElementById('rotacionacttot').innerHTML = "El nivel de enduedamiento de la empresa ese de: " + rot_act_tot;
}

//Función que calcula la concentración de endeudamiento a corto plazo

function con_ende_cp(){
    var pasivo_corriente = (document.getElementById('pa-co').value);
    var pasivo_total = (document.getElementById('pa-to').value);

    con_ende_cp = pasivo_corriente/pasivo_total;

    document.getElementById('con_ende_cp').innerHTML = con_ende_cp;
}

//Función que calcula la cobertura de interés

function co_int(){
    var unai = (document.getElementById('utii').value);
    var interes = (document.getElementById('intereses').value);

    co_int = unai/interes;

    document.getElementById('co_int').innerHTML = co_int;
}

//Función que calcula el margen bruto

function mb(){
    var uti_bruta = (document.getElementById('utib').value);
    var cos_bie_ven = (document.getElementById('ventas').value);

    mb = uti_bruta/cos_bie_ven;

    document.getElementById('margen_bruto').innerHTML = mb;
}

//Función que calcula la utilidad neta

function muo(){
    var ganancias_accionistas = (document.getElementById('gdac').value);
    var ventas = (document.getElementById('ventas').value);

    muo = ganancias_accionistas/ventas;

    document.getElementById('muneta').innerHTML = muo;
}

//Función que calcula la relación ganancias/precio

function rpg(){
    var precio_mer_accion_comun = (document.getElementById('pmac').value);
    var ganancias_comunes = (document.getElementById('ga').value);

    rpg = precio_mer_accion_comun/ganancias_comunes;

    document.getElementById('rpg').innerHTML = rpg;
}