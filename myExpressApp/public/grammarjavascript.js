//Defining the updateXMLExample function
function updateXMLExample() {
  //Getting the value of the 'category' element from the DOM
  const category = document.getElementById('category').value;
  //Initializing the xmlExample variable to an empty string
  let xmlExample = '';

  //Using a switch statement to set the XML example based on the selected category
  switch (category) {
      case 'in-definite_articles':
          //Setting the XML example for 'in-definite_articles'
            xmlExample = `
&lt;<span class="tag">corpus</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&lt;<span class="tag">entry</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span class="tag">indef</span>&gt;<span class="text">INDEFINTE FORM</span>&lt;/<span class="tag">indef</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span class="tag">def</span>&gt;<span class="text">DEFINITE FORM</span>&lt;/<span class="tag">def</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&lt;/<span class="tag">entry</span>&gt;<br>
&lt;/<span class="tag">corpus</span>&gt;

            `;
            break;
          //Setting the XML example for 'adjectives'

        case 'adjectives':
            xmlExample = `
&lt;<span class="tag">corpus</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&lt;<span class="tag">entry</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span class="tag">n1</span>&gt;<span class="text">SPELLING FORM 1</span>&lt;/<span class="tag">n1</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span class="tag">n2</span>&gt;<span class="text">SPELLING FORM 2</span>&lt;/<span class="tag">n2</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span class="tag">n3</span>&gt;<span class="text">SPELLING FORM 3</span>&lt;/<span class="tag">n3</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span class="tag rtl">darija_ar</span>&gt;<span class="text rtl">بالحروف العربية</span>&lt;/<span class="tag rtl">darija_ar</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span class="tag">eng</span>&gt;<span class="text">ENGLISH TRANSLATION</span>&lt;/<span class="tag">eng</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&lt;/<span class="tag">entry</span>&gt;<br>
&lt;/<span class="tag">corpus</span>&gt;
            `;
            break;
        //Setting the XML example for 'adverbs'
        case 'adverbs':
            xmlExample=`
&lt;<span class="tag">corpus</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&lt;<span class="tag">entry</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span class="tag">n1</span>&gt;<span class="text">SPELLING FORM 1</span>&lt;/<span class="tag">n1</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span class="tag">n2</span>&gt;<span class="text">SPELLING FORM 2</span>&lt;/<span class="tag">n2</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span class="tag">n3</span>&gt;<span class="text">SPELLING FORM 3</span>&lt;/<span class="tag">n3</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span class="tag rtl">darija_ar</span>&gt;<span class="text rtl">بالحروف العربية</span>&lt;/<span class="tag rtl">darija_ar</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span class="tag">eng</span>&gt;<span class="text">ENGLISH TRANSLATION</span>&lt;/<span class="tag">eng</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&lt;/<span class="tag">entry</span>&gt;<br>
&lt;/<span class="tag">corpus</span>&gt;
            `;
            break;
        case 'conjug_past':
        //Setting the XML example for 'conjug_past'
            xmlExample=`
&lt;<span class="tag">corpus</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&lt;<span class="tag">entry</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span class="tag">root</span>&gt;<span class="text">ROOT OF THE VERB</span>&lt;/<span class="tag">root</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span class="tag">form</span> <span class="attribute-name">pronoun</span>=<span class="attribute-value">"ana"</span>&gt;<span class="text">FORM OF PRONOUN: ANA</span>&lt;/<span class="tag">form</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span class="tag">form</span> <span class="attribute-name">pronoun</span>=<span class="attribute-value">"nta"</span>&gt;<span class="text">FORM OF PRONOUN: NTA</span>&lt;/<span class="tag">form</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span class="tag">form</span> <span class="attribute-name">pronoun</span>=<span class="attribute-value">"nti"</span>&gt;<span class="text">FORM OF PRONOUN: NTI</span>&lt;/<span class="tag">form</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span class="tag">form</span> <span class="attribute-name">pronoun</span>=<span class="attribute-value">"ntoma"</span>&gt;<span class="text">FORM OF PRONOUN: NTOMA</span>&lt;/<span class="tag">form</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span class="tag">form</span> <span class="attribute-name">pronoun</span>=<span class="attribute-value">"howa"</span>&gt;<span class="text">FORM OF PRONOUN: HOWA</span>&lt;/<span class="tag">form</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span class="tag">form</span> <span class="attribute-name">pronoun</span>=<span class="attribute-value">"hiya"</span>&gt;<span class="text">FORM OF PRONOUN: HIYA</span>&lt;/<span class="tag">form</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span class="tag">form</span> <span class="attribute-name">pronoun</span>=<span class="attribute-value">"7na"</span>&gt;<span class="text">FORM OF PRONOUN: 7NA</span>&lt;/<span class="tag">form</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span class="tag">form</span> <span class="attribute-name">pronoun</span>=<span class="attribute-value">"homa"</span>&gt;<span class="text">FORM OF PRONOUN: HOMA</span>&lt;/<span class="tag">form</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&lt;/<span class="tag">entry</span>&gt;<br>
&lt;/<span class="tag">corpus</span>&gt;

`;
break;
        case 'conjug_present':
          //Setting the XML example for 'conjug_present'
            xmlExample=`
&lt;<span class="tag">corpus</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&lt;<span class="tag">entry</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span class="tag">root</span>&gt;<span class="text">ROOT OF THE VERB</span>&lt;/<span class="tag">root</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span class="tag">form</span> <span class="attribute-name">pronoun</span>=<span class="attribute-value">"ana"</span>&gt;<span class="text">FORM OF PRONOUN: ANA</span>&lt;/<span class="tag">form</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span class="tag">form</span> <span class="attribute-name">pronoun</span>=<span class="attribute-value">"nta"</span>&gt;<span class="text">FORM OF PRONOUN: NTA</span>&lt;/<span class="tag">form</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span class="tag">form</span> <span class="attribute-name">pronoun</span>=<span class="attribute-value">"nti"</span>&gt;<span class="text">FORM OF PRONOUN: NTI</span>&lt;/<span class="tag">form</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span class="tag">form</span> <span class="attribute-name">pronoun</span>=<span class="attribute-value">"ntoma"</span>&gt;<span class="text">FORM OF PRONOUN: NTOMA</span>&lt;/<span class="tag">form</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span class="tag">form</span> <span class="attribute-name">pronoun</span>=<span class="attribute-value">"howa"</span>&gt;<span class="text">FORM OF PRONOUN: HOWA</span>&lt;/<span class="tag">form</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span class="tag">form</span> <span class="attribute-name">pronoun</span>=<span class="attribute-value">"hiya"</span>&gt;<span class="text">FORM OF PRONOUN: HIYA</span>&lt;/<span class="tag">form</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span class="tag">form</span> <span class="attribute-name">pronoun</span>=<span class="attribute-value">"7na"</span>&gt;<span class="text">FORM OF PRONOUN: 7NA</span>&lt;/<span class="tag">form</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span class="tag">form</span> <span class="attribute-name">pronoun</span>=<span class="attribute-value">"homa"</span>&gt;<span class="text">FORM OF PRONOUN: HOMA</span>&lt;/<span class="tag">form</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&lt;/<span class="tag">entry</span>&gt;<br>
&lt;/<span class="tag">corpus</span>&gt;
            `;
        break;
        case 'imperatives':
        //Setting the XML example for 'imperatives'
            xmlExample=`
&lt;<span class="tag">corpus</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&lt;<span class="tag">entry</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span class="tag">root</span>&gt;<span class="text">ROOT OF THE VERB</span>&lt;/<span class="tag">root</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span class="tag">form</span> <span class="attribute-name">pronoun</span>=<span class="attribute-value">"nta"</span>&gt;<span class="text">FORM OF PRONOUN: NTA</span>&lt;/<span class="tag">form</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span class="tag">form</span> <span class="attribute-name">pronoun</span>=<span class="attribute-value">"nti"</span>&gt;<span class="text">FORM OF PRONOUN: NTI</span>&lt;/<span class="tag">form</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span class="tag">form</span> <span class="attribute-name">pronoun</span>=<span class="attribute-value">"ntoma"</span>&gt;<span class="text">FORM OF PRONOUN: NTOMA</span>&lt;/<span class="tag">form</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&lt;/<span class="tag">entry</span>&gt;<br>
&lt;/<span class="tag">corpus</span>&gt;
`;
        break;
        case 'masculine_feminine_plural':
        //Setting the XML example for 'masculine_feminine_plural'
            xmlExample=`
&lt;<span class="tag">corpus</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&lt;<span class="tag">entry</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span class="tag">masculine</span>&gt;<span class="text">MASCULINE SINGULAR FORM</span>&lt;/<span class="tag">masculine</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span class="tag">feminine</span>&gt;<span class="text">FEMININE SINGULAR FORM</span>&lt;/<span class="tag">feminine</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span class="tag">masc_plural</span>&gt;<span class="text">MASCULINE PLURAL FORM</span>&lt;/<span class="tag">masc_plural</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span class="tag">fem_plural</span>&gt;<span class="text">FEMININE PLURAL FORM</span>&lt;/<span class="tag">fem_plural</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&lt;/<span class="tag">entry</span>&gt;<br>
&lt;/<span class="tag">corpus</span>&gt;
    `;
        break;
        //Setting the XML example for 'nouns'
        case 'nouns':
            xmlExample=`
&lt;<span class="tag">corpus</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&lt;<span class="tag">entry</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span class="tag">n1</span>&gt;<span class="text">SPELLING FORM 1</span>&lt;/<span class="tag">n1</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span class="tag">n2</span>&gt;<span class="text">SPELLING FORM 2</span>&lt;/<span class="tag">n2</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span class="tag">n3</span>&gt;<span class="text">SPELLING FORM 3</span>&lt;/<span class="tag">n3</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span class="tag rtl">darija_ar</span>&gt;<span class="text rtl">بالحروف العربية</span>&lt;/<span class="tag rtl">darija_ar</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span class="tag">eng</span>&gt;<span class="text">ENGLISH TRANSLATION</span>&lt;/<span class="tag">eng</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&lt;/<span class="tag">entry</span>&gt;<br>
&lt;/<span class="tag">corpus</span>&gt;
`;
            break;
        //Setting the XML example for 'prepoisitions'
        case 'prepositions':
            xmlExample=`
&lt;<span class="tag">corpus</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&lt;<span class="tag">entry</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span class="tag">n1</span>&gt;<span class="text">SPELLING FORM 1</span>&lt;/<span class="tag">n1</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span class="tag">n2</span>&gt;<span class="text">SPELLING FORM 2</span>&lt;/<span class="tag">n2</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span class="tag">n3</span>&gt;<span class="text">SPELLING FORM 3</span>&lt;/<span class="tag">n3</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span class="tag rtl">darija_ar</span>&gt;<span class="text rtl">بالحروف العربية</span>&lt;/<span class="tag rtl">darija_ar</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span class="tag">eng</span>&gt;<span class="text">ENGLISH TRANSLATION</span>&lt;/<span class="tag">eng</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&lt;/<span class="tag">entry</span>&gt;<br>
&lt;/<span class="tag">corpus</span>&gt;
            `;     
        break;   

        //Setting the XML example for 'pronouns'
        case 'pronouns':
            xmlExample=`
&lt;<span class="tag">corpus</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&lt;<span class="tag">entry</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span class="tag">n1</span>&gt;<span class="text">SPELLING FORM 1</span>&lt;/<span class="tag">n1</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span class="tag">n2</span>&gt;<span class="text">SPELLING FORM 2</span>&lt;/<span class="tag">n2</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span class="tag">n3</span>&gt;<span class="text">SPELLING FORM 3</span>&lt;/<span class="tag">n3</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span class="tag rtl">darija_ar</span>&gt;<span class="text rtl">بالحروف العربية</span>&lt;/<span class="tag rtl">darija_ar</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span class="tag">eng</span>&gt;<span class="text">ENGLISH TRANSLATION</span>&lt;/<span class="tag">eng</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&lt;/<span class="tag">entry</span>&gt;<br>
&lt;/<span class="tag">corpus</span>&gt;
            `;
            break;
        case 'verb_to_noun':
        
        //Setting the XML example for 'verb_to_noun'
            xmlExample=`
&lt;<span class="tag">corpus</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&lt;<span class="tag">entry</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span class="tag">verb</span>&gt;<span class="text">VERB FORM</span>&lt;/<span class="tag">verb</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span class="tag">noun</span>&gt;<span class="text">NOUN FORM</span>&lt;/<span class="tag">noun</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&lt;/<span class="tag">entry</span>&gt;<br>
&lt;/<span class="tag">corpus</span>&gt;
            `;
            break;
        case 'verbs':
        //Setting the XML example for 'verbs'
          
            xmlExample=`
&lt;<span class="tag">corpus</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&lt;<span class="tag">entry</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span class="tag">n1</span>&gt;<span class="text">SPELLING FORM 1</span>&lt;/<span class="tag">n1</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span class="tag">n2</span>&gt;<span class="text">SPELLING FORM 2</span>&lt;/<span class="tag">n2</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span class="tag">n3</span>&gt;<span class="text">SPELLING FORM 3</span>&lt;/<span class="tag">n3</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span class="tag rtl">darija_ar</span>&gt;<span class="text rtl">بالحروف العربية</span>&lt;/<span class="tag rtl">darija_ar</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span class="tag">eng</span>&gt;<span class="text">ENGLISH TRANSLATION</span>&lt;/<span class="tag">eng</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&lt;/<span class="tag">entry</span>&gt;<br>
&lt;/<span class="tag">corpus</span>&gt;
            `;
        break;
        default:
          //Setting the XML example for 'DEFAULT'
            xmlExample = `
&lt;<span class="tag">corpus</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&lt;<span class="tag">entry</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span class="tag">n1</span>&gt;<span class="text">SPELLING FORM 1</span>&lt;/<span class="tag">n1</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span class="tag">n2</span>&gt;<span class="text">SPELLING FORM 2</span>&lt;/<span class="tag">n2</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span class="tag">n3</span>&gt;<span class="text">SPELLING FORM 3</span>&lt;/<span class="tag">n3</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span class="tag rtl">darija_ar</span>&gt;<span class="text rtl">بالحروف العربية</span>&lt;/<span class="tag rtl">darija_ar</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span class="tag">eng</span>&gt;<span class="text">ENGLISH TRANSLATION</span>&lt;/<span class="tag">eng</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&lt;/<span class="tag">entry</span>&gt;<br>
&lt;/<span class="tag">corpus</span>&gt;
            `;
    }

    //Setting the inner HTML of the element with the id 'xmlExample' to the xmlExample variable
    document.getElementById('xmlExample').innerHTML = xmlExample;


   
}
//Initializing the isValid variable to false to track the validation status of the uploaded file
let isValid = false;

//Defining the uploadFile function to handle the file upload and validation
function uploadFile() {
  //The file input element and selected category from the DOM
  const fileInput = document.getElementById('xmlFile');
  const category = document.getElementById('category').value;

  //Checking if a category is selected and a file is uploaded
  if (!category || !fileInput.files[0]) {
    alert('Please select a category and upload an XML file.');
    return;
  }

  //Creating a new FormData object to hold the category and file data
  const formData = new FormData();
  formData.append('category', category);
  formData.append('file', fileInput.files[0]);

  //Sending a POST request to the /upload_grammar endpoint with the form data
  fetch('/upload_grammar', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json()) //Parsing the JSON response
  .then(data => {
    //Checking if the server indicates success
    if (data.success) {
      isValid = true; //Setting isValid to true if validation succeeds
      alert('File uploaded and validated successfully.');
    } else {
      isValid = false; //Setting isValid to false if validation fails
      alert('File validation failed: ' + data.message);
    }
  })
  .catch(error => {
    console.error('Error:', error);
    isValid = false;
    alert('An error occurred during the upload.');
  });
}

//Defining the submitForm function to handle the form submission
function submitForm() {
  //Checking if the file has been validated
  if (!isValid) {
    alert('Please ensure the file is valid before submitting.');
    return;
  }

  //Getting the selected category from the DOM
  const category = document.getElementById('category').value;

  //Sending a POST request to the /submit_grammar on server side with the selected category
  fetch('/submit_grammar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ category })
  })
  .then(response => response.json())
  .then(data => {
    //Checking if the server indicates success
    if (data.success) {
      alert(data.message);
      document.getElementById('contributeForm').reset(); //reset the form
      isValid = false; //reset isValid to false
    } else {
      alert('Submission failed: ' + data.message);
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('An error occurred during the submission.');
  });
}

//Let's add an event listener to the file input element to update the label with the selected file name
document.getElementById('xmlFile').addEventListener('change', function() {
  //the selected file name
  const fileName = this.files[0].name;
  //the next element to display the file name
  const nextSibling = this.nextElementSibling;
  //
  nextSibling.innerText = fileName;
});
