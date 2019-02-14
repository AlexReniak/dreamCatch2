$(document).ready(function () {

  $.ajax({
    url: "/api/user/userdata",
    type: "GET"
  }).then(userData => {
    let { id } = userData

    dreamChart(id);
    dreamData(id);
  })
  .catch(err => console.log(err));
  
  
  const dreamChart = (id) => {

    $.ajax({
      url: `/api/dreams/${id}`,
      type: "GET",
      success: function (data) {
        console.log(data);
  
        var userid = [];
        var quality_sleep = [];
        var length_sleep = [];
  
  
        for (var i in data) {
  
          var stamp = moment(data[i].createdAt).format("MM/DD");
          userid.push(stamp);
          quality_sleep.push(data[i].quality_sleep);
          length_sleep.push(data[i].length_sleep);
        }
  
        var chartdata = {
          labels: userid,
          datasets: [{
            label: "Quality of Sleep",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(59, 89, 152, 0.75)",
            borderColor: "rgba(59, 89, 152, 1)",
            pointHoverBackgroundColor: "rgba(59, 89, 152, 1)",
            pointHoverBorderColor: "rgba(59, 89, 152, 1)",
            data: quality_sleep
          },
          {
            label: "Hours of Sleep",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(29, 202, 255, 0.75)",
            borderColor: "rgba(29, 202, 255, 1)",
            pointHoverBackgroundColor: "rgba(29, 202, 255, 1)",
            pointHoverBorderColor: "rgba(29, 202, 255, 1)",
            data: length_sleep
          }]
        };
      }
    });
  };

  //Load up ALL dreams in dream journal
  const dreamData = (id) => {

    $.get(`/api/dreams/${id}`, function (data) {
      if (data.length !== 0) {
        var all_dreams = document.getElementById("all-dreams");
        for (var i = data.length - 1; i+1 > (data.length - data.length); i--) {
          var body = JSON.parse(data[i].body);
          var stamp = moment(data[i].createdAt).format("lll");
          var card = `
            <div class="col-md-4 col-12 d-flex">
              <div class="card shadow mb-3">
                <div class="card-header skyblue text-white">
                ${data[i].title}
                </div>
                <div class="card-body">
                  ${body}
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Quality of sleep: <span class="skyblue-text">${data[i].quality_sleep}</span>/10</li>
                        <li class="list-group-item">Time spent sleeping: <span class="skyblue-text">${data[i].length_sleep}</span> hours</li>
                      </ul>
                </div>
                <div class="card-footer skyblue text-white">
                  Created at: ${stamp}
                </div>
              </div>
            </div>
            `;

          all_dreams.innerHTML = all_dreams.innerHTML += card;
        };
      };
    });
  };

  $("dashboard-home-btn").on("click", function() {
    
    $.ajax({
      url: "/api/user/userdata",
      type: "GET"
    }).then(userData => {
      location.replace(`/dashboard/${userData.username}`)
  
    })
    .catch(err => console.log(err));
  })
});