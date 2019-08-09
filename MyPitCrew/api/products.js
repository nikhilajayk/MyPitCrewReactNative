'use strict'
import _ from "lodash"
import getHTML from "./scraper"

export const contains =({name,category},query) => {
    if(name.toLowerCase().includes(query) || category.toLowerCase().includes(query)){
        return true;
    }
    return false;
}



export const getProductsFromFile = (limit=200,query="")=>{
    console.log('getting products')
    return new Promise((resolve,reject) => {
        if(query.length===0){
            resolve(_.take(products,limit));

        }else{
            const formattedQuery = query.toLowerCase();
            const results = _.filter(products,product => {
                return contains(product,formattedQuery);
            });
            resolve(_.take(results,limit));
        }
    });

};



function _getProductCategories(htmlContent){
    return new Promise((resolve,reject)=>{  
        try{
            console.log("In Product Categories...");
            let content  = htmlContent.split('style=""><li class="ult_tab_li')[1].split('</ul>')[0];
            let categories = content.split('class="ult-span-text ult-responsive" style="">');
            var allCategories = [];
            categories.forEach(function(element) {
             allCategories.push(element.split('</span>')[0]);
           });
           allCategories.shift();
           let data = [];
           data.push(htmlContent);
           data.push(allCategories)
           resolve(data);
        }
        catch(err)
        {
            console.log('_getProductCategories:Error in retrieving product categories : '+ err)
        }
    });
}

function _getProductNames(data){
    
    return new Promise((resolve,reject)=>{  
        try{   

        let htmlContent = data[0];
        let productCategories = data[1];
        
        let content  = htmlContent.split('ult_tabitemname');
        content.shift();
        // the last part of content has repeat values. Eliminate those
        content[content.length-1]= content[content.length-1].split('<div class="ult_acord">')[0];
        let products=[];
        let productJSON={};

        for(let i=0;i<content.length;i++)
        {   
            let productItem =  content[i].split('<a itemprop="url" href="');
             productItem.slice(1).forEach(function(innerElement) {
                 let item = {}
                 let hyperlink = innerElement.split('">')[0]; 
                 let category =  productCategories[i].replace("&#215;","x").replace("<br>"," ").replace("&amp;","&").replace("<span>"," ").replace("&#038;","&"); 
                 let name = innerElement.split('<div style="text-align: center;">');
                 item["name"] =  name[1].split('</span>')[0].replace("&#215;","x").replace("<br>"," ").replace("&amp;","&").replace("<span>"," ").replace("&#038;","&"); 
                 item ["category"] = category;
                 item["hyperlink"] = hyperlink;
                products.push(item);              
            });
        }
        productJSON =products;
       resolve(productJSON);
    }
    catch(err)
    {
        console.log('_getProductNames:Error in retrieving product names : '+ err)
    }
     });
 }

 


export const getProducts = () => {
    return new Promise((resolve,reject)=>{
    console.log('getProducts');//:Error getting products
    getHTML().then((htmlContent)=>_getProductCategories(htmlContent)   
    .then((data)=>_getProductNames(data)))
    .then(response => resolve(response))
    .catch((err)=>{console.log('getProducts:Error getting products'+err);
    resolve(err);})
    }
)};

export default getProducts;