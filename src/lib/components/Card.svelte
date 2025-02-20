<script>
  import { onMount } from "svelte";
  import WordMeaning from "./WordMeaning.svelte";
  import { wordData } from "../stores/store";
  import { toast } from "../stores/toast-store";
  import { slide } from "svelte/transition";
  import Dialog from "./Dialog.svelte";

  let { word, removeWord, onFailToLoadWord, isOpen = false } = $props();

  let currentWord = $state({ meanings: [], phonetic: "" });

  let show = $state(true);
  let loaded = $state(false);
  let folded = $state(false);

  let showDialog = $state(false);

  onMount(async () => {
    if (word) {
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

    $wordData = { [word.toLowerCase()]: wordResponse[0], ...$wordData };
    currentWord = $wordData[word.toLowerCase()];

    loaded = true;
    return wordData;
  };

  let isTall = () => {
    return (
      currentWord.meanings?.length > 1 &&
      currentWord.meanings[0]?.definitions.length &&
      currentWord.meanings[0]?.definitions.length > 1
    );
  };

  const openDetail = () => {
    console.log("called dialog");
    showDialog = true;
  };
</script>

{#if show}
  <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions (because of reasons) -->
  <div
    in:slide
    out:slide
    class={`word-card ${folded ? "folded" : ""} ${isTall() ? "tall" : ""}`}
    onclick={openDetail}
  >
    {#if loaded}
      <div class="card-header">
        <span class="title">{word}</span>
        <div class="card-actions-container">
          <!-- svelte-ignore a11y_consider_explicit_label -->
          <button class="close-btn" onclick={() => removeWord(word)}>
            <div class="mdiv">
              <div class="md"></div>
            </div>
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
<Dialog data={currentWord} {showDialog} />

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
    grid-row: span 4;
  }

  .word-card {
    perspective: 800px;
    position: relative;
    box-sizing: border-box;
    height: 100%;

    box-sizing: border-box;
    transition: all 0.4s ease-in-out;

    border: 1px solid #f5efe740;
    background-color: var(--bg);
    border-radius: 8px;

    &.folded {
      max-height: 100px;
      height: 100px;
    }

    &:hover {
      /* box-shadow: inset 0 -105px 40px -40px var(--accent); */
      /* Mega nice */

      transform: translate(-5px, -5px);
    }

    transition: all 0.25s ease-in-out;

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
      color: var(--text);
    }

    .mdiv {
      height: 25px;
      width: 2px;
      margin-left: 12px;
      background-color: var(--text);
      transform: rotate(45deg);
      z-index: 1;
    }

    .md {
      height: 25px;
      width: 2px;
      background-color: var(--text);
      transform: rotate(90deg);
      z-index: 2;
    }

    list-style: none;
    word-wrap: break-word;
    cursor: pointer;

    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 24px;
    text-align: start;

    & .title {
      font-weight: 200;
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
