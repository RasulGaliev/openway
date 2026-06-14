# Openway

> *Там, где доверяют людям.*

Corporate microfrontend platform built with Angular 22, Signals & Module Federation.
Points system, merch shop and activity tracking for engaged teams.

![Angular](https://img.shields.io/badge/Angular-22-DD0031?style=flat-square&logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript)
![Nx](https://img.shields.io/badge/Nx-monorepo-143055?style=flat-square&logo=nx)
![pnpm](https://img.shields.io/badge/pnpm-packagemanager-F69220?style=flat-square&logo=pnpm)

---

## О проекте

Openway — корпоративная платформа для поддержания вовлечённости сотрудников.
Сотрудники участвуют в активностях, зарабатывают баллы и тратят их в магазине мерча компании.

### Возможности

- Система баллов за участие в мероприятиях
- Магазин корпоративного мерча
- Личный кабинет с историей баллов и заказов
- Админ-панель для управления товарами и начислениями
- Расширяемая архитектура — новые модули без изменения ядра

---

## Архитектура

Проект построен на принципах **микрофронтенд-архитектуры** с динамической загрузкой модулей через **Webpack Module Federation**.

```
openway/
├── apps/
│   ├── shell/          # host-приложение, роутинг, авторизация
│   ├── mf-activity/    # модуль активностей и баллов
│   ├── mf-shop/        # магазин мерча
│   ├── mf-profile/     # личный кабинет
│   └── mf-admin/       # админ-панель (lazy, только для admin)
└── libs/
    ├── shared-ui/      # переиспользуемые компоненты
    ├── shared-models/  # типы и интерфейсы
    └── shared-utils/   # утилиты
```

### Паттерны проектирования

| Паттерн | Где используется |
|---|---|
| Facade | Сервисы-фасады каждого MF |
| Strategy | Начисление баллов за разные активности |
| Observer | Шина событий между микрофронтендами |
| Factory | Динамическая загрузка модулей по роли |
| Adapter | Маппинг DTO → доменные модели |
| Command | Действия в админ-панели |
| Singleton | Injectable сервисы-сторы |

---

## Стек технологий

| Категория | Технология |
|---|---|
| Framework | Angular 22 |
| Реактивность | Signals, Zoneless |
| Микрофронтенды | Webpack Module Federation |
| Монорепо | Nx |
| Менеджер пакетов | pnpm |
| Стили | SCSS |
| Язык | TypeScript 5.x |

---

## Запуск проекта

### Требования

- Node.js 20+
- pnpm 9+

### Установка

```bash
# Клонировать репозиторий
git clone https://github.com/ВАШ_ЛОГИН/openway.git
cd openway

# Установить зависимости
pnpm install
```

### Разработка

```bash
# Запустить все приложения
nx run-many -t serve --all --parallel

# Запустить только shell + нужные MF
nx run-many -t serve --projects=shell,mf-shop,mf-activity --parallel
```

Открой браузер: `http://localhost:4200`

| Приложение | Порт |
|---|---|
| shell | 4200 |
| mf-activity | 4201 |
| mf-shop | 4202 |
| mf-profile | 4203 |
| mf-admin | 4204 |

### Сборка

```bash
# Собрать всё
nx build --all

# Собрать только shell
nx build shell
```

### Граф зависимостей

```bash
nx graph
```

---

## Статус

> Проект находится в активной разработке.
> Создан в рамках магистерской диссертации на тему
> *«Проектирование и исследование производительности корпоративной микрофронтенд-платформы на Angular с динамической загрузкой модулей»*

---

## Автор

Галиев Расул

