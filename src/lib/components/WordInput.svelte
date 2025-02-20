<script>
  import { t } from "../../i18n.js";

  const { input = $bindable(), bulkAdd } = $props();
</script>

<div class="word-input-container">
  <input
    type="text"
    class="word-input"
    bind:value={input.value}
    onkeydown={bulkAdd}
    placeholder={$t("input.placeholder")}
  />
  <button id="submit-btn" type="button" onclick={bulkAdd}>save all </button>
</div>

<style>
  #submit-btn {
    /* display: flex;
    align-items: center;
    gap: 4px; */

    outline: none;
    transition: all 0.2s ease-in-out;
    background-color: var(--toner);
    color: var(--bg);
    border: none;
    border-radius: 0.5rem;
    position: absolute;
    right: 0;
    margin: 6px;
    border-radius: 35px;
    font-size: 24px;
    height: 62px;
    border-top-left-radius: 0;
    /* border-bottom-left-radius: 0; */

    font-weight: 300;

    &:hover {
      background-color: var(--accent);
    }
  }

  .word-input-container {
    display: flex;
    gap: 32px;
    width: 80%;
    justify-content: center;
    position: relative;
  }
  .word-input {
    font-size: 20px;
    padding: 24px;
    /* width: 100%; */
    border-radius: 0.5rem;

    border-radius: 40px;
    min-width: 255px;
    border: 1px solid gray;
    outline: none;
    background: none;
    flex: 1 1 auto;
    font-family: Bitter, sans-serif;

    &::placeholder {
      font-family: Bitter, sans-serif;
      font-weight: 300;
    }
  }

  @media (max-width: 764px) {
    #submit-btn {
      position: static;
      border-top-right-radius: 0;
      border-top-left-radius: 0;
      width: 100%;
      height: 25%;
    }
    .word-input {
      width: 100%;
    }
    .word-input-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 0;
    }
  }
</style>
