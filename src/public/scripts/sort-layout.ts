function sortCars () {
    const domIdBrand    = document.getElementById( 'sort-layout__select'    );

    domIdBrand.addEventListener( 'change', ( ev ) => {
        let selectedSortOption = (<HTMLOptionElement>(<HTMLInputElement>ev.target)
            .children[(<HTMLSelectElement>ev.target).selectedIndex]).value;

        window.location.assign( selectedSortOption );
    } ); 
}