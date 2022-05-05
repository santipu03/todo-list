import { setDefaultEventListeners } from './UI/EventListeners';
import {createDefaultContent, displayContentInStorage} from './logic';



window.addEventListener('DOMContentLoaded', () => {
    //localStorage.clear();
    createDefaultContent();
    displayContentInStorage();
    setDefaultEventListeners();
})

