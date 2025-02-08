<script>
  import { wordData } from "../../store";
  import Card from "./Card.svelte";

  const { handleError, worldList, onRemoveWord } = $props();
</script>

{#if worldList.length}
  <ul class="word-card-list">
    {#each worldList as word}
      <Card {word} onError={handleError} {onRemoveWord} isOpen={false} />
    {/each}
  </ul>
{/if}

<style>
  .word-card-list {
    display: grid;
    grid-gap: 15px;
    grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
    grid-auto-rows: fit-content;
    grid-auto-flow: dense;

    margin: 0 auto;
    width: 80%;
    padding: 24px;
  }
</style>
