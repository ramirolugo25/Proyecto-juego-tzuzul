function menu(){
    console.clear();
    console.log('1_Jugar');
    console.log('2_Instrucciones del juego');
    console.log('3_Proximamente...\n\n');
    console.log('4_Salir');
    let opcion= prompt('Ingrese opcion');

    switch (opcion) {
        case '1':
            {
            menuCardJitsu();
            break;
            }
        case '2': {instrucciones();
            break;}
        case '3': {alert('Proximamente...');
            menu();
            break; }
        case '4':{
            console.clear();
            console.log('Gracias por jugar!');
            break;
        }    
        default:{
            alert('No entiendo su respuesta');
            console.clear();
            menu();
            break;
        }
    }

}

function instrucciones(){
    console.clear();
    console.log('INSTRUCCIONES\n\n');
    console.log('El objetivo del juego es vencer a tus enemigos formando\n un trío de cartas de los mismos elementos o formar un trío de\n elementos diferentes\n');
    console.log('COMBATE\n\n');
    console.log('Cada jugador elige un personaje. A continuacion cada\n jugador elige una carta. Una vez que ambos jugadores han optado por una\n carta, estas se revelan. El ganador queda con la carta para hacer una\n combinacion.\n');
    console.log('Recuerda que:\n -El fuego vence a la nieve\n -La nieve vence al agua\n -El agua vence al fuego\n');
    console.log('CÓMO GANAR\n\n');
    console.log('Hay dos maneras de ganar en Card-Jitsu.\n 1_ Los jugadores tienen que haber ganado 3 cartas del mismo elemento (fuego, agua o nieve).\n 2_ Los jugadores tienen que haber ganado una carta de cada una (fuego, agua o nieve).');
    alert();
    menu();
}


function menuCardJitsu(){
    

    let jugador1 = personajes('Jugador 1');
    let jugador2 = personajes('Jugador 2');
    cardJitsu(jugador1, jugador2);
    
 
}

function personajes(jugador){
    console.clear();
    console.log('1_ Dr Strange');
    console.log('2_ Wanda Maximoff');
    console.log('3_ Wong\n\n');
    console.log('4_ Volver al menu');
    var i= true;
    while(i){
    let opcion = prompt(jugador+' elige un personaje').toLowerCase();

    switch(opcion){
        case '1':
        case 'dr strange':
        case 'dr':
        case 'strange':{
            return 'Dr Strange';
            break;
        }
        case '2':
        case 'wanda maximoff':
        case 'wanda':
        case 'maximoff':{
            return 'Wanda Maximoff';
            break;
        }
        case '3':
        case 'wong':{
            return 'Wong';
        }
        case '4':{
            menu();
            break;
        }
        default:{
            alert('No entiendo su respuesta');
        }
    }
}
}

function cardJitsu(jugador1, jugador2){
    
    let arregloCartas1 = repartirCartas();
    let arregloCartas2 = repartirCartas();
    let ganadasJugador1 = [];
    let ganadasJugador2 = [];
    var finJuego = false;
    var ganador;
    do {
        
    console.clear();
    mostrarCartasGanadas(ganadasJugador1, ganadasJugador2);
    let carta1 = jugada(jugador1, arregloCartas1);
    console.clear();
    mostrarCartasGanadas(ganadasJugador2, ganadasJugador1);
    let carta2 = jugada(jugador2, arregloCartas2, ganadasJugador2);
    console.clear();
    let resultado = comparacion(arregloCartas1[carta1-1], arregloCartas2[carta2-1]);
    console.log(jugador1+' tira: '+ arregloCartas1[carta1-1]);
    console.log(jugador2+' tira: '+ arregloCartas2[carta2-1]);
    if(resultado === 'Carta 1'){
        alert('Ronda ganada por '+ jugador1);
        ganadasJugador1.push(arregloCartas1[carta1-1]);
        finJuego = condicion(ganadasJugador1);
        if (finJuego){
            ganador = jugador1;
        }
    }
    else if(resultado === 'Carta 2'){
        alert('Ronda ganada por '+ jugador2);
        ganadasJugador2.push(arregloCartas2[carta2-1]);
        finJuego = condicion(ganadasJugador2);
        if (finJuego){
            ganador = jugador2;
        }
    }
    else{
        alert('Ronda empatada');
    }
    arregloCartas1[carta1-1] = devolverCarta();
    arregloCartas2[carta2-1] = devolverCarta();
    
    } while (!finJuego);

    console.clear();
    alert('El ganador del juego es '+ ganador);
    menu();

}

function repartirCartas(){
    const hechizos={
        '1':'Fuego',
        '2':'Nieve',
        '3':'Agua'
    }

    let arregloCartas = [];
    for(let i=0; i<5;i++){
        arregloCartas.push(hechizos[String(Math.floor(Math.random() * 3)+1)]); 
    }
    return arregloCartas;
}




function jugada(jugador, cartas){

    console.log(jugador+' tus cartas son: ');
    for(let i=0; i<cartas.length;i++){
        console.log(i+1 +' _ '+ cartas[i]);
    }

    do {
        var carta = Number(prompt('Elige una carta para tirar'));
        if(carta>=1 && carta<=5){
            break;
        }
        else{
            alert('No entendi su respuesta tienes que eleigr del 1 al 5');
        }
    } while (true);
    
    return carta;
}

function comparacion(carta1,carta2){
   let ganador;

    if (carta1 === carta2){
       ganador = 'Empate';
   }
   else{
    switch (carta1) {
        case 'Agua':{
            if (carta2 === 'Fuego'){
                ganador = 'Carta 1';
            }
            else{
                ganador = 'Carta 2';
            }
            break;    
        }
        case 'Fuego':{
            if (carta2 === 'Nieve'){
                ganador = 'Carta 1';
            }
            else{
                ganador = 'Carta 2';
            }
            break;
        }
        case 'Nieve':{
            if(carta2 === 'Agua'){
                ganador = 'Carta 1';
            }
            else{
                ganador = 'Carta 2';
            }
            break;
        }    
            
    }
    }
    return ganador;

}

function condicion(arreglo){
    let agua = 0;
    let fuego = 0;
    let nieve = 0;
    let rta = false;

    for(let i=0; i<arreglo.length; i++){
        if (arreglo[i] === 'Agua'){
            agua++;
        }
        if(arreglo[i] === 'Fuego'){
            fuego ++;
        }
        if(arreglo[i] === 'Nieve'){
            nieve ++;
        }
    }

    if(agua === 3 || fuego === 3 || nieve === 3){
        rta = true;
    }
    if(agua >0 && fuego >0 && nieve > 0){
        rta = true;
    }
    return rta;
}

function devolverCarta(){
    const hechizos={
        '1':'Fuego',
        '2':'Nieve',
        '3':'Agua'
    }
 
    return hechizos[String(Math.floor(Math.random() * 3)+1)];
}

function mostrarCartasGanadas(ganadas,ganadas2){
    let agua = 0;
    let fuego = 0;
    let nieve = 0;
    let agua2 = 0;
    let fuego2 = 0;
    let nieve2 = 0;

    for(let i=0; i<ganadas.length;i++){
        if(ganadas[i] === 'Agua'){
            agua++;
        }
        if(ganadas[i] === 'Fuego'){
            fuego++;
        }
        if(ganadas[i] === 'Nieve'){
            nieve++;
        }
    }
    for(let i=0; i<ganadas2.length;i++){
        if(ganadas2[i] === 'Agua'){
            agua2++;
        }
        if(ganadas2[i] === 'Fuego'){
            fuego2++;
        }
        if(ganadas2[i] === 'Nieve'){
            nieve2++;
        }
    }
    console.log('Tu cantidad de cartas ganadas son: ');
    console.log('Agua: '+ agua);
    console.log('Fuego: '+ fuego);
    console.log('Nieve: '+ nieve);

    console.log('La cantidad de cartas ganadas de tu rival son:');
    console.log('Agua: '+ agua2);
    console.log('Fuego: '+ fuego2);
    console.log('Nieve: '+ nieve2);


}

menu();

