var rounds = 6;
var round = 1;
var points = 10;
var high_score = 0;

var round_text = document.querySelector(".round");
var btn_1_bg = document.querySelector(".btn_1");
var btn_2_bg = document.querySelector(".btn_2");
var btn_3_bg = document.querySelector(".btn_3");
var btn_4_bg = document.querySelector(".btn_4");
var btn_5_bg = document.querySelector(".btn_5");
var btn_6_bg = document.querySelector(".btn_6");

var btn_list = [btn_1_bg, btn_2_bg, btn_3_bg, btn_4_bg, btn_5_bg, btn_6_bg];

var palaute_text = document.querySelector(".palaute_text");
var points_text = document.querySelector(".points");

//sekoitusfunktio
function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }

function start(){
    //Arvot palautetaan default muotoon
    palaute_text.innerHTML = "Wrong/Correct";
    palaute_text.style.color = "black";
    points_text.innerHTML = "Points: " + points;

    //tallennetaan rgb_value_text muuttujaan
    var rgb_value_text = document.querySelector(".rgb_value");

    //muodostetaan random väri
    let r = Math.floor((Math.random() * 255) + 0);
    let g = Math.floor((Math.random() * 255) + 0);
    let b = Math.floor((Math.random() * 255) + 0);
    random_RGB_value_correct = "rgb("+r+", "+b+", "+g+")";

    //laitetaan oikean värin rgb-muoto näytölle
    rgb_value_text.innerHTML = random_RGB_value_correct;

    //muodostetaan lista jossa on kaikki oikeat ja väärät värit
    var list = [random_RGB_value_correct];

    //muodostetaan ja sijoitetaan listaan 5 rändom väriä
    for(let i=0;i<5;i++){
        let r = Math.floor((Math.random() * 255) + 0)
        let g = Math.floor((Math.random() * 255) + 0);
        let b = Math.floor((Math.random() * 255) + 0);

        random_RGB_value_wrong = "rgb("+r+", "+b+", "+g+")";
        list.push(random_RGB_value_wrong);
    }

    //sekoitetaan lista
    shuffle(list);

    //laitetaan listan värit näytölle
    for (let i = 0;i<list.length;i++){
        btn_list[i].style.backgroundColor = list[i];
    }
}

//muodostetaan yhtälö joka tarkistaa onko pelaajan arvaus oikein
function color_guess(x){
    let color = btn_list[x-1].style.backgroundColor
    //tarkistetaan onko pelaajan vastaus oikein
    if (color === random_RGB_value_correct){
        console.log("Correct");
        round++;
        round_text.innerHTML = "Round " + round + "/6"
        start();
        palaute_text.innerHTML = "Correct";
        palaute_text.style.color = "lightgreen"
        points++;
        points_text.innerHTML = "Points: " + points;

        //tarkistetaan onko peli loppu
        if (round == rounds){
            //tarkistetaan onko tehty uusi ennätys
            if (points > high_score){
                palaute_text.innerHTML = "U won with " + points + " points and got a new high_score";
                high_score = points;
                console.log(high_score);
            }else{
                palaute_text.innerHTML = "U won with " + points + " points";
            }
            //vaihetaan nappien väri valkoiseksi
            for(let i = 0;i<6;i++){
                btn_list[i].style.backgroundColor = "rgb(255,255,255)";
            }

            palaute_text.innerHTML = "U won with " + points + " points";
            console.log("Round ended")
    }
    }
    //tarkistetaan onko pelaajan vastaus väärin
    else{
        console.log("Wrong")
        palaute_text.innerHTML = "Wrong, try again!";
        palaute_text.style.color = "red"
        points--;
        points_text.innerHTML = "Points: " + points;

        //tarkistetaan onko pelaaja hävinnyt pelin
        if(points < 1){
            palaute_text.innerHTML = "You lost, press start to begin new round";
            palaute_text.style.color = "red";
            console.log("U lost");

            //muutetaan kaikki napit valkoiseksi
            for(let i = 0;i<6;i++){
                btn_list[i].style.backgroundColor = "rgb(255,255,255)";
            }
        }
    }
}