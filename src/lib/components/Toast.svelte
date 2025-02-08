<script>
  let { msgs, hideMsg } = $props();

  window.onkeydown = (event) => hideMsgsByKeyboard(event);
  const hideMsgsByKeyboard = (event) => {
    if (event.keyCode === 27) {
      flushMsgs();
    }
  };

  const flushMsgs = () => {
    msgs.forEach((m, i) => console.log(m, i));
  };

  const handleRemoval = (event, i) => {
    const newspaperSpinning = [
      { transform: "translateX(0)" },
      { transform: "translateX(250%)" },
      { display: "none" },
    ];
    event.target.animate(newspaperSpinning, {
      duration: 400,
      iterations: 1,
    });
    setTimeout(() => {
      hideMsg(i, event.target);
    }, 550);

    // event.target.onanimationend();
  };
</script>

{#if msgs?.length}
  <div class="msg-container">
    {#each msgs as msg, i}
      <!-- key event handler added by svelte suggestion, it actually doesn't work here -->
      <div
        class={`msg ${msg.type}`}
        role="button"
        tabindex={i}
        onkeydown={hideMsgsByKeyboard}
        onclick={(event) => handleRemoval(event, i)}
      >
        {msg.text}
      </div>
    {/each}
  </div>
{/if}

<style>
  .msg-container {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 32px;
    right: 32px;

    cursor: pointer;

    gap: 8px;
    /* width: 500px; */
    min-width: 150px;
    height: fit-content;
  }

  .msg {
    padding: 32px;
    word-wrap: break-word;
    border-radius: 32px;
    animation: fade-in 0.3s ease-out;
    transition-behavior: allow-discrete;

    color: #fff;
  }

  .error {
    background-color: #a52a2a;
  }

  .success {
    background-color: #68a52a;
  }

  @media screen and (max-width: 750px) {
    .error-container {
      margin: 0 auto;
      place-self: center;
      right: auto;
    }
  }

  @keyframes fade-in {
    0% {
      opacity: 0;
      transform: translateY(-250%);
    }

    100% {
      opacity: 1;
      transform: translateY(0);
      display: block;
    }
  }

  @keyframes fade-out {
    0% {
      opacity: 1;
      transform: translateY(0);
    }

    100% {
      opacity: 0;
      transform: translateY(-250%);
    }
  }
</style>
