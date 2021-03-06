
// Globalni promenne
var svg = document.getElementById("svgcanvas");
var zabrana1 = svg.getElementById("zabrana1");
var zabrana2 = svg.getElementById("zabrana2");
var civka = svg.getElementById("civka");
var mic = svg.getElementById("mic");
var zacatek = false;
var ukazka = false;
var cara = svg.getElementById("cara");
var cara1 = svg.getElementById("cara1");
var uhel_mice = 0;

REX.HMI.init = function () {
            
                // THIS EXAMPLE IS BASED ON THE "PIDU - Simple PID controller" EXECUTIVE
            
                // Set different WS server IP (Default: host/rex)
                REX.HMI.setTargetUrl('192.168.1.102:8008');
            
                // Set refresh rate (Default: 500 ms)
                REX.HMI.setRefreshRate(100);
            
            
                //Add read items (alias,cstring,type)
                // alias - UNIQE local alias of the connection string (no spaces, asci signs)
                // cstring - connection string
                // write - true || false
                REX.HMI.addItem({alias:"UHEL_MICE",cstring:"mic_SMC.x_to_uhel:Fi2_"});
                REX.HMI.addItem({alias:"RYCHLOST_MOTORU",cstring:"mic_SMC.GAIN_RPS:y"}); // uprava od ucitele
                //REX.HMI.addItem({alias:"START",cstring:"mic_SMC.CNB_EN:YCN", write:true});
                REX.HMI.addItem({alias:"START_VYVAZOVANI",cstring:"mic_SMC.CNB_MAN:YCN", write:true});
                REX.HMI.addItem({alias:"UHEL_MOTORU",cstring:"mic_SMC.ENCPVE:pos"}); // uprava od ucitele
                REX.HMI.addItem({alias:"MIC_NA_CIVCE",cstring:"mic_SMC.x_to_uhel:O_SATUR1"});
                REX.HMI.addItem({alias:"DEMO_REZIM",cstring:"mic_SMC.CNB_DEMO:YCN", write:true});
            
                // Get item with given alias and assign read event
                REX.HMI.$i("UHEL_MICE").on("read", function (itm) {
                    // Select element using jQuery library and set read value and round to two decimal places 
                    $('#UHEL_MICE').val(itm.getValue().toFixed(2));
                    uhel_mice = itm.getValue();
                    pohyb(uhel_mice);
                });

                REX.HMI.$i("RYCHLOST_MOTORU").on("read", function (itm) {
                    $('#RYCHLOST_MOTORU').val(itm.getValue().toFixed(2));
                    var rychlost_motoru = itm.getValue();
                });

                //REX.HMI.$i("START_VYVAZOVANI").on("read", function (itm) {
                    
                //});

                REX.HMI.$i("UHEL_MOTORU").on("read", function (itm) {
                    $('#UHEL_MOTORU').val(itm.getValue().toFixed(2));
                    var uhel_motoru = itm.getValue();
                    otoceni(uhel_motoru * (-57.296));
                });

                REX.HMI.$i("MIC_NA_CIVCE").on("read", function (itm) {
                    var mic_na_civce = itm.getValue();
                    if (mic_na_civce == 1){
                    mic.style.visibility = "hidden";
                    }
                    else{
                    mic.style.visibility = "visible";
                    }
                });

                //REX.HMI.$i("DEMO_REZIM").on("read", function (itm) {
                   // REX.HMI.$i("DEMO_REZIM").write(ukazka);
                //});


function pohyb(angle) {

        // Rotace elementu podle stredu civky
        var angle1 = angle * (-57.296) 
        document.getElementById("svgcanvas").getElementById("groupa").setAttributeNS(null, "transform","rotate(" + angle1 + "," + 500 + "," + 400 + ")");
        //cara1.setAttributeNS(null, "transform","rotate(" + angle1 + "," + 500 + "," + 400 + ")");
        
    }

function otoceni(angle) {

        // Rotace elementu podle stredu civky
        cara.setAttributeNS(null, "transform","rotate(" + angle + "," + 500 + "," + 400 + ")");
        cara1.setAttributeNS(null, "transform","rotate(" + -angle + "," + 500 + ","+ 150 + ")");
    }
            };

demo = function () {
    
    if (ukazka == true){
        ukazka = false;
        console.log("false");
    }else{
        ukazka = true;
        console.log("true");
    }
    setColor2("tlacitkoDemo")
    REX.HMI.$i("DEMO_REZIM").write(ukazka);
};

spustit = function () {
    if (zacatek == true){
        zacatek = false;
        console.log("false");

    }else{
        zacatek = true;
        console.log("true");
    }
    console.log("Jsem ve funkci spustit");
    setColor1("tlacitkoStart");
    //REX.HMI.$i("START").write(zacatek);
    REX.HMI.$i("START_VYVAZOVANI").write(zacatek);
};

function setColor1(btn){
    console.log("Jsem ve funkci color");
    var property = document.getElementById(btn);
    if (zacatek == true){
        property.style.backgroundColor = "#7FFF00"      
    }
    else{
        property.style.backgroundColor = "#FF0000"
    }
}
function setColor2(btn){
    console.log("Jsem ve funkci color");
    var property = document.getElementById(btn);
    if (ukazka == true){
        property.style.backgroundColor = "#7FFF00"      
    }
    else{
        property.style.backgroundColor = "#FF0000"
    }
}
