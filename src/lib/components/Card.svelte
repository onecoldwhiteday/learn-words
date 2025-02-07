<script>
  import { onMount } from "svelte";
  import WordMeaning from "./WordMeaning.svelte";
  import { wordData } from "../../store";

  import close from "../../assets/close.svg";

  let props = $props();

  let show = $state(true);

  let cardRef = null;

  let currentWord = $state({ meanings: [], phonetic: "" });
  let loaded = $state(false);

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
      props.onError(
        `"${word}"? Never heard of it. Check spelling or whatever. Cheers!`
      );
      show = false;
      // "No such word in the dictionary. Check spelling or whatever. Cheers!";
      return;
    }

    let wordResponse = await wordFetch.json();
    currentWord = wordResponse[0];
    $wordData[word] = currentWord;
    loaded = true;
    return wordData;
  };

  onMount(() => {
    if (props.word) {
      loadWord(props.word);
    }
  });

  const isTall = () => {
    return (
      currentWord.meanings?.length > 1 &&
      currentWord.meanings[0].definitions.length &&
      currentWord.meanings[0].definitions.length > 1
    );
  };

  const removeWord = () => {
    $wordData = Object.keys($wordData)
      .filter((key) => key !== props.word.toLowerCase() && key !== props.word)
      .reduce((obj, key) => {
        return {
          ...obj,
          [key]: $wordData[key],
        };
      }, {});
    show = false;
  };

  const handleMouseMove = (event) => {
    if (!cardRef) return;
    const x = event.clientX - cardRef.left;
    const y = event.clientY - cardRef.top;

    const xPercent = x / cardRef.width;
    const yPercent = y / cardRef.height;

    const xRotation = (0.5 - xPercent) * 20;
    const yRotation = (0.5 - yPercent) * 20;

    event.target.style.setProperty("--x-rotation", `${yRotation}deg`);
    event.target.style.setProperty("--y-rotation", `${xRotation}deg`);
    event.target.style.setProperty("--x", `${xPercent * 100}%`);
    event.target.style.setProperty("--y", `${yPercent * 100}%`);
  };
</script>

{#if show}
  <!-- <li
    class={`word-card ${isTall() ? "tall" : ""}`}
    onmouseleave={() => (cardRef = null)}
    onmouseenter={(ev) => (cardRef = ev.target.getBoundingClientRect())}
    onmousemove={handleMouseMove}
  > -->
  <li class={`word-card ${isTall() ? "tall" : ""}`}>
    {#if loaded}
      <div class="card-header">
        <span class="title">{props.word}</span>
        <button class="close-btn" onclick={removeWord}>
          <img src={close} alt="close" />
        </button>
        <div class="glare"></div>
        <div class="pattern"></div>
      </div>
      {#if currentWord.phonetic}
        <span>{currentWord.phonetic}</span>
      {/if}

      {#if currentWord.meanings?.length}
        <ol class="meaning-list">
          {#each props.isOpen ? [...currentWord.meanings] : [currentWord.meanings[0]] as meaning}
            <WordMeaning {meaning} />
          {/each}
        </ol>
      {/if}
    {:else}
      <span class="loader"></span>
    {/if}
  </li>
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

  .tall {
    grid-row: span 2;
  }
  .word-card {
    perspective: 800px;
    position: relative;

    border: 1px solid gray;

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

    /* border: 1px solid #2c2c2c; */
    /* background-color: #ffd11d;
    color: #000; */

    /* max-width: 380px; */

    list-style: none;
    font-size: 14px;
    border-radius: 32px;
    word-wrap: break-word;
    cursor: pointer;
    /* border: 1px solid #2c2c2c; */

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

  .word-card:hover {
    transition: all ease-out;
    transform: rotateX(var(--x-rotation)) rotateY(var(--y-rotation)) scale(1.1);
  }

  .word-card:hover .glare {
    background: radial-gradient(
      at var(--x) var(--y),
      rgba(255, 255, 255, 0.3) 20%,
      transparent 80%
    );
  }

  .glare {
    position: absolute;
    inset: 0;
    pointer-events: none;
    border-radius: 32px;
  }

  .pattern {
    position: absolute;
    inset: 0;
    pointer-events: none;
    border-radius: 23px;
    opacity: 0.2;
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
