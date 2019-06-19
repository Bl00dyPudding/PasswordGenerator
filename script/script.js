const lowercase =
    ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const uppercase =
    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const numbers =
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const symbols =
    ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '{', '}', '?', '~', '-', '='];

let makeItRandom = (a, b) => {
    return Math.random() - 0.5;
};

let randomInteger = (min, max) => {
    let random = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(random);
};

let rangeValue = (event) => {
    if (event.target.id === 'range') {
        document.getElementById('rangeValue').value = document.getElementById('range').value;
    }
    if (event.target.id === 'rangeValue') {
        document.getElementById('range').value = document.getElementById('rangeValue').value;
    }
};

let generatePassword = (event) => {

    if (event.target.id === 'generatePassword') {

        let allSymbolsArray = [];
        if (document.getElementById('checkbox-lowercase').checked) {
            allSymbolsArray = allSymbolsArray.concat(lowercase);
        }
        if (document.getElementById('checkbox-uppercase').checked) {
            allSymbolsArray = allSymbolsArray.concat(uppercase);
        }
        if (document.getElementById('checkbox-numbers').checked) {
            allSymbolsArray = allSymbolsArray.concat(numbers);
        }
        if (document.getElementById('checkbox-symbols').checked) {
            allSymbolsArray = allSymbolsArray.concat(symbols);
        }
        if (allSymbolsArray.length === 0) {
            console.log('Выбери что-то');
        } else {
            allSymbolsArray.sort(makeItRandom);
            let passwordLength = parseInt(document.getElementById('rangeValue').value);
            if (passwordLength > 64 || passwordLength < 6) {
                console.log('Зачем ты так?');
            }

            let newPassword = '';
            for (let i = 0; i < passwordLength; i++) {
                newPassword += allSymbolsArray[randomInteger(0, allSymbolsArray.length - 1)];
            }

            if (document.querySelector('.password') === true) {
                document.querySelector('.generatedPassword').innerHTML = '';
            }

            let div = document.createElement("div");
            div.classList.add('password');

            let p = document.createElement('p');
            p.innerText = newPassword;

            let btn = document.createElement('button');
            btn.classList.add('copy');
            btn.innerText = 'copy';

            div.appendChild(p);
            div.appendChild(btn);
            div = div.outerHTML;
            document.querySelector('.generatedPassword').innerHTML = div;

            if (!document.getElementById('generatePassword').getAttribute('value')) {
                document.getElementById('generatePassword').setAttribute('value', 'clicked');
                document.getElementById('generatePassword').innerText = 'Хочу другой';
            }

        }

    }

};

document.addEventListener('mousemove', rangeValue);
document.addEventListener('change', rangeValue);
document.addEventListener('click', generatePassword);
