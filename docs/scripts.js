
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
                const scheduleArr = schedule.split(' ');
                const mSpelled1 = scheduleArr[0];
                const mSpelled2 = scheduleArr[2];

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

                switch (mSpelled1) {
                  case "January":
                    month1 = "January";
                    break;
                  case "February":
                    month1 = "February";
                    break;
                  case "March":
                    month1 = "March";
                    break;
                  case "April":
                    month1 = "April";
                    break;
                  case "May":
                    month1 = "May";
                    break;
                  case "June":
                    month1 = "June";
                    break;
                  case "July":
                    month1 = "July";
                    break;
                  case "August":
                    month1 = "August";
                    break;
                  case "September":
                    month1 = "September";
                    break;
                  case "October":
                    month1 = "October";
                    break;
                  case "November":
                    month1 = "November";
                    break;
                  case "December":
                    month1 = "December";
                }

                switch (mSpelled2) {
                  case "January":
                    month2 = "January";
                    break;
                  case "February":
                    month2 = "February";
                    break;
                  case "March":
                    month2 = "March";
                    break;
                  case "April":
                    month2 = "April";
                    break;
                  case "May":
                    month2 = "May";
                    break;
                  case "June":
                    month2 = "June";
                    break;
                  case "July":
                    month2 = "July";
                    break;
                  case "August":
                    month2 = "August";
                    break;
                  case "September":
                    month2 = "September";
                    break;
                  case "October":
                    month2 = "October";
                    break;
                  case "November":
                    month2 = "November";
                    break;
                  case "December":
                    month2 = "December";
                }
                
                if (month1 && month2) {
                  months.innerHTML = `${month1} – ${month2}`;
                }

                /* Days! */

                const sun = newCard.querySelector('.sun'),
                mon = newCard.querySelector('.mon'),
                tue = newCard.querySelector('.tue'),
                wed = newCard.querySelector('.wed'),
                thu = newCard.querySelector('.thu'),
                fri = newCard.querySelector('.fri'),
                sat = newCard.querySelector('.sat');

                if (schedule.indexOf('Sun') != -1 || schedule.indexOf('sun') != -1 ) {
                  sun.classList.remove('day-off');
                  sun.classList.add('day-on');
                }

                if (schedule.indexOf('Mon') != -1 || schedule.indexOf('mon') != -1 ) {
                  mon.classList.remove('day-off');
                  mon.classList.add('day-on');
                }

                if (schedule.indexOf('Tue') != -1 || schedule.indexOf('tue') != -1 ) {
                  tue.classList.remove('day-off');
                  tue.classList.add('day-on');
                }

                if (schedule.indexOf('Wed') != -1 || schedule.indexOf('wed') != -1 ) {
                  wed.classList.remove('day-off');
                  wed.classList.add('day-on');
                }

                if (schedule.indexOf('Thu') != -1 || schedule.indexOf('thu') != -1 ) {
                  thu.classList.remove('day-off');
                  thu.classList.add('day-on');
                }

                if (schedule.indexOf('Fri') != -1 || schedule.indexOf('fri') != -1 ) {
                  fri.classList.remove('day-off');
                  fri.classList.add('day-on');
                }

                if (schedule.indexOf('Sat') != -1 || schedule.indexOf('sat') != -1 ) {
                  sat.classList.remove('day-off');
                  sat.classList.add('day-on');
                }

                /* Times! */
                
                const time = newCard.querySelector('.time');
                const fiveString = scheduleArr[5] + "%";
                time.innerHTML = `${scheduleArr[4]} ${fiveString.substr(0,2)} - ${fiveString.substring(3,fiveString.indexOf('%'))} ${scheduleArr[6].substr(0,2)}`
            });
        resultContainer.appendChild(newCard);
    };
  });

  /* Get rid of template card */
  const parent = document.body.querySelector('.results');
  parent.removeChild(searchCard);

