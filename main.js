// Il software deve generare casualmente le statistiche di gioco di 100 giocatori di basket per una giornata di campionato.
// In particolare vanno generate per ogni giocatore le seguenti informazioni, facendo attenzione che il numero generato abbia senso:
// - Codice Giocatore Univoco (formato da 3 lettere maiuscole casuali e 3 numeri)
// - Numero di punti fatti
// - Numero di rimbalzi
// - Falli
// - Percentuale di successo per tiri da 2 punti
// - Percentuale di successo per tiri da 3 punti
// Tutti i giocatori verranno visualizzati tramite il loro codice (in una select, una lista, …).
// Una volta cliccato sul codice giocatore, nel corpo principale verranno visualizzate le statistiche corrispondenti

// array di oggetti
var giocatori_basket = [{}];
// oggetto
var giocatore = {};

// per generare i codici univoci
function generatePlayerCode(length_char, length_numbers){
  var numbers = "0123456789";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  var code_player = '';
  for (var i = 0; i < length_char; i++) {
      code_player += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  // aggiungo alle 3 lettere generate 3 numeri
  for (var i = 0; i < length_numbers; i++) {
      code_player += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }
  return code_player;
}

// per generare il numero di punti fatti
function generatePointsMade(min, max){
  var points_made = Math.floor(Math.random() * (max - min + 1)) + min;

  return points_made;
}

// per generare il numero di rimbalzi
function generateRebounds(min, max){
  var number_rebounds = Math.floor(Math.random() * (max - min + 1)) + min;

  return number_rebounds;
}

// per generare il numero di falli commessi
function generateFaults(min, max){
  var number_faults = Math.floor(Math.random() * (max - min + 1)) + min;

  return number_faults;
}

// funzione per generare la percentuale di successo per tiri da 2 punti
function generateTwoPointsPercentage(min, max){
  var percentage_twopoints = parseFloat(Math.min(min + (Math.random() * (max - min)),max).toFixed(1));

  return percentage_twopoints;
}

// funzione per generare la percentuale di successo per tiri da 2 punti
function generateThreePointsPercentage(min, max){
  var percentage_threepoints = parseFloat(Math.min(min + (Math.random() * (max - min)),max).toFixed(1));

  return percentage_threepoints;
}

// creo 100 oggetti giocatore
for (var i = 0; giocatori_basket.length <= 100; i++) {
  giocatore = {
    'codice_giocatore': generatePlayerCode(3, 3),
    'punti_fatti': generatePointsMade(0, 100),
    'numero_rimbalzi': generateRebounds(0, 100),
    'numero_falli': generateFaults(0, 100),
    'percentuale_successo_tiri_da_2_punti': generateTwoPointsPercentage(0, 100),
    'percentuale_successo_tiri_da_3_punti': generateThreePointsPercentage(0, 100),
  };
  // controllo che non ci sia già
  if(!giocatori_basket.includes(giocatore))
  // pusho l'oggetto giocatore nell'array di oggetti giocatori_basket
  giocatori_basket.push(giocatore);
}

// tolgo il primo elemento vuoto dell'array di oggetti
giocatori_basket.shift();

// creo 100 option (e al value assegno l'indice i che mi servirà poi per la variabile d'appoggio)
for (var i = 0; i < giocatori_basket.length; i++) {
  $('select').append('<option value=' + i + '>' + giocatori_basket[i].codice_giocatore + '</option>');
}

// per dare un'occhiata alla console di tutti i giocatori che abbiamo creato
console.log(giocatori_basket);


// quando vado sulla select
$("select").change(function(){
  // prendo il testo dell'option selezionata (in questo caso il codice di 6 cifre)
  giocatori_basket.codice_giocatore = $(this).children("option:selected").text();
  // appoggio in una variabile il value dell'option selezionata (quindi da 0 a 99)
  var appoggio = $(this).children("option:selected").val();

  // visualizzo nell'html
  $('.player_data span.code').text(giocatori_basket.codice_giocatore);
  $('.player_data span.points').text(giocatori_basket[appoggio].punti_fatti);
  $('.player_data span.rebounds').text(giocatori_basket[appoggio].numero_rimbalzi);
  $('.player_data span.faults').text(giocatori_basket[appoggio].numero_falli);
  $('.player_data span.twopoints').text(giocatori_basket[appoggio].percentuale_successo_tiri_da_2_punti);
  $('.player_data span.threepoints').text(giocatori_basket[appoggio].percentuale_successo_tiri_da_3_punti);
  // dopo aver cliccato resetto con l'option di default
  $('select option').first().prop('selected', true);
});
