<script>
  import { onMount, onDestroy } from "svelte";

  const { showDialog = false, data } = $props();
  /** @type HTMLDialogElement */
  let dialog; // Reference to the dialog tag

  onMount(() => {
    document.addEventListener("click", (e) => clickOutsideCb(e));
  });

  const clickOutsideCb = (e) => {
    if (!dialog.contains(e.target)) closeModal();
  };

  onDestroy(() => {
    document.removeEventListener("click", (e) => clickOutsideCb(e));
  });

  let show = $derived.by(() => showDialog);

  $effect(() => {
    if (show) {
      console.log("wtf");
      showModal();
    } else closeModal();
  });

  const showModal = () => {
    dialog.showModal();
  };

  const closeModal = () => {
    dialog.close();
  };
</script>

<dialog id="dialog" bind:this={dialog}>
  <h1>{data.phonetic}</h1>
  <button onclick={closeModal}>Close</button>
</dialog>

<style>
  dialog {
    border-radius: 5px;
    border-width: 1px;
    transition: all 2s;
  }
  dialog::backdrop {
    background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7));
    filter: blur(20%);
  }
</style>
