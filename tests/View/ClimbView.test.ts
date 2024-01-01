import { vi } from 'vitest';
import { mount } from '@vue/test-utils';
import ClimbView from '../../src/View/ClimbView.vue';
import Game from '../../src/entity/Game';

test('should show the climbing table with 2 players', async () => {
  const game = new Game();
  const toggleView = vi.fn();
  game.addPlayer('A');
  game.addPlayer('B');
  const wrapper = mount(ClimbView, {
    global: {
      provide: {
        game,
        toggleView,
      },
    },
  });

  const inputA = wrapper.find('[data-test="A-cards"]').element as HTMLInputElement;
  const inputB = wrapper.find('[data-test="B-cards"]').element as HTMLInputElement

  expect(wrapper.findAll('[data-test="player-climb"]').length).toBe(2);

  expect(inputA.value).toBe('0');
  expect(inputB.value).toBe('0');
  expect(wrapper.find('[data-test="A-name"]').text()).toBe('A');
  expect(wrapper.find('[data-test="A-position"]').text()).toBe('1o');
  expect(wrapper.find('[data-test="A-points"]').text()).toBe('1');
  expect(wrapper.find('[data-test="B-name"]').text()).toBe('B');
  expect(wrapper.find('[data-test="B-position"]').text()).toBe('2o');
  expect(wrapper.find('[data-test="B-points"]').text()).toBe('2');
});

test('should order the climbing players when update cards of each one', async () => {
  const game = new Game();
  const toggleView = vi.fn();
  game.addPlayer('A');
  game.addPlayer('B');
  const wrapper = mount(ClimbView, {
    global: {
      provide: {
        game,
        toggleView,
      },
    },
  });

  expect(wrapper.find('[data-test="A-position"]').text()).toBe('1o');
  expect(wrapper.find('[data-test="B-position"]').text()).toBe('2o');

  await wrapper.find('[data-test="B-cards"]').setValue(10);
  wrapper.vm.$forceUpdate();
  await wrapper.find('[data-test="A-cards"]').setValue(2);

  expect(wrapper.find('[data-test="B-position"]').text()).toBe('1o');
  expect(wrapper.find('[data-test="A-position"]').text()).toBe('2o');
});

