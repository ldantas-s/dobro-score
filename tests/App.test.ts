import { mount } from '@vue/test-utils';

import App from '../src/App.vue';

test('should process the cards and go back to rounds with updated points', async () => {
  const wrapper = mount(App, {});

  await wrapper.find('.input-player').setValue('A');
  await wrapper.find('[data-test="add-player__button"]').trigger('click');
  await wrapper.find('.input-player').setValue('B');
  await wrapper.find('[data-test="add-player__button"]').trigger('click');

  await wrapper.find('[data-test="start_round"]').trigger('click');

  const playerA = wrapper.find('[data-test="A-cards"]');
  const playerB = wrapper.find('[data-test="B-cards"]');

  await playerA.setValue(2);
  await playerB.setValue(10);

  await wrapper.find('[data-test="finish_round"]').trigger('click');

  expect(wrapper.find('[data-test="round-title__rounds"]').text()).toBe(
    'Rodadas: 1 / 3'
  );
  expect(wrapper.findAll('.player-name').at(0)?.text()).toBe('A');
  expect(wrapper.findAll('.player-points').at(0)?.text()).toBe('2');
  expect(wrapper.findAll('.player-name').at(1)?.text()).toBe('B');
  expect(wrapper.findAll('.player-points').at(1)?.text()).toBe('1');

  await wrapper.find('[data-test="start_round"]').trigger('click');

  expect(wrapper.find('[data-test="round-title__climbs"]').text()).toBe(
    'Rodada atual: 2'
  );

  const firstInput = wrapper.findAll('.player-climb-cards__input').at(0)
    ?.element as HTMLInputElement;
  expect(firstInput.value).toBe('0');

  await playerA.setValue(5);
  await playerB.setValue(4);

  await wrapper.find('[data-test="finish_round"]').trigger('click');

  expect(wrapper.find('[data-test="round-title__rounds"]').text()).toBe(
    'Rodadas: 2 / 3'
  );
  expect(wrapper.findAll('.player-name').at(0)?.text()).toBe('A');
  expect(wrapper.findAll('.player-points').at(0)?.text()).toBe('3');
  expect(wrapper.findAll('.player-name').at(1)?.text()).toBe('B');
  expect(wrapper.findAll('.player-points').at(1)?.text()).toBe('3');
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

  const playerA = wrapper.find('[data-test="A-cards"]');
  const playerB = wrapper.find('[data-test="B-cards"]');
  const playerC = wrapper.find('[data-test="C-cards"]');

  await playerA.setValue(10);
  await playerB.setValue(10);
  await playerC.setValue(5);

  await wrapper.find('[data-test="finish_round"]').trigger('click');

  expect(wrapper.find('[data-test="round-title__rounds"]').text()).toBe(
    'Rodadas: 1 / 3'
  );
  expect(wrapper.findAll('.player-name').at(0)?.text()).toBe('C');
  expect(wrapper.findAll('.player-points').at(0)?.text()).toBe('3');

  expect(wrapper.findAll('.player-name').at(1)?.text()).toBe('A');
  expect(wrapper.findAll('.player-points').at(1)?.text()).toBe('2');

  expect(wrapper.findAll('.player-name').at(2)?.text()).toBe('B');
  expect(wrapper.findAll('.player-points').at(2)?.text()).toBe('2');
});

test('should not show the input player if the game already started', async () => {
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
  expect(wrapper.find('[data-test="add-player__button"]').isVisible()).toBe(
    false
  );
});

test('should show the winner screen after the third round', async () => {
  const wrapper = mount(App, {});

  await wrapper.find('.input-player').setValue('A');
  await wrapper.find('[data-test="add-player__button"]').trigger('click');
  await wrapper.find('.input-player').setValue('B');
  await wrapper.find('[data-test="add-player__button"]').trigger('click');

  await wrapper.find('[data-test="start_round"]').trigger('click');

  await wrapper.find('[data-test="A-cards"]').setValue(10);
  await wrapper.find('[data-test="B-cards"]').setValue(5);
  expect(wrapper.find('[data-test="round-title__climbs"]').text()).toBe(
    'Rodada atual: 1'
  );
  await wrapper.find('[data-test="finish_round"]').trigger('click');

  await wrapper.find('[data-test="start_round"]').trigger('click');
  await wrapper.find('[data-test="A-cards"]').setValue(15);
  await wrapper.find('[data-test="B-cards"]').setValue(2);
  expect(wrapper.find('[data-test="round-title__climbs"]').text()).toBe(
    'Rodada atual: 2'
  );
  await wrapper.find('[data-test="finish_round"]').trigger('click');

  await wrapper.find('[data-test="start_round"]').trigger('click');
  await wrapper.find('[data-test="A-cards"]').setValue(20);
  await wrapper.find('[data-test="B-cards"]').setValue(1);
  expect(wrapper.find('[data-test="round-title__climbs"]').text()).toBe(
    'Rodada atual: 3'
  );
  await wrapper.find('[data-test="finish_round"]').trigger('click');

  expect(wrapper.find('[data-test="view-winner"]').isVisible()).toBeTruthy();
  expect(wrapper.find('.climbing-info').isVisible()).toBeFalsy();
  expect(wrapper.find('.round-info').isVisible()).toBeFalsy();
  expect(wrapper.find('.winner-congrats').text()).toBe(
    'Congratulations! B is the Winner with 6 points'
  );
});
