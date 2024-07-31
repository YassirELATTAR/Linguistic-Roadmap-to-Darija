//We initialize the app variables here that we need to create all interactions between front-end and server-end
//This is a nodejs app.
//First variable is initializing the expressjs framework
const express = require('express');
//Getting the client of Mongodb using mongodb library
const { MongoClient } = require('mongodb');
//The path here is used in to create paths to files for reading/editing them on the server.
const path = require('path');
//Initializing multer to be able to manipulate the storage on the server
const multer = require('multer');
//Initializing fs variable, which allows reading, editing and accessing files.
const fs = require('fs');
//Initializing libxmljs, which allows for parsing xml/xsd into js variables from files (used for upload and validations against xsd)
const libxmljs = require('libxmljs');
//Initializing xml2js, which helps in reading xml files from different formats to be added to database.
const xml2js = require('xml2js');
//Initializing bodyParser
const bodyParser = require('body-parser');

const app = express(); //creating an app of expressjs
const port = 3000; //We are using the port 3000 to access the html page

//Mongodb connection string
const uri = 'mongodb://localhost:27017';
//Creating a new MongoDB client
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

//Setting view engine to EJS
app.set('view engine', 'ejs');
//Setting views directory which includes access pages (display)
app.set('views', './views');

//Connecting to MongoDB
client.connect((err) => {
  if (err) {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  } else {
    console.log('Connected to MongoDB');
    //Starting the server:
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  }
});

//getting static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(express.json());

//defining a route for the main page (index.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


//dealing with contributions functions:
//setting up multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    let category = req.body.category ? req.body.category.toLowerCase() : 'empty';
    cb(null, `${Date.now()}-${category}.xml`);
  }
});


//Initializing upload middleware with storage settings
const upload = multer({ storage: storage });
//variable to keep track of validation status
let isValid = false;
//variable to store the path of the uploaded file
let uploadedFilePath = '';

//upload and validate vocabulary file:
/*This function serves to first upload the file to the server.
Second, it checks if the file is valid and if it is, it saves it to the server (in uploads folder), else it removes it 
Finally, it returns the message whether the file is validated or not and if not, it returns the erros.
*/
app.post('/upload_vocab', upload.single('file'), (req, res) => {
  const category = req.body.category.toLowerCase();
  uploadedFilePath = req.file.path;
  const finalFilePath = path.join('uploads', `${category}.xml`);

  // Determine the correct XSD file path based on the category
  const xsdFileName = (category === 'femalenames' || category === 'malenames') ? 'names.xsd' : 'darija_most.xsd';
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
          fs.rename(uploadedFilePath, finalFilePath, (err) => {
            if (err) {
              return res.status(500).json({ success: false, message: 'Error moving the file.' });
            }
            isValid = true;
            uploadedFilePath = finalFilePath;
            return res.status(200).json({ success: true, message: 'File is well-formed and valid.' });
          });
        } else {
          //Deleting the file if invalid
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
        //Handling validation errors and returning the message to the alert message
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

//saving vocab contributions to the database:
/*
This function serves to submit the file to the database. It first checks if the file has already been validated and uploaded.
Then, it loops through the xml file and convert it to a js variable, which is then saved to the database using the query: insertMany
*/
app.post('/submit_vocab', async (req, res) => {
  //console.log("Submit endpoint called");
  if (!isValid || !uploadedFilePath) {
    //console.log("File is not valid or not uploaded.");
    return res.status(400).json({ success: false, message: 'File is not valid or not uploaded.' });
  }

  const category = req.body.category.toLowerCase();
  //console.log(`Category: ${category}`);

  try {
    //Connecting to the database
    await client.connect();
    const database = client.db('darijadatabase');
    const collection = database.collection(category);

    //Reading and parsing the XML file
    const xmlData = await fs.promises.readFile(uploadedFilePath, 'utf8');
    const result = await xml2js.parseStringPromise(xmlData);

    
    const entries = result.corpus.entry;
    const documents = entries.map(entry => {
      const doc = {};
      for (const [key, value] of Object.entries(entry)) {
        doc[key] = value[0];
      }
      return doc;
    });

    //Inserting documents into the database
    await collection.insertMany(documents);

    //Resetting validation state and uploaded file path for other actions
    isValid = false;
    uploadedFilePath = '';

    //console.log("Documents inserted successfully");
    // Respond with success/error message
    return res.status(200).json({ success: true, message: 'Thank you for your contribution, the file was loaded successfully to the database' });
  } catch (err) {
    console.log("Error:", err.message, err.stack);
    return res.status(500).json({ success: false, message: 'An error occurred during submission.' });
  }
});

//Grammar functions:
/*This function serves to first upload the file to the server.
Second, it checks if the file is valid and if it is, it saves it to the server (in uploads folder), else it removes it 
Finally, it returns the message whether the file is validated or not and if not, it returns the erros.
*/
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

//save grammar to db:
/*
This function serves to submit the file to the database. It first checks if the file has already been validated and uploaded.
Then, it loops through the xml file and convert it to a js variable, which is then saved to the database using the query: insertMany
*/
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

//upload and validate sentences file:
/*This function serves to first upload the file to the server.
Second, it checks if the file is valid and if it is, it saves it to the server (in uploads folder), else it removes it 
Finally, it returns the message whether the file is validated or not and if not, it returns the erros.
*/
app.post('/upload_sentences', upload.single('file'), (req, res) => {
  //const category = req.body.category.toLowerCase();
  uploadedFilePath = req.file.path;
  const finalFilePath = path.join('uploads', 'sentences.xml');

  // Determine the correct XSD file path based on the category
  const xsdFileName = 'sentences.xsd';
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
          fs.rename(uploadedFilePath, finalFilePath, (err) => {
            if (err) {
              return res.status(500).json({ success: false, message: 'Error moving the file.' });
            }
            isValid = true;
            uploadedFilePath = finalFilePath;
            return res.status(200).json({ success: true, message: 'File is well-formed and valid.' });
          });
        } else {
           //Deleting the file if invalid
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
        //Handling validation errors and returning the message to the alert message
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

//saving sentences to db:
/*
This function serves to submit the file to the database. It first checks if the file has already been validated and uploaded.
Then, it loops through the xml file and convert it to a js variable, which is then saved to the database using the query: insertMany
*/
app.post('/submit_sentences', async (req, res) => {
  //Making sure the file has already been validated and uploaded
  if (!isValid || !uploadedFilePath) {
    //console.log("File is not valid or not uploaded.");
    return res.status(400).json({ success: false, message: 'File is not valid or not uploaded.' });
  }

  try {
    //Connecting to the database
    await client.connect();
    const database = client.db('darijadatabase');
    const collection = database.collection('sentences');
    //Reading and parsing the XML file
    const xmlData = await fs.promises.readFile(uploadedFilePath, 'utf8');
    const result = await xml2js.parseStringPromise(xmlData);

    const entries = result.corpus.entry;
    const documents = entries.map(entry => {
      const doc = {};
      for (const [key, value] of Object.entries(entry)) {
        doc[key] = value[0];
      }
      return doc;
    });

    //Inserting documents into the database
    await collection.insertMany(documents);

    //Resetting validation state and uploaded file path for other actions
    isValid = false;
    uploadedFilePath = '';

    //console.log("Documents inserted successfully");
    // Respond with success/error message
    return res.status(200).json({ success: true, message: 'Thank you for your contribution, the file was loaded successfully to the database' });
  } catch (err) {
    console.log("Error:", err.message, err.stack);
    return res.status(500).json({ success: false, message: 'An error occurred during submission.' });
  }
});

//Contribution:
/*
The following three functions initialize the pages for contributions. It simply display the correct html page for the category that was chosen from the menu.
*/
app.get('/contribute/vocabulary', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contribute/vocabulary.html'));
});

app.get('/contribute/grammar', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contribute/grammar.html'));
});

app.get('/contribute/sentences', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contribute/sentences.html'));
});

//Sentences:
/*
This functions reads the data from the database and returns the results to be displayed on the page of sentences.
The functions first takes the query which contains the which page. Each page displays only 100 entries. The reason is that this collection is very long.
It returns the results which are passed to the sentences.ejs where they are displayed in a table.
*/
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

//Grammar:
/*
Similarly to the function of sentences, this one reads the data from the database and returns the results to be displayed on the page of definite_indefinite in grammar category.
The display here is not limited to 100 entries because there are as many.
Below are similar functions for each category of the grammar:
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

*/

//Function to get definite indefinite articles and their examples
app.get('/grammar/definite_indefinite', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('darijadatabase');
    const collection = database.collection('in-definite_articles');
    const in_definite_articles = await collection.find({}).toArray();
    
    // Process the data to get the unique headers
    const headers = new Set();
    in_definite_articles.forEach(article => {
      Object.keys(article).forEach(key => {
        if (key !== '_id') headers.add(key);
      });
    });

    res.render('grammar/definite_indefinite', { headers: Array.from(headers), in_definite_articles });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    await client.close();
  }
});

//Function to get adjectives examples
app.get('/grammar/adjectives', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('darijadatabase');
    const collection = database.collection('adjectives');
    const adjectives = await collection.find({}).toArray();
    
    // Process the data to get the unique headers
    const headers = new Set();
    adjectives.forEach(adjective => {
      Object.keys(adjective).forEach(key => {
        if (key !== '_id') headers.add(key);
      });
    });

    res.render('grammar/adjectives', { headers: Array.from(headers), adjectives });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    await client.close();
  }
});

//Function to get adverbs examples
app.get('/grammar/adverbs', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('darijadatabase');
    const collection = database.collection('adverbs');
    const adverbs = await collection.find({}).toArray();
    
    // Process the data to get the unique headers
    const headers = new Set();
    adverbs.forEach(adverb => {
      Object.keys(adverb).forEach(key => {
        if (key !== '_id') headers.add(key);
      });
    });

    res.render('grammar/adverbs', { headers: Array.from(headers), adverbs });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    await client.close();
  }
});

//Function to get examples of verbs in past
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

//Function to get examples of verbs in present
app.get('/grammar/conjug_present', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('darijadatabase');
    const collection = database.collection('conjug_present');
    const conjug_present = await collection.find({}).toArray();
    
    // Process the data to get the unique headers
    const headers = new Set();
    conjug_present.forEach(form => {
      Object.keys(form).forEach(key => {
        if (key !== '_id') headers.add(key);
      });
    });

    res.render('grammar/conjug_present', { headers: Array.from(headers), conjug_present });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    await client.close();
  }
});

//Function to get examples of imperatives
app.get('/grammar/imperatives', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('darijadatabase');
    const collection = database.collection('imperatives');
    const imperatives = await collection.find({}).toArray();
    
    // Process the data to get the unique headers
    const headers = new Set();
    imperatives.forEach(imperative => {
      Object.keys(imperative).forEach(key => {
        if (key !== '_id') headers.add(key);
      });
    });

    res.render('grammar/imperatives', { headers: Array.from(headers), imperatives });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    await client.close();
  }
});

//Function to get examples of singular (feminine/ masculine) and their plural (feminine/ masculine)
app.get('/grammar/masculin_feminine_plural', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('darijadatabase');
    const collection = database.collection('masculine_feminine_plural');
    const masculine_feminine_plural = await collection.find({}).toArray();
    
    // Process the data to get the unique headers
    const headers = new Set();
    masculine_feminine_plural.forEach(form => {
      Object.keys(form).forEach(key => {
        if (key !== '_id') headers.add(key);
      });
    });

    res.render('grammar/masculin_feminine_plural', { headers: Array.from(headers), masculine_feminine_plural });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    await client.close();
  }
});

//Function to get nouns examples
app.get('/grammar/nouns', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('darijadatabase');
    const collection = database.collection('nouns');
    const nouns = await collection.find({}).toArray();
    
    // Process the data to get the unique headers
    const headers = new Set();
    nouns.forEach(noun => {
      Object.keys(noun).forEach(key => {
        if (key !== '_id') headers.add(key);
      });
    });

    res.render('grammar/nouns', { headers: Array.from(headers), nouns });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    await client.close();
  }
});

//Function to get prepositions examples
app.get('/grammar/prepositions', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('darijadatabase');
    const collection = database.collection('prepositions');
    const prepositions = await collection.find({}).toArray();
    
    // Process the data to get the unique headers
    const headers = new Set();
    prepositions.forEach(preposition => {
      Object.keys(preposition).forEach(key => {
        if (key !== '_id') headers.add(key);
      });
    });

    res.render('grammar/prepositions', { headers: Array.from(headers), prepositions });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    await client.close();
  }
});

//Function to get pronouns of darija
app.get('/grammar/pronouns', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('darijadatabase');
    const collection = database.collection('pronouns');
    const pronouns = await collection.find({}).toArray();
    
    // Process the data to get the unique headers
    const headers = new Set();
    pronouns.forEach(pronoun => {
      Object.keys(pronoun).forEach(key => {
        if (key !== '_id') headers.add(key);
      });
    });

    res.render('grammar/pronouns', { headers: Array.from(headers), pronouns });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    await client.close();
  }
});

//Function to get nominalisation examples in darija
app.get('/grammar/verb-to-noun', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('darijadatabase');
    const collection = database.collection('verb_to_noun');
    const verb_to_noun = await collection.find({}).toArray();
    
    // Process the data to get the unique headers
    const headers = new Set();
    verb_to_noun.forEach(form => {
      Object.keys(form).forEach(key => {
        if (key !== '_id') headers.add(key);
      });
    });

    res.render('grammar/verb-to-noun', { headers: Array.from(headers), verb_to_noun });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    await client.close();
  }
});

//Function to get verbs examples
app.get('/grammar/verbs', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('darijadatabase');
    const collection = database.collection('verbs');
    const verbs = await collection.find({}).toArray();
    
    // Process the data to get the unique headers
    const headers = new Set();
    verbs.forEach(verb => {
      Object.keys(verb).forEach(key => {
        if (key !== '_id') headers.add(key);
      });
    });

    res.render('grammar/verbs', { headers: Array.from(headers), verbs });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    await client.close();
  }
});

//VOCABULARY:
/*
The following functions return the list of vocabulary according to the selected catagory from the menu.
They do the same thing:
1- connect to database
2- get the collection with the name
3- Read through each item and add the values to a collection except for the value of '_id' which is not needed
4- Render/ return the value to the .ejs page of the category
5- returns an error if something is wrong with the connection to the database.
6- It closes the connection at the end. 

The categories of the vocabulary are:
- animals
- art
- clothes
- colors
- economy
- education
- emotions
- environment
- family
- femalenames
- malenames
- food
- health
- humanbody
- numbers
- places
- plants
- professions
- religion
- sports
- time
 */
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

app.get('/vocabulary/art', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('darijadatabase');
    const collection = database.collection('art');
    const art = await collection.find({}).toArray();
    
    // Process the data to get the unique headers
    const headers = new Set();
    art.forEach(arti => {
      Object.keys(arti).forEach(key => {
        if (key !== '_id') headers.add(key);
      });
    });

    res.render('vocabulary/art', { headers: Array.from(headers), art });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    await client.close();
  }
});

app.get('/vocabulary/clothes', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('darijadatabase');
    const collection = database.collection('clothes');
    const clothes = await collection.find({}).toArray();
    
    // Process the data to get the unique headers
    const headers = new Set();
    clothes.forEach(clothe => {
      Object.keys(clothe).forEach(key => {
        if (key !== '_id') headers.add(key);
      });
    });

    res.render('vocabulary/clothes', { headers: Array.from(headers), clothes });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    await client.close();
  }
});

app.get('/vocabulary/colors', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('darijadatabase'); 
    const collection = database.collection('colors');
    const colors = await collection.find({}).toArray();
    
    // Process the data to get the unique headers
    const headers = new Set();
    colors.forEach(color => {
      Object.keys(color).forEach(key => {
        if (key !== '_id') headers.add(key);
      });
    });

    res.render('vocabulary/colors', { headers: Array.from(headers), colors });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    await client.close();
  }
});

app.get('/vocabulary/economy', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('darijadatabase');
    const collection = database.collection('economy');
    const economy = await collection.find({}).toArray();
    
    // Process the data to get the unique headers
    const headers = new Set();
    economy.forEach(eco => {
      Object.keys(eco).forEach(key => {
        if (key !== '_id') headers.add(key);
      });
    });

    res.render('vocabulary/economy', { headers: Array.from(headers), economy });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    await client.close();
  }
});

app.get('/vocabulary/education', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('darijadatabase');
    const collection = database.collection('education');
    const education = await collection.find({}).toArray();
    
    // Process the data to get the unique headers
    const headers = new Set();
    education.forEach(ed => {
      Object.keys(ed).forEach(key => {
        if (key !== '_id') headers.add(key);
      });
    });

    res.render('vocabulary/education', { headers: Array.from(headers), education });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    await client.close();
  }
});

app.get('/vocabulary/emotions', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('darijadatabase');
    const collection = database.collection('emotions');
    const emotions = await collection.find({}).toArray();
    
    // Process the data to get the unique headers
    const headers = new Set();
    emotions.forEach(emotion => {
      Object.keys(emotion).forEach(key => {
        if (key !== '_id') headers.add(key);
      });
    });

    res.render('vocabulary/emotions', { headers: Array.from(headers), emotions });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    await client.close();
  }
});

app.get('/vocabulary/environment', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('darijadatabase');
    const collection = database.collection('environment');
    const environment = await collection.find({}).toArray();
    
    // Process the data to get the unique headers
    const headers = new Set();
    environment.forEach(environmentitem => {
      Object.keys(environmentitem).forEach(key => {
        if (key !== '_id') headers.add(key);
      });
    });

    res.render('vocabulary/environment', { headers: Array.from(headers), environment });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    await client.close();
  }
});

app.get('/vocabulary/family', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('darijadatabase');
    const collection = database.collection('family');
    const family = await collection.find({}).toArray();
    
    // Process the data to get the unique headers
    const headers = new Set();
    family.forEach(familymember => {
      Object.keys(familymember).forEach(key => {
        if (key !== '_id') headers.add(key);
      });
    });

    res.render('vocabulary/family', { headers: Array.from(headers), family });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    await client.close();
  }
});

app.get('/vocabulary/femalenames', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('darijadatabase');
    const collection = database.collection('femalenames');
    const femalenames = await collection.find({}).toArray();
    
    // Process the data to get the unique headers
    const headers = new Set();
    femalenames.forEach(name => {
      Object.keys(name).forEach(key => {
        if (key !== '_id') headers.add(key);
      });
    });

    res.render('vocabulary/femalenames', { headers: Array.from(headers), femalenames });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    await client.close();
  }
});

app.get('/vocabulary/malenames', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('darijadatabase');
    const collection = database.collection('malenames');
    const malenames = await collection.find({}).toArray();
    
    // Process the data to get the unique headers
    const headers = new Set();
    malenames.forEach(name => {
      Object.keys(name).forEach(key => {
        if (key !== '_id') headers.add(key);
      });
    });

    res.render('vocabulary/malenames', { headers: Array.from(headers), malenames });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    await client.close();
  }
});

app.get('/vocabulary/food', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('darijadatabase');
    const collection = database.collection('food');
    const food = await collection.find({}).toArray();
    
    // Process the data to get the unique headers
    const headers = new Set();
    food.forEach(foodie => {
      Object.keys(foodie).forEach(key => {
        if (key !== '_id') headers.add(key);
      });
    });

    res.render('vocabulary/food', { headers: Array.from(headers), food });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    await client.close();
  }
});

app.get('/vocabulary/health', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('darijadatabase');
    const collection = database.collection('health');
    const health = await collection.find({}).toArray();
    
    // Process the data to get the unique headers
    const headers = new Set();
    health.forEach(heal => {
      Object.keys(heal).forEach(key => {
        if (key !== '_id') headers.add(key);
      });
    });

    res.render('vocabulary/health', { headers: Array.from(headers), health });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    await client.close();
  }
});

app.get('/vocabulary/humanbody', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('darijadatabase');
    const collection = database.collection('humanbody');
    const humanbody = await collection.find({}).toArray();
    
    // Process the data to get the unique headers
    const headers = new Set();
    humanbody.forEach(humanb => {
      Object.keys(humanb).forEach(key => {
        if (key !== '_id') headers.add(key);
      });
    });

    res.render('vocabulary/humanbody', { headers: Array.from(headers), humanbody });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    await client.close();
  }
});

app.get('/vocabulary/numbers', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('darijadatabase');
    const collection = database.collection('numbers');
    const numbers = await collection.find({}).toArray();
    
    // Process the data to get the unique headers
    const headers = new Set();
    numbers.forEach(num => {
      Object.keys(num).forEach(key => {
        if (key !== '_id') headers.add(key);
      });
    });

    res.render('vocabulary/numbers', { headers: Array.from(headers), numbers });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    await client.close();
  }
});

app.get('/vocabulary/places', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('darijadatabase');
    const collection = database.collection('places');
    const places = await collection.find({}).toArray();
    
    // Process the data to get the unique headers
    const headers = new Set();
    places.forEach(place => {
      Object.keys(place).forEach(key => {
        if (key !== '_id') headers.add(key);
      });
    });

    res.render('vocabulary/places', { headers: Array.from(headers), places });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    await client.close();
  }
});

app.get('/vocabulary/plants', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('darijadatabase');
    const collection = database.collection('plants');
    const plants = await collection.find({}).toArray();
    
    // Process the data to get the unique headers
    const headers = new Set();
    plants.forEach(plant => {
      Object.keys(plant).forEach(key => {
        if (key !== '_id') headers.add(key);
      });
    });

    res.render('vocabulary/plants', { headers: Array.from(headers), plants });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    await client.close();
  }
});

app.get('/vocabulary/professions', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('darijadatabase');
    const collection = database.collection('professions');
    const professions = await collection.find({}).toArray();
    
    // Process the data to get the unique headers
    const headers = new Set();
    professions.forEach(profession => {
      Object.keys(profession).forEach(key => {
        if (key !== '_id') headers.add(key);
      });
    });

    res.render('vocabulary/professions', { headers: Array.from(headers), professions });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    await client.close();
  }
});

app.get('/vocabulary/religion', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('darijadatabase');
    const collection = database.collection('religion');
    const religion = await collection.find({}).toArray();
    
    // Process the data to get the unique headers
    const headers = new Set();
    religion.forEach(relig => {
      Object.keys(relig).forEach(key => {
        if (key !== '_id') headers.add(key);
      });
    });

    res.render('vocabulary/religion', { headers: Array.from(headers), religion });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    await client.close();
  }
});

app.get('/vocabulary/sports', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('darijadatabase');
    const collection = database.collection('sport');
    const sports = await collection.find({}).toArray();
    
    // Process the data to get the unique headers
    const headers = new Set();
    sports.forEach(sport => {
      Object.keys(sport).forEach(key => {
        if (key !== '_id') headers.add(key);
      });
    });

    res.render('vocabulary/sports', { headers: Array.from(headers), sports });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    await client.close();
  }
});

app.get('/vocabulary/time', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('darijadatabase');
    const collection = database.collection('time');
    const time = await collection.find({}).toArray();
    
    // Process the data to get the unique headers
    const headers = new Set();
    time.forEach(timing => {
      Object.keys(timing).forEach(key => {
        if (key !== '_id') headers.add(key);
      });
    });

    res.render('vocabulary/time', { headers: Array.from(headers), time });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    await client.close();
  }
});



/**
 * This function handles the '/search' to perform a search across all collections in the database.
 1- It first connects to the database and retrieves all collections.
 2- For each collection, it searches for documents where the 'eng' field matches the query parameter which was entereed in the search form.
 3- It then filters these results to include only those with an 'n1' property.
 4- For each 'n1' value, it performs a another search in the 'sentences' collection to find matching sentences to display examples.
 5- Finally, it returns the combined results as a JSON response to the html page for display.
 */

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

/**
 * This function handles the '/spelling-stats' to gather statistics on the occurrence of specific spelling forms across all collections in the database.
 1- It first connects to the database and retrieves all collections.
 2- For each collection, it iterates through all documents and counts the occurrences of the fields 'n1' through 'n6'.
 3- Finally, it returns the counts of these fields as a JSON response to be displayed on the html page.
 **This function is run everytime the index.html (main page) gets reloaded.
 */

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



/**
 * This function starts the Express server and listens on the specified port.
  When the server is successfully started, it logs a message indicating the URL where the server is running (this is added to make sure here is no error).
 */

app.listen(port, () => {
  //Logging the server URL once it starts
  console.log(`Server is running at http://localhost:${port}`);
});