<script>
import WordSuggest from "./WordSuggest.svelte";
import {slide} from "svelte/transition";

const { cardSuggestions, addWord } = $props();

</script>

{#if cardSuggestions.length}
    <div class="word-button-list-container" in:slide out:slide>
      <span>
        Tap or click on a(each) word to create and save as memo card. Make sure
        you have an internet connection for that.
      </span>
        <ul class="word-list">
            {#each cardSuggestions as word}
                <WordSuggest {word} addWord={addWord} />
            {/each}
        </ul>
    </div>
{/if}

<style>
    .word-button-list-container {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding-top: 24px;
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
</style>