[![Actions Status](https://github.com/UltraRossa/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/UltraRossa/frontend-project-46/actions)
[![Actions Status](https://github.com/UltraRossa/frontend-project-46/workflows/gendiff-check/badge.svg)](https://github.com/UltraRossa/frontend-project-46/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/92df03c19be79df33596/maintainability)](https://codeclimate.com/github/UltraRossa/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/92df03c19be79df33596/test_coverage)](https://codeclimate.com/github/UltraRossa/frontend-project-46/test_coverage)

## About
gendiff is a CLI utility aimed to show defferencies between two files. Output can be formatted in one of three specific formats.  
Supported extension of files are:  **JSON, yaml, yml.**

## Installation

1. Clone the repository.
2. Go to the directory of the repository.
3. Then install package
    ```bash
    make install  
    npm link
    ```
Minimal version of node.js is v20.1.0
## Quick start
Type `gendiff --help` to see help.

Available options are:  
`-V, --version`- output the version number                    
`-h, --help` - output usage information  
`-f, --format` - ***stylish***, ***plain*** or ***json***. By default ***stylish*** formatter is set.

Output with ***stylish*** formatter has the following form:
 ```bash
gendiff filepath1.json filepath2.json

{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}
 ```
Output with ***plain*** formatter has the following form:
 ```bash
gendiff --format plain filepath1.json filepath2.json

Property 'follow' was removed
Property 'proxy' was removed
Property 'timeout' was updated. From 50 to 20
Property 'verbose' was added with value: true

 ```
Output with ***json*** formatter has the following form:
 ```bash
gendiff --format json filepath1.json filepath2.json

[{"key":"follow","value":false,"status":"deleted"},{"key":"host","value":"hexlet.io","status":"unchanged"},{"key":"proxy","value":"123.234.53.22","status":"deleted"},{"key":"timeout","oldValue":50,"newValue":20,"status":"changed"},{"key":"verbose","value":true,"status":"added"}]   

 ```

## Demonstrations
#### Diff plain files with stylish formatter by default
[![asciicast](https://asciinema.org/a/sfehrHPK9i77HSbKEwlhABb39.svg)](https://asciinema.org/a/sfehrHPK9i77HSbKEwlhABb39)

#### DIff nested files with stylish formatter
[![asciicast](https://asciinema.org/a/LVZCpTkbWP8aJA7Ja6Z7agtiV.svg)](https://asciinema.org/a/LVZCpTkbWP8aJA7Ja6Z7agtiV)

#### Diff nested files with plain formatter  
[![asciicast](https://asciinema.org/a/B0LUKWA2gzZGseHKIlKlutbPz.svg)](https://asciinema.org/a/B0LUKWA2gzZGseHKIlKlutbPz)

#### DIff nested files with json formatter  
[![asciicast](https://asciinema.org/a/eHeLCJhOZojdVuhW1XvfWvhbK.svg)](https://asciinema.org/a/eHeLCJhOZojdVuhW1XvfWvhbK)