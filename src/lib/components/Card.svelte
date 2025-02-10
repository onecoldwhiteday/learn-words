<script>
  import { onMount } from "svelte";
  import WordMeaning from "./WordMeaning.svelte";
  import { wordData } from "../stores/store";
  import close from "../../assets/close.svg";
  import { toast } from "../stores/toast-store";
  import {slide} from "svelte/transition";
  import {flip} from "svelte/animate";

  let { word, removeWord, onFailToLoadWord, isOpen = false } = $props();

  let currentWord = $state({ meanings: [], phonetic: "" });

  let show = $state(true);
  let loaded = $state(false);
  let folded = $state(false);
  let cardRef;

  onMount(async () => {
    if (word) {
      console.log(word);
      await loadWord(word);
    }
  });

  const loadWord = async (word) => {
    if ($wordData[word.toLowerCase()]) {
      currentWord = $wordData[word.toLowerCase()];
      loaded = true;
      return;
    }

    let wordFetch = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
      { cache: "force-cache" }
    );
    if (wordFetch.status === 404) {
      toast.push(
        `"${word}"? Never heard of it. Check spelling or whatever. Cheers!`
      );
      show = false;
      return onFailToLoadWord();
    }

    let wordResponse = await wordFetch.json();

    $wordData = ({[word.toLowerCase()]: wordResponse[0], ...$wordData});
    currentWord = $wordData[word.toLowerCase()];

    loaded = true;
    return wordData;
  };


  let isTall = () => {
    return currentWord.meanings?.length > 1 &&
      currentWord.meanings[0]?.definitions.length &&
      currentWord.meanings[0]?.definitions.length > 1
  };
</script>

{#if show}
  <div bind:this={cardRef}
      in:slide
      out:slide
      class={`word-card ${folded ? 'folded' : ''} ${isTall() ? "tall" : ""}`}>
    {#if loaded}
      <div class="card-header">
        <span class="title">{word}</span>
        <div class="card-actions-container">
          <button class='close-btn' onclick={() => folded = !folded}>
             <span class="minimize-icon"></span>
          </button>
          <button class="close-btn" onclick={() => removeWord(word)}>
            <img src={close} alt="minimize" />
          </button>
        </div>
      </div>
      {#if !folded}
        <div in:slide out:slide>
      {#if currentWord.phonetic}
        <span>{currentWord.phonetic}</span>
      {/if}

      {#if currentWord.meanings?.length}
        <ol class="meaning-list">
          {#each isOpen ? [...currentWord.meanings] : [currentWord.meanings[0]] as meaning}
            <WordMeaning {meaning} />
          {/each}
        </ol>
      {/if}
        </div>
        {/if}
    {:else}
      <span class="loader"></span>
    {/if}
  </div>
{/if}

<style>
  .card-header {
    display: flex;
    justify-content: space-between;
  }
  .meaning-list {
    padding-left: 0;
    margin-left: 0;
  }

  .card-actions-container {
    display: flex;
    gap: 8px;
  }

  .tall {
    grid-row: span 2;
  }

  .word-card {
    perspective: 800px;
    position: relative;
    box-sizing: border-box;

    border: 1px solid gray;

    &.folded {
      max-height: 100px;
      height: 100px;

    }

    .close-btn {
      width: 35px;
      height: 35px;
      position: relative;
      top: -25px;
      right: -10px;
      place-self: flex-end;
      display: flex;
      justify-content: center;
      align-items: center;
      outline: none;
      border: none;
      background: none;
      border-radius: 50%;
      flex-shrink: 0;
      filter: invert();
    }

    .minimize-icon {
      font-size: 32px;
      height: 2px;
      width: 20px;
      place-self: center;
      background-color: black;
      flex-shrink: 0;
    }

    background-color: inherit;

    list-style: none;
    font-size: 14px;
    border-radius: 32px;
    word-wrap: break-word;
    cursor: pointer;

    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 24px;
    text-align: start;

    & .title {
      font-weight: 900;
      font-size: 32px;
    }
  }

  .loader {
    display: inline-block;
    width: 55px;
    height: 55px;
    border: 2px solid color-mix(in srgb, currentColor 50%, transparent);
    border-radius: 50%;
    border-top-color: currentColor;
    animation: spin 1s ease-in-out infinite;
  }

  @keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }

  @-webkit-keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }

  @media screen and (max-width: 700px) {
    .word-card {
      font-size: 18px;
    }
  }
</style>
