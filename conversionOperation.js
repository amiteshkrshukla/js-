let score = 33;
console.log(score);
let number = "23";
let ami =" "
console.log(number);
 console.log(typeof score); // number
    console.log(typeof number); // string
    result = Number(number);

    console.log(typeof result); // number
    ami = "anvesh123";
    anam= Number(ami);
    console.log(typeof ami); // string
    console.log(typeof anam); // number
    // NaN => not a number 
    // jab hum kisi aise string ko number me convert karte hai jisme sirf number na ho tab hume NaN milta hai
    // jese ki upar humne anvesh123 ko number me convert karne ki kosis ki toh hume NaN mila kyuki isme kuch aise character the jo number nahi the
    //jab hum null ko number me convert karte hai toh hume 0 milta hai
    let numm = null;
    let numm1 = Number(numm);
    console.log(typeof numm); // object
    console.log(typeof numm1); // number
    console.log(numm1); // 0
    // jab hum undefined ko number me convert karte hai toh hume NaN milta hai
    let nummm = undefined;
    let nummm1= Number(nummm);
    console.log(typeof nummm); // undefined
    console.log(typeof nummm1); // number
    console.log(nummm1); // NaN
    // jab hum boolean ko number me convert karte hai toh true ko 1 aur false ko 0 milta hai
    let bool1 = true;
    let bool2 = false;
    let boolNum1 = Number(bool1);
    let boolNum2 = Number(bool2);
    console.log(typeof bool1); // boolean
    console.log(typeof boolNum1); // number
    console.log(boolNum1); // 1
    console.log(typeof bool2); // boolean
    console.log(typeof boolNum2); // number
    console.log(boolNum2); // 0
    // string to boolean
    let str1 = "hello";
    let str2 = "";
    let boolStr1 = Boolean(str1);
    let boolStr2 = Boolean(str2);
    console.log(typeof str1); // string
    console.log(typeof boolStr1); // boolean
    console.log(boolStr1); // true
    console.log(typeof str2); // string
    console.log(typeof boolStr2); // boolean
    console.log(boolStr2); // false
    // number to boolean
    let num1 = 23;
    let num2 = 0;
    let boolNum3 = Boolean(num1);
    let boolNum4 = Boolean(num2);
    console.log(typeof num1); // number
    console.log(typeof boolNum3); // boolean
    console.log(boolNum3); // true
    console.log(typeof num2); // number
    console.log(typeof boolNum4); // boolean
    console.log(boolNum4); // false
    // boolean to string
    let bool3 = true;
    let bool4 = false;
    let strBool1 = String(bool3);
    let strBool2 = String(bool4);
    console.log(typeof bool3); // boolean
    console.log(typeof strBool1); // string
    console.log(strBool1); // "true"
    console.log(typeof bool4); // boolean
    console.log(typeof strBool2); // string
    console.log(strBool2); // "false"
    // number to string
    let num3 = 45;
    let strNum1 = String(num3);
    console.log(typeof num3); // number
    console.log(typeof strNum1); // string
    console.log(strNum1); // "45"
    // string to string
    let str3 = "amitesh";
    let strStr1 = String(str3);
    console.log(typeof str3); // string
    console.log(typeof strStr1); // string
    console.log(strStr1); // "amitesh"
    // Converting null and undefined to string
    let nullVar = null;
    let undefinedVar = undefined;
    let strNull = String(nullVar);
    let strUndefined = String(undefinedVar);
    console.log(typeof nullVar); // object
    console.log(typeof strNull); // string
    console.log(strNull); // "null"
    console.log(typeof undefinedVar); // undefined
    console.log(typeof strUndefined); // string
    console.log(strUndefined); // "undefined"
    