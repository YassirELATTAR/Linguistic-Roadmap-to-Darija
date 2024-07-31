# Linguistic Roadmap to Darija
 This is a final version of our project in the course of Text Technology for the M.Sc. in Computational Linguistic. The course is taught by Prof. Dr. Kerstin Jung at the university of Stuttgart, Germany. 

This project is an Express.js application designed to handle various endpoints for interacting with a MongoDB database containing Darija grammar, vocabulary, and sentences. The application supports functionalities such as fetching vocabulary/grammar items and sentences, searching for vocabulary entries, retrieving spelling statistics, and contributing the database of the darija. The main functions are explained in details below with sample examples of the code in both back-end and front-end. A simple short presentation of the project can be found [here](https://www.canva.com/design/DAGIwxFwjqo/pGc4xuL7dY1r0zoxD4kufw/edit?utm_content=DAGIwxFwjqo&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton).

## Table of Contents

- [Installation](#installation)
- [Database Configuration](#database-configuration)
- [Running the server](#Run-Server)
- [Endpoints](#endpoints)
  - [GET /vocabulary/category](#get-vocabularycategory)
  - [GET /grammar/category](#get-grammarcategory)
  - [GET /vocabulary/sentences](#get-vocabularysentences)
  - [GET /search](#get-search)
  - [GET /spelling-stats](#get-spelling-stats)
  - [Contribute](#contribute)
- [References](#references)
- [Acknowledgements](#Acknowledgements)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/darija-vocabulary-api.git
    cd darija-vocabulary-api
    ```

2.  Install node:
    ```bash
    $ brew install node@20
    ```
    
3.  Install the dependencies (go to step 4 if you have problems):
    ```bash
    npm install
    ```
4.  Remove the configuration that were retrived when cloning the repository and reinstall them in your environment:
    ```bash
    rm -rf node_modules package-lock.json
    ```
    Try again step 3

5. Make sure you have a MongoDB instance running and update the connection URI in your environment configuration (Python code and app.js).


## Database Configuration
1. Create your database using xml/csv files:
   1.1. Open/ Excute "py_db_create.py" file and run the function (to avoid problems, it is recommended to run function: from_csv_to_db(db_name, client)
   Make sure you edit the following if you have different values for the connection string (it is not recommended to change the name of the database)
   ```python
      #Initialize connection string:
      connection_string = "mongodb://localhost:27017"
   
      #Connect to MongoDB
      client = MongoClient(connection_string)
      db_name = 'darijadatabase'
   ```
   Run the funtion below (uncomment functions "from_csv_to_xml()" and "save_xml_to_mongodb(db_name,client)" and comment "from_csv_to_db(db_name, client)" if you want to use xml:
   ```python
      #1- Adding entries to the database from CSV directly:
      from_csv_to_db(db_name,client)
      #2- Adding entries to the database from XML
      #from_csv_to_xml()
      #save_xml_to_mongodb(db_name,client)
   ```
   The python code will prompt a file dialog to navigate to the csv files (you can find them in folder: **/dataset-main**) and select folders:
   - sentences
   - semantic categories
   - syntactic categories
  
   You need to run the code for all three folders if you need to add the full database.
## Run Server
1. Open your terminal and run the server *(navigate to **/myExpressApp** directory or where you see the **'app.js'** file)*:
   ```bash
   node app.js
   ```
2. Visit the website on the following (*usually*) address:
   ```bash
   http://localhost:3000/
   ```


## Endpoints
### GET /vocabulary/category
**Description:** Gets vocabulary items of the specific *cetegory* with their different forms (ranging from 1 to 6) in Latin letters, Arabic Letters, and English translation.

**Query Parameters:**
- `collection`: The collection in the database matches the vocabulary category.

**Response:**
- returns a result file to display on the HTML page with the vocabulary items, including headers and details.

**Example on Server Side:** *Function to get vocabulary of Animals*

   ```javascript
   app.get('/vocabulary/animals', async (req, res) => {
   try {
    await client.connect();
    const database = client.db('darijadatabase');
    const collection = database.collection('animals');
    const animals = await collection.find({}).toArray();
    
    // Process the data to get the unique headers
    const headers = new Set();
    animals.forEach(animal => {
      Object.keys(animal).forEach(key => {
        if (key !== '_id') headers.add(key);
      });
    });
    res.render('vocabulary/animals', { headers: Array.from(headers), animals });
    } catch (err) {
     console.error(err);
     res.status(500).send('Internal Server Error');
    } finally {
     await client.close();
    }
   });
   ```


**Example on Front End:** *Displaying the result from server on html page /vocabulary/[category].ejs*

   ```html
   <div class="container mt-4">
    <h1 class="main_heading text-center">Animals</h1>
    <div class="my-main-div">
      <table class="table">
        <thead class="thead-light">
          <tr>
            <% headers.forEach(header => { %>
              <th scope="col"><%= header === 'eng' ? 'English' : header === 'darija_ar' ? 'Arabic Darija' : header === 'n1' ? 'Form 1': header === 'n2' ? ' Form 2': header === 'n3' ? ' Form 3': header === 'n4' ? ' Form 4': header === 'n5' ? ' Form 5': header === 'n6' ? ' Form 6' : header %></th>
            <% }); %>
          </tr>
        </thead>
        <tbody>
          <% animals.forEach(animal => { %>
            <tr>
              <% headers.forEach(header => { %>
                <td><%= animal[header] || '' %></td>
              <% }); %>
            </tr>
          <% }); %>
        </tbody>
      </table>
    </div>
  </div>
   ```


### GET /grammar/category
**Description:** Gets grammar items/ examples of the specific *cetegory* with their different forms.
   There are different pages to display different grammar categories:
   - definite_indefinite
   - adjectives
   - adverbs
   - conjug_past
   - conjug_present
   - imperatives
   - masculin_feminine_plural
   - nouns
   - prepositions
   - verb-to-noun
   - verbs

     *There are different structures for each collection. Below is an example of the verbs in past form*

**Query Parameters:**
- `collection`: The collection in the database matches the grammar category.

**Response:**
- Returns a result file with grammar category items, including headers and details to display on the HTML page.

**Example on Server Side:** *Function to get verbs in past form*

   ```javascript
   app.get('/grammar/conjug_past', async (req, res) => {
    try {
     await client.connect();
     const database = client.db('darijadatabase');
     const collection = database.collection('conjug_past');
     const conjug_past = await collection.find({}).toArray();
    
     // Process the data to get the unique headers
     const headers = new Set();
     conjug_past.forEach(form => {
       Object.keys(form).forEach(key => {
         if (key !== '_id') headers.add(key);
       });
     });

     res.render('grammar/conjug_past', { headers: Array.from(headers), conjug_past });
    } catch (err) {
     console.error(err);
     res.status(500).send('Internal Server Error');
    } finally {
     await client.close();
    }
   });
   ```


**Example on Front End:** *Displaying the result from server on html page /grammar/conjug_past.ejs*

   ```html
   <div class="container mt-4">
    <h1 class="main_heading text-center">Verbs in Past Tense</h1>
    <div class="my-main-div" style="width: max-content !important;">
      <table class="table">
        <thead class="thead-light">
          <tr>
            <% headers.forEach(header => { %>
              <th scope="col"><%- header === 'ana' ? '<strong>ana</strong><br>(I)' : header === 'nta' ? '<strong>nta </strong> <br>(you - male)' : header === 'nti' ? '<strong>nti </strong> <br> (you - female)': header === 'howa' ? ' <strong>howa</strong> <br> (he)': header === 'hia' ? ' <strong>hia</strong> <br> (she)': header === '7na' ? ' <strong>7na </strong> <br> (we)': header === 'ntoma' ? ' <strong>ntoma </strong> <br> (you - plural)': header === 'homa' ? ' <strong>homa </strong> <br> (they)': header === 'root' ? ' <strong>root</strong> <br>' : header -%></th>
            <% }); %>
          </tr>
        </thead>
        <tbody>
          <% conjug_past.forEach(past => { %>
            <tr>
              <% headers.forEach(header => { %>
                <td><%= past[header] || '' %></td>
              <% }); %>
            </tr>
          <% }); %>
        </tbody>
      </table>
    </div>
  </div>
   ```


### GET /vocabulary/sentences

**Description:** Fetches vocabulary sentences with their two different forms of Darija (using Arabic letter and Latin) + the English translation.

**Query Parameters:**
- `page` (optional): The page number to fetch. Defaults to 1.
- `collection`: The name of collection here is already predefined since there is only one collection of 'sentences'

**Response:**
- Returns a result with the vocabulary sentences, including headers and details to display on HTML page.



**Example on Server Side:** *Function to get sentences*

   ```javascript
   app.get('/vocabulary/sentences', async (req, res) => {
   //Parsing the page number from the query parameter or defaulting to 1
   const page = parseInt(req.query.page) || 1;
   //Setting the limit of sentences per page
   const limit = 100;
   //Calculating the number of documents to skip based on the page number
   const skip = (page - 1) * limit;

    try {
      //Connecting to the MongoDB client
      await client.connect();
      //Selecting the 'darijadatabase' database
      const database = client.db('darijadatabase');
      //Selecting the 'sentences' collection within the database
      const collection = database.collection('sentences');
    
      //Reading sentences from the collection with pagination
      const sentences = await collection.find({}).skip(skip).limit(limit).toArray();
      //Getting the total number of documents in the collection
      const totalSentences = await collection.countDocuments();
      //Calculating the total number of pages
      const totalPages = Math.ceil(totalSentences / limit);

      //Processing the data to get the unique headers for the sentences
      const headers = new Set();
      sentences.forEach(sentence => {
        Object.keys(sentence).forEach(key => {
          //Adding each key to the headers set, excluding the '_id' field which is not necessarily displayed on the html table
          if (key !== '_id') headers.add(key);
        });
      });

      //Getting the 'vocabulary/sentences' view with the sentences, headers, and pagination info
      res.render('vocabulary/sentences', { 
        headers: Array.from(headers), 
        sentences, 
        currentPage: page,
        totalPages 
      });
    } catch (err) {
      //Checking the error and sending a 500 status code for internal server error
      console.error(err);
      res.status(500).send('Internal Server Error');
    } finally {
     //Closing the MongoDB client connection
      await client.close();
    }
   });
   ```


**Example on Front End:** *Displaying the result from server on html page /grammar/conjug_past.ejs*

   ```html
   <div class="container mt-4">
    <h1 class="main_heading text-center">Sentences</h1>
    <div class="my-main-div">
      <table class="table">
        <thead class="thead-light">
          <tr>
            <% headers.forEach(header => { %>
              <th scope="col"><%= header === 'eng' ? 'English' : header === 'darija' ? 'Darija' : header === 'darija_ar' ? 'Darija Arabic' : header %></th>
            <% }); %>
          </tr>
        </thead>
        <tbody>
          <% sentences.forEach(sentence => { %>
            <tr>
              <% headers.forEach(header => { %>
                <td><%= sentence[header] || '' %></td>
              <% }); %>
            </tr>
          <% }); %>
        </tbody>
      </table>
    </div>
  </div>
   ```


### GET /search

**Description:** Searches the database for vocabulary entries matching the query (English word). It displays all items matching the English word and examples from sentences collection using the first latin form (n1).

**Query Parameters:**
- `query` (required): The search term.

**Response:**
- Returns a JSON array of results containing vocabulary entries and related sentences, which is displayed on the HTML page (index.html)



**Example on Server Side:** *Function to search in the database*

   ```javascript
   app.get('/search', async (req, res) => {
  //Parsing the query parameter from the request
  const query = req.query.query;

  try {
    //Connecting to the MongoDB client
    await client.connect();
    //Selecting the 'darijadatabase' database
    const database = client.db('darijadatabase');
    //Listing all collections in the database
    const collections = await database.listCollections().toArray();
    let results = [];

    //Iterating over each collection to search for documents with 'eng' field matching the query
    for (const collectionInfo of collections) {
      const collectionName = collectionInfo.name;
      const collection = database.collection(collectionName);
      const collectionResults = await collection.find({ eng: query }).toArray();
      results = results.concat(collectionResults);
    }

    //Filtering results to include only those with an 'n1' property:
    const filteredResults = results.filter(result => result.hasOwnProperty('n1'));

    let n1_results = [];

    //Extracting 'n1' values from filtered results
    filteredResults.forEach(result => {
      n1_results = n1_results.concat(result.n1);
    });
    //This is for the examples in sentences
    let filtered_sentences = [];
    
    //Searching in the 'sentences' collection for documents matching each 'n1' value
    for (const item of n1_results) {
      const sentencesCollection = database.collection('sentences');
      const sentenceResults = await sentencesCollection.find({ darija: { $regex: ' ' + item + ' ', $options: 'i' } }).limit(3).toArray();
      filtered_sentences = filtered_sentences.concat(sentenceResults);
    }

    //Adding example sentences to the results if any are found
    if (filtered_sentences.length > 0) {
      results.push({ examples: filtered_sentences });
    }

    //Sending the combined results as JSON
    res.json(results);
  } catch (error) {
    //Sending a 500 status code for any errors encountred during the action
    res.status(500).send('Error occurred: database error' + error);
  }
});

   ```


**Example on Front End:** *Javascript code that reads the response from server and adds the results to the HTML page*

   ```javascript
   document.getElementById('searchForm').addEventListener('submit', async function (e) {
      e.preventDefault();
      const query = e.target.query.value;
      const response = await fetch(`/search?query=${query}`);
      const results = await response.json();
      const resultsContainer = document.getElementById('searchResults');

      if (results.length === 0) {
        resultsContainer.innerHTML = '<p>No results found.</p>';
      } else {
        let resultsHTML = '<h2>Search Results:</h2><ul>';

        results.forEach(item => {
          if (item.examples) {
            resultsHTML += '<li><h2>Examples:</h2><ul id="example_search"><ul>';
            item.examples.forEach(example => {
              resultsHTML += `
            <li style="background-color:#000000">
              <strong>English:</strong> ${example.eng}<br>
              <strong>Darija:</strong> ${example.darija}<br>
              <strong>Arabic Darija:</strong> ${example.darija_ar}
            </li>`;
            });
            resultsHTML += '</ul></ul></li>';
          } else {
            resultsHTML += '<li>' + Object.keys(item).filter(key => key !== '_id').map(key => `
          <strong>
            ${key.startsWith('n') ? 'Spelling form ' + key :
                key === 'eng' ? 'English' :
                  key === 'darija_ar' ? 'Arabic Darija' : key}
          </strong>: ${item[key]}
        `).join('<br>') + '</li>';
          }
        });

        resultsHTML += '</ul>';
        resultsContainer.innerHTML = resultsHTML;
        resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
   ```

**Example Image:**
![example of search for the word 'professor'](https://i.imgur.com/j5cXo9s.png)


### GET /spelling-stats

**Description:** Retrieves spelling statistics from the database according to the number of occurrances with different spelling forms.

**Response:**
- Returns a JSON object with the count of different forms (n1 to n6) across the collections to display on the main HTML page (index.html).


**Example on Server Side:** *Function to count the statistics of the different spelling forms accross all collections of the database*

   ```javascript
   app.get('/spelling-stats', async (req, res) => {
  try {
    //Connecting to the MongoDB client
    await client.connect();
    //Selecting the 'darijadatabase' database
    const database = client.db('darijadatabase');
    //Listing all collections in the database
    const collections = await database.listCollections().toArray();
    let formCounts = { n1: 0, n2: 0, n3: 0, n4: 0, n5: 0, n6: 0 };

    //Iterating over each collection to count occurrences of 'n1' through 'n6' fields
    for (const collectionInfo of collections) {
      const collectionName = collectionInfo.name;
      const collection = database.collection(collectionName);
      const documents = await collection.find({}).toArray();

      //Counting occurrences of each 'n' field in the documents
      documents.forEach(doc => {
        for (let i = 1; i <= 6; i++) {
          if (doc[`n${i}`]) {
            formCounts[`n${i}`]++;
          }
        }
      });
    }

    //Sending the counts as JSON
    res.json(formCounts);
  } catch (error) {
    //Sending a 500 status code for any errors
    res.status(500).send('Error occurred: database error' + error);
  }
});

   ```


**Example on Front End:** *Javascript code that reads the response from server and displays the results on a chart*

   ```javascript
   //Displaying the chart for statistics of different spelling forms:
    async function fetchSpellingStats() {
      const response = await fetch('/spelling-stats');
      return response.json();
    }

    async function renderChart() {
      const data = await fetchSpellingStats();
      const ctx = document.getElementById('spellingChart').getContext('2d');

      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['n1', 'n2', 'n3', 'n4', 'n5', 'n6'],
          datasets: [{
            data: [data.n1, data.n2, data.n3, data.n4, data.n5, data.n6],
            backgroundColor: [
              'rgba(0, 0, 0, 1)', // black for n1
              'rgba(64, 64, 64, 1)', // dark gray for n2
              'rgba(96, 96, 96, 1)', // medium dark gray for n3
              'rgba(128, 128, 128, 1)', // medium gray for n4
              'rgba(160, 160, 160, 1)', // medium light gray for n5
              'rgba(192, 192, 192, 1)' // light gray for n6
            ],
            borderColor: [
              'rgba(0, 0, 0, 1)',
              'rgba(64, 64, 64, 1)',
              'rgba(96, 96, 96, 1)',
              'rgba(128, 128, 128, 1)',
              'rgba(160, 160, 160, 1)',
              'rgba(192, 192, 192, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: 'Count of Spelling Forms of Darija Lexicon',
              position: 'bottom',
              font: {
                weight: 'bold',
                size: '18px'
              },
              color: '#000'
            },
            datalabels: {
              anchor: 'end',
              align: 'top',
              formatter: function (value) {
                return value;
              },
              font: {
                weight: 'bold'
              }
            },
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              beginAtZero: true
            }
          }
        },
        plugins: [ChartDataLabels]
      });
    }

    renderChart();
   ```

**Example Image:**
![Chart of the statistics of different spelling forms](https://i.imgur.com/kLFMCwr.png)


### Contribute

**Description:** This part has two main functions (Upload & Submit). For the Upload, it uploads an XML file to a folder, validate it against an XSD and saves it if it is valid, otherwise, it gets removed. The second function, *Submit* checks if the file has been validated against XSD and then saves it to the database. If the file is not valid, it returns an error.

**Response:**
- Returns a simple messages for the status: successful validation/ submission to the database or errors if it encounters any.


**Example of /upload:** *This example is from uploading grammar xml file and validating against the correct xsd*

   ```javascript
   app.post('/upload_grammar', upload.single('file'), (req, res) => {
  const category = req.body.category.toLowerCase();
  uploadedFilePath = req.file.path;
  const finalFilePath = path.join('uploads', `${category}.xml`);

  //Selecting the the correct XSD file path based on the category that was selected
  const xsdFileName = `${category}.xsd`;
  const xsdFilePath = path.join(__dirname, 'validators', xsdFileName);

  fs.readFile(uploadedFilePath, 'utf8', (err, xmlData) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Error reading XML file.' });
    }

    fs.readFile(xsdFilePath, 'utf8', (err, xsdData) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Error reading XSD file.' });
      }

      try {
        //Parsing XML and XSD files
        const xmlDoc = libxmljs.parseXml(xmlData);
        const xsdDoc = libxmljs.parseXml(xsdData);
        //Validating XML against XSD
        const isValidXML = xmlDoc.validate(xsdDoc);
        if (isValidXML) {
          //handling the file if it is valid
          fs.rename(uploadedFilePath, finalFilePath, (err) => {
            if (err) {
              return res.status(500).json({ success: false, message: 'Error moving the file.' });
            }
            isValid = true;
            uploadedFilePath = finalFilePath;
            return res.status(200).json({ success: true, message: 'File is well-formed and valid.' });
          });
        } else {
          //Deleting the file if it is invalid
          fs.unlink(uploadedFilePath, (unlinkErr) => {
            if (unlinkErr) {
              return res.status(500).json({ success: false, message: 'Error deleting invalid file.' });
            }
            const validationErrors = xmlDoc.validationErrors.map(err => err.message).join('; ');
            isValid = false;
            return res.status(400).json({ success: false, message: `XML validation errors: ${validationErrors}` });
          });
        }
      } catch (error) {
        //Handling validation errors and returing the message error to the alert
        fs.unlink(uploadedFilePath, (unlinkErr) => {
          if (unlinkErr) {
            return res.status(500).json({ success: false, message: 'Error deleting invalid file.' });
          }
          isValid = false;
          return res.status(400).json({ success: false, message: 'Error during XML validation.' });
        });
      }
    });
  });
});

   ```


**Example of /Submit:** *This is the function that checks if the XML file is valid and adds it to the database*

   ```javascript
   app.post('/submit_grammar', async (req, res) => {
  if (!isValid || !uploadedFilePath) {
    return res.status(400).json({ success: false, message: 'File is not valid or not uploaded.' });
  }

  const category = req.body.category.toLowerCase();

  try {
    //Connecting to the database
    await client.connect();
    const database = client.db('darijadatabase');
    const collection = database.collection(category);
    //Reading and parsing the XML file
    const xmlData = await fs.promises.readFile(uploadedFilePath, 'utf8');
    const result = await xml2js.parseStringPromise(xmlData);

    let documents;
    //The db structure of the categories 'conjug_pas', 'conjug_present', and 'imperatives' us different from the rest.
    //This is a condition to handle this structure differently when it is being converted.
    if (category === 'conjug_past' || category === 'conjug_present' || category === 'imperatives') {
      // Handle special case for conjugations
      documents = result.corpus.entry.map(entry => {
        const doc = {
          root: entry.root[0]
        };
        //A loop through the xml entries to be able to access the values of the attribute and structuing the js code to match the database
        entry.form.forEach(form => {
          const pronoun = form.$.pronoun; // Accessing attribute 'pronoun' for correct insertion in database
          doc[pronoun] = form._;
          //console.log(`Pronoun:${pronoun}`);
        });
        return doc;
      });
    } else {
      // Handling the regular vocabulary
      documents = result.corpus.entry.map(entry => {
        const doc = {};
        for (const [key, value] of Object.entries(entry)) {
          doc[key] = value[0];
        }
        //console.log(`final doc:${doc}`);
        return doc;
      });
    }
    //Inserting documents into the database
    await collection.insertMany(documents);
    //Resetting validation state and uploaded file path for next actions
    isValid = false;
    uploadedFilePath = '';
    //returning messages of confirmation/ errors to the user
    return res.status(200).json({ success: true, message: 'Thank you for your contribution. File was loaded successfully to the database.' });
  } catch (err) {
    console.error("Error:", err.message);
    return res.status(500).json({ success: false, message: 'An error occurred during submission.' });
  } finally {
    await client.close();
  }
});
   ```

**Front-End Example:** *HTML code for  the contribute to grammar page*

   ```html
   <div class="row mt-4">
      <div class="col-12">
        <h2>Choose Grammar Collection:</h2>
        <form id="contributeForm" enctype="multipart/form-data">
          <div class="container">
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <select class="form-control custom-select" name="category" id="category"
                    onchange="updateXMLExample()">
                    <option value="">Select a category...</option>
                    <option value="in-definite_articles">Definite Indefinite</option>
                    <option value="adjectives">Adjectives</option>
                    <option value="adverbs">Adverbs</option>
                    <option value="conjug_past">Conjugation Past</option>
                    <option value="conjug_present">Conjugation Present</option>
                    <option value="imperatives">Imperatives</option>
                    <option value="masculine_feminine_plural">Masculin-Feminine-Plural</option>
                    <option value="nouns">Nouns</option>
                    <option value="prepositions">Prepositions</option>
                    <option value="pronouns">Pronouns</option>
                    <option value="verb_to_noun">Verb to Noun</option>
                    <option value="verbs">Verbs</option>
                  </select>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <div class="custom-file">
                    <input type="file" class="custom-file-input" name="file" id="xmlFile">
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <button type="button" class="btn btn-primary btn-block" onclick="uploadFile()">Upload</button>
              </div>
              <div class="col-md-6">
                <button type="button" class="btn btn-success btn-block" onclick="submitForm()">Submit</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
   ```

**Example Image of Grammar Contribution:** *Showing an error of an invalid XML file*
![HTML page for contribution to the grammar collections](https://i.imgur.com/eeKWV3C.png)

##Note:
- Ensure you have MongoDB installed and running before starting the server.
- Update your MongoDB connection string in the python and app.js files to match your MongoDB instance configuration.
- If you encounter any issues, check the server logs for detailed error messages and ensure that all environment variables are correctly set.

## References:

- Aissam Outchakoucht and Hamza Es-Samaali. "The Evolution of Darija Open Dataset: Introducing Version 2." arXiv preprint arXiv:2405.13016 (2024). [github-repository](https://github.com/darija-open-dataset/dataset/)

## Acknowledgements

This project uses the csv files for the database from Darija Open Dataset.


