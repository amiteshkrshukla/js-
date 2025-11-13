let a= 33;
let b = -a;
console.log(a,b);
console.log(typeof a, typeof b);
// jab ek number hota hai uske bich mein ** baar uss hota hai uska mtlb a ki power b
let c = 2;
let d = 3;
let e = c ** d;
console.log(e); // 8
let f ="ami";
let g = -f;
 // NaN value aayega kyuki hum string ko negative me convert karne ki kosis kar rahe hai jo possible nahi hai

 let h = +"33"; // ye ek tarika hai string ko number me convert karne ka
    console.log(typeof h); // number
    
    let i = +"ami";
    // NaN value aayega kyuki hum string ko number me convert karne ki kosis kar rahe hai jo possible nahi hai
    console.log(typeof i); // number
     let j= "amitesh";
     let k = " shukla";
        let l = j + k; // string concatenation
     // amitesh shukla 
     //console.log(1+2) 3
     // console.log("1"+"2") 12
     // console.log("ami"+2) ami2
     // console.log("1"+2+3) 123
     // console.log(1+2+"3") 33
     // jab + operator ke andar ek string ho toh wo concatenation kar deta hai
     // jab + operator ke andar dono number ho toh wo addition kar deta hai
     // iska mtlb ye hai ki + operator ka behavior uske operands pe depend karta hai
     // console.log(+"true") // NaN
     // console.log(+"") // 0
    
     // console.log(+"33ami") // NaN
     