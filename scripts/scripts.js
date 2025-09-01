'use strict';
import { courses } from './courses.js';

document.addEventListener('DOMContentLoaded', () => {

    // default
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

    // nav
    const nav = document.getElementById('navigation')
    const menuMobile = document.getElementById('menu-mobile')
    menuMobile.addEventListener('click', () => {
        if(menuMobile.textContent === '☰'){
            menuMobile.textContent = 'X'
            nav.style.top = '0px'
        } else {
            menuMobile.textContent = '☰'
            nav.style.top = '-150px'
        }
    })

    // main
    const certificationButtons = document.getElementById('certification-buttons');
    const creditCounter = document.getElementById('credit-counter');
    const certificationContent = document.getElementById('certification-content');
    let data = courses;

    Array.from(certificationButtons.children).forEach(button => {
        button.addEventListener('click', () => {
            if (button.textContent === 'CSE') {
                data = courses.filter(course => course.subject === 'CSE');
                totalCredits(data)
                setContent(data)
            } else if (button.textContent === 'WDD') {
                data = courses.filter(course => course.subject === 'WDD');
                totalCredits(data)
                setContent(data)
            } else {
                data = courses;
                totalCredits(data)
                setContent(data)
            }
        });
    });
    
    
    function totalCredits(data){
        const totalCredits = data.reduce((total, course) => total + course.credits, 0);
        creditCounter.textContent = `The total credits for course listed above is ${totalCredits}`;
    }
    totalCredits(courses)

    function setContent(data){
        certificationContent.innerHTML = ''
        let temp = data.map(obj => ({number:obj.number, subject:obj.subject}))

        for (let i = 0; i < temp.length; i++) {
            certificationContent.innerHTML += `<div class="course"><span>${temp[i].subject} ${temp[i].number}</span></div>`
        }
    }
    setContent(courses)

    document.getElementById('currentyear').textContent = `© ${new Date().getFullYear()} Sairi Conejo Flores | Ecuador`;
    document.getElementById('lastModified').textContent = `Last Modified: ${document.lastModified}`;
});
