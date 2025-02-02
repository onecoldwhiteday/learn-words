import { mount } from 'svelte'
import './app.css'
import App from './App.svelte'


// Register the service worker
if ('serviceWorker' in navigator) {
  // Wait for the 'load' event to not block other work
  window.addEventListener('load', async () => {
    // Try to register the service worker.
    try {
      const reg = await navigator.serviceWorker.register("./service-worker.js");
      console.log('Service worker registered! 😎', reg);
    } catch (err) {
      console.log('😥 Service worker registration failed: ', err);
    }
  });
}

const app = mount(App, {
  target: document.getElementById('app'),
})

export default app
