'use strict'
const getHTML = () => {
    return new Promise((resolve,reject)=>{   
      //  console.log()  
       fetch('https://mypitcrew.in/automotive/products/')
       .then(response => resolve(response.text()))
       .catch((err)=>{console.log('getHTML:Error getting HTML Content'+err);
       resolve(err);})
})};


export default getHTML;