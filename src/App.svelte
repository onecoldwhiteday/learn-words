<script>
  import { onMount } from "svelte";
  import { t, locale, locales } from "./i18n";
  import Card from "./lib/components/Card.svelte";
  import Toast from "./lib/components/ToastContainer.svelte";
  import { wordData } from "./lib/stores/store";
  import CardList from "./lib/components/CardList.svelte";
  import ToastContainer from "./lib/components/ToastContainer.svelte";
  import { slide } from "svelte/transition";

  const segmenter = new Intl.Segmenter([], { granularity: "word" });

  // Controlled text input value
  let input = $state("");

  // Card templates, made from input
  let cardTemplates = $derived.by(() => {
    const segmentedText = segmenter.segment(input);
    let prep = [...segmentedText]
      .filter((s) => s.isWordLike)
      .map((s) => s.segment);
    return Array.from(new Set(prep));
  });

  // Words, already saved to store
  let savedWords = $state(Object.keys($wordData));

  // Words we show after checking if input contains any of them, if not - show all.
  let renderedWords = $derived.by(() => {
    // let result = [];
    // if (!input) return savedWords;

    // TODO: add proper filter
    // result = savedWords.filter(
    //   (w) => w.includes(input.toLowerCase()) || input.includes(w.toLowerCase())
    // );

    // if (!result.length) {
    //   return savedWords;
    // }
    // return result;
    return savedWords;
  });

  // Action on Card Template click, make actual card from template
  const addWord = (word) => {
    // Remove saved word
    input = [...cardTemplates.filter((w) => w !== word)].join(" ");
    // Save word to make a card
    if (!savedWords.includes(word.toLowerCase())) {
      savedWords.push(word.toLowerCase());
    }
    return;
  };

  const removeWord = (word) => {
    $wordData = Object.keys($wordData)
      .filter((key) => key !== word.toLowerCase() && key !== word)
      .reduce((obj, key) => {
        return {
          ...obj,
          [key]: $wordData[key],
        };
      }, {});
    savedWords = Object.keys($wordData);
  };
</script>

<main class="main-container">
  <h1 style="font-weight: 900">{$t("main.title")} ✨</h1>
  <input
    type="text"
    class="word-input"
    bind:value={input}
    placeholder={$t("input.placeholder")}
  />
  {#if cardTemplates.length}
    <div class="word-button-list-container" in:slide out:slide>
      <span>
        Tap or click on a(each) word to create and save as memo card. Make sure
        you have an internet connection for that.
      </span>
      <ul class="word-list">
        {#each cardTemplates as template}
          <li class="word-container card">
            <button
              type="button"
              class="word-button"
              onclick={() => addWord(template)}>{template}</button
            >
          </li>
        {/each}
      </ul>
    </div>
  {/if}
  <CardList worldList={savedWords} onRemoveWord={removeWord} />
  <ToastContainer />
</main>

<style>
  .word-button-list-container {
    display: flex;
    flex-direction: column;
    gap: 8px;
    /* padding: 24px; */
    /* height: 0; */
    padding-top: 24px;
  }

  .main-container {
    width: 100%;
    height: 100%;
    padding: 120px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    text-align: center;

    background: none;
  }
  .word-input {
    max-width: 50%;
    font-size: 20px;
    width: 100%;
    padding: 24px;
    border-radius: 40px;
    min-width: 255px;
    outline: none;
  }
  .word-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 0 auto;
    width: 80%;
    padding: 0;

    gap: 12px;
  }
  .word-container {
    list-style: none;
    padding: 0;

    & button {
      padding: 0 1rem !important;
      background: none;
    }
  }

  .word-button {
    border: 2px dashed gray;
    font-size: 24px;
    border-radius: 8px;
    width: fit-content;
    cursor: pointer;
  }
</style>
