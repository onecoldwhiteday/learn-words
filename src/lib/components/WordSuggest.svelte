<script>
  import { wordData } from "../stores/store.js";
  import { toast } from "../stores/toast-store.js";

  const { word, addWord } = $props();
</script>

<li class="word-container card">
  <button type="button" class="word-button" onclick={() => addWord(word)}
    >{word}</button
  >
</li>

<style>
  .word-container {
    list-style: none;
    padding: 0;

    & button {
      padding: 4px;
      background: none;
    }
  }

  .word-button {
    border: 2px dashed gray;
    font-size: 24px;
    border-radius: 8px;
    width: fit-content;
    cursor: pointer;
  }
</style>
