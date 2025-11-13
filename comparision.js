// console.log(2>1); // true
// console.log(2<1); // false
    console.log("2">1);
    console.log("2"<1);
    console.log("01"==1);
    console.log("02">1);
    console.log("02">=1);
    console.log("0a"==0);
    console.log(null>0);
    console.log(null>=0);
   // console.log(undefined==0); false
   //  console.log(null==0); false
   //  console.log("2"===2); false
   // console.log("2"==="two"); false
   // console.log(NaN==NaN); false
   /* the reason is that an equality check == and comparisons ><>=<= work differently 
   comparisons converts null to a number , treating it as 0. thats way null>=0 is true
   */
   // console.log(NaN===NaN); false