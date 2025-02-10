<script>
  import { t } from "../../i18n.js";

  const { input = $bindable(), bulkAdd } = $props();
</script>

<input
  type="text"
  class="word-input"
  bind:value={input.value}
  onkeydown={bulkAdd}
  placeholder={$t("input.placeholder")}
/>

<style>
  .word-input {
    max-width: 50%;
    font-size: 20px;
    width: 100%;
    padding: 24px;
    border-radius: 40px;
    min-width: 255px;
    outline: none;
      background: none;
  }
</style>
