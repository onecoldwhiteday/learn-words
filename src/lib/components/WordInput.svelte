<script>
  import { t } from "../../i18n.js";

  const { input = $bindable() } = $props();
</script>

<input
  type="text"
  class="word-input"
  bind:value={input.value}
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
  }
</style>
