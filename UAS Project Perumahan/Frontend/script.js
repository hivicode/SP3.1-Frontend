/* ==========================================================================
   WEBFLOW FEATURE FLAGS
   ========================================================================== */
! function(o, c) {
	var n = c.documentElement,
		t = " w-mod-";
	n.className += t + "js", ("ontouchstart" in o || o.DocumentTouch && c instanceof DocumentTouch) && (n.className += t + "touch")
}(window, document);

/* ==========================================================================
   HEADER + FOOTER INJECTION
   ========================================================================== */
// Load Header and Footer
document.addEventListener('DOMContentLoaded', function() {
    const reinitIx = () => {
        if (window.Webflow && typeof window.Webflow.require === 'function') {
            const ix = window.Webflow.require('ix2');
            if (ix && typeof ix.init === 'function') {
                ix.init();
            }
        }
    };

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const useMinimalHeader = ['checkout.html', 'listing.html', 'contact.html', 'property.html'].includes(currentPage);
    const headerFile = useMinimalHeader ? 'components/header-minimal.html' : 'components/header.html';
    
    console.log('Current page:', currentPage);
    console.log('Use minimal header:', useMinimalHeader);
    console.log('Header file:', headerFile);
    
    fetch(headerFile)
        .then(response => {
            console.log('Header response status:', response.status);
            return response.text();
        })
        .then(data => {
            console.log('Header data loaded, length:', data.length);
            const headerContainer = document.getElementById('header-container');
            if (headerContainer) {
                headerContainer.innerHTML = data;
                console.log('Header injected successfully');
                reinitIx();
            } else {
                console.error('Header container not found');
            }
        })
        .catch(error => console.error('Error loading header:', error));

    fetch('components/footer.html')
        .then(response => response.text())
        .then(data => {
            const footerContainer = document.getElementById('footer-container');
            if (footerContainer) {
                footerContainer.innerHTML = data;
                reinitIx();
            }
        })
        .catch(error => console.error('Error loading footer:', error));
});
