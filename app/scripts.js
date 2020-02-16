
const url = window.location.href;
const zip = url.substr(-5);
const searchCard = document.querySelector('.card');
const resultContainer = document.querySelector('.results');
  
  
  fetch(`https://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=${zip}`)
  .then((response1) => {
    return response1.json();
  })
  .then((listOfMarkets) => {
    let results = listOfMarkets.results;
    for (i in results) {
      const newCard = searchCard.cloneNode(true);
      
      const fullName = results[i].marketname;
      const h2 = newCard.querySelector('.h2-card');
      h2.innerHTML = fullName.substr(4);
      
      const distance = newCard.querySelector('.distance');
      distance.innerHTML = `${fullName.substr(0,fullName.indexOf(' '))} Miles Away`;
      
        fetch('https://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=' + results[i].id)
            .then((response2) => {
            return response2.json();
            })
            .then((markDets) => {
                console.log(fullName)
                console.log(markDets.marketdetails.Schedule)

                /* Map! */
                const googleLoc = markDets.marketdetails.GoogleLink;
                const lati = parseFloat(googleLoc.substring(googleLoc.indexOf('=') + 1,googleLoc.indexOf('%2C')));
                const long = parseFloat(googleLoc.substring(googleLoc.indexOf('%20') + 3,googleLoc.indexOf('%20(')));
                var location = {lat: lati, lng: long};
                var map = new google.maps.Map(
                    newCard.querySelector('.map'), {zoom: 16, center: location});
                var marker = new google.maps.Marker({position: location, map: map});
                
                /* Months! */
                const months = newCard.querySelector('.months');
                const schedule = markDets.marketdetails.Schedule;
                const m1 = parseInt(schedule.substring(0, 2));
                const m2 = parseInt(schedule.substr(schedule.indexOf('to ') + 3, 2));
                let month1;
                let month2;

                switch (m1) {
                  case 01:
                    month1 = "January";
                    break;
                  case 02:
                    month1 = "February";
                    break;
                  case 03:
                    month1 = "March";
                    break;
                  case 04:
                    month1 = "April";
                    break;
                  case 05:
                    month1 = "May";
                    break;
                  case 06:
                    month1 = "June";
                    break;
                  case 07:
                    month1 = "July";
                    break;
                  case 08:
                    month1 = "August";
                    break;
                  case 09:
                    month1 = "September";
                    break;
                  case 10:
                    month1 = "October";
                    break;
                  case 11:
                    month1 = "November";
                    break;
                  case 12:
                    month1 = "December";
                }

                switch (m2) {
                  case 01:
                    month2 = "January";
                    break;
                  case 02:
                    month2 = "February";
                    break;
                  case 03:
                    month2 = "March";
                    break;
                  case 04:
                    month2 = "April";
                    break;
                  case 05:
                    month2 = "May";
                    break;
                  case 06:
                    month2 = "June";
                    break;
                  case 07:
                    month2 = "July";
                    break;
                  case 08:
                    month2 = "August";
                    break;
                  case 09:
                    month2 = "September";
                    break;
                  case 10:
                    month2 = "October";
                    break;
                  case 11:
                    month2 = "November";
                    break;
                  case 12:
                    month2 = "December";
                }
                
                months.innerHTML = `${month1} - ${month2}`;
              
                /*console.log(markDets.marketdetails.Address) //Address
                console.log(markDets.marketdetails.GoogleLink) //Google maps
                console.log(markDets.marketdetails.Products) //What they sell
                console.log(markDets.marketdetails.Schedule) //Schedule - needs to be reformatted*/
            });
        resultContainer.appendChild(newCard);
    };
  });

