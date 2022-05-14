const inString = `One: 'Hi Mary.' Two: 'Oh, hi.'
One: 'How are you doing?'
Two: 'I'm doing alright. How about you?'
One: 'Not too bad. The weather is great isn't it?'
Two: 'Yes. It's absolutely beautiful today.'
One: 'I wish it was like this more frequently.'
Two: 'Me too.'
One: 'So where are you going now?'
Two: 'I'm going to meet a friend of mine at the department store'
One: 'Going to do a little shopping?'
Two: 'Yeah, I have to buy some presents for my parents.'
One: 'What's the occasion?'
Two: 'It's their anniversary.'
One: 'That's great. Well, you better get going. You don't want to be late.'
Two: 'I'll see you next time.'
One: 'Sure.' Bye.'`;

/*
1. Дан большой текст, в котором для оформления прямой речи используются
одинарные кавычки. Придумать шаблон, который заменяет одинарные кавычки на двойные.
 */
console.log(inString.replace(/'/g, '"'));

/*
2. Улучшить шаблон так, чтобы в конструкциях типа aren't одинарная
кавычка не заменялась на двойную.
 */
console.log(inString.replace(/\B'/g, '"'));

/*
3. Создать форму обратной связи с полями: Имя, Телефон, E-mail, текст, кнопка Отправить.
При нажатии на кнопку Отправить произвести валидацию полей следующим образом:
a. Имя содержит только буквы.
b. Телефон имеет вид +7(000)000-0000.
c. E-mail имеет вид mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru.
d. Текст произвольный.
e. Если одно из полей не прошло валидацию, необходимо выделить это поле красной рамкой
и сообщить пользователю об ошибке.
 */
const errorsBlock = document.querySelector(".errors");
const name = document.querySelector(".name");
const phone = document.querySelector(".phone");
const email = document.querySelector(".email");
document.querySelector(".send-form").addEventListener("click",
    () => {
        let sendTrigger = true;
        name.classList.remove("error-input");
        phone.classList.remove("error-input");
        email.classList.remove("error-input");
        errorsBlock.innerHTML = "";
        errorsBlock.style.color = "red";
        if(!RegExp(/^[a-z]+$/, "i").test(name.value)) {
            errorsBlock.insertAdjacentHTML("beforeend", "Неверное имя<br>");
            name.classList.add("error-input");
            sendTrigger = false;
        }
        if(!RegExp(/\+\d\(\d{3}\)\d{3}-\d{4}/, "i").test(phone.value)) {
            errorsBlock.insertAdjacentHTML("beforeend", "Неверный телефон<br>");
            phone.classList.add("error-input");
            sendTrigger = false;
        }
        if(!RegExp(/^[a-z0-9_-]+@[a-z0-9-]+\.[a-z]+$/, "i").test(email.value)) {
            errorsBlock.insertAdjacentHTML("beforeend", "Неверный email<br>");
            email.classList.add("error-input");
            sendTrigger = false;
        }

        if (sendTrigger === true) {
            errorsBlock.style.color = "green";
            errorsBlock.insertAdjacentHTML("beforeend", "Форма отправлена");
        }
    })