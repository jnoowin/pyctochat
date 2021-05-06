import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Landing from "../pages/Landing";
import { Provider } from "react-redux";
import store from "../reducers/index";
import { Router, Switch, Route, MemoryRouter } from "react-router-dom";

/**
 * Modify username and roomcode field
 * TR1(base choice) = [ “jared”, "newroom1", “01234567”, not selected, not selected, Not selected, not selected ]
 * T1 = Input: “Jared”, "newroom1", not selected, not selected, not selected, not selected; Expected output: Username and code input has “Jared” and “newroom1”
 */
test("Username and Room Code entered", () => {
  const { getByLabelText } = render(
    <Provider store={store}>
      <Landing />
    </Provider>
  );

  fireEvent.change(getByLabelText(/Username:/i), {
    target: { value: "jared" },
  });
  fireEvent.change(getByLabelText(/Room code:/i), {
    target: { value: "newroom1" },
  });

  expect((getByLabelText(/Username:/i) as HTMLInputElement).value).toBe(
    "jared"
  );
  expect((getByLabelText(/Room code:/i) as HTMLInputElement).value).toBe(
    "newroom1"
  );
});

/**
 * Modify username + roomcode field + change color theme
 * TR3 = [ “jared”, "newroom1", “01234567”, not selected, not selected, Select red, not selected ]
 * T2 =  Input: “Jared”, "newroom1", not selected, not selected, select red, not selected; Expected output: Username and code input has “Jared” and “newroom1” and background color is red
 */
test("Username and Room Code entered + color changed to red ", () => {
  const { getByLabelText } = render(
    <Provider store={store}>
      <Landing />
    </Provider>
  );

  fireEvent.change(getByLabelText(/Username:/i), {
    target: { value: "jared" },
  });
  fireEvent.change(getByLabelText(/Room code:/i), {
    target: { value: "newroom1" },
  });

  const button = document.querySelector("#red");

  if (button) fireEvent.click(button);

  expect((getByLabelText(/Username:/i) as HTMLInputElement).value).toBe(
    "jared"
  );
  expect((getByLabelText(/Room code:/i) as HTMLInputElement).value).toBe(
    "newroom1"
  );
  expect(
    document.getElementsByClassName("w-screen min-h-screen flex bg-red-200")
  );
});

/**
 * Changed "modes" to joining a room
 * TR9 = [ “jared”, "newroom1", “01234567”, not selected, selected, Not selected, not selected ]
 * T3 = Input: “Jared”, "newroom1", not selected, selected, not selected, not selected; Expected output: Username and code input has “Jared” and “newroom1” and background color is gray. Changed to joining a room.
 */
test("Switched to joining room", () => {
  const { getByLabelText, getByText } = render(
    <Provider store={store}>
      <Landing />
    </Provider>
  );

  fireEvent.change(getByLabelText(/Username:/i), {
    target: { value: "jared" },
  });
  fireEvent.change(getByLabelText(/Room code:/i), {
    target: { value: "newroom1" },
  });

  fireEvent.click(getByText(/or join a room./i));

  expect((getByLabelText(/Username:/i) as HTMLInputElement).value).toBe(
    "jared"
  );
  expect((getByLabelText(/Room code:/i) as HTMLInputElement).value).not.toEqual(
    "newroom1"
  );
  expect(getByText(/or create a room./i));
});

/**
 * Generate random room code
 * TR10 = [ “jared”, "newroom1", “01234567”, selected, not selected, Not selected, not selected]
 * T4 = Input: “Jared”, "newroom1", selected, not selected, not selected, not selected; Expected output: Username and code input has “Jared” and random string and background color is gray
 */
test("Random code button clicked", () => {
  const { getByLabelText } = render(
    <Provider store={store}>
      <Landing />
    </Provider>
  );

  fireEvent.change(getByLabelText(/Username:/i), {
    target: { value: "jared" },
  });
  fireEvent.change(getByLabelText(/Room code:/i), {
    target: { value: "newroom1" },
  });

  const button = document.getElementsByClassName(
    "transition duration-300 transform hover:rotate-180 cursor-pointer text-3xl mr-4"
  )[0];

  if (button) fireEvent.click(button);

  expect((getByLabelText(/Username:/i) as HTMLInputElement).value).toBe(
    "jared"
  );
  expect((getByLabelText(/Room code:/i) as HTMLInputElement).value).not.toEqual(
    "newroom1"
  );
  expect(
    document.getElementsByClassName("w-screen min-h-screen flex bg-gray-200")
  );
});

/**
 * Invalid/short code
 * TR12  = [ “jared”, “asdf”, “01234567”, not selected, not selected, Not selected, not selected ]
 * T5 = Input: “Jared”, "0123", not selected, not selected, not selected, not selected; Expected output: Username and code input has “Jared” and “0123” and background color is gray
 */
test("Code is too short", () => {
  const { getByLabelText } = render(
    <Provider store={store}>
      <Landing />
    </Provider>
  );

  fireEvent.change(getByLabelText(/Username:/i), {
    target: { value: "jared" },
  });
  fireEvent.change(getByLabelText(/Room code:/i), {
    target: { value: "0123" },
  });

  expect((getByLabelText(/Username:/i) as HTMLInputElement).value).toBe(
    "jared"
  );
  expect((getByLabelText(/Room code:/i) as HTMLInputElement).value).toEqual(
    "0123"
  );
  expect(
    document.getElementsByClassName("w-screen min-h-screen flex bg-gray-200")
  );
});

test("Switched to joining room", () => {
  const { getByLabelText, getByText } = render(
    <Provider store={store}>
      <Landing />
    </Provider>
  );

  fireEvent.change(getByLabelText(/Username:/i), {
    target: { value: "" },
  });
  fireEvent.change(getByLabelText(/Room code:/i), {
    target: { value: "newroom1" },
  });

  expect((getByLabelText(/Username:/i) as HTMLInputElement).value).toBe("");
  expect((getByLabelText(/Room code:/i) as HTMLInputElement).value).toEqual(
    "newroom1"
  );
  expect(getByText(/Create room/i).closest("button")).toBeDisabled();
});

test("Redirects after succefully creating room", () => {
  const { getByLabelText, getByText } = render(
    <Provider store={store}>
      <Router>
        <Landing />
        <Switch>
          <Route path="/room/newroom1">
            <div>redirected</div>
          </Route>
        </Switch>
      </Router>
    </Provider>,
    { wrapper: MemoryRouter }
  );
  fireEvent.change(getByLabelText(/Username:/i), {
    target: { value: "jared" },
  });
  fireEvent.change(getByLabelText(/Room code:/i), {
    target: { value: "newroom1" },
  });
  fireEvent.click(getByText(/Create room/i));
  expect(screen.getByText(/redirected/i)).toBeInTheDocument();
});

test("Username and Room Code entered + color changed to red ", () => {
  const { getByLabelText } = render(
    <Provider store={store}>
      <Landing />
    </Provider>
  );

  fireEvent.change(getByLabelText(/Username:/i), {
    target: { value: "jared" },
  });
  fireEvent.change(getByLabelText(/Room code:/i), {
    target: { value: "newroom1" },
  });

  const button = document.querySelector("#red");

  if (button) fireEvent.click(button);

  expect((getByLabelText(/Username:/i) as HTMLInputElement).value).toBe(
    "jared"
  );
  expect((getByLabelText(/Room code:/i) as HTMLInputElement).value).toBe(
    "newroom1"
  );
  expect(
    document.getElementsByClassName("w-screen min-h-screen flex bg-red-200")
  );
});
test("Username and Room Code entered + color changed to yellow ", () => {
  const { getByLabelText } = render(
    <Provider store={store}>
      <Landing />
    </Provider>
  );

  fireEvent.change(getByLabelText(/Username:/i), {
    target: { value: "jared" },
  });
  fireEvent.change(getByLabelText(/Room code:/i), {
    target: { value: "newroom1" },
  });

  const button = document.querySelector("#yellow");

  if (button) fireEvent.click(button);

  expect((getByLabelText(/Username:/i) as HTMLInputElement).value).toBe(
    "jared"
  );
  expect((getByLabelText(/Room code:/i) as HTMLInputElement).value).toBe(
    "newroom1"
  );
  expect(
    document.getElementsByClassName("w-screen min-h-screen flex bg-yellow-200")
  );
});
test("Username and Room Code entered + color changed to green ", () => {
  const { getByLabelText } = render(
    <Provider store={store}>
      <Landing />
    </Provider>
  );

  fireEvent.change(getByLabelText(/Username:/i), {
    target: { value: "jared" },
  });
  fireEvent.change(getByLabelText(/Room code:/i), {
    target: { value: "newroom1" },
  });

  const button = document.querySelector("#green");

  if (button) fireEvent.click(button);

  expect((getByLabelText(/Username:/i) as HTMLInputElement).value).toBe(
    "jared"
  );
  expect((getByLabelText(/Room code:/i) as HTMLInputElement).value).toBe(
    "newroom1"
  );
  expect(
    document.getElementsByClassName("w-screen min-h-screen flex bg-green-200")
  );
});
test("Username and Room Code entered + color changed to blue ", () => {
  const { getByLabelText } = render(
    <Provider store={store}>
      <Landing />
    </Provider>
  );

  fireEvent.change(getByLabelText(/Username:/i), {
    target: { value: "jared" },
  });
  fireEvent.change(getByLabelText(/Room code:/i), {
    target: { value: "newroom1" },
  });

  const button = document.querySelector("#blue");

  if (button) fireEvent.click(button);

  expect((getByLabelText(/Username:/i) as HTMLInputElement).value).toBe(
    "jared"
  );
  expect((getByLabelText(/Room code:/i) as HTMLInputElement).value).toBe(
    "newroom1"
  );
  expect(
    document.getElementsByClassName("w-screen min-h-screen flex bg-blue-200")
  );
});
test("Username and Room Code entered + color changed to purple", () => {
  const { getByLabelText } = render(
    <Provider store={store}>
      <Landing />
    </Provider>
  );

  fireEvent.change(getByLabelText(/Username:/i), {
    target: { value: "jared" },
  });
  fireEvent.change(getByLabelText(/Room code:/i), {
    target: { value: "newroom1" },
  });

  const button = document.querySelector("#purple");

  if (button) fireEvent.click(button);

  expect((getByLabelText(/Username:/i) as HTMLInputElement).value).toBe(
    "jared"
  );
  expect((getByLabelText(/Room code:/i) as HTMLInputElement).value).toBe(
    "newroom1"
  );
  expect(
    document.getElementsByClassName("w-screen min-h-screen flex bg-purple-200")
  );
});
test("Username and Room Code entered + color changed to pink ", () => {
  const { getByLabelText } = render(
    <Provider store={store}>
      <Landing />
    </Provider>
  );

  fireEvent.change(getByLabelText(/Username:/i), {
    target: { value: "jared" },
  });
  fireEvent.change(getByLabelText(/Room code:/i), {
    target: { value: "newroom1" },
  });

  const button = document.querySelector("#pink");

  if (button) fireEvent.click(button);

  expect((getByLabelText(/Username:/i) as HTMLInputElement).value).toBe(
    "jared"
  );
  expect((getByLabelText(/Room code:/i) as HTMLInputElement).value).toBe(
    "newroom1"
  );
  expect(
    document.getElementsByClassName("w-screen min-h-screen flex bg-pink-200")
  );
});
