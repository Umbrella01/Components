
// Déclaration de variables globales
const table = document.querySelector('#table');
const buttons = table.querySelectorAll('.import-export button');
const exportForm = table.querySelector('.datatable-export-form');
const exportCheckboxes = exportForm.querySelectorAll('input[type=checkbox]');



buttons.forEach((button) => button.addEventListener('click', function () {
    
    const tabs = this.parentNode.parentNode;
    const tabsContent = tabs.nextElementSibling;
    let activeItem = tabs.querySelector('button.active');
    let tabIndex = this.dataset.table;

    // On récupère la hauteur (height) de la tab-content du button cliqué
    let tabContentHeight = (tabsContent.querySelector(`#${tabIndex} > .form`)).getBoundingClientRect().height;
    
    if (activeItem !== null) {
        if (this.matches('button.active')) {
            this.classList.remove('active');
            tabsContent.querySelector(`#${tabIndex}`).classList.remove('show');
            tabsContent.querySelector(`#${tabIndex}`).style.maxHeight = '0px';
        } else {
            return false;
        }
        return false;
    }

    this.classList.add('active');
    tabsContent.querySelector(`#${tabIndex}`).classList.add('show');
    tabsContent.querySelector('.tab-content.show').style.maxHeight = `${tabContentHeight + 10}px`;
}));

exportCheckboxes.forEach((checkbox) => checkbox.addEventListener('click', function() {

    const newExportCheckboxes = Array.from(exportForm.querySelectorAll('input[type=checkbox]'));
    // Trouver la checkbox avec l'id tout et la retirer du tableau
    const checkboxTout = exportForm.querySelector('#tout');
    let index = newExportCheckboxes.indexOf(checkboxTout);
    if (index > -1) {
        newExportCheckboxes.splice(index, 1);
    }

    let id = this.id;
    let check = this.checked;
    // Décocger toutes les cases si "Tout sélectionner" a été coché
    if (id === 'tout' && check === false) {
        exportCheckboxes.forEach((checkbox) => checkbox.checked = false)
    }

    // Cocher toutes les cases si "Tout sélectionner" a été coché
    if (id === 'tout' && check === true) {
        exportCheckboxes.forEach((checkbox) => checkbox.checked = true)
    }

    // Vérifier si tous les éléments sont cochés
    if ((newExportCheckboxes.find(checkbox => checkbox.checked === false)) === undefined) {
        checkboxTout.checked = true;
    } else {
        checkboxTout.checked = false;
    }
    
}));


// 
// JQUERY
// 

$(document).ready( function () {
    $('#datatable').DataTable();
} );