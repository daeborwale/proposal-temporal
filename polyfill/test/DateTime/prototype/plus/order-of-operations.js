// Copyright (C) 2020 Igalia, S.L. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-temporal.datetime.prototype.plus
includes: [compareArray.js]
---*/

const instance = new Temporal.DateTime(2000, 5, 2, 12, 34, 56, 987, 654, 321);
const expected = [
  "get days",
  "valueOf days",
  "get hours",
  "valueOf hours",
  "get microseconds",
  "valueOf microseconds",
  "get milliseconds",
  "valueOf milliseconds",
  "get minutes",
  "valueOf minutes",
  "get months",
  "valueOf months",
  "get nanoseconds",
  "valueOf nanoseconds",
  "get seconds",
  "valueOf seconds",
  "get years",
  "valueOf years",
];
const actual = [];
const fields = {
  years: 1.7,
  months: 1.7,
  days: 1.7,
  hours: 1.7,
  minutes: 1.7,
  seconds: 1.7,
  milliseconds: 1.7,
  microseconds: 1.7,
  nanoseconds: 1.7,
};
const argument = new Proxy(fields, {
  get(target, key) {
    actual.push(`get ${key}`);
    const result = target[key];
    if (result === undefined) {
      return undefined;
    }
    return {
      valueOf() {
        actual.push(`valueOf ${key}`);
        return result;
      }
    };
  },
  has(target, key) {
    actual.push(`has ${key}`);
    return key in target;
  },
});
const result = instance.plus(argument);
assert.sameValue(result.year, 2001, "year result");
assert.sameValue(result.month, 6, "month result");
assert.sameValue(result.day, 3, "day result");
assert.sameValue(result.hour, 13, "hour result");
assert.sameValue(result.minute, 35, "minute result");
assert.sameValue(result.second, 57, "second result");
assert.sameValue(result.millisecond, 988, "millisecond result");
assert.sameValue(result.microsecond, 655, "microsecond result");
assert.sameValue(result.nanosecond, 322, "nanosecond result");
assert.compareArray(actual, expected, "order of operations");