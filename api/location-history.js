const trendData = {
        "Chile": [
          { "year": 2015, "value": 445365 },
          { "year": 2016, "value": 442191 },
          { "year": 2017, "value": 455006 },
          { "year": 2018, "value": 455742 },
          { "year": 2019, "value": 451467 },
          { "year": 2020, "value": 454027 },
          { "year": 2021, "value": 449220 },
          { "year": 2022, "value": 456730 },
          { "year": 2023, "value": 464447 },
          { "year": 2024, "value": 471297 }
        ],
        "Ohio": [
          { "year": 2015, "value": 780688 },
          { "year": 2016, "value": 775119 },
          { "year": 2017, "value": 792766 },
          { "year": 2018, "value": 810760 },
          { "year": 2019, "value": 824789 },
          { "year": 2020, "value": 827575 },
          { "year": 2021, "value": 838942 },
          { "year": 2022, "value": 845042 },
          { "year": 2023, "value": 840892 },
          { "year": 2024, "value": 841037 }
        ],
        "Australia": [
          { "year": 2015, "value": 702126 },
          { "year": 2016, "value": 692162 },
          { "year": 2017, "value": 706724 },
          { "year": 2018, "value": 723558 },
          { "year": 2019, "value": 720443 },
          { "year": 2020, "value": 715371 },
          { "year": 2021, "value": 733085 },
          { "year": 2022, "value": 728267 },
          { "year": 2023, "value": 722100 },
          { "year": 2024, "value": 733818 }
        ],
        "China": [
          { "year": 2015, "value": 582102 },
          { "year": 2016, "value": 601503 },
          { "year": 2017, "value": 614513 },
          { "year": 2018, "value": 608523 },
          { "year": 2019, "value": 626187 },
          { "year": 2020, "value": 637950 },
          { "year": 2021, "value": 634346 },
          { "year": 2022, "value": 638388 },
          { "year": 2023, "value": 655390 },
          { "year": 2024, "value": 668749 }
        ],
        "Russia": [
          { "year": 2015, "value": 229982 },
          { "year": 2016, "value": 223128 },
          { "year": 2017, "value": 227391 },
          { "year": 2018, "value": 222005 },
          { "year": 2019, "value": 228821 },
          { "year": 2020, "value": 242547 },
          { "year": 2021, "value": 242462 },
          { "year": 2022, "value": 254042 },
          { "year": 2023, "value": 272716 },
          { "year": 2024, "value": 282170 }
        ],
        "Peru": [
          { "year": 2015, "value": 407050 },
          { "year": 2016, "value": 422633 },
          { "year": 2017, "value": 440727 },
          { "year": 2018, "value": 442985 },
          { "year": 2019, "value": 436755 },
          { "year": 2020, "value": 451199 },
          { "year": 2021, "value": 460371 },
          { "year": 2022, "value": 473535 },
          { "year": 2023, "value": 488403 },
          { "year": 2024, "value": 501536 }
        ],
        "Canada": [
          { "year": 2015, "value": 477330 },
          { "year": 2016, "value": 473205 },
          { "year": 2017, "value": 471511 },
          { "year": 2018, "value": 464051 },
          { "year": 2019, "value": 454830 },
          { "year": 2020, "value": 456827 },
          { "year": 2021, "value": 455403 },
          { "year": 2022, "value": 453390 },
          { "year": 2023, "value": 472169 },
          { "year": 2024, "value": 472449 }
        ],
        "South Africa": [
          { "year": 2015, "value": 495977 },
          { "year": 2016, "value": 502163 },
          { "year": 2017, "value": 502953 },
          { "year": 2018, "value": 502381 },
          { "year": 2019, "value": 519838 },
          { "year": 2020, "value": 511875 },
          { "year": 2021, "value": 508118 },
          { "year": 2022, "value": 514598 },
          { "year": 2023, "value": 530570 },
          { "year": 2024, "value": 521961 }
        ],
        "Brazil": [
          { "year": 2015, "value": 656847 },
          { "year": 2016, "value": 669075 },
          { "year": 2017, "value": 674377 },
          { "year": 2018, "value": 687440 },
          { "year": 2019, "value": 683571 },
          { "year": 2020, "value": 689440 },
          { "year": 2021, "value": 701732 },
          { "year": 2022, "value": 709419 },
          { "year": 2023, "value": 708417 },
          { "year": 2024, "value": 699610 }
        ],
        "India": [
          { "year": 2015, "value": 224167 },
          { "year": 2016, "value": 232926 },
          { "year": 2017, "value": 224938 },
          { "year": 2018, "value": 231845 },
          { "year": 2019, "value": 232095 },
          { "year": 2020, "value": 240309 },
          { "year": 2021, "value": 234727 },
          { "year": 2022, "value": 245964 },
          { "year": 2023, "value": 264633 },
          { "year": 2024, "value": 267525 }
        ]
      }      
  
  export default function handler(req, res) {
    const { location } = req.query;
    const data = trendData[location];
  
    if (!data) {
      return res.status(404).json({ error: 'Trend data not found for this location' });
    }
  
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);
  }
  