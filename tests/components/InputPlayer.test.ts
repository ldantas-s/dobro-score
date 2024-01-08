import { vi } from 'vitest';
import { mount } from '@vue/test-utils';

import InputPlayerVue from '../../src/components/InputPlayer.vue';
import Game from '../../src/entity/Game';

test('should add a player and clear the input', async () => {
  const game = new Game();
  const addPlayerSpy = vi.spyOn(game, 'addPlayer');
  const wrapper = mount(InputPlayerVue, {
    global: {
      provide: {
        game,
      },
    },
  });
  await wrapper.find('[data-test="input-player"]').setValue('A');
  await wrapper.find('[data-test="add-player__button"]').trigger('click');
  expect(addPlayerSpy).toHaveBeenCalledWith('A');
  const input = wrapper.find('[data-test="input-player"]').element as HTMLInputElement;
  expect(input.value).toBe('');
});

test('should disable the button if has limit players', async () => {
  const game = new Game();
  vi.spyOn(game, 'hasLimitPlayers').mockImplementation(() => true);
  const wrapper = mount(InputPlayerVue, {
    global: {
      provide: {
        game,
      },
    },
  });
  expect(
    wrapper.find('[data-test="add-player__button"]').attributes('disabled')
  ).toBe('');
});

test('should not show the component if the game is not idle', async () => {
  const game = new Game();
  vi.spyOn(game, 'isIdle').mockImplementation(() => false);
  const wrapper = mount(InputPlayerVue, {
    global: {
      provide: {
        game,
      },
    },
  });
  expect(wrapper.find('[data-test="input-player"]').isVisible()).toBeFalsy();
});
