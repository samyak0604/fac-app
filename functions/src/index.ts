// eslint-disable-next-line @typescript-eslint/no-unused-vars
/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
// ignore not used errors
import {onRequest} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import * as admin from "firebase-admin";
import yahooFinance from "yahoo-finance2";
import * as functions from "firebase-functions";
admin.initializeApp();
// Start writing functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", {structuredData: true});
  response.set("Access-Control-Allow-Origin", "*")
  response.send("Hello from Firebase!");
});

export const addStockDataToDB = onRequest(async (request, response) => {
    console.log("request", request.query.stockname)
    // store query as a string
    var stockname = "";
    if(request.query.stockname){
        stockname = request.query.stockname as string;
    }
    const queryOptions = { period1: '2023-06-01',};
    var result = await yahooFinance.historical(stockname, queryOptions);
    console.log("raw result", result);
    result = JSON.parse(JSON.stringify(result));
    console.log(typeof result);
    logger.info("Hello logs!", {structuredData: true});
    response.set("Access-Control-Allow-Origin", "*")
    const db = admin.firestore();
    const stockData = await db.collection("stocks").doc(stockname).set({data: result});
    // if data added successfully then return stock data added !
    console.log("stockData", stockData)
    response.send("Stock data added !")
});

const STOCKS = ['ABB.NS', 'ACC.NS', 'AUBANK.NS', 'ABBOTINDIA.NS', 'ADANIENT.NS', 'ADANIGREEN.NS', 'ADANIPORTS.NS', 'ATGL.NS', 'ADANITRANS.NS', 'ABCAPITAL.NS', 'ABFRL.NS', 'APLLTD.NS', 'ALKEM.NS', 'AMBUJACEM.NS', 'APOLLOHOSP.NS', 'APOLLOTYRE.NS', 'ASHOKLEY.NS', 'ASIANPAINT.NS', 'ASTRAL.NS', 'AUROPHARMA.NS', 'DMART.NS', 'AXISBANK.NS', 'BAJAJ-AUTO.NS', 'BAJFINANCE.NS', 'BAJAJFINSV.NS', 'BAJAJHLDNG.NS', 'BALKRISIND.NS', 'BANDHANBNK.NS', 'BANKBARODA.NS', 'BANKINDIA.NS', 'BATAINDIA.NS', 'BERGEPAINT.NS', 'BEL.NS', 'BHARATFORG.NS', 'BHEL.NS', 'BPCL.NS', 'BHARTIARTL.NS', 'BIOCON.NS', 'BOSCHLTD.NS', 'BRITANNIA.NS', 'CANBK.NS', 'CHOLAFIN.NS', 'CIPLA.NS', 'CLEAN.NS', 'COALINDIA.NS', 'COFORGE.NS', 'COLPAL.NS', 'CONCOR.NS', 'COROMANDEL.NS', 'CROMPTON.NS', 'CUMMINSIND.NS', 'DLF.NS', 'DABUR.NS', 'DALBHARAT.NS', 'DEEPAKNTR.NS', 'DIVISLAB.NS', 'DIXON.NS', 'LALPATHLAB.NS', 'DRREDDY.NS', 'EICHERMOT.NS', 'EMAMILTD.NS', 'ESCORTS.NS', 'EXIDEIND.NS', 'NYKAA.NS', 'FEDERALBNK.NS', 'FORTIS.NS', 'GAIL.NS', 'GLAND.NS', 'GLENMARK.NS', 'GODREJCP.NS', 'GODREJPROP.NS', 'GRASIM.NS', 'GUJGASLTD.NS', 'GSPL.NS', 'HCLTECH.NS', 'HDFCAMC.NS', 'HDFCBANK.NS', 'HDFCLIFE.NS', 'HAVELLS.NS', 'HEROMOTOCO.NS', 'HINDALCO.NS', 'HAL.NS', 'HINDPETRO.NS', 'HINDUNILVR.NS', 'HINDZINC.NS', 'HONAUT.NS', 'HDFC.NS', 'ICICIBANK.NS', 'ICICIGI.NS', 'ICICIPRULI.NS', 'ISEC.NS', 'IDBI.NS', 'IDFCFIRSTB.NS', 'ITC.NS', 'INDIAMART.NS', 'INDIANB.NS', 'IEX.NS', 'INDHOTEL.NS', 'IOC.NS', 'IRCTC.NS', 'IGL.NS', 'INDUSTOWER.NS', 'INDUSINDBK.NS', 'NAUKRI.NS', 'INFY.NS', 'INDIGO.NS', 'IPCALAB.NS', 'JSWENERGY.NS', 'JSWSTEEL.NS', 'JINDALSTEL.NS', 'JUBLFOOD.NS', 'KOTAKBANK.NS', 'L&TFH.NS', 'LTTS.NS', 'LICHSGFIN.NS', 'LTI.NS', 'LT.NS', 'LAURUSLABS.NS', 'LUPIN.NS', 'MRF.NS', 'M&MFIN.NS', 'M&M.NS', 'MANAPPURAM.NS', 'MARICO.NS', 'MARUTI.NS', 'MFSL.NS', 'MAXHEALTH.NS', 'METROPOLIS.NS', 'MINDTREE.NS', 'MPHASIS.NS', 'MUTHOOTFIN.NS', 'NMDC.NS', 'NTPC.NS', 'NATIONALUM.NS', 'NAVINFLUOR.NS', 'NESTLEIND.NS', 'NAM-INDIA.NS', 'OBEROIRLTY.NS', 'ONGC.NS', 'OIL.NS', 'PAYTM.NS', 'OFSS.NS', 'POLICYBZR.NS', 'PIIND.NS', 'PAGEIND.NS', 'PERSISTENT.NS', 'PETRONET.NS', 'PIDILITIND.NS', 'PEL.NS', 'POLYCAB.NS', 'PFC.NS', 'POWERGRID.NS', 'PRESTIGE.NS', 'PGHH.NS', 'PNB.NS', 'RECLTD.NS', 'RELIANCE.NS', 'SBICARD.NS', 'SBILIFE.NS', 'SRF.NS', 'SHREECEM.NS', 'SRTRANSFIN.NS', 'SIEMENS.NS', 'SONACOMS.NS', 'SBIN.NS', 'SAIL.NS', 'SUNPHARMA.NS', 'SUNTV.NS', 'SYNGENE.NS', 'TVSMOTOR.NS', 'TATACHEM.NS', 'TATACOMM.NS', 'TCS.NS', 'TATACONSUM.NS', 'TATAELXSI.NS', 'TATAMOTORS.NS', 'TATAPOWER.NS', 'TATASTEEL.NS', 'TECHM.NS', 'RAMCOCEM.NS', 'TITAN.NS', 'TORNTPHARM.NS', 'TORNTPOWER.NS', 'TRENT.NS', 'TRIDENT.NS', 'UPL.NS', 'ULTRACEMCO.NS', 'UNIONBANK.NS', 'UBL.NS', 'MCDOWELL-N.NS', 'VBL.NS', 'VEDL.NS', 'IDEA.NS', 'VOLTAS.NS', 'WHIRLPOOL.NS', 'WIPRO.NS', 'YESBANK.NS', 'ZEEL.NS', 'ZOMATO.NS', 'ZYDUSLIFE.NS'];

export const addStockDataToDBForAllStocks = functions.pubsub.schedule("00 00 * * *").timeZone('Asia/Kolkata').onRun(async (context) => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    const oneMonthBefore = new Date(tomorrow.getFullYear(), tomorrow.getMonth() - 1, tomorrow.getDate());
    const formattedDate = oneMonthBefore.toISOString().split('T')[0];
    const db = admin.firestore();
    for (let i=0; i < STOCKS.length; i++) {
        const queryOptions = { period1: formattedDate,};
        try{
            var result = await yahooFinance.historical(STOCKS[i], queryOptions);
        } catch  (error){
            logger.info("error", error)
            continue;
        }
        // console.log("raw result", result);
        result = JSON.parse(JSON.stringify(result));
        // console.log(typeof result);
        logger.info(`stockData added succesfully for ${STOCKS[i]}`, {structuredData: true});
        await db.collection("stocks").doc(STOCKS[i]).set({data: result});
        // console.log("stockData added succesfully for ", STOCKS[i])
    }
    return null;
});

export const addStockDataToDBForAllStocksTest = onRequest(async (request, response) => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    const oneMonthBefore = new Date(tomorrow.getFullYear(), tomorrow.getMonth() - 1, tomorrow.getDate());
    const formattedDate = oneMonthBefore.toISOString().split('T')[0];
    const db = admin.firestore();
    for (let i=0; i < STOCKS.length; i++) {
        const queryOptions = { period1: formattedDate,};
        try{
            var result = await yahooFinance.historical(STOCKS[i], queryOptions);
        } catch  (error){
            console.log("error", error)
            continue;
        }
        // console.log("raw result", result);
        result = JSON.parse(JSON.stringify(result));
        // console.log(typeof result);
        // logger.info("Hello logs!", {structuredData: true});
        await db.collection("stocks").doc(STOCKS[i]).set({data: result});
        console.log("stockData added succesfully for ", STOCKS[i])
    }
    response.set("Access-Control-Allow-Origin", "*")
    response.send("all stock data added !")
});

