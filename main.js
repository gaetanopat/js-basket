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

$(document).ready(function(){
  // per la select
  var select_option = $('#template_select').html();
  var template_select_function = Handlebars.compile(select_option);

  // per i dati dei giocatori
  var data_player = $('#template_player_data').html();
  var template_player_function = Handlebars.compile(data_player);

  // array di oggetti
  var giocatori_basket = [];
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
    // oppure ((Math.floor(Math.random() * (1000 - min + 1)) + min) / 10).toFixed(1);
    return percentage_twopoints;
  }

  // funzione per generare la percentuale di successo per tiri da 2 punti
  function generateThreePointsPercentage(min, max){
    var percentage_threepoints = parseFloat(Math.min(min + (Math.random() * (max - min)),max).toFixed(1));
    // oppure ((Math.floor(Math.random() * (1000 - min + 1)) + min) / 10).toFixed(1);
    return percentage_threepoints;
  }

  // creo 100 oggetti giocatore
  for (var i = 0; giocatori_basket.length < 100; i++) {
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

  // creo 100 option (e al value assegno l'indice i che mi servirà poi per la variabile d'appoggio)
  for (var i = 0; i < giocatori_basket.length; i++) {
    var placeholder_select = {
      'value': i,
      'giocatore': giocatori_basket[i].codice_giocatore
    }
    var html_select_option = template_select_function(placeholder_select);
    $('select').append(html_select_option);
  }

  // per dare un'occhiata alla console di tutti i giocatori che abbiamo creato
  console.log(giocatori_basket);

  // quando vado sulla select
  $('select').change(function(){
    // ogni volta che cambio giocatore da visualizzare ripulisco il div player_data
    $('.player_data').empty();
    // appoggio in una variabile il value dell'option selezionata (quindi da 0 a 99)
    var appoggio = $(this).children("option:selected").val();

    var placeholder_giocatore = {
      'codice': giocatori_basket[appoggio].codice_giocatore,
      'punti':  giocatori_basket[appoggio].punti_fatti,
      'rimbalzi': giocatori_basket[appoggio].numero_rimbalzi,
      'falli':  giocatori_basket[appoggio].numero_falli,
      'duepunti': giocatori_basket[appoggio].percentuale_successo_tiri_da_2_punti,
      'trepunti': giocatori_basket[appoggio].percentuale_successo_tiri_da_3_punti
    }
    var html_data_player = template_player_function(placeholder_giocatore);
    $('.player_data').append(html_data_player);

    // dopo aver cliccato resetto con l'option di default
    $('select option').first().prop('selected', true);
  });
});
