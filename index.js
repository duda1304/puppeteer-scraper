import puppeteer from "puppeteer";
//added comment to see if changes are on server also
const start = async () => {
  // Start a Puppeteer session with:
  // - a visible browser (`headless: false` - easier to debug because you'll see the browser in action)
  // - no default viewport (`defaultViewport: null` - website page will in full width and height)
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  const page = await browser.newPage();
  
  await page.goto("https://elvis-anmeldung.gfi.ihk.de/IFrame?kuerzel=amp&kammer=%2bG%2f3", {
    waitUntil: "networkidle0"
  });

 
  const optionValues = await page.evaluate( () => 
    Array.from(document.querySelector('#form select').children).map(element=>element.value)
    );

  const dates = optionValues.filter(value => value !== '')
  console.log(dates);


  await page.select('select', dates[0]);
  await page.waitForSelector('.anmeldeschluss');

const results = await page.evaluate( () => 
document.querySelector('.anmeldeschluss').innerHTML
);
console.log(results);

await Promise.all([
            // Waits for navigation and no active network connections
            page.select('select', date),
            page.waitForSelector('.anmeldeschluss')
            // page.waitForNavigation({ waitUntil: 'networkidle2' })
            
        ]).then((values) => {
            
        })

//   await page.select('select', dates[0]);
//   await page.waitForSelector('.anmeldeschluss');

//     const results = await page.evaluate( () => 
//     document.querySelector('.anmeldeschluss').innerHTML
//     );
//     console.log(results)

//   dates.forEach(async(date) => {
//     await Promise.all([
//         // Waits for navigation and no active network connections
//         page.select('select', date),
//         page.waitForSelector('.anmeldeschluss')
//         // page.waitForNavigation({ waitUntil: 'networkidle2' })
        
//     ]);
//     await page.screenshot({ path: 'screenshot.jpg' });
//     i = i + 1;
//     console.log(i)
//     const results = await page.evaluate( () => 
//     console.log(document.querySelector('.anmeldeschluss').innerHTML)
//     );
//   })


  

//   await page.evaluate(() => {
//     // document.querySelector('select option:nth-child(2)').selected = true;
//     document.querySelector('#form select').value = parseInt(dates[0]);
//   });
//   page.waitForNavigation();
//   const result = await page.evaluate( () => 
//     document.querySelector('#form .termin-info').innerHTML
// );
//     console.log(result);

//   const [response] = await Promise.all([
//     page.waitForNavigation(waitOptions),
//     page.click(selector, clickOptions),
//   ]);

//   const options = await page.evaluate( () => 
//     Array.from(document.querySelector('#form select').children).map(async(element)=> {
//         if (element.value !== '') {
//             page.click(element);
//             await page.waitForNavigation();
//             const result = await page.evaluate( () => 
//                 document.querySelector('#form .termin-info').innerHTML
//             );
//             console.log(result);
//         }
//     }
//     )
//   );


  // Close the browser
//   await browser.close();
  
};

// Start the scraping
start();

