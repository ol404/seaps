<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Bootstrap demo</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <style>
       body {
        #map {
            height: 500px;
            width: 100%;
            margin: 0;
            padding: 0;
        }
        }

        .filters{
            display: flex;
            justify-content: center;
            padding: 10px;
        }
        .filters-content{
            padding: 0 5px;
            font-size: 12px;
        }
    </style>
</head>
<h2><center>S.E.A.P.S PROJECT</center></h2>
<p><center><span id="currentDT">?</span></center></p>
<script>
    // create current date and time
    function getCurrentDT(){
        const dtDisplayElement = document.getElementById("currentDT"); 
        const currentDateTime = new Date();
        const date = currentDateTime.toDateString();
        const time = currentDateTime.toLocaleTimeString();
        dtDisplayElement.textContent = `Date: ${date} | Time: ${time}`;
    }
    // date and time update
    getCurrentDT();
    setInterval(getCurrentDT, 1000);

</script>
<body>
<form>
    <div class="filters">
        <!-- data filter for date -->
        <div class="filters-content">
            <label for="date-filter">Filter by Date:</label>
            <input type="date" id="date-filter" name="date-filter" value="<?php echo date("Y-m-d"); ?>">
        </div>
            <!-- dropdown filter for emergenency type -->
        <div class="filters-content">   
            <label for="emergencyType">Emergency Type:</label>  
            <select name="emergencyType" id="emergencyType">
                <option value="all">All</option>
                <option value="crime">Crime</option>
                <option value="disaster">Disaster</option>
            </select>
        </div>
        <!-- dropdown filter for emergenency specific -->
        <div class="filters-content">
        <label for="emergencySpecificType">Emergency Specific:</label>
            <select name="emergencySpecificType" id="emergencySpecificType">
                <option value="all">All</option>
                <option value="murder">Murder</option>
                <option value="kidnapping">Kidnapping</option>
                <option value="robbery">Robbery</option>
                <option value="theft">Theft</option>
                <option value="trapped">Trapped</option>
                <option value="fire">Fire</option>
                <option value="flood">Flood</option>
                <option value="car-crash">Car Crash</option>
            </select>
        </div>
    </div>
</form>
<body>
    <div id="map"></div>
            <!-- google map api-->
        <script async defer
            src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDTuI2Sqdi3zrySY6Wp1IN7D4ge_-w2UI8&callback=initMap">
        </script>

        <script>
             function initMap() {
                // Map options 
                const options = {
                    zoom: 15,
                    center: { lat: 10.296806, lng: 123.906604 }, // Initial center coordinates (CTU )
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };

                // Create the map
                const map = new google.maps.Map(document.querySelector("#map"), options); // Use querySelector for flexibility

                const locateMarkers = [];
                // Retrieve markers data from PHP using AJAX
                fetch('./configs/index.php')
                    .then(response => {
                        if (!response.ok) { // Check for successful response
                            throw new Error('Failed to fetch markers data');
                        }
                        return response.json();
                    })
                    .then(markersData => {
                        markersData.forEach(marker => {
                            new google.maps.Marker({
                                position: { lat: marker.lat, lng: marker.lng },
                                map: map,
                                title: `Coordinates: ${marker.lat}, ${marker.lng} \nDate: ${marker.created_date}\nType: ${marker.emergency_type}\nDetails: ${marker.specific_emergency}`
                            });
                        });
                    })
                    .catch(error => {
                        console.error('Error fetching markers:', error);
                    });
            }
        </script>
</body>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
</body>
</html>

