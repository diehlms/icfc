document.addEventListener('DOMContentLoaded', function() {
    var mymap = L.map('mapid').setView([45.11, -80.04], 15);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZGllaGxtcyIsImEiOiJjanhmaWFhbTYxMDNtM29wazh4anY3Y2xzIn0.-vBDlIpg4TPa5IL7RLKjbg', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoiZGllaGxtcyIsImEiOiJjanhmaWFhbTYxMDNtM29wazh4anY3Y2xzIn0.-vBDlIpg4TPa5IL7RLKjbg'
    }).addTo(mymap);

    let cabins = [
        {
          "lat": 45.110723,
          "long": -80.050135,
          "family": "Martin/Coyle"
        },
        {
          "lat": 45.111024,
          "long": -80.049722,
          "family": "Scott"
        },
        {
          "lat": 45.110872,
          "long": -80.049423,
          "family": "Douglass"
        },
        {
          "lat": 45.110508,
          "long": -80.049705,
          "family": "Sloan"
        },
        {
          "lat": 45.110061,
          "long": -80.048703,
          "family": "Reed"
        },
        {
          "lat": 45.11015,
          "long": -80.04767,
          "family": "Lawson"
        },
        {
          "lat": 45.109854,
          "long": -80.048091,
          "family": "Rodifer"
        },
        {
          "lat": 45.110015,
          "long": -80.046997,
          "family": "Brown"
        },
        {
          "lat": 45.110058,
          "long": -80.046435,
          "family": "Spyglass"
        },
        {
          "lat": 45.1108,
          "long": -80.045693,
          "family": "Crawford"
        },
        {
          "lat": 45.111136,
          "long": -80.047149,
          "family": "Sloan/McCarthy"
        },
        {
          "lat": 45.111273,
          "long": -80.047193,
          "family": "Marcus/Milligan"
        },
        {
          "lat": 45.111386,
          "long": -80.04716,
          "family": "Jenkins"
        },
        {
          "lat": 45.111461,
          "long": -80.047166,
          "family": "Williams"
        },
        {
          "lat": 45.111914,
          "long": -80.047055,
          "family": "H.C Crawford"
        },
        {
          "lat": 45.112082,
          "long": -80.046601,
          "family": "Scott"
        },
        {
          "lat": 45.112292,
          "long": -80.046607,
          "family": "Reppliar"
        },
        {
          "lat": 45.111964,
          "long": -80.046419,
          "family": "Anderson"
        },
        {
          "lat": 45.111712,
          "long": -80.046059,
          "family": "Kinnear"
        },
        {
          "lat": 45.111578,
          "long": -80.04589,
          "family": "Williams"
        },
        {
          "lat": 45.111516,
          "long": -90.045801,
          "family": "Trulau"
        },
        {
          "lat": 45.111426,
          "long": -80.045679,
          "family": "Casa Chica"
        },
        {
          "lat": 45.111371,
          "long": -80.045568,
          "family": "Huber"
        },
        {
          "lat": 45.111312,
          "long": -80.045496,
          "family": "Yount"
        },
        {
          "lat": 45.111225,
          "long": -80.045428,
          "family": "Raley"
        },
        {
          "lat": 45.111194,
          "long": -80.045252,
          "family": "Sipe"
        },
        {
          "lat": 45.111117,
          "long": -80.045181,
          "family": "Todd"
        },
        {
          "lat": 45.111062,
          "long": -80.045076,
          "family": "Bennett Chapple"
        },
        {
          "lat": 45.111034,
          "long": -80.044954,
          "family": "Chapple"
        },
        {
          "lat": 45.111003,
          "long": -80.04485,
          "family": "Mills"
        },
        {
          "lat": 45.110976,
          "long": -80.044685,
          "family": "Stewart"
        },
        {
          "lat": 45.110949,
          "long": -80.043893,
          "family": "Steffey"
        },
        {
          "lat": 45.110941,
          "long": -80.043744,
          "family": "Heath"
        },
        {
          "lat": 45.111015,
          "long": -80.043574,
          "family": "Wesley Kinnear"
        },
        {
          "lat": 45.11078,
          "long": -80.043627,
          "family": "Winn"
        },
        {
          "lat": 45.110834,
          "long": -80.043398,
          "family": "Wright"
        },
        {
          "lat": 45.110884,
          "long": -80.043209,
          "family": "Porter Scott"
        },
        {
          "lat": 45.110942,
          "long": -80.043074,
          "family": "Applegate"
        },
        {
          "lat": 45.111017,
          "long": -80.042945,
          "family": "Raigeluth"
        },
        {
          "lat": 45.111125,
          "long": -80.042874,
          "family": "Boak"
        },
        {
          "lat": 45.111183,
          "long": -80.042845,
          "family": "Martin"
        },
        {
          "lat": 45.111523,
          "long": -80.04281,
          "family": "Sillers"
        },
        {
          "lat": 45.111668,
          "long": -80.042809,
          "family": "Tranter"
        },
        {
          "lat": 45.11176,
          "long": -80.042774,
          "family": "Miller/Johnson"
        },
        {
          "lat": 45.111826,
          "long": -80.042721,
          "family": "Doctor's"
        },
        {
          "lat": 45.111913,
          "long": -80.042668,
          "family": "Manager's"
        },
        {
          "lat": 45.112721,
          "long": -80.042407,
          "family": "Runnells"
        },
        {
          "lat": 45.112854,
          "long": -80.042218,
          "family": "Fritz"
        },
        {
          "lat": 45.112904,
          "long": -80.041742,
          "family": "Bud Scott"
        },
        {
          "lat": 45.113081,
          "long": -80.04193,
          "family": "Applegate"
        },
        {
          "lat": 45.113485,
          "long": -80.041285,
          "family": "Alexander"
        },
        {
          "lat": 45.111752,
          "long": -80.04115,
          "family": "Caretaker's"
        }
       ]

    cabins.forEach(function(e) {
        L.marker([e["lat"], e["long"]]).addTo(mymap)
        .bindPopup(e["family"] + " cabin \n" + "\n website link")
        .openPopup();
});
});
