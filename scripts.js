

  fetch('https://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=44107')
  .then((response1) => {
    return response1.json();
  })
  .then((listOfMarkets) => {
    let results = listOfMarkets.results;
    for (i in results) {
        console.log(results[i].marketname) //Name of market, including distance from search zip
        fetch('https://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=' + results[i].id)
            .then((response2) => {
            return response2.json();
            })
            .then((markDets) => {
                console.log(markDets.marketdetails.Address) //Address
                console.log(markDets.marketdetails.GoogleLink) //Google maps
                console.log(markDets.marketdetails.Products) //What they sell
                console.log(markDets.marketdetails.Schedule) //Schedule - needs to be reformatted
            });
    };
  });