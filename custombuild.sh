#!/bin/sh
ng build reexample2 --prod --output-hashing=none && cat dist/reexample2/runtime.js dist/reexample2/polyfills.js dist/reexample2/main.js > preview/reexample2.js