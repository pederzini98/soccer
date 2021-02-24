var Campeonato_dados = new Array()
var RodadaDuplaIda = new Array()
var RodadaDuplaVolta = new Array()

var nRodadas = 0
$(document).ready(function () {
    $(".button-start").click(function () {
        var texto = $("#text-area").val()
        var stringDeDados = texto.trim().split("\n")

        stringDeDados.forEach(element => {
            var auxiliar = element.toString()
            var dadosDosTime = auxiliar.split(";")


            Campeonato_dados.push({ 'Nome': dadosDosTime[0], "Estado": dadosDosTime[1], "Pontos": 0 })

        });
        if ((Campeonato_dados.length % 2) == 1) {
            alert("Voce deve digitar um número par de times")
            document.location.reload()
        }
        console.log(Campeonato_dados)
        nRodadas = (Numero_de_Partidas(Campeonato_dados))
        Schedule()
        Campeão()
        $(".button-start").hide()
        $("#button-container2").css("display", "flex")
        $("#champion").css("display", "flex")
    });
    $(".button-start2").click(function () {
        document.location.reload()
    })
});

function DefineMandante() {

    var mandante = new Array()
    var visitante = new Array()


    for (var i = 0; i < Campeonato_dados.length; i++) {
        if (i < Campeonato_dados.length / 2) {
            mandante.push({
                'Mandante': Campeonato_dados[i].Nome,
                'Local': Campeonato_dados[i].Estado,

            })
        } else {
            visitante.push({
                'Visitante': Campeonato_dados[i].Nome,
                'Local': Campeonato_dados[i].Estado
            })
        }
    }
    function random(o) {
        for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    }



    return [random(mandante), random(visitante)]
}
function Numero_de_Partidas(data) {
    var f1 = 1
    var f2 = 1
    for (var i = data.length; i > 0; i--) {
        f1 = f1 * i
    }
    for (var i = data.length - 2; i > 0; i--) {
        f2 = f2 * i
    }

    return Math.floor(2 * ((f1 / (f2 * 2)))) / data.length

}

function Schedule() {
    var times = new Array()


    var table = document.getElementById('table-body')
    var table2 = document.getElementById('table-body2')


    for (var i = 0; i < nRodadas; i++) {

        times = DefineMandante()
        for (var j = 0; j < (Campeonato_dados.length / 2); j++) {

            var resultado_mandante = Math.floor(Math.random() * 5)
            var resultado_visitante = Math.floor(Math.random() * 3)

            if (resultado_mandante > resultado_visitante) {
                Campeonato_dados.forEach(element => {
                    if (element.Nome == times[0][j].Mandante) {
                        element.Pontos += 3
                    }
                })
            }
            else if (resultado_mandante < resultado_visitante) {
                Campeonato_dados.forEach(element => {
                    if (element.Nome == times[1][j].Visitante) {
                        element.Pontos += 3
                    }
                })
            }
            else if (resultado_mandante == resultado_visitante) {

                Campeonato_dados.forEach(element => {
                    if (element.Nome == times[0][j].Mandante) {
                        element.Pontos += 1
                    }
                })
                Campeonato_dados.forEach(element => {
                    if (element.Nome == times[1][j].Visitante) {
                        element.Pontos += 1
                    }
                })

            }
            function RodadasDuplas(tim) {
                var t1 = '(Rodada Dupla)'
                var t2 = '(Rodada Multipla)'
                var auxiliar1 = new Array()
                var auxiliar2 = new Array()

                for (var y = 0; y < tim[1].length; y++) {
                    auxiliar1.push(tim[0][y].Local)
                    auxiliar2.push(tim[1][y].Local)
                }
                tim[0].forEach(function (valor, indice) {
                    var teste = 0
                    var aux = tim[0][indice].Local
                    for (var l = 0; l < tim[0].length; l++) {
                        if (aux == auxiliar1[l])
                            teste++
                    }

                    if (teste == 2)
                        RodadaDuplaIda.push(t1)
                    else if (teste > 2)
                        RodadaDuplaIda.push(t2)
                    else
                        RodadaDuplaIda.push('')
                },
                    tim[1].forEach(function (valor, indice) {
                        var teste = 0
                        var aux = tim[1][indice].Local
                        for (var l = 0; l < tim[0].length; l++) {
                            if (aux == auxiliar2[l])
                                teste++
                        }
                        if (teste == 2)
                            RodadaDuplaVolta.push(t1)
                        else if (teste > 2)
                            RodadaDuplaVolta.push(t2)
                        else
                            RodadaDuplaVolta.push('')
                    }
                    ))
            }
            RodadasDuplas(times)

            var row = `<tr>
                <td>${times[0][j].Mandante}</td>
                <td>${resultado_mandante + ' vs ' + resultado_visitante}</td>
                <td>${times[1][j].Visitante}</td>
                <td>${times[0][j].Local}</td>
                <td>${i + 1} ${RodadaDuplaIda[j]}</td>
                </tr>`
            table.innerHTML += row
            RodadaDuplaIda.splice(0, RodadaDuplaIda.length)
            var resultado_mandante2 = Math.floor(Math.random() * 5)
            var resultado_visitante2 = Math.floor(Math.random() * 3)

            if (resultado_mandante2 > resultado_visitante2) {
                Campeonato_dados.forEach(element => {
                    if (element.Nome == times[1][j].Visitante) {
                        element.Pontos += 3
                    }
                })
            }
            else if (resultado_mandante2 < resultado_visitante2) {
                Campeonato_dados.forEach(element => {
                    if (element.Nome == times[0][j].Mandante) {
                        element.Pontos += 3
                    }
                })
            }
            else if (resultado_mandante2 == resultado_visitante2) {

                Campeonato_dados.forEach(element => {
                    if (element.Nome == times[0][j].Mandante) {
                        element.Pontos += 1
                    }
                })
                Campeonato_dados.forEach(element => {
                    if (element.Nome == times[1][j].Visitante) {
                        element.Pontos += 1
                    }
                })

            }

            var row2 = `<tr>
                <td>${times[1][j].Visitante}</td>
                <td>${resultado_mandante2 + ' vs ' + resultado_visitante2}</td>
                <td>${times[0][j].Mandante}</td>
                <td>${times[1][j].Local}</td>
                <td>${i + nRodadas + 1} ${RodadaDuplaVolta[j]}</td>
                </tr>`
            table2.innerHTML += row2
            RodadaDuplaVolta.splice(0, RodadaDuplaVolta.length)

            times.slice(0, times.length)
        }

    }

}


function Campeão() {
    var table = document.getElementById('champion')

    var campeao = {
        'Nome': 'x',
        'Pontos': 0,
        'Empate': {
            'Nome': 'x',
            'Pontos': 0
        }

    }
    Campeonato_dados.forEach(element => {
        var auxiliar = element.Pontos


        if (auxiliar > campeao.Pontos) {
            campeao.Nome = element.Nome,
                campeao.Pontos = auxiliar
        }
        else if(auxiliar == campeao.Pontos) {
            campeao.Empate.Nome = element.Nome
            campeao.Empate.Pontos = auxiliar

        }
        
    });
    
    if(campeao.Pontos == campeao.Empate.Pontos){
        var row = `
                    <h2>Empate: ${campeao.Empate.Nome}, ${campeao.Nome}</h2>
                    <h3>Pontos: ${campeao.Empate.Pontos}</h3>
                    `
        table.innerHTML += row

    }
    else{
    var row = `
                        <h2>Time Campeão: ${campeao.Nome}</h2>
                        <h3>Pontos: ${campeao.Pontos}</h3>
                        `
    table.innerHTML += row
    }
    // console.log(campeao)
}