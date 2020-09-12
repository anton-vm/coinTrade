console.log("Hello");

const axios = require ('axios')
const fs = require ('fs')
const path = require('path')



// ________https://www.bithumb.pro/en-us
// https://github.com/bithumb-pro/bithumb.pro-official-api-docs/blob/master/rest-api.md





const bitHumpSymbol = async () => {
    const bitHumpURL = "https://global-openapi.bithumb.pro/openapi/v1/spot/ticker?symbol=ALL"
    const startTime = Date.now()
    let arrayOfSymbols = []
    try {
        const info = await axios.get(bitHumpURL)
        const array = info.data.data
        array.map(el => {
            const newObject = {
                symbol: "",
                price: ""
            }
            newObject.symbol = el.s;
            newObject.price = el.c;
            arrayOfSymbols.push(newObject)
        })    

    } catch (e) {
        console.log("Error");
    }

    return arrayOfSymbols
};



async function circleInside (el) {
    let finalbitHumpArray = []  
    const bitHumpUrl = "https://global-openapi.bithumb.pro/openapi/v1/spot/orderBook?symbol="
    console.log(el.symbol);
    const fullObject = {
        symbol: el.symbol,
        price: el.price,
        bid: "",
        ask: ""
    }  
const link = bitHumpUrl+el.symbol
try {
    const bidAskData = await axios.get(link)
    const responce = bidAskData.data.data
    fullObject.bid = responce.b;
    fullObject.ask = responce.s

} catch (e) {
    console.log("error");
}
return fullObject
};

const bitHumpBidAsk = async (arrayOfSymbols) => {

    const promices = arrayOfSymbols.map(circleInside)
   const result = await Promise.all(promices)
   return result
}

const writeResult = (array) => {
    const dataPath = path.join("./db/", "data.json");
    fs.writeFile(dataPath, JSON.stringify(array), "utf-8", function (err) {
        if (err) throw err
        console.log("Contact is added");
    })
}

const Start = async() => {
    const startTime = Date.now()
    const data = await bitHumpSymbol()
    const finalArray = await bitHumpBidAsk(data);
    
//    console.log("test2", finalArray);
   writeResult(finalArray)
   const endTime = Date.now()
   console.log('processing time', endTime-startTime);
}


Start()




// _____another APIs

// _____https://www.coinbene.com/
// https://github.com/Coinbene/API-SPOT-v2-Documents/blob/master/openapi-spot-rest-en.md

// const coinBeneURL = 'http://openapi-exchange.coinbene.com/api/exchange/v2/market/ticker/list'

// const coinBeneData = async () => {
//     try {
//         const info = await axios.get(coinBeneURL)
//         console.log(info.data);

//     } catch (e) {
//         console.log("Error");
//     }
// }

// coinBeneData()



// _____dcoin________
// https://github.com/dcoinapi/openapi/wiki

// const dcoinURL = "https://openapi.dcoin.com/open/api/market"

// const dcoinData = async () => {
//     try {
//         const info = await axios.get(dcoinURL)
//         console.log(info.data);

//     } catch (e) {
//         console.log("Error");
//     }
// }

// dcoinData()