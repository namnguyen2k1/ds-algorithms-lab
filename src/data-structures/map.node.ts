export function runMapPlayground() {
  const store = new Map<string, string>();

  // --- set() ---
  store.set('alice', 'admin');
  store.set('bob', 'editor');
  store.set('charlie', 'viewer');

  // --- get() ---
  console.log('alice has key:', store.get('alice'));

  // --- has() ---
  console.log('\nHas bob?', store.has('bob'));
  console.log('\nHas dave?', store.has('dave'));

  // --- size ---
  console.log('\nSize of map:', store.size);

  // --- keys() ---
  const keys = Array.from(store.keys());
  console.log('\nKeys:', keys);

  // --- values() ---
  const values = Array.from(store.values());
  console.log('\nValues:', values);

  // --- entries() ---
  console.log('\nEntries:');
  for (const [key, value] of store.entries()) {
    console.log(`${key} → ${value}`);
  }

  // --- forEach() ---
  console.log('\nUsing forEach:');
  store.forEach((key, value) => {
    console.log(`${value} has key ${key}`);
  });

  // --- delete() ---
  store.delete('bob');
  console.log('\nAfter deleting bob:', Array.from(store.entries()));

  // --- clear() ---
  store.clear();
  console.log('\nAfter clear, size:', store.size);
}
