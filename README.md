# Projeto Final de ITW 2022

Este é o repositório desenvolvido para o projeto final da unidade curricular de
introdução as tecnologias web, desenvolvido por João Capucho e Carolina Silva.

Built with:

- [Bootstrap v5.2](https://getbootstrap.com/docs/5.2/)
- [Font Awesome v4.7](https://fontawesome.com/v4/icons/)

## Developing

A convenience development server is provided, that can be started by running:

```
npm install # Install dependencies (only needs to be run once)
npm start   # Start the development server
```

The development server watches for file changes and updates the browser when the
underlying file changes.

All development files are contained inside the `src` directory.

### Integration with VSCode

This workflow is integrated with vs code, a task file is provided making it easy
to start the development server from vs code, simply open the quick open menu
(`Ctrl+P`) type `task` and a space and select the `start` task.

Another way is to open the command pallete (`Ctrl+Shift+P`) and open
`Tasks: Run task` and select the `start` task.

## APIs used

### Athletes

| Endpoint                         | Status | Notes                                      |
|----------------------------------|--------|--------------------------------------------|
| `/Athletes`                      |  :ok:  |                                            |
| `/Athletes/{id}`                 |        | Used /Athletes/FullDetails in it's place   |
| `/Athletes/ByIOC`                |  :ok:  |                                            |
| `/Athletes/FullDetails`          |  :ok:  |                                            |
| `/Athletes/SearchByName`         |  :ok:  |                                            |

### Competitions

| Endpoint                         | Status | Notes                                      |
|----------------------------------|--------|--------------------------------------------|
| `/Competitions`                  |  :ok:  |                                            |
| `/Competitions/{id}`             |  :ok:  |                                            |
| `/Competitions/SearchByName`     |  :ok:  |                                            |

### Countries

| Endpoint                         | Status | Notes                                      |
|----------------------------------|--------|--------------------------------------------|
| `/Countries`                     |  :ok:  |                                            |
| `/Countries/{id}`                |  :ok:  |                                            |
| `/Countries/SearchByName`        |  :ok:  |                                            |

### Games

| Endpoint                         | Status | Notes                                      |
|----------------------------------|--------|--------------------------------------------|
| `/Games`                         |  :ok:  |                                            |
| `/Games/{id}`                    |        | Used /Games/FullDetails in it's place      |
| `/Games/FullDetails`             |  :ok:  |                                            |
| `/Games/SearchByName`            |  :ok:  |                                            |

### Modalities

| Endpoint                         | Status | Notes                                      |
|----------------------------------|--------|--------------------------------------------|
| `/Modalities`                    |  :ok:  |                                            |
| `/Modalities/{id}`               |  :ok:  |                                            |
| `/Modalities/SearchByName`       |  :ok:  |                                            |

### Statistics

| Endpoint                         | Status | Notes                                      |
|----------------------------------|--------|--------------------------------------------|
| `/Statistics/Athlete_Country`    |  :ok:  |                                            |
| `/Statistics/Games_Athletes`     |  :ok:  |                                            |
| `/Statistics/Games_Competitions` |  :ok:  |                                            |
| `/Statistics/Games_Countries`    |  :ok:  |                                            |
| `/Statistics/Games_Modalities`   |  :ok:  |                                            |
| `/Statistics/Medals_Country`     |        |                                            |
