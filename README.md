<h1 align="center">Продвинутый SSR шаблон</h1>

## Технологии

-   React 18
-   Webpack 5
-   Express 4
-   Node 21.2.0

## Использование

Установите npm-пакет и сгенерируйте вендеры с помощью команды:

```sh
$ npm run init
```

Запустите dev режим с помощью команды:

```sh
$ npm run dev
```

### Требования

Для установки и запуска проекта, необходим [NodeJS](https://nodejs.org/) v18+.

### Арихтектура

точка входа в приложение — это бандл, который находится в папке client/bundles.
В нём описаны необходимые части для той или иной платформы.

-   client

    -   bundles - У каждой платформы могут быть различные требования с точки зрения подключения тех или иных компонентов.
        Например, мобильным устройствам или TV-платформам нужен будет дополнительный набор компонентов.
        Чтобы не делать множество условных конструкций и не превращать чистый код в «грязный», применяют бандлинг.
    -   pages - отдельные разделы продукта (например, лендинг, страница авторизации или личный кабинет);
    -   components — общие сущности, которые используются во всём проекте (например, кнопка, текст или шапка);
    -   sass — папка, в которой содержатся основные миксины, переменные, функции, но не стили отдельного компонента или раздела;

-   configs - конфиги проекта с различными настройками (см. @types/cfg)

    -   default.ts - общий конфиг как для разработки, так и для продакшена. Cодержит общие значения для всех окружений
    -   development.ts - конфиг для разработки с hot: true
    -   production.ts - конфиг для продакшена (можно статику связать с s3 хранилищем)
    -   hosts.json - запишет хосты в /etc/hosts, при создании локального мокап api c перенаправлением запросов на локальный api

-   lib

    -   cfg - сливаются конфиги: default (configs/default.ts) и девелоп/продакшн в зависимости от режима.

-   scripts - директория для разных сторонних скриптов

-   server

    -   app.ts - вызов методов сервера (крепятся роуты, мидлвары и прочие настройки)
    -   index.ts - запуск сервера
    -   /utils/ - разные утилитарные функции
        -   startApp.ts - wrapper функция с запуском сервера если дев режим и предварительно загружает все компоненты, чтобы они были доступны при инициализации приложения
    -   /router/ - различные роуты для сервера
    -   /middlewares/
        -   index.ts - экспорт мидлваров
        -   /render/
            -   bundle.tsx - основа основ ssr, где возвращается html с данными с сервера
            -   index.ts - в зависимости от настройки isHot в конфиге, экспортируется разный вебпак конфиг
            -   hot.ts - слияние вебпак конфигов для девелопа. с hotMiddleware, devMiddleware
            -   render.ts - рокидываю ф-ю рендера в объект Response и возвращаю html c сервера
    -   /controllers/ - различные контроллеры

-   webpack
    -   /assets/ - папка со вспомогательными константами и прочим (конфигурация путей в проекте, env переменных, настроек для вендеров )
    -   /config/
        -   client.config.ts - вызывает ф-ю initClientConfig, конфиг для клиентской стороны, конфигурирует лоадеры и плагины для клиента(isSSr:false)
        -   ssr.config.ts - вызывает ф-ю initServerConfig, прокидывает ентри поинт и конфигурирует лоадеры и плагины для сервера(isSSr:true)
    -   /loaders/ - лоадеры для вебпака со св-вами client и ssr для разных режимов
    -   /settings/
        -   initClientConfig - ф-я, с конфигом вебпака для клиента
        -   initServerConfig - ф-я, с конфигом вебпака для сервера
        -   load\*.ts - wrapper функции для лоадеров

## To do

-   [ ] Cделать билд для прода
-   [ ] Добавить редакс
-   [ ] Добавить реакт-роутер
-   [ ] Добавить seo
-   [ ] Опционально: добавить поддержу ssl сертификата
