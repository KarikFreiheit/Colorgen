const input = document.getElementById("colorInput");
input.addEventListener("input", function(e){
    console.log(e.target.value);
    let hex = e.target.value;
    let rgb = convertToRGB(hex);
    let theme = "light";
    document.getElementById("selectedColor").style.backgroundColor = convertToHex(rgb);
    let accent = generateAccent(rgb);
    document.getElementById("accentColor").style.backgroundColor = convertToHex(accent);
    let contrast = generateContrast(rgb);
    document.getElementById("contrastColor").style.backgroundColor = convertToHex(contrast);
    let neutral = theme == "light" ? generateLightNeutralColor() : generateDarkNeutralColor();
    document.getElementById("neutralColor").style.backgroundColor = convertToHex(neutral);

});

function shuffle(){
    let theme = "light";
    let rgb = convertToRGB(input.value);
    document.getElementById("selectedColor").style.backgroundColor = convertToHex(rgb);
    let accent = generateAccent(rgb);
    document.getElementById("accentColor").style.backgroundColor = convertToHex(accent);
    let contrast = generateContrast(rgb);
    document.getElementById("contrastColor").style.backgroundColor = convertToHex(contrast);
    let neutral = theme == "light" ? generateLightNeutralColor() : generateDarkNeutralColor();
    document.getElementById("neutralColor").style.backgroundColor = convertToHex(neutral);
}

function random(){
    let rgb = generateRandomColor();
    let theme = "light";
    document.getElementById("selectedColor").style.backgroundColor = convertToHex(rgb);
    let accent = generateAccent(rgb);
    document.getElementById("accentColor").style.backgroundColor = convertToHex(accent);
    let contrast = generateContrast(rgb);
    document.getElementById("contrastColor").style.backgroundColor = convertToHex(contrast);
    let neutral = theme == "light" ? generateLightNeutralColor() : generateDarkNeutralColor();
    document.getElementById("neutralColor").style.backgroundColor = convertToHex(neutral);
}

var similarThreshold = .98;
var disimilarThreshold = .35;

//Generates an accent color when similarity is over similarity threshold
function generateAccent(rgb){
    let randomColor = null;
    let sim = 0;
    do{
        randomColor = generateRandomColor();
        sim = cosineSimilarity(rgb, randomColor)
    }while(sim <= similarThreshold)
    console.log(sim);
    return randomColor;
}

//Generates an contrast color when similarity is under disimlarthreshold
function generateContrast(rgb){
    let randomColor = null;
    let sim = 0;
    do{
        randomColor = generateRandomColor();
        sim = cosineSimilarity(rgb, randomColor)
    }while(sim >= disimilarThreshold)
    console.log(sim);
    return randomColor;
}
function generateRandomColor(){
    const value = Math.floor(Math.random() * 256);
    return [value, value, value];
}
//Generates Light Neutral Color
function generateLightNeutralColor() {
    const value = Math.floor(Math.random() * 56) + 200;
    return [value, value, value];
}

//Generates Light Neutral Color
function generateDarkNeutralColor() {
    const value = Math.floor(Math.random() * 81);
    return [value, value, value];
}

//Helper Functions
const convertToRGB = hex =>
    hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
                ,(m, r, g, b) => '#' + r + r + g + g + b + b)
        .substring(1).match(/.{2}/g)
        .map(x => parseInt(x, 16))

        
const convertToHex = (rgbArray) => '#' + rgbArray
    .map(x => x.toString(16).padStart(2, '0'))
    .join('');
function generateRandomColor() {
    return [Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)];
}


//Generates the similarity between two RGB vectors - 0 to 1, 1 is the same color, 0 is the complete opposite
function cosineSimilarity(vectorA, vectorB){
    let dot = 0, magnitudeA = 0, magnitudeB = 0;
    for(let i = 0 ; i < vectorA.length; i++){

        dot += vectorA[i] * vectorB[i];
        magnitudeA += vectorA[i] ** 2;
        magnitudeB += vectorB[i] ** 2;
    }

   magnitudeA = magnitudeA == 0 ? 1 : magnitudeA;
   magnitudeB = magnitudeB == 0 ? 1 : magnitudeB;

    return dot / (Math.sqrt(magnitudeA) * Math.sqrt(magnitudeB));
}