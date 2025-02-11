<script>
  let props = $props();
</script>

<div class="chip">{props.text}</div>

<style>
  .chip {
    height: 22px;
    display: flex;
    align-items: center;
    text-align: center;
    text-transform: none;
    font-size: 13px;
    line-height: 22px;
    cursor: pointer;
    max-width: 250px;
    overflow: hidden;
    text-align: center;
    text-overflow: ellipsis;

    border: 1px solid #3c4043;
    padding: 0 12px;

    border-radius: 32px;

    &:hover {
      border: 1px solid #3c4043;
    }
  }
</style>
