"use strict";

document.addEventListener('DOMContentLoaded', () => {
    
    async function getData(url) {
        try {
            const response = await fetch(url);
            
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            
            const data = await response.json();
            return data;
        } catch (err) {
            console.error('Error fetching data:', err);
            return null;
        }
    }

    async function fetchMembers() {
        const data = await members();
        if (data) {
            displayMembers(data);
        }
    }
    
    const members = async () => await getData('data/members.json');
    fetchMembers();

    const title = document.querySelector('.currentPageTitle');
    if (title) {
        title.textContent = document.title.split(' | ')[1];
    }

    for (const page of document.querySelector('nav').children) {
        if (page.textContent === document.title.split(' | ')[1].toLowerCase()) {
            page.classList.add('active');
        } else {
            page.classList.remove('active');
        }
    }

    const nav = document.getElementById('menu');
    const menuMobile = document.getElementById('menu-mobile');
    menuMobile.addEventListener('click', () => {
        if (menuMobile.textContent === '☰') {
            menuMobile.textContent = 'X';
            nav.style.display = 'flex';
            nav.style.top = '0px';
        } else {
            menuMobile.textContent = '☰';
            nav.style.display = 'none';
            nav.style.top = '-100vw';
        }
    });

    const view_selector = document.getElementById('view_selector');
    const content = document.getElementById('content');

    Array.from(view_selector.children).forEach(button => {
        button.addEventListener('click', () => {
            if (button.textContent === 'Grid') {
                content.classList.remove('list')
                content.classList.add('grid')
            } else if (button.textContent === 'List') {
                content.classList.remove('grid')
                content.classList.add('list')
            }
        });
    });




    function displayMembers(membersArray) {
        content.innerHTML = '';
        
        membersArray.forEach(member => {
            const card = document.createElement('div');
            card.classList.add('card');

            const cardContent = `
                <img src="images/${member.image}" alt="${member.name} height="200" width="200" Avatar" loading="lazy">
                <h3>${member.name}</h3>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <a href="${member.website}" target="_blank">Details</a>
            `;
            
            card.innerHTML = cardContent;
            
            content.appendChild(card);
        });
    }

    document.getElementById('currentyear').textContent = `© ${new Date().getFullYear()} Timbuktu Chamber of Commerce`;
    document.getElementById('lastModified').textContent = `Last Modification: ${document.lastModified}`;
});
