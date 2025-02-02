<script>
  import { onMount } from "svelte";

  let currentTheme = $state("");

  onMount(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const isSetManually = document.documentElement.dataset.theme == "dark";
    if (!isSetManually) {
      setTheme(prefersDark ? "dark" : "light");
    }
  });

  const setTheme = (theme) => {
    document.documentElement.dataset.theme = theme;
    currentTheme = theme;
  };

  const toggleTheme = () => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
    setTheme(currentTheme === "dark" ? "light" : "dark");
  };
</script>

<button onclick={toggleTheme}> Toggle Theme</button>
