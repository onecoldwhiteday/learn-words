<script>
  import Toast from "./Toast.svelte";
  import { fly } from "svelte/transition";
  import { toast } from "../stores/toast-store";
  import { linear } from "svelte/easing";

  export let target = "default";
  export let options = {};

  window.onkeydown = (event) => {
    if (event.keyCode === 27) {
      toast.pop(0);
    }
  };

  let items = [];

  $: toast.init(target, options);
  $: items = $toast.filter((i) => i.target === target);
</script>

<ul class="msg-container">
  {#each items as item (item.id)}
    <li
      class="msg-list-item"
      in:fly={{ duration: 400, y: "-100%" }}
      out:fly={{ duration: 400, easing: linear, x: "250%" }}
    >
      <Toast {item} />
    </li>
  {/each}
</ul>

<style>
  .msg-list-item {
    list-style: none;
  }
  .msg-container {
    padding-left: 0;
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 32px;
    right: 32px;

    cursor: pointer;

    gap: 8px;
    min-width: 150px;
    height: fit-content;
  }

  @keyframes fade-in {
    0% {
      opacity: 0;
      transform: translateY(-250%);
    }

    100% {
      opacity: 1;
      transform: translateY(0);
      display: block;
    }
  }

  @keyframes fade-out {
    0% {
      opacity: 1;
      transform: translateY(0);
    }

    100% {
      opacity: 0;
      transform: translateY(-250%);
    }
  }
</style>
