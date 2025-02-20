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
  <button id="submit-btn" type="button" onclick={bulkAdd}>save all</button>
</div>

<style>
  #submit-btn {
    outline: none;
    transition: all 0.2s ease-in-out;
    background-color: #b3a0f4;
    color: var(--bg);
    border: none;
    border-radius: 0;
    position: absolute;
    right: 0;
    margin: 6px;
    border-radius: 35px;
    font-size: 24px;
    height: 62px;
    border-top-left-radius: 0;

    &:hover {
      background-color: #d9a0f4;
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
    border-radius: 8px;
    border-radius: 40px;
    min-width: 255px;
    border: 1px solid gray;
    outline: none;
    background: none;
    flex: 1 1 auto;
  }

  @media (max-width: 764px) {
    #submit-btn {
      position: static;
      border-top-right-radius: 0;
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
