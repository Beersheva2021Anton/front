import React from 'react';

test('hello test', () => {  
  expect(2 * 2).toBe(4);
});

test('array test', () => {  
  const arr1 = [1, 2, 3];
  const arr2 = [1, 2, 3];
  expect(arr1).toEqual(arr2);
});