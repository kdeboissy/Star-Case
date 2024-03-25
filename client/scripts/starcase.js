const nameDom = document.getElementById('username')
const images = {};

function preload() {
    for (var i = 0; i < arguments.length; i++) {
        images[preload.arguments[i]] = new Image();
        images[preload.arguments[i]].src = preload.arguments[i];
    }
}

preload(
    "/assets/box0.png",
    "/assets/box1.png",
    "/assets/box2.png",
    "/assets/box3.png",
    "/assets/rondoudou/Rondoudou.jpg",
    "/assets/HUGOOO.jpg",
    "/assets/Aymeric.jpg",
    "/assets/rondoudou/RondoudouShiny.jpg",
    "/assets/pain_au_chocolat.png",
    "/assets/Stars/BrumeCeleste.jpg",
    "/assets/Stars/MeteoritesCeleste.jpg",
    "/assets/Stars/CristauxGalactique.jpg",
    "/assets/Stars/ArcencielAstral.jpg",
    "/assets/Stars/BullePlanetaire.jpg",
    "/assets/Stars/RayonStellaire.jpg",
    "/assets/Stars/VoieLacteeEnBocal.jpg",
    "/assets/rondoudou/angel_rondoudou.jpg",
    "/assets/rondoudou/demon_rondoudou.jpg",
    "/assets/rondoudou/maxican_rondoudou.jpg",
    "/assets/rondoudou/rondoudou_francais.jpg",
    "/assets/rondoudou/angry_rondoudou.jpg",
    "/assets/rondoudou/russian_rondoudou.jpg",
    "/assets/rondoudou/santa_rondoudou.jpg",
    "/assets/rondoudou/singing_rondoudou.jpg",
    "/assets/rondoudou/sleeping_rondoudou.jpg",
    "/assets/rondoudou/english_rondoudou.jpg",
    "/assets/Pastas/PastaBoxOriginelle.jpg",
    "/assets/Pastas/PastaBox01.jpg",
    "/assets/Pastas/PastaBox02.jpg",
    "/assets/Pastas/PastaBox03.jpg",
    "/assets/Pastas/PastaBox04.jpg",
    "/assets/Pastas/PastaBox05.jpg",
    "/assets/Pastas/PastaBox06.jpg",
    "/assets/Pastas/PastaBox07.jpg",
    "/assets/Pastas/PastaBox08.jpg",
    "/assets/Pastas/PastaBox09.jpg",
    "/assets/Pastas/PastaBox10.jpg",
    "/assets/Pastas/PastaBox11.jpg",
    "/assets/gardien_bleu_d'epitech.png",
    "/assets/gardien_rouge_d'epitech.png",
    "/assets/salles/mordor.png",
    "/assets/LaChevelureDAymeric.png",
    "/assets/langages/bash.png",
    "/assets/langages/c.png",
    "/assets/langages/cpp.png",
    "/assets/langages/asm.png",
    "/assets/langages/haskell.png",
    "/assets/langages/python.png",
    "/assets/programs/tcsh.png",
    "/assets/programs/valgrind.png",
    "/assets/states/segmentationfault.png",
    "/assets/programs/docker.png",
    "/assets/salles/comte.png",
    "/assets/salles/foyer.png",
    "/assets/salles/hub_innovation.png"
)

function logout()
{
    localStorage.removeItem("authToken");
    window.location.href = '/';
}

if (!localStorage.getItem("username")) {
    var interval = setInterval(function () {
        if (localStorage.getItem("username")) {
            nameDom.innerText = localStorage.getItem('username');
            clearInterval(interval);
        }
    }, 200);
}

nameDom.innerText = localStorage.getItem('username');
