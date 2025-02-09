<script>
  import { onDestroy, onMount } from "svelte";
  import { linear } from "svelte/easing";
  import { tweened } from "svelte/motion";
  import { toast } from "../stores/toast-store";

  let { item } = $props();

  let next = item.initial;
  let prev = next;
  let paused = false;
  let cprops = {};
  let event;

  function close(ev) {
    if (ev) event = ev;
    toast.pop(item.id);
  }

  $effect(() => {
    if (next !== item.next) {
      next = item.next;
      prev = $progress;
      paused = false;
      progress.set(next).then(autoclose);
    }
  });

  $effect(() => {
    if (item.component) {
      const { props = {}, sendIdTo } = item.component;
      cprops = { ...props, ...(sendIdTo && { [sendIdTo]: item.id }) };
    }
  });

  function autoclose() {
    if ($progress === 1 || $progress === 0) close();
  }

  const progress = tweened(item.initial, {
    duration: item.duration,
    easing: linear,
  });

  onDestroy(() => {
    item.onpop && item.onpop(item.id, { event });
  });
</script>

<div
  class={`msg ${item.type}`}
  role="button"
  tabindex="0"
  onclick={(ev) => close(ev)}
  onkeydown={(ev) => {
    if (ev instanceof KeyboardEvent && ["Enter", " "].includes(ev.key))
      close(ev);
  }}
  id={item.id}
>
  {@html item.msg}
</div>

<style>
  .msg {
    padding: 32px;
    word-wrap: break-word;
    border-radius: 32px;
    animation: fade-in 0.3s ease-out;
    transition-behavior: allow-discrete;

    color: #fff;
  }

  .error {
    background-color: #a52a2a;
  }

  .success {
    background-color: #68a52a;
  }
</style>
