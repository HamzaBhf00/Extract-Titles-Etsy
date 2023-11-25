    function extractTitles() {
      const htmlCode = document.getElementById('htmlCode').value;
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlCode, 'text/html');

      const extractedTitles = [];

      const elementsWithId = doc.querySelectorAll('[data-listing-id]');

      elementsWithId.forEach(element => {
        const listingId = element.getAttribute('data-listing-id');
        const target = doc.querySelector(`[target="etsy.${listingId}"]`);
        
        if (target) {
          const title = target.getAttribute('title');
          if (title) {
            extractedTitles.push(title);
          }
        }
      });

      const titlesList = document.getElementById('titlesList');
      titlesList.innerHTML = '';

      extractedTitles.forEach(title => {
        const listItem = document.createElement('li');
        listItem.textContent = title;
        titlesList.appendChild(listItem);
      });

      const titlesDiv = document.getElementById('titles');
      titlesDiv.style.display = 'block';
    }

    function copyAllTitles() {
      const titlesList = document.getElementById('titlesList');
      const titles = Array.from(titlesList.getElementsByTagName('li')).map(li => li.textContent).join('\n');

      const tempTextArea = document.createElement('textarea');
      tempTextArea.value = titles;
      document.body.appendChild(tempTextArea);

      tempTextArea.select();
      document.execCommand('copy');
      document.body.removeChild(tempTextArea);

      alert('Titles copied to clipboard!');
    }

    function downloadAsCSV() {
      const titlesList = document.getElementById('titlesList');
      const titles = Array.from(titlesList.getElementsByTagName('li')).map(li => li.textContent);

      const csvContent = 'data:text/csv;charset=utf-8,' + titles.map(title => `"${title}"`).join('\n');

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', 'extracted_titles.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }