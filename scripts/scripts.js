'use strict';
import { courses } from './courses.js';

document.addEventListener('DOMContentLoaded', () => {

    const title = document.querySelector('.currentPageTitle');
    if (title) {
        title.textContent = document.title;
    }

    for (const page of document.querySelector('nav').children) {
        if (page.textContent === document.title.toLowerCase()) {
            page.classList.add('active');
        } else {
            page.classList.remove('active');
        }
    }

    const nav = document.getElementById('navigation');
    const menuMobile = document.getElementById('menu-mobile');
    menuMobile.addEventListener('click', () => {
        if (menuMobile.textContent === '☰') {
            menuMobile.textContent = 'X';
            nav.style.top = '0px';
        } else {
            menuMobile.textContent = '☰';
            nav.style.top = '-150px';
        }
    });

    const certificationButtons = document.getElementById('certification-buttons');
    const creditCounter = document.getElementById('credit-counter');
    const certificationContent = document.getElementById('certification-content');
    let data = courses;

    function updateContent(data) {
        const totalCredits = data.reduce((total, course) => total + course.credits, 0);
        creditCounter.textContent = `The total credits for courses listed above is ${totalCredits}`;

        certificationContent.innerHTML = '';

        data.forEach(course => {
            const courseDiv = document.createElement('div');
            courseDiv.classList.add('course');
            courseDiv.textContent = `${course.subject} ${course.number}`;
            certificationContent.appendChild(courseDiv);
        });
    }

    updateContent(courses);

    Array.from(certificationButtons.children).forEach(button => {
        button.addEventListener('click', () => {
            if (button.textContent === 'CSE') {
                data = courses.filter(course => course.subject === 'CSE');
            } else if (button.textContent === 'WDD') {
                data = courses.filter(course => course.subject === 'WDD');
            } else {
                data = courses;
            }
            updateContent(data);
        });
    });

    document.getElementById('currentyear').textContent = `© ${new Date().getFullYear()} Sairi Conejo Flores | Ecuador`;
    document.getElementById('lastModified').textContent = `Last Modified: ${document.lastModified}`;
});
