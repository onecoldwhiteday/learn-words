<script>
  import { t } from "./i18n";
  import ToastList from "./lib/components/ToastList.svelte";
  import { wordData } from "./lib/stores/store";
  import CardList from "./lib/components/CardList.svelte";
  import { slide } from "svelte/transition";
  import WordSuggestList from "./lib/components/WordSuggestList.svelte";
  import WordInput from "./lib/components/WordInput.svelte";
  import {toast} from "./lib/stores/toast-store.js";

  const segmenter = new Intl.Segmenter([], { granularity: "word" });

  // Controlled text input value
  let input = $state({
    value: ''
  });

  // Card templates, made from input
  let cardTemplates = $derived.by(() => {
    const segmentedText = segmenter.segment(input.value);
    let prep = [...segmentedText]
      .filter((s) => s.isWordLike)
      .map((s) => s.segment);
    return Array.from(new Set(prep));
  });

  // Words, already saved to store
  let wordList = $state(Object.keys($wordData));

  $effect(() => {
    wordList = Object.keys($wordData);
  })

  // Action on Card Template click, make actual card from template
  const addWord = (/** @type string */ word) => {
    // Remove saved word
    input.value = [...cardTemplates.filter((w) => w !== word)].join(" ");

    // Save word to make a card
    if (!wordList.includes(word.toLowerCase())) {
      wordList = [word, ...wordList];
      return;
    }

    toast.push(`The word "${word}" is already here!  🌱`, {type: 'success' })
  };

  const bulkAddWords = (event) => {
    if (event.key === "Enter") {
    for (let w of cardTemplates) {
      addWord(w);
    }
    }
  }
</script>

<main class="main-container">
  <h1 style="font-weight: 900">{$t("main.title")} ✨</h1>
  <WordInput bind:input={input} bulkAdd={bulkAddWords} />
  <WordSuggestList
          addWord={addWord}
          cardSuggestions={cardTemplates} />
  <CardList wordList={wordList} onFailToLoadWord={() => wordList = Object.keys($wordData)} />
  <ToastList />
</main>

<style>
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
</style>
