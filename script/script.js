//Символы, используемые в пароле
const lowercase =
    ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const uppercase =
    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const numbers =
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const symbols =
    ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '{', '}', '?', '~', '-', '='];

//Перемешивание массива перед подготовкой пароля
let makeItRandom = (a, b) => {
    return Math.random() - 0.5;
};

//Случайное число для прохода по массиву с символами
let randomInteger = (min, max) => {
    let random = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(random);
};

//Изменение ползунка и поля ввода значения
let rangeValue = (event) => {
    //Измениение значения поля ввода в зависимости от измениний ползунка
    if (event.target.id === 'range') {
        document.getElementById('rangeValue').value = document.getElementById('range').value;
    }
    //Измениение значения ползунка в зависимости от измениний поля ввода
    if (event.target.id === 'rangeValue') {
        document.getElementById('range').value = document.getElementById('rangeValue').value;
    }
    //Отключение кнопки генерации, если не выбран модификатор
    if (!document.getElementById('checkbox-lowercase').checked
    && !document.getElementById('checkbox-uppercase').checked
    && !document.getElementById('checkbox-numbers').checked
    && !document.getElementById('checkbox-symbols').checked) {
        const btn = document.getElementById('generatePassword');
        btn.innerText = 'Выбери что-то';
        btn.disabled = true;
    } else {
        const btn = document.getElementById('generatePassword');
        btn.disabled = false;
        if (!btn.getAttribute('value')) {
            btn.innerText =  'Генерируй';
        } else {
            btn.innerText =  'Хочу другой';
        }
    }
};
//Генерация пароля
let generatePassword = (event) => {

    if (event.target.id === 'generatePassword') {
        //Проверяет, какой модификатор пароля выбран
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
        //Перемешивание массива
        allSymbolsArray.sort(makeItRandom);
        //Получение длины пароля
        const passwordLength = parseInt(document.getElementById('rangeValue').value);
        //Проверяет, не заданы ли значения длины пароля больше или меньше допустимого, путем редактирования значений (мало ли что)
        if (passwordLength > 64 || passwordLength < 6) {
            console.log('Да кому нужен такой пароль?');
        }
        //Генерация пароля из массива символов
        let newPassword = '';
        for (let i = 0; i < passwordLength; i++) {
            newPassword += allSymbolsArray[randomInteger(0, allSymbolsArray.length - 1)];
        }
        //Создание блока для отображения пароля
        let div = document.createElement("div");
        div.classList.add('password');
        let p = document.createElement('p');
        p.id = 'toCopy';
        p.innerText = newPassword;
        let btn = document.createElement('button');
        btn.classList.add('copy');
        btn.id = 'copy';
        btn.innerText = 'Copy';
        div.appendChild(p);
        div.appendChild(btn);
        div = div.outerHTML;
        document.querySelector('.generatedPassword').innerHTML = div;
        //Меняет значение и текст кнопки, после первой генерации пароля
        if (!document.getElementById('generatePassword').getAttribute('value')) {
            document.getElementById('generatePassword').setAttribute('value', 'clicked');
            document.getElementById('generatePassword').innerText = 'Хочу другой';
        }

    }
    //Копирование в буфер обмена и изменение текста кнопки
    if (event.target.id === 'copy') {

        const inputValue = document.getElementById('toCopy').innerText;
        if (inputValue) {
            navigator.clipboard.writeText(inputValue)
                .then(() => {
                    document.getElementById('copy').innerText = 'Copied';
                })
                .catch(err => {
                    console.log('Что-то пошло не по плану :(', err);
                })
        }

    }

};
//Слушатели событий
document.addEventListener('mousemove', rangeValue);
document.addEventListener('change', rangeValue);
document.addEventListener('click', generatePassword);