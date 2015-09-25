window.onload = function()
{
    /*
    ------------------------------------------------------------------------
    Parte 01: Conversión de nímeros decimales a fraccionarios...
    ------------------------------------------------------------------------
    */
    //Para los rangos de los valores de la conversión de fraccionarios...
    var datosDecimal = {
                            entero  : 0,
                            decimal : 0
                       };
    //Para el slider de entero...
    nom_div("entero").addEventListener('change', function(event)
    {
        datosDecimal.entero = nom_div("valEntero").innerHTML = Number(this.value);
        decimalFraccionario();
    });

    //Para el slider de decimal...
    nom_div("decimal").addEventListener('change', function(event)
    {
        datosDecimal.decimal = nom_div("valDecimal").innerHTML = Number(this.value);
        decimalFraccionario();
    });

//simplificar fraccionario
    var simplificaFraccionario = function(val)
    {
    var parteVal = val.split("/");
    var numerador = Number(parteVal[0]);
    var denominador = Number(parteVal[1]);
    var maximo = numerador <= denominador ? numerador : denominador;
    var cont = 2;
    do
    {
        if(numerador % cont === 0 && denominador % cont === 0)
        {
            numerador /= cont; // numerador = numerador / cont;
            denominador /= cont;
            maximo = numerador <= denominador ? numerador : denominador;
        }
        else
        {
            cont++;
            if(cont > maximo)
            {
                break;
            }
        }
    }while(1);
    var respuesta = numerador + "/" + denominador;
    if(denominador === 1)
    {
        respuesta = numerador;
    }
    return respuesta;
};
    //Función que realizará la conversión...

    var decimalFraccionario = function()
    {
        /*
        Entregar el valor fraccionario de la forma numerador/denominador
        la respuesta debe ser un número fraccionario simplificado...
        Tip: Convertir un número a un string : String(numero)
        */
        
        var m=(Math.pow(10,String(datosDecimal.decimal).length));
        r=datosDecimal.entero*m+datosDecimal.decimal+"/"+m;
        console.log(datosDecimal,m);
        //Imprime la respuesta en la vista (HTML)...
        nom_div("resFraccionario").innerHTML =simplificaFraccionario(r);
    };

    /*
    ------------------------------------------------------------------------
    Parte 02: Conversión de binario a decimal...
    ------------------------------------------------------------------------
    */
    //Para poner los inputs relacionados a los valores binarios...
    var numeroInputs = 8;
    var crearInputsBinario = function()
    {
        var txtInput = "";
        for(var veces = 1; veces <= 2; veces++)
        {
            for(var i = 1; i <= numeroInputs; i++)
            {
                if(veces === 1)
                {
                    txtInput += "<input type = 'number' min = '0' max = '1' value = '0' class = 'campoTexto' id = 'valor_"+(i)+"'>";
                }
                else
                {
                    nom_div("valor_" + i).addEventListener('change', function(event)
                    {
                        //var ind = Number(this.id.split("_")[1]);
                        //console.log("Numero input: ", ind, "Valor:", this.value);
                        binarioDecimal();
                    });
                }
            }
            if(veces === 1)
            {
                nom_div("binarioDecimal").innerHTML = txtInput + "<span class = 'txtValor'> = </span><span class = 'txtValor' id = 'resDecimal'>?</div>";
            }
        }
    }();

    //Función que realizará el proceso de conversión de decimal a binario...
    var binarioDecimal = function()
    {
        var exponente=0;
        var rs=0;
         for (var i = 8; i >= 1; i--) {
            
            var f=Number(nom_div("valor_"+i).value);
            
            if (f==1) {
                rs+=Math.pow(2,exponente);


            }
                exponente++;  
        }
            //Se deberá vaidar que los valores ingresados sean 1 ó 0...
            //El recorrido de los valores se realiza de derecha a izquierda...
    
        console.log("Realizar conversión de binario a decimal");
        //Imprime la respuesta en la vista (HTML)...
        nom_div("resDecimal").innerHTML = rs;
    };

    /*
    ------------------------------------------------------------------------
    Parte 03: Si una lista de todos los números naturales por debajo de 10 (no incluyente) que son múltiplos de 3 o 5, se obtiene 3, 5, 6 y 9. La suma de estos múltiplos es 23
    Hallar al sumatoria de valores múltiplos de 3 y 5 de acuerdo al valor del valor dando en el rabge...
    ------------------------------------------------------------------------
    */

    //Para el slider de valor máximo...
nom_div("maximo").addEventListener('change', function(event)
    {
        var rangoMultiplos = nom_div("valMaximo").innerHTML = Number(this.value);
        var rs3=0;
        for(var j=0; j<=rangoMultiplos;j++){
           if( j%3==0 || j%5==0){
            rs3+=j;
            }
        }
        console.log("Rango máximo es: ", rangoMultiplos);
        console.log(rs3);
        //Imprime la respuesta en la vista (HTML)...
        nom_div("resSumatoria").innerHTML = rs3;
    });

    //Accederá los elementos de HTML...
    function nom_div(div)
    {
        return document.getElementById(div);
    }
};


   