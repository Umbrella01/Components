// VARIABLES
const uploadBox = document.querySelector('.upload');
const triggerFile = uploadBox.querySelector('#triggerFile');
const selectField = uploadBox.querySelector('input[type=file]');
const drop = uploadBox.querySelector('#drop');
const footer = uploadBox.querySelector('.footer');
const listFiles = uploadBox.querySelector('.list-files');
const form = uploadBox.querySelector('.upload-form');

// FUNCTIONS
function handleFileSelect(e) {
    const files = selectField.files; // FileList Object

    // Files template | Modèle de fichiers
    let template = `${Object.keys(files)
        .map((file) => `<div class="file file-${file}">
        <div class="name"><span>${files[file].name}</span></div>
        <div class="progress active"></div>
        </div>`)
        .join("")}`;

    // Add classes to drop and footer and fill list-files
    // Ajouter des classes à drop et footer; et remplir list-files
    drop.classList.add('hidden');
    footer.classList.add('hasFiles');

    // Fill list-files
    footer.addEventListener('transitionend', function() {
        listFiles.innerHTML = template;
        listFiles.classList.add('filled');

        Object.keys(files).forEach((file) => {
            let loadTime = Math.round((files[file].size / 1024));
            let fileItem = listFiles.querySelector(`.file-${file}`);
            let progressBar = fileItem.querySelector(".progress");
            let progressBarActive = fileItem.querySelector(".progress.active");

            fileItem.addEventListener('animationend', function(e) {
                // e.stopPropagation();
                progressBarActive.animate([
                    {backgroundSize: '0 100%'},
                    {backgroundSize: '100% 100%'}
                ], {
                    duration: loadTime,
                    easing: 'linear'
                });

                setTimeout(() => {
                    progressBar.classList.add("loaded")
                    progressBar.classList.remove("active");
                }, loadTime);
            });
        });
    });
};


// Trigger input | Déclencheur de input
triggerFile.addEventListener('click', function (e) {
    e.preventDefault();
    selectField.click();
});

// Dragenter
drop.addEventListener('dragenter', (e) => {
    drop.classList.add('active');
});

// Dragover
drop.addEventListener('dragover', (e) => {
    e.preventDefault();
    drop.classList.add('active');
});

// Dragleave
drop.addEventListener('dragleave', (e) => {
    drop.classList.remove('active');
});

// Drop
drop.addEventListener('drop', (e) => {
    e.preventDefault();
    drop.classList.remove('active');
    selectField.files = e.dataTransfer.files;
    if (selectField.files) {
        handleFileSelect(selectField);
    }
});

// Select changes
selectField.addEventListener('change', handleFileSelect);

// Cancel importation
form.addEventListener('reset', (e) => {
    console.log(listFiles);
    footer.classList.remove('hasFiles');
    drop.classList.remove('hidden');
    setTimeout(() => {
        uploadBox.querySelector('.list-files').innerHTML = "<!-- Template -->";
        uploadBox.querySelector('.list-files').classList.remove('filled');
    }, 500);
});
