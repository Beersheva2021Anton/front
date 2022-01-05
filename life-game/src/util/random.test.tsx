import React from "react";
import { getRandomNumber } from "./random";

test('Get random number', () => {
    const rnd = getRandomNumber(1, 5);
    expect(rnd).toBeLessThan(6);
    expect(rnd).toBeGreaterThan(0);
})