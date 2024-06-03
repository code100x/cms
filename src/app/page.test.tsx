import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import Page from '../app/page';

test('Page', async () => {
  const ui = await Page();
  render(ui);
  expect(
    screen.getByRole('heading', { level: 1, name: '100xdevs' }),
  ).toBeDefined();
});
