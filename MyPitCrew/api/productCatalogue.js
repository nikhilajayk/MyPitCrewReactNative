'use strict'
import getHTML from "./scraper"

const getCatalogue = () =>{
    return new Promise((resolve,reject)=>{
        getHTML()
        .then((htmlContent)=>_getPDFLink(htmlContent))
        .then((downloadLink)=> resolve(downloadLink))
        .catch((err)=>{console.log('getCatalogue:Error getting product catalogue'+err);
        resolve(err);})
    }
)};

function _getPDFLink(htmlContent){
    return new Promise((resolve,reject)=>{          
        try{
            let pdfLink  = htmlContent.split('ubtn-normal acco-btn" href = "')[1].split('" target')[0];       
            resolve(pdfLink);
        }
        catch(err)
        {
            console.log('Error in retrieving product categories : '+ err)
        }
    });
}

export default getCatalogue;