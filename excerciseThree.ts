// Есть функция. Она принимает некий объект А, у которого есть поля со значениями
// - или undefined 
// - или объекта с одним полем cvalue, который 
//      либо undefined 
//      либо по типу равный 
//           либо строке, 
//           либо числу, 
//           либо ссылке на объект по своей структуре/описанию подобный описываемому объекту А.
// ...Функция должна вернуть сумму "значений" поля cvalue всех полей объекта, притом,
// - если у очередного элемента поле сvalue - это число, 
//   то просто добавляем это число.
// - если у очередного элемента поле сvalue - это строка, 
//   то просто конвертим строку в число и добавляем.
// - если у очередного элемента поле cvalue - это объект подобный корневому, 
//   то добавляем сумму его полей (привет рекурсия)
// - если мы натыкаемся на undefined, или же если cvalue был строкой которая по факту не являлась адекватным числом - 
//   то тогда значением будет 2022.

// например, для { hello: {cvalue: 1}, world: { cvalue: { yay: { cvalue: "2" } } } } 
// должно вернуться 3

interface AObject {
    [name: string]: { cvalue: undefined | string | number | AObject } | undefined
}

function summ(obj: AObject): number {
    const x = Object.keys(obj).map((key): number => {
        const elem = obj[key]; 
        if (typeof elem === "undefined" || typeof elem?.cvalue === "undefined") return 2022;
        if (typeof elem?.cvalue === 'string') return +elem.cvalue || 2022;
        if (typeof elem?.cvalue !== "number") return summ(elem.cvalue);
        return elem.cvalue
    });
    let sum = 0;
    for (let i = 0; i < x.length; i++) {
        sum += x[i];
    }
    return sum;
}


// Дайте знать @roman про результаты.