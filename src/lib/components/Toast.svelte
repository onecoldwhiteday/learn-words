<script>
  let props = $props();

  const hideError = (id) => {
    props.errors.splice(id, 1);
  };
</script>

{#if props.errors?.length}
  <div class="error-container">
    {#each props.errors as error, i}
      <div class="error" onclick={() => hideError(i)}>{error}</div>
    {/each}
  </div>
{/if}

<style>
  .error-container {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 32px;
    right: 32px;

    cursor: pointer;

    transition: 0.4s ease-in-out;

    gap: 8px;
    /* width: 500px; */
    min-width: 150px;
    height: 100%;
  }

  .error {
    padding: 32px;
    word-wrap: break-word;
    background-color: brown;
    color: #fff;
    border-radius: 32px;
  }

  @media screen and (max-width: 750px) {
    .error-container {
      margin: 0 auto;
      place-self: center;
      right: auto;
    }
  }
</style>
