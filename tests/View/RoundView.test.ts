import { vi } from 'vitest';
import { mount } from '@vue/test-utils';
import RoundView from '../../src/View/RoundView.vue';
import Game from '../../src/entity/Game';

test('should show that need to distribute 5 cards if 6 players was registered', async () => {
  const game = new Game();
  const toggleView = vi.fn();
  for (let i = 0; i <= 6; i++) {
    game.addPlayer(String(i));
  }
  const wrapper = mount(RoundView, {
    global: { provide: { game, toggleView } },
  });
  expect(wrapper.find('.distribuition-cards').text()).toBe(
    'Distribuir 5 cartas'
  );
});

test('should disable the start round button if has not enough player', async () => {
  const game = new Game();
  const toggleView = vi.fn();
  game.addPlayer('A');
  const wrapper = mount(RoundView, {
    global: { provide: { game, toggleView } },
  });

  expect(wrapper.find('[data-test="start_round"]').attributes('disabled')).toBe(
    ''
  );
});

test('should enable the start round button if has at least 2 player', async () => {
  const game = new Game();
  const toggleView = vi.fn();
  game.addPlayer('A');
  game.addPlayer('B');
  const wrapper = mount(RoundView, {
    global: { provide: { game, toggleView } },
  });

  expect(
    wrapper.find('[data-test="start_round"]').attributes('disabled')
  ).toBeUndefined();
});

test('should call the toggleView with climb', async () => {
  const game = new Game();
  const toggleView = vi.fn();
  game.addPlayer('A');
  game.addPlayer('B');
  const wrapper = mount(RoundView, {
    global: { provide: { game, toggleView } },
  });

  await wrapper.find('[data-test="start_round"]').trigger('click');

  expect(toggleView).toHaveBeenCalledWith('climb');
});
