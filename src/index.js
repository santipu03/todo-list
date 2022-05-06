import { setDefaultEventListeners } from './UI/EventListeners'
import { createDefaultContent, displayContentInStorage } from './logic'

window.addEventListener('DOMContentLoaded', () => {
  createDefaultContent()
  displayContentInStorage()
  setDefaultEventListeners()
})

// mantener las checkboxes checked al cambiar de tabs
