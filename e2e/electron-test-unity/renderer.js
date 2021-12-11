const {screen, OptionalSearchParameters, Region} = require("../../dist/index");

async function runNutTest(){
    await screen.capture('test.png');
    screen.find("nut.png",  new OptionalSearchParameters(
        await new Region(0, 0, await screen.width(), await screen.height()),
        0.95,
        true
      )).then(async (foundRegion)=>{
        await screen.highlight(foundRegion)
      }).catch((e)=>{
        console.log(e)
      })  
}


setTimeout(async () => runNutTest(), 5500);