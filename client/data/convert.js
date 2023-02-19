import { v4 as uuidv4 } from 'uuid';

const fs = require('fs');

function processData() {
  // Read data from allison.json
  fs.readFile('allison.json', 'utf-8', (err, data) => {
    if (err) throw err;

    // Parse the data into a JavaScript object
    const scrapedData = JSON.parse(data);

    fs.readFile('data.json', (err2, data2) => {
      if (err2) throw err2;
      // console.log(data2);
      let processedData = {
        "locations": {
          "Sarge": {
            "name": "Sarge",
            "averageRating": 4.5,
            "topItem": "Tenders",
            "imageLink": "placeholderurl"
          },
          "Elder": {
            "name": "Elder",
            "averageRating": 3.6,
            "topItem": "Burders",
            "imageLink": "placeholderurl2"
          }
        },
        "items": {
          "2b8-9-4206-9fdf-00208769e96ab826c0": {
            "name": "Tenders",
            "description": "Chicken tenders",
            "location": "Sarge",
            "reviews": {
              "0": "",
              "1": "9fdf-00208769e96ab8b8-9-4206-9"  
            },
          },
          "e96ab8b89fdf-00208769-9-4206-9": {
            "name": "Ravioli",
            "description": "Beef ravioli with cheese",
            "location": "Sarge",
            "reviews": {
              "0": "",
              "1": "fbdf-00208769e96ab8b8-9-4206-9",
              "2": "e96abfbdf-002087698b8-9-4206-9"
            }
          }
        },
        "reviews": {
          "9fdf-00208769e96ab8b8-9-4206-9": {
            "author": "f-0020879fd69e96ab8b8-9-4206-9",
            "text": "I love tenders",
            "rating": 5,
            "imageLink": "placeholderurl", 
            "likes": 0
          }, 
          "fbdf-00208769e96ab8b8-9-4206-9": {
            "author": "f-0020879fd69e96ab8b8-9-4206-9",
            "text": "I love pasta pasta",
            "rating": 5,
            "imageLink": "placeholderurl", 
            "likes": 0
          },
          "e96abfbdf-002087698b8-9-4206-9": {
            "author": "f-0020879fd69e96ab8b8-9-4206-9",
            "text": "I love pasta pasta even more but this pasta was terrible",
            "rating": 2,
            "imageLink": "placeholderurl", 
            "likes": 0
          }
        },
        "users": {
          "f-0020879fd69e96ab8b8-9-4206-9": {
            "name": "test user",
            "posts": {
              "0": "",
              "1": "9fdf-00208769e96ab8b8-9-4206-9",
              "2": "fbdf-00208769e96ab8b8-9-4206-9",
              "3": "e96abfbdf-002087698b8-9-4206-9"
            }, 
            "likedPosts": {
              "0": "",
              "1": "9fdf-00208769e96ab8b8-9-4206-9"
            }
          }
        }
      }
      
      // Process the data
      for (let index = 0; index < scrapedData.length; index++) {
        const item = scrapedData[index];
        processedData[uuidv4()] = {name: item.name, 
          description: item.description, 
          location: "Allison", 
          reviews: {"0": ""}
        }
      }
      // Write the processed data back to data.json
      fs.writeFile('data.json', JSON.stringify(processedData), 'utf-8', err => {
        if (err) throw err;
        console.log('Data processed and saved to data.json');
      });
    });
            
  });
}

processData();
