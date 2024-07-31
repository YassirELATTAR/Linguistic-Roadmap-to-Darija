function updateXMLExample() {
    const category = document.getElementById('category').value;
    let xmlExample = '';

    switch (category) {
        case 'in-definite_articles':
            xmlExample = `
&lt;<span class="tag">corpus</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&lt;<span class="tag">entry</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span class="tag">indef</span>&gt;<span class="text">INDEFINTE FORM</span>&lt;/<span class="tag">indef</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span class="tag">def</span>&gt;<span class="text">DEFINITE FORM</span>&lt;/<span class="tag">def</span>&gt;<br>
&nbsp;&nbsp;&nbsp;&lt;/<span class="tag">entry</span>&gt;<br>
&lt;/<span class="tag">corpus</span>&gt;

            `;
            break;
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

    // Update the XML example element
    document.getElementById('xmlExample').innerHTML = xmlExample;


   
}
let isValid = false;

function uploadFile() {
  const fileInput = document.getElementById('xmlFile');
  const category = document.getElementById('category').value;

  if (!category || !fileInput.files[0]) {
    alert('Please select a category and upload an XML file.');
    return;
  }

  const formData = new FormData();
  formData.append('category', category);
  formData.append('file', fileInput.files[0]);

  fetch('/upload_grammar', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      isValid = true;
      alert('File uploaded and validated successfully.');
    } else {
      isValid = false;
      alert('File validation failed: ' + data.message);
    }
  })
  .catch(error => {
    console.error('Error:', error);
    isValid = false;
    alert('An error occurred during the upload.');
  });
}

function submitForm() {
  if (!isValid) {
    alert('Please ensure the file is valid before submitting.');
    return;
  }

  const category = document.getElementById('category').value;

  fetch('/submit_grammar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ category })
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert(data.message);
        document.getElementById('contributeForm').reset();
        isValid = false;
      } else {
        alert('Submission failed: ' + data.message);
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred during the submission.');
    });
}

document.getElementById('xmlFile').addEventListener('change', function() {
  const fileName = this.files[0].name;
  const nextSibling = this.nextElementSibling;
  nextSibling.innerText = fileName;
});