<script>
  import WordDefinition from "./WordDefinition.svelte";

  let props = $props();
</script>

<li class="meaning-item">
  <span class="part-of-speech">{props.meaning.partOfSpeech}</span>
  {#if props.meaning.definitions?.length}
    <ol>
      {#each props.meaning.definitions.slice(0, 3) as definition}
        <WordDefinition {definition} />
      {/each}
    </ol>
  {/if}
</li>

<style>
  .part-of-speech {
    font-style: italic;
    color: #9e9e9e;
  }

  .meaning-item {
    list-style: none;
  }
</style>
