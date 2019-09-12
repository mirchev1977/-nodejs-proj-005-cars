function sortCars() {
    const domIdBrand = document.getElementById('sort-layout__select');
    domIdBrand.addEventListener('change', (ev) => {
        debugger;
        let selectedSortOption = ev.target
            .children[ev.target.selectedIndex].value;
        window.location.assign(selectedSortOption);
    });
}
//# sourceMappingURL=sort-layout.js.map