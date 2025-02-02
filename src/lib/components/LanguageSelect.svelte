<script>
  import { locale, locales, t } from "../../i18n";
</script>

<div class="lang-select-container">
  <span>{$t(`interface-lang`)}</span>
  <select class="lang-select" bind:value={$locale}>
    {#each locales as l}
      <option value={l}>{$t(`lang_${l}`)}</option>
    {/each}
  </select>
</div>

<style>
  .lang-select {
    font-size: 24px;
    min-height: 40px;
    min-width: 100px;
    padding: 16px;
    border-radius: 20px;
    border: none;
    outline: none;
  }

  .lang-select-container {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
</style>
