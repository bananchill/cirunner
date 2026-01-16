<template>
  <div>
    <h1>CI Runner - Frontend</h1>
    <p>Фронтенд сервис на Vue готов к разработке</p>
    <p>Счетчик: {{ count }}</p>
    <button @click="increment(1)">Увеличить</button>
  </div>
</template>

<script setup lang="ts">
import { useCounter } from "@vueuse/core";

const { count, inc: increment } = useCounter(0);
</script>

<style scoped>
div {
  padding: 2rem;
  text-align: center;
}

h1 {
  color: #42b983;
}

button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #35a372;
}
</style>
