window.onload = function()
{
    var trianguloCapicua = function(categoria)
    {
        var capicua = "111111111"; 
        var triangulo = [];
        var fila = [];
        for(var i = 1; i <= categoria; i++)
        {
            fila = [];
            var numero = capicua.substring(1, i+1); 
            var operacion = (numero*numero)+"";
         
	   for(var c = 0; c < operacion.length; c++)
            {
                fila.push(operacion.charAt(c));
                if(categoria == 9 && i == 9 && operacion.charAt(c) == 8){
                    fila.push(9);
                    fila.push(8);
                }
            }
            triangulo.push(fila);
        }
        return triangulo;
    };

    var randomColor = function()
    {
        return '#'+(function lol(m,s,c){return s[m.floor(m.random() * s.length)] +
        (c && lol(m,s,c-1));})(Math,'0123456789ABCDEF',4);
    };

    var imprimeTriangulo = (function imprimeTriangulo(nivel)
    {
        var txt = "";
        var triangulo = trianguloCapicua(nivel);
        var colorCelda = "";
        nom_div("capicua").innerHTML = "";
        for(var i = 0; i < triangulo.length; i++)
        {
            txt += "<div align = 'center' class = 'nivel' style = 'padding-bottom: 10px;'>";
            for(var c = 0; c < triangulo[i].length; c++)
            {
                colorCelda =  "background-color:" + randomColor();
                txt += "<div style = 'display: inline-block; "+(colorCelda)+"' class = 'celda'"+"'>" + 
                            (triangulo[i][c]) + 
                        "</div>";
            }
            txt += "</div>";
        }
        nom_div("capicua").innerHTML = txt;
        return imprimeTriangulo;
    })(2);

    nom_div("rango").addEventListener('change', function(event)
    {
        nom_div("texto").innerHTML = this.value;
        imprimeTriangulo(Number(this.value));
    });

    function nom_div(div)
    {
        return document.getElementById(div);
    }
};
