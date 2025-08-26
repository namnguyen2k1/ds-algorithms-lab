export function runSetPlayground() {
  const store = new Set<string>();

  // --- add() ---
  store.add('alice');
  store.add('bob');
  store.add('charlie');
  store.add('alice'); // duplicate (ignored)

  // --- has() ---
  console.log('\nHas bob?', store.has('bob'));
  console.log('Has dave?', store.has('dave'));

  // --- size ---
  console.log('\nSize of set:', store.size);

  // --- values() ---
  const values = Array.from(store.values());
  console.log('\nValues:', values);

  // --- keys() ---
  const keys = Array.from(store.keys());
  console.log('\nKeys:', keys);

  // --- entries() ---
  console.log('\nEntries:');
  for (const [key, value] of store.entries()) {
    console.log(`${key} → ${value}`);
  }

  // --- forEach() ---
  console.log('\nUsing forEach:');
  store.forEach(value => {
    console.log(`Value: ${value}`);
  });

  // --- delete() ---
  store.delete('bob');
  console.log('\nAfter deleting bob:', Array.from(store.values()));

  // --- clear() ---
  store.clear();
  console.log('\nAfter clear, size:', store.size);
}
