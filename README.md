### Deploy on https://ivankozhyn.github.io/infotech-mortal-kombat

# Task

Разработать приложение, для демонстрации 2х интерактивных экранов из игры
MortalCombat mc_choose_hero: при загрузке страницы, показывается экран - выбор
бойца arrowKeys

- подтверждение enter + переход на 2ой экран (mc_vs_screen) mc_vs_screen: после
  подтверждения выбранного героя нужно показывать этот экран на 10sec
- 6 иконок внизу страницы являются интерактивными, должны меняться по нажатию на
  QWERTY
- в качестве иконок использовать fontIcon (напр.,
  https://fontawesome.com/icons/fonticons)

### доп. уровни сложности (не обязательно):

- список героев на сервере
- ws: синхронизация игровых экранов у 2х игроков
- mc_vs_screen: определенные комбинации должны выкидывать popup'ы со смешными
  фразами
- тесты:
- выбор героев через arrowKeys, выход за пределы
- отрисовка списка героев, если ничего не пришло techstack:
- react / react-router
- racer (https://github.com/derbyjs/racer)
- jest / mocha

### условия приема:

- задание разместить на github'e
- наличие рабочего приложения
- readme с пояснением, как запустить локально

# To run locally

- Requires Node.js v14 to run.
- Clone the repository https://github.com/ivankozhyn/infotech-mortal-kombat.
- Install dependencies with `npm install` or `yarn install` if you're using
  yarn.
- Run the development server with `npm start` or `yarn start`.

# Реализовано

- основное задание
- мобильная адаптация для девайсов от ширины экрана 408px(Iphone 6/7/8 Plus)
- работает логика выбора персонажа и выхода стрелками за пределы экрана для всех
  экранов(сетка выбора персонажа меняет структуру на разном размере экрана)
- при старте битвы показывается надпись 'FIGHT' до момента нажатия на любую
  QWERTY кнопку
  ![FIGHT](https://raw.githubusercontent.com/ivankozhyn/infotech-mortal-kombat/master/src/assets/otherAnimations/fight.gif)
- если нажать кнопки QWERTY от 3 до 5 раз(работает рандом) появляется надпись
  'FINISH HIM'
  ![FINISHHIM](https://raw.githubusercontent.com/ivankozhyn/infotech-mortal-kombat/master/src/assets/otherAnimations/finishHim.gif)
- если нажать кнопки QWERTY от 6 до 8 раз(работает рандом) и более появляется
  вопрос 'FATALITY ?'
  ![Fatality](https://raw.githubusercontent.com/ivankozhyn/infotech-mortal-kombat/master/src/assets/otherAnimations/fatality.gif)
- если иконки QWERTY содержат 3 одинаковые, то появляется надпись 'SUPER'
  ![Super](https://raw.githubusercontent.com/ivankozhyn/infotech-mortal-kombat/master/src/assets/otherAnimations/superFight.gif)
- при загрузке страницы с выбором персонажа, начальный персонаж выбирается
  рандомно
- QWERTY клавиши работают только в English раскладке, есть поддержка и
  включенного CAPS LOCK
- бой всегда заканчивается победой дружбы

# Использовано

- react / react-router / redux
- react-particles-js для интерактивного фона
- useRef, useEffect, useState, useCallback, useMemo, useHistory, useDispatch,
  useSelector
- использовалась рекурсия для генерации иконок при нажатии QWERTY(чтоб следующая
  иконка точно не была такая как предыдущая, генерация следующей иконки
  рамдомная)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

### `npm run build`
