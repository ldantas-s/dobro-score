import { mount } from "@vue/test-utils";

import App from "../src/App.vue";

test('should add a player and clear the input', async () => {
  const wrapper = mount(App, {});

  expect(wrapper.find('.round-info').isVisible()).toBe(true);
  expect(wrapper.find('.climbing-info').isVisible()).toBe(false);
  await wrapper.find('.input-player').setValue('A');
  await wrapper.find('[data-test="add-player__button"]').trigger('click');

  const input = wrapper.find('.input-player').element as HTMLInputElement;
  expect(input.value).toBe('');
  expect(wrapper.findAll('.player').length).toBe(1);
  expect(wrapper.findAll('.player-name').at(0)?.text()).toBe('A');
  expect(wrapper.find('.player-points').text()).toBe('0');

  expect(wrapper.find('[data-test="start_round"]').attributes('disabled')).toBe(
    ""
  );
  expect(wrapper.find('[data-test="round-title__rounds"]').text()).toBe(
    "Rodadas: 0 / 3"
  );
  expect(wrapper.find('.distribuition-cards').text()).toBe(
    "Distribuir 6 cartas"
  );
});

test('should not add a player with non-name', async () => {
  const wrapper = mount(App, {});

  await wrapper.find('.input-player').setValue('');
  await wrapper.find('[data-test="add-player__button"]').trigger('click');

  expect(wrapper.findAll('.player').length).toBe(0);
});

test('should enable to click start climbing button if at least two players was regirested', async () => {
  const wrapper = mount(App, {});

  await wrapper.find('.input-player').setValue('A');
  await wrapper.find('[data-test="add-player__button"]').trigger('click');
  await wrapper.find('.input-player').setValue('B');
  await wrapper.find('[data-test="add-player__button"]').trigger('click');

  expect(
    wrapper.find('[data-test="start_round"]').attributes('disabeld')
  ).toBeUndefined();
});

test('should inform that need to distribute 5 cards if 6 players was registered', async () => {
  const wrapper = mount(App, {});
  const players = [1, 2, 3, 4, 5, 6];

  for (const player of players) {
    await wrapper.find('.input-player').setValue(player);
    await wrapper.find('[data-test="add-player__button"]').trigger('click');
  }

  expect(wrapper.find('.distribuition-cards').text()).toBe(
    "Distribuir 5 cartas"
  );
});

test('should not be able to register more than 6 players', async () => {
  const wrapper = mount(App, {});
  const players = [1, 2, 3, 4, 5, 6];

  for (const player of players) {
    await wrapper.find('.input-player').setValue(player);
    await wrapper.find('[data-test="add-player__button"]').trigger('click');
  }

  expect(wrapper.find('[data-test="add-player__button"]').attributes('disabled')).toBe('');
});

test('should show the climbing info when click start round button', async () => {
  const wrapper = mount(App, {});

  await wrapper.find('.input-player').setValue('A');
  await wrapper.find('[data-test="add-player__button"]').trigger('click');
  await wrapper.find('.input-player').setValue('B');
  await wrapper.find('[data-test="add-player__button"]').trigger('click');

  await wrapper.find('[data-test="start_round"]').trigger('click');

  expect(wrapper.find('.climbing-info').isVisible()).toBe(true);
  expect(wrapper.find('.round-info').isVisible()).toBe(false);
});

test('should show the climbing table', async () => {
  const wrapper = mount(App, {});

  await wrapper.find('.input-player').setValue('A');
  await wrapper.find('[data-test="add-player__button"]').trigger('click');
  await wrapper.find('.input-player').setValue('B');
  await wrapper.find('[data-test="add-player__button"]').trigger('click');

  await wrapper.find('[data-test="start_round"]').trigger('click');

  const input = wrapper.findAll('.player-climb-cards__input').at(0)
    ?.element as HTMLInputElement;

  expect(wrapper.findAll('.player-climb-name').length).toBe(2);

  expect(wrapper.findAll('.player-climb-name').at(0)?.text()).toBe('A');
  expect(input.value).toBe('0');
  expect(wrapper.findAll('.player-climb-position').at(0)?.text()).toBe('1o');
  expect(wrapper.findAll('.player-climb-point').at(0)?.text()).toBe('1');
});

test('should sort the climbing player durin the definition of cards', async () => {
  const wrapper = mount(App, {});

  await wrapper.find('.input-player').setValue('A');
  await wrapper.find('[data-test="add-player__button"]').trigger('click');
  await wrapper.find('.input-player').setValue('B');
  await wrapper.find('[data-test="add-player__button"]').trigger('click');

  await wrapper.find('[data-test="start_round"]').trigger('click');

  await wrapper.findAll('.player-climb-cards__input').at(0)?.setValue(2);
  await wrapper.findAll('.player-climb-cards__input').at(1)?.setValue(10);

  expect(wrapper.findAll('.player-climb-name').at(0)?.text()).toBe('B');
  expect(wrapper.findAll('.player-climb-name').at(1)?.text()).toBe('A');
});

test('should process the cards and go back to rounds with updated points', async () => {
  const wrapper = mount(App, {});

  await wrapper.find('.input-player').setValue('A');
  await wrapper.find('[data-test="add-player__button"]').trigger('click');
  await wrapper.find('.input-player').setValue('B');
  await wrapper.find('[data-test="add-player__button"]').trigger('click');

  await wrapper.find('[data-test="start_round"]').trigger('click');

  const playerA = wrapper.find('[data-test="A"]');
  const playerB = wrapper.find('[data-test="B"]');

  await playerA.setValue(2);
  await playerB.setValue(10);

  await wrapper.find('[data-test="finish_round"]').trigger('click');

  expect(wrapper.find('[data-test="round-title__rounds"]').text()).toBe(
    "Rodadas: 1 / 3"
  );
  expect(wrapper.findAll('.player-name').at(0)?.text()).toBe('A');
  expect(wrapper.findAll('.player-points').at(0)?.text()).toBe('2');
  expect(wrapper.findAll('.player-name').at(1)?.text()).toBe('B');
  expect(wrapper.findAll('.player-points').at(1)?.text()).toBe('1');

  await wrapper.find('[data-test="start_round"]').trigger('click');

  expect(wrapper.find('[data-test="round-title__climbs"]').text()).toBe(
    "Rodada atual: 2"
  );

  const firstInput = wrapper.findAll('.player-climb-cards__input').at(0)
    ?.element as HTMLInputElement;
  expect(firstInput.value).toBe('0');

  await playerA.setValue(5);
  await playerB.setValue(4);

  await wrapper.find('[data-test="finish_round"]').trigger('click');

  expect(wrapper.find('[data-test="round-title__rounds"]').text()).toBe(
    "Rodadas: 2 / 3"
  );
  expect(wrapper.findAll('.player-name').at(0)?.text()).toBe('A');
  expect(wrapper.findAll('.player-points').at(0)?.text()).toBe('3');
  expect(wrapper.findAll('.player-name').at(1)?.text()).toBe('B');
  expect(wrapper.findAll('.player-points').at(1)?.text()).toBe('3');
});

test('should order the climbing players when update cards of each one', async () => {
  const wrapper = mount(App, {});

  await wrapper.find('.input-player').setValue('A');
  await wrapper.find('[data-test="add-player__button"]').trigger('click');
  await wrapper.find('.input-player').setValue('B');
  await wrapper.find('[data-test="add-player__button"]').trigger('click');

  await wrapper.find('[data-test="start_round"]').trigger('click');

  expect(wrapper.findAll('.player-climb-name').at(0)?.text()).toBe('A');
  expect(wrapper.findAll('.player-climb-name').at(1)?.text()).toBe('B');

  await wrapper.findAll('.player-climb-cards__input').at(1)?.setValue(10);
  expect(wrapper.findAll('.player-climb-name').at(0)?.text()).toBe('B');
  await wrapper.findAll('.player-climb-cards__input').at(0)?.setValue(2);
  expect(wrapper.findAll('.player-climb-name').at(1)?.text()).toBe('A');
});

test('should process a draw cards count and go back to rounds with updated points', async () => {
  const wrapper = mount(App, {});

  await wrapper.find('.input-player').setValue('A');
  await wrapper.find('[data-test="add-player__button"]').trigger('click');
  await wrapper.find('.input-player').setValue('B');
  await wrapper.find('[data-test="add-player__button"]').trigger('click');
  await wrapper.find('.input-player').setValue('C');
  await wrapper.find('[data-test="add-player__button"]').trigger('click');

  await wrapper.find('[data-test="start_round"]').trigger('click');

  const playerA = wrapper.find('[data-test="A"]');
  const playerB = wrapper.find('[data-test="B"]');
  const playerC = wrapper.find('[data-test="C"]');

  await playerA.setValue(10);
  await playerB.setValue(10);
  await playerC.setValue(5);

  await wrapper.find('[data-test="finish_round"]').trigger('click');

  expect(wrapper.find('[data-test="round-title__rounds"]').text()).toBe(
    "Rodadas: 1 / 3"
  );
  expect(wrapper.findAll('.player-name').at(0)?.text()).toBe('C');
  expect(wrapper.findAll('.player-points').at(0)?.text()).toBe('3');

  expect(wrapper.findAll('.player-name').at(1)?.text()).toBe('A');
  expect(wrapper.findAll('.player-points').at(1)?.text()).toBe('2');

  expect(wrapper.findAll('.player-name').at(2)?.text()).toBe('B');
  expect(wrapper.findAll('.player-points').at(2)?.text()).toBe('2');
});

test('should not be able to add a new player if the game already started', async () => {
  const wrapper = mount(App, {});

  await wrapper.find('.input-player').setValue('A');
  await wrapper.find('[data-test="add-player__button"]').trigger('click');
  await wrapper.find('.input-player').setValue('B');
  await wrapper.find('[data-test="add-player__button"]').trigger('click');

  await wrapper.find('[data-test="start_round"]').trigger('click');

  await wrapper.findAll('.player-climb-cards__input').at(0)?.setValue(10);
  await wrapper.findAll('.player-climb-cards__input').at(1)?.setValue(10);

  await wrapper.find('[data-test="finish_round"]').trigger('click');

  expect(wrapper.find('.input-player').isVisible()).toBe(false);
  expect(wrapper.find('[data-test="add-player__button"]').isVisible()).toBe(false);
});

test('should show the winner screen after the third round', async () => {
  const wrapper = mount(App, {});

  await wrapper.find('.input-player').setValue('A');
  await wrapper.find('[data-test="add-player__button"]').trigger('click');
  await wrapper.find('.input-player').setValue('B');
  await wrapper.find('[data-test="add-player__button"]').trigger('click');

  await wrapper.find('[data-test="start_round"]').trigger('click');

  await wrapper.find('[data-test="A"]').setValue(10);
  await wrapper.find('[data-test="B"]').setValue(5);
  expect(wrapper.find('[data-test="round-title__climbs"]').text()).toBe(
    "Rodada atual: 1"
  );
  await wrapper.find('[data-test="finish_round"]').trigger('click');

  await wrapper.find('[data-test="start_round"]').trigger('click');
  await wrapper.find('[data-test="A"]').setValue(15);
  await wrapper.find('[data-test="B"]').setValue(2);
  expect(wrapper.find('[data-test="round-title__climbs"]').text()).toBe(
    "Rodada atual: 2"
  );
  await wrapper.find('[data-test="finish_round"]').trigger('click');

  await wrapper.find('[data-test="start_round"]').trigger('click');
  await wrapper.find('[data-test="A"]').setValue(20);
  await wrapper.find('[data-test="B"]').setValue(1);
  expect(wrapper.find('[data-test="round-title__climbs"]').text()).toBe(
    "Rodada atual: 3"
  );
  await wrapper.find('[data-test="finish_round"]').trigger('click');

  expect(wrapper.find('.winner-congrats').text()).toBe(
    "Congratulations! B is the Winner with 6 points"
  );
});
