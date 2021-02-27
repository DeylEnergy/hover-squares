## Hover Squares Application

[![Hover Squares App][app_screenshot]](https://example.com)

<p align="center">
  <a href="https://hover-squares.netlify.app">View demo</a>
</p>

### Description

The app allows listing of hovered squares. API provides with three board presets.

In terms of performance, burden comes from rendering hovered squares list since it may need update on every slight mouse movement. Luckily, this problem was solved by using virtualizing(windowing) and throttling `MouseEnter` event.

UI state logic controlled by XState.

### Built With

- [TypeScript](https://www.typescriptlang.org/)
- [React](https://reactjs.org/)
- [XState](https://xstate.js.org/)
- [Material UI](https://material-ui.com/)
- [React-window](https://react-window.now.sh/)

## State machine

[![Hover Squares App][main_machine]](https://example.com)

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/DeylEnergy/hover-squares.git
   ```
2. Open folder
   ```sh
   cd hover-squares
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Start developer server
   ```sh
   npm start
   ```

[app_screenshot]: assets/app_screenshot.png
[main_machine]: assets/main_machine.png
