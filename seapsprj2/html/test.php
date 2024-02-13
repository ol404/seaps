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
        .btn{
            padding: 0 5px;
            font-size: 12px;    
            border: none;
        }
    </style>
</head>
<h2><center>S.E.A.P.S PROJECT</center></h2>
<p><center><span id="currentDT">?</span></center></p>
<script src= "js/time.js"></script>
<body>
    <div class="filters">
        <!-- data filter for date -->
        <div class="filters-content">
            <label for="year-filter">Year:</label>
            <select id="year-filter"></select>

            <label for="month-filter">Month:</label>
            <select id="month-filter"></select>

            <label for="date-filter">Date:</label>
            <select id="date-filter"></select>
        </div>

            <!-- dropdown filter for emergenency type -->
        <div class="filters-content">
            <label for="category-dropdown">Emergency Type:</label>
            <select id="category-dropdown"></select>
            <label for="subcategory-dropdown">Emergency Specific:</label>
            <select id="subcategory-dropdown"></select>
        </div>
        <div class="btn">
            <button name="applyFilter" id="applyFilter">Apply</button>
        </div>
    </div>
</form>
<script type="module" async src="js/filters.js"></script>
<script type="module" defer src= "js/filters.js"></script>
<body>
    <div id="map"></div>
            <!-- google map api-->
        <script async defer
            src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDTuI2Sqdi3zrySY6Wp1IN7D4ge_-w2UI8&callback=initMap">
        </script>
        <script aync src = "js/map.js"></script>
</body>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
</body>
</html>

