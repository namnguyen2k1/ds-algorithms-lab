export function runArrayPlayground() {
  const arr: number[] = [1, 2, 3, 4, 5, 6, 7, 8];

  console.log('--- Initial Array ---');
  console.log(arr);

  // --- push() & pop() ---
  arr.push(6);
  console.log('\nAfter push(6):', arr);
  arr.pop();
  console.log('After pop():', arr);

  // --- unshift() & shift() ---
  arr.unshift(0);
  console.log('\nAfter unshift(0):', arr);
  arr.shift();
  console.log('After shift():', arr);

  // --- concat() ---
  const arr2 = [6, 7, 8];
  const combined = arr.concat(arr2);
  console.log('\nAfter concat([6,7,8]):', combined);

  // --- slice() ---
  console.log('\narr.slice(1, 3):', arr.slice(1, 3));

  // --- splice() ---
  arr.splice(2, 1, 99);
  console.log('\nAfter splice(2,1,99):', arr);

  console.log(arr);
  // --- indexOf() & lastIndexOf() ---
  console.log('\nindexOf(99):', arr.indexOf(99));
  console.log('lastIndexOf(99):', arr.lastIndexOf(99, -1));

  // --- includes() ---
  console.log('\nIncludes 3?', arr.includes(3));
  console.log('Includes 100?', arr.includes(100));

  // --- find() & findIndex() ---
  console.log(
    '\nfind > 3:',
    arr.find(x => x > 3)
  );
  console.log(
    '\nfindIndex > 3:',
    arr.findIndex(x => x > 3)
  );

  // --- filter() ---
  console.log(
    '\nFilter even numbers:',
    arr.filter(x => x % 2 === 0)
  );

  // --- map() ---
  console.log(
    '\nMap (x*2):',
    arr.map(x => x * 2)
  );

  // --- reduce() ---
  console.log(
    '\nReduce (sum):',
    arr.reduce((acc, cur) => acc + cur, 0)
  );

  // --- some() & every() ---
  console.log(
    '\nSome > 4?',
    arr.some(x => x > 4)
  );
  console.log(
    '\nEvery > 2?',
    arr.every(x => x > 2)
  );

  // --- sort() ---
  const unsorted = [3, 1, 4, 2];
  unsorted.sort();
  console.log('\nSorted:', unsorted);

  // --- reverse() ---
  unsorted.reverse();
  console.log('\nReversed:', unsorted);

  // --- join() ---
  console.log('\nJoin with "-":', arr.join('-'));

  // --- toString() ---
  console.log('\ntoString():', arr.toString());

  // --- forEach() ---
  console.log('\nUsing forEach:');
  arr.forEach((val, idx) => {
    console.log(`Index ${idx} → ${val}`);
  });

  // --- flat() ---
  const nested = [1, [2, [3, 4]]];
  console.log('\nFlat:', nested.flat(2));

  // --- flatMap() ---
  console.log(
    '\nFlatMap (x=>[x,x*2]):',
    [1, 2, 3].flatMap(x => [x, x * 2])
  );

  // --- fill() ---
  const filled = new Array(5).fill(7);
  console.log('\nFill(7):', filled);

  // --- copyWithin() ---
  const numbers = [1, 2, 3, 4, 5];
  numbers.copyWithin(0, 3);
  console.log('\nCopyWithin(0,3):', numbers);
}
