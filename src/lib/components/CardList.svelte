<script>
  import Card from "./Card.svelte";
  import {wordData} from "../stores/store.js";
  import {flip} from "svelte/animate";
  import { slide } from "svelte/transition";


  let {wordList, onFailToLoadWord} = $props();

  const removeWord = (/** @type string */ word) => {
    let newWordList= {...$wordData};
    delete newWordList[word.toLowerCase()];
    $wordData = newWordList;
  }

</script>

{#if wordList?.length}
  <ul class="word-card-list">
    {#each wordList as word (word)}
      <li class="word-card-list__item" out:slide in:slide animate:flip={{duration: 400}}>
      <Card {word} {removeWord} {onFailToLoadWord} isOpen={false} />
      </li>
    {/each}
  </ul>
{/if}

<style>
  .word-card-list {
    display: grid;
    grid-gap: 15px;
    grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
    grid-auto-flow: dense;

    margin: 0 auto;
    width: 80%;
    padding: 24px;
  }
  .word-card-list__item {
    list-style: none;
  }
</style>
