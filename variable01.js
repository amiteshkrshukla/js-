const accountId = 12345;
let accountName="amitesh shukla";
var accountPassword ="amitesh@113";
accountCity = "kanpur";
//accountId=12333;bacuse when i use const i cant reassign the value
accountName="atulesh";
accountPassword="atulesh@113";
accountCity="lucknow";
let accountState;
console.log(accountId,accountName,accountPassword,accountCity,accountState);

// sirf const ka hi value change nahi hota hai baki let ,var aur bina kuch likhe wale variable ka value change ho jata hai
/*
var ka use kam kare kyuki iska scope pura function ka hota hai aur ye global bhi ho jata hai agar function ke bahar declare karte hain to
let ka use kare kyuki iska scope block ka hota hai aur ye global nahi hota hai agar function ke bahar declare karte hain to

const ka use kare kyuki iska scope block ka hota hai aur ye global nahi hota hai agar function ke bahar declare karte hain to
*/ 
/* jab hum variable ki value declear nhi karte hai toh console ke baad sirf undefined likh kar aa jata hai */