import { setDefaultEventListeners } from './UI/EventListeners'
import { createDefaultContent, displayContentInStorage } from './Logic'

window.addEventListener('DOMContentLoaded', () => {
  createDefaultContent()
  displayContentInStorage()
  setDefaultEventListeners()
})
