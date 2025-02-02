<script>
  import { onMount } from "svelte";
  import { t, locale, locales } from "./i18n";
  import Card from "./lib/components/Card.svelte";
  import Toast from "./lib/components/Toast.svelte";
  import { wordData } from "./store";

  const segmenter = new Intl.Segmenter([], { granularity: "word" });

  // Manage errors
  let errors = $state([]);

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
    let result = [];
    if (!input) return savedWords;

    result = savedWords.filter(
      (w) => w.includes(input.toLowerCase()) || input.includes(w.toLowerCase())
    );

    if (!result.length) {
      return savedWords;
    }
    return result;
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

  const handleError = (errorMsg) => {
    errors.push(errorMsg);
  };
</script>

<main class="main-container">
  <h1 style="font-weight: 900">{$t("main.title")}</h1>
  <input
    type="text"
    class="word-input"
    bind:value={input}
    placeholder={$t("input.placeholder")}
  />
  {#if cardTemplates.length}
    <div class="word-button-list-container">
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
  {#if renderedWords.length}
    <ul class="word-card-list">
      {#each renderedWords as savedWord}
        <Card word={savedWord} onError={handleError} isOpen={false} />
      {/each}
    </ul>
  {/if}
  <Toast {errors} />
</main>

<style>
  .word-button-list-container {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 24px;
  }

  .word-button-help-text {
    display: inline-block;
    word-wrap: break-word;
    max-width: 500px;
    padding: 20px;
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
  }

  .word-button {
    border: 2px dashed #2c2c2c;
    font-size: 24px;
    border-radius: 8px;
    width: fit-content;
    cursor: pointer;
    padding: 1rem;
  }

  .word-card-list {
    display: grid;
    grid-gap: 15px;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-auto-rows: fit-content;
    grid-auto-flow: dense;

    margin: 0 auto;
    width: 80%;
    padding: 24px;
  }
</style>
