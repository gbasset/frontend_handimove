const options = {
    paginationSize: 3,
    pageStartIndex: 1,
    // alwaysShowAllBtns: true, // Always show next and previous button
    withFirstAndLast: true, // Hide the going to First and Last page button
    hideSizePerPage: true, // Hide the sizePerPage dropdown always
    hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
    firstPageText: 'Début',
    prePageText: 'Précédent',
    nextPageText: 'Suivant',
    lastPageText: 'Fin',
    nextPageTitle: 'First page',
    prePageTitle: 'Pre page',
    firstPageTitle: 'Début',
    lastPageTitle: 'Last page',
    // showTotal: true,
    disablePageTitle: true,
    sizePerPageList: [{
        text: '9th', value: 9
    }]
};
export default options