<script>
  import Chip from "./Chip.svelte";

  let props = $props();
</script>

<li>
  <span>{props.definition.definition}</span>
  {#if props.definition.synonyms && props.definition.synonyms.length}
    <div class="synonym-container">
      <span>Similar:</span>
      {#each props.definition.synonyms as synonym}
        <Chip text={synonym} />
      {/each}
    </div>
  {/if}
</li>

<style>
  .synonym-container {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    padding: 12px 0;
    align-items: center;
    & span {
      color: #81c995;
    }
  }
</style>
