import { mount } from "@vue/test-utils";

import App from "../src/App.vue";

test("should add a player and clear the input", async () => {
  const wrapper = mount(App, {});

  expect(wrapper.find(".round-info").isVisible()).toBe(true);
  expect(wrapper.find(".climbing-info").isVisible()).toBe(false);
  await wrapper.find(".input-player").setValue("A");
  await wrapper.find(".add-player").trigger("click");

  const input = wrapper.find(".input-player").element as HTMLInputElement;
  expect(input.value).toBe("");
  expect(wrapper.findAll(".player").length).toBe(1);
  expect(wrapper.findAll(".player-name").at(0)?.text()).toBe("A");
  expect(wrapper.find(".player-points").text()).toBe("0");

  expect(wrapper.find(".start-climbing").attributes("disabled")).toBe("");
  expect(wrapper.find(".round").text()).toBe("Rodada: 1 / 3");
  expect(wrapper.find(".distribuition-cards").text()).toBe(
    "Distribuir 6 cartas"
  );
});

test("should not add a player with non-name", async () => {
  const wrapper = mount(App, {});

  await wrapper.find(".input-player").setValue("");
  await wrapper.find(".add-player").trigger("click");

  expect(wrapper.findAll(".player").length).toBe(0);
});

test("should enable to click start climbing button if at least two players was regirested", async () => {
  const wrapper = mount(App, {});

  await wrapper.find(".input-player").setValue("A");
  await wrapper.find(".add-player").trigger("click");
  await wrapper.find(".input-player").setValue("B");
  await wrapper.find(".add-player").trigger("click");

  expect(
    wrapper.find(".start-climbing").attributes("disabeld")
  ).toBeUndefined();
});

test("should inform that need to distribute 5 cards if 6 players was registered", async () => {
  const wrapper = mount(App, {});
  const players = [1, 2, 3, 4, 5, 6];

  for (const player of players) {
    await wrapper.find(".input-player").setValue(player);
    await wrapper.find(".add-player").trigger("click");
  }

  expect(wrapper.find(".distribuition-cards").text()).toBe(
    "Distribuir 5 cartas"
  );
});

test("should not be able to register more than 6 players", async () => {
  const wrapper = mount(App, {});
  const players = [1, 2, 3, 4, 5, 6];

  for (const player of players) {
    await wrapper.find(".input-player").setValue(player);
    await wrapper.find(".add-player").trigger("click");
  }

  expect(wrapper.find(".add-player").attributes("disabled")).toBe("");
});

test("should show the climbing info when click start climbing button", async () => {
  const wrapper = mount(App, {});

  await wrapper.find(".input-player").setValue("A");
  await wrapper.find(".add-player").trigger("click");
  await wrapper.find(".input-player").setValue("B");
  await wrapper.find(".add-player").trigger("click");

  await wrapper.find(".start-climbing").trigger("click");

  expect(wrapper.find(".climbing-info").isVisible()).toBe(true);
  expect(wrapper.find(".round-info").isVisible()).toBe(false);
});

test("should show the climbing table", async () => {
  const wrapper = mount(App, {});

  await wrapper.find(".input-player").setValue("A");
  await wrapper.find(".add-player").trigger("click");
  await wrapper.find(".input-player").setValue("B");
  await wrapper.find(".add-player").trigger("click");

  await wrapper.find(".start-climbing").trigger("click");

  const input = wrapper.findAll(".player-climb-cards__input").at(0)
    ?.element as HTMLInputElement;

  expect(wrapper.findAll(".player-climb-name").length).toBe(2);

  expect(wrapper.findAll(".player-climb-name").at(0)?.text()).toBe("A");
  expect(input.value).toBe("0");
  expect(wrapper.findAll(".player-climb-position").at(0)?.text()).toBe("1o");
  expect(wrapper.findAll(".player-climb-point").at(0)?.text()).toBe("1");
});

test("should sort the climbing player durin the definition of cards", async () => {
  const wrapper = mount(App, {});

  await wrapper.find(".input-player").setValue("A");
  await wrapper.find(".add-player").trigger("click");
  await wrapper.find(".input-player").setValue("B");
  await wrapper.find(".add-player").trigger("click");

  await wrapper.find(".start-climbing").trigger("click");

  await wrapper.findAll(".player-climb-cards__input").at(0)?.setValue(2);
  await wrapper.findAll(".player-climb-cards__input").at(1)?.setValue(10);

  expect(wrapper.findAll(".player-climb-name").at(0)?.text()).toBe("B");
  expect(wrapper.findAll(".player-climb-name").at(1)?.text()).toBe("A");
});

test("should process the cards and go back to rounds with updated points", async () => {
  const wrapper = mount(App, {});

  await wrapper.find(".input-player").setValue("A");
  await wrapper.find(".add-player").trigger("click");
  await wrapper.find(".input-player").setValue("B");
  await wrapper.find(".add-player").trigger("click");

  await wrapper.find(".start-climbing").trigger("click");

  await wrapper.findAll(".player-climb-cards__input").at(0)?.setValue(2);
  await wrapper.findAll(".player-climb-cards__input").at(1)?.setValue(10);

  await wrapper.find('[data-testid="process_values"]').trigger("click");

  expect(wrapper.find(".round").text()).toBe("Rodada: 2 / 3");
  expect(wrapper.findAll(".player-name").at(0)?.text()).toBe("A");
  expect(wrapper.findAll(".player-points").at(0)?.text()).toBe("2");
  expect(wrapper.findAll(".player-name").at(1)?.text()).toBe("B");
  expect(wrapper.findAll(".player-points").at(1)?.text()).toBe("1");

  await wrapper.find(".start-climbing").trigger("click");

  expect(wrapper.findAll(".round").at(1)?.text()).toBe("Rodada: 2 / 3");

  const firstInput = wrapper.findAll(".player-climb-cards__input").at(0)
    ?.element as HTMLInputElement;
  expect(firstInput.value).toBe("0");

  await wrapper.findAll(".player-climb-cards__input").at(0)?.setValue(5);
  await wrapper.findAll(".player-climb-cards__input").at(1)?.setValue(4);

  await wrapper.find('[data-testid="process_values"]').trigger("click");

  expect(wrapper.find(".round").text()).toBe("Rodada: 3 / 3");
  expect(wrapper.findAll(".player-name").at(0)?.text()).toBe("A");
  expect(wrapper.findAll(".player-points").at(0)?.text()).toBe("3");
  expect(wrapper.findAll(".player-name").at(1)?.text()).toBe("B");
  expect(wrapper.findAll(".player-points").at(1)?.text()).toBe("3");
});

test("should process a draw cards count and go back to rounds with updated points", async () => {
  const wrapper = mount(App, {});

  await wrapper.find(".input-player").setValue("A");
  await wrapper.find(".add-player").trigger("click");
  await wrapper.find(".input-player").setValue("B");
  await wrapper.find(".add-player").trigger("click");

  await wrapper.find(".start-climbing").trigger("click");

  await wrapper.findAll(".player-climb-cards__input").at(0)?.setValue(10);
  await wrapper.findAll(".player-climb-cards__input").at(1)?.setValue(10);

  await wrapper.find('[data-testid="process_values"]').trigger("click");

  expect(wrapper.find(".round").text()).toBe("Rodada: 2 / 3");
  expect(wrapper.findAll(".player-name").at(0)?.text()).toBe("B");
  expect(wrapper.findAll(".player-points").at(0)?.text()).toBe("2");
  expect(wrapper.findAll(".player-name").at(1)?.text()).toBe("A");
  expect(wrapper.findAll(".player-points").at(1)?.text()).toBe("2");
});