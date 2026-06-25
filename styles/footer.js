class MyFooter extends HTMLElement {
    connectedCallback() {
        const currentYear = new Date().getFullYear();
        this.innerHTML = `    
            <footer>
                <div class="inner-footer">
                    <div class="footer-info">
                        <p><b>&copy; ${currentYear} Your Name. All rights reserved. </b></p>
                        <p> 
                 
                           Icons by <a href="https://fontawesome.com/" target="_blank" style="color: inherit; text-decoration: none;">Font Awesome</a>.
                        </p>
                    </div>

                    <div class="social-links"></div>
                </div>
            </footer>
        `;
        this.loadSocialLinks();
    }

    loadSocialLinks() {
        fetch('/data/user_info.json')
            .then(response => response.ok ? response.json() : Promise.reject('Failed to load user info'))
            .then(data => {
                const socialContainer = this.querySelector('.social-links');
                if (!socialContainer) return;
                
                data.social.forEach(account => {
                    const a = document.createElement('a');
                    a.href = account.url;
                    a.target = '_blank';
                    const img = document.createElement('img');
                    img.src = account.icon;
                    img.alt = account.name;
                    a.appendChild(img);
                    socialContainer.appendChild(a);
                });
            })
            .catch(error => console.error('Error loading social links:', error));
    }
}
customElements.define('my-footer', MyFooter)
